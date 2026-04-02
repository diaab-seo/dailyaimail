import { visit, SKIP } from 'unist-util-visit';

interface Options {
  terms: Map<string, { slug: string, title: string, excerpt: string }>
  tooltipCap?: number
  articleTitle?: string
}

export function rehypeExplainerTooltips(options: Options) {
  const { terms, tooltipCap = 3, articleTitle = '' } = options;

  return (tree: any, file: any) => {
    try {
      if (!terms || terms.size === 0) return tree;

      // First pass: collect full text to find candidates
      let fullText = '';
      visit(tree, 'text', (node: any) => {
        fullText += (node.value || '') + ' ';
      });

      const sortedTerms = Array.from(terms.keys()).sort((a, b) => b.length - a.length);
      const candidateMatches: any[] = [];

      for (const termLower of sortedTerms) {
        const escapedTerm = termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');

        const matches = [...fullText.matchAll(regex)];
        if (matches.length > 0) {
          const firstIndex = matches[0].index ?? 0;
          let score = 0;

          // Boost score if term appears in title
          const titleRegex = new RegExp(`\\b${escapedTerm}\\b`, 'i');
          if (articleTitle && titleRegex.test(articleTitle)) {
            score += 2;
          }

          // Boost based on frequency (up to 3)
          score += Math.min(3, matches.length);

          // Boost multi-word terms
          if (termLower.trim().split(/\s+/).length > 1) {
            score += 1;
          }

          const termData = terms.get(termLower)!;
          candidateMatches.push({
            termLower,
            termData,
            score,
            firstPos: firstIndex,
            escapedTerm
          });
        }
      }

      // Sort candidates by score descending, then by first occurrence
      candidateMatches.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.firstPos - b.firstPos;
      });

      // Track all mentioned slugs for frontmatter/schema
      const allSlugs = new Set(candidateMatches.map(m => m.termData.slug));
      if (file && file.data) {
        file.data.mentionedTerms = allSlugs;
      }

      // Only allow a capped number of tooltips
      const permitted = candidateMatches.slice(0, tooltipCap);
      if (permitted.length === 0) {
        return tree;
      }

      const usedTerms = new Set<string>();
      // Skip common elements where tooltips would be annoying or broken
      const skipNodes = ['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style', 'head', 'title', 'span'];

      // Second pass: Perform replacements
      visit(tree, (node: any, index: any, parent: any) => {
        if (!parent || typeof index !== 'number') return;

        // Skip forbidden elements
        if ((node.type === 'element' && skipNodes.includes(node.tagName)) || node.type === 'mdxjsEsm') {
          return SKIP;
        }

        if (node.type === 'text' && node.value) {
          for (const permit of permitted) {
            // Already used this term in this article?
            if (usedTerms.has(permit.termLower)) continue;

            const localRegex = new RegExp(`\\b${permit.escapedTerm}\\b`, 'i');
            const match = localRegex.exec(node.value);

            if (match) {
              const matchedString = match[0];
              const startIndex = match.index;
              const beforeText = node.value.slice(0, startIndex);
              const afterText = node.value.slice(startIndex + matchedString.length);

              const newNode: any[] = [];
              if (beforeText) {
                newNode.push({ type: 'text', value: beforeText });
              }

              newNode.push({
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['explainer-term'],
                  dataSlug: `/explainers/${permit.termData.slug}`,
                  dataExcerpt: permit.termData.excerpt,
                  dataTitle: permit.termData.title
                },
                children: [{ type: 'text', value: matchedString }]
              });

              if (afterText) {
                newNode.push({ type: 'text', value: afterText });
              }

              // Replace the original text node with our new nodes
              parent.children.splice(index, 1, ...newNode);

              usedTerms.add(permit.termLower);

              // Continue visiting after the newly inserted nodes
              return index + newNode.length;
            }
          }
        }
      });

      return tree;
    } catch (err) {
      console.error('[rehype-explainer-tooltips] error:', err);
      return tree;
    }
  };
}
