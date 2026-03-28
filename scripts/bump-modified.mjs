import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

/**
 * Surgical script to update article modifiedDate for SEO ping.
 * Uses today's date string (YYYY-MM-DD).
 */
async function bumpModified() {
    const today = new Date().toISOString().split('T')[0];
    const articlesDir = path.join(process.cwd(), 'src/content/articles');

    try {
        const files = await fs.readdir(articlesDir);
        const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

        console.log(`🚀 Starting modified date bump for ${mdFiles.length} articles...`);

        for (const file of mdFiles) {
            const filePath = path.join(articlesDir, file);
            const rawContent = await fs.readFile(filePath, 'utf8');
            const { data, content } = matter(rawContent);

            // Using 'modifiedDate' as defined in src/content.config.ts
            data.modifiedDate = today;

            const updatedContent = matter.stringify(content, data);
            await fs.writeFile(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated: ${file} (modifiedDate: ${today})`);
        }

        console.log('\n✨ Finished updating all articles.');
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

bumpModified();
