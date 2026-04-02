import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const articlesDir = path.join(process.cwd(), 'src/content/articles');

let debounceTimer = null;
const changedFiles = new Set();

if (fs.existsSync(articlesDir)) {
  fs.watch(articlesDir, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.md') || filename.endsWith('.mdx'))) {
      const fullPath = path.join(articlesDir, filename);
      changedFiles.add(fullPath);
      
      if (debounceTimer) clearTimeout(debounceTimer);
      
      debounceTimer = setTimeout(() => {
        const filesToProcess = Array.from(changedFiles);
        changedFiles.clear();
        
        for (const file of filesToProcess) {
          try {
            if (fs.existsSync(file)) {
              console.log(`[watch-articles] detected change: ${filename}`);
              execSync(`node scripts/sync-mentions.mjs --file="${file}"`, { stdio: 'inherit' });
            }
          } catch (err) {
            console.error(`[watch-articles] error processing ${filename}:`, err.message);
          }
        }
      }, 300);
    }
  });

  console.log(`[watch-articles] watching for changes in ${articlesDir}...`);
} else {
  console.log(`[watch-articles] Directory ${articlesDir} does not exist yet.`);
}
