import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// parse args
const args = process.argv.slice(2);
let cap = 6;
let fileArg = null;

for (const arg of args) {
  if (arg.startsWith('--cap=')) {
    cap = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--file=')) {
    fileArg = arg.split('=')[1];
  }
}

const explainersDir = path.join(process.cwd(), 'src/content/explainers');
const articlesDir = path.join(process.cwd(), 'src/content/articles');

// build term map
let explainers = [];
if (fs.existsSync(explainersDir)) {
    explainers = fs.readdirSync(explainersDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
}
const terms = new Map();

for (const file of explainers) {
  const filePath = path.join(explainersDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);
  const title = parsed.data.term;
  const slug = parsed.data.slug || file.replace(/\.mdx?$/, '');
  if (title && slug) {
    terms.set(title.toLowerCase(), { slug, title });
  }
}

// target articles
const targetFiles = fileArg ? [path.resolve(process.cwd(), fileArg)] : [];
if (!fileArg && fs.existsSync(articlesDir)) {
  const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), filelist)
        : filelist.concat(path.join(dir, file));
    });
    return filelist;
  };
  targetFiles.push(...walkSync(articlesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx')));
}

const sortedTerms = Array.from(terms.keys()).sort((a, b) => b.length - a.length);

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const fileMatter = matter(content);
  
  const articleTitle = fileMatter.data.headline || fileMatter.data.title || '';
  const bodyText = fileMatter.content || '';
  
  const candidateMatches = [];

  for (const termLower of sortedTerms) {
    const escapedTerm = termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
    
    const matches = [...bodyText.matchAll(regex)];
    
    if (matches.length > 0) {
      const firstIndex = matches[0].index;
      let score = 0;
      
      const titleRegex = new RegExp(`\\b${escapedTerm}\\b`, 'i');
      if (titleRegex.test(articleTitle)) {
        score += 2;
      }
      
      score += Math.min(3, matches.length);
      
      if (termLower.trim().split(/\s+/).length > 1) {
        score += 1;
      }
      
      candidateMatches.push({
        termLower,
        slug: terms.get(termLower).slug,
        score,
        firstPos: firstIndex
      });
    }
  }

  candidateMatches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.firstPos - b.firstPos;
  });

  const allMatches = candidateMatches.length;
  // Make sure we only have unique slugs
  const keptSlugs = Array.from(new Set(candidateMatches.map(m => m.slug))).slice(0, cap);
  
  const currentMentions = fileMatter.data.mentions || [];
  const same = currentMentions.length === keptSlugs.length && currentMentions.every((slug, i) => slug === keptSlugs[i]);
  
  if (!same) {
    fileMatter.data.mentions = keptSlugs;
    const newContent = matter.stringify(fileMatter.content, fileMatter.data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    if (allMatches > cap) {
      console.log(`[sync-mentions] capped: ${path.basename(filePath)} → ${allMatches} matches → kept ${cap}`);
    } else {
      console.log(`[sync-mentions] updated: ${path.basename(filePath)} → ${JSON.stringify(keptSlugs)}`);
    }
  }
}
