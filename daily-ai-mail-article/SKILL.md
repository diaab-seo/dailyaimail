---
name: daily-ai-mail-article
description: >
  Use this skill whenever the user provides a source article, press release, or raw content and asks to rewrite, publish, or create a Daily AI Mail article. Triggers include: "write this story", "rewrite this article", "create a story about", "publish this in our format", "let's write this for Daily AI Mail", or any request that involves producing a markdown file with YAML frontmatter for the dailyaimail.news publication. Also triggers when the user provides a title to rewrite alongside article body text. Always use this skill — do not attempt article creation from memory of the schema.
---

# Daily AI Mail — Article Creation Skill

This skill produces publish-ready markdown files for **dailyaimail.news**, an AI-focused editorial publication built on Astro 6 and deployed on Cloudflare Pages. Output must be copy-pasteable directly into the CMS with zero edits required.

---

## Step 1: Gather Required Inputs

Before writing, confirm you have all of the following. If anything is missing, ask the user before proceeding.

| Input | Required | Notes |
|---|---|---|
| Source article / body text | ✅ | Raw article, press release, or summary |
| Title to rewrite | ✅ | User provides the headline to rewrite |
| `tag` (primary) | ✅ | Single tag, e.g. `Microsoft AI` |
| `tags` (list) | ✅ | 3–6 tags including the primary |
| User's local time | ✅ | For `isoDate` — Cairo is UTC+2 |
| Links to use | ✅ | **Only use URLs explicitly provided by the user** |
| Related articles | ⬜ | Optional internal `/articles/slug` paths |

---

## Step 2: Produce the YAML Frontmatter

Use this exact schema. Every field is required unless marked optional.

```yaml
---
tag: [Primary Tag]
tags:
  - [Primary Tag]
  - [Tag 2]
  - [Tag 3]
headline: "[Rewritten headline — punchy, specific, SEO-informed]"
excerpt: >-
  [2–3 sentence summary. Lead with the core news. Convey stakes. Max ~45 words.]
date: '[Mon D, YYYY]'
isoDate: '[YYYY-MM-DDTHH:MM:00+02:00]'
modifiedDate: '[YYYY-MM-DD]'
author: Daily AI Mail Editorial Staff
authorUrl: 'https://dailyaimail.news/about-us/editorial-team'
readingTime: [N] min read
image: /images/[article-slug].png
imageWidth: 1200
imageHeight: 675
imageCaption: >-
  [One sentence describing the image. Must reference the article's core subject.]
keywords:
  - [primary keyword phrase]
  - [secondary keyword]
  - [long-tail question variant]
  - [entity + topic compound]
  - [alternative phrasing]
  - [related subtopic]
articleSection:
  - Technology
  - Artificial Intelligence
mentions:
  - [Full name of any person quoted or referenced]
about:
  - name: [Organization or Product name]
    url: '[URL — only use provided links]'
    type: Organization
citations:
  - name: '[Source Label: Brief description]'
    url: '[URL — only use provided links]'
    type: CreativeWork
relatedArticles:
  - url: '/articles/[slug]'
    date: '[YYYY-MM-DD]'
---
```

### Field Rules

**`isoDate`**
Format: `YYYY-MM-DDTHH:MM:00+02:00` (Cairo is UTC+2 year-round).
Ask the user for their local time if not provided. Convert directly — do not guess.

**`date`**
Human-readable. Example: `Apr 4, 2026`. Match the `isoDate` calendar date.

**`modifiedDate`**
Same calendar date as `isoDate`, format `YYYY-MM-DD`.

**`readingTime`**
Estimate based on ~200 words per minute. Round to nearest minute. Minimum `2 min read`.

**`image`**
Derive slug from the headline. Use lowercase, hyphen-separated, max 8 words.
Example headline: *Microsoft Commits $10B to AI in Japan* → `/images/microsoft-10-billion-japan-ai.png`

**`keywords`**
6–10 phrases. Must include: the primary keyword, entity + topic compounds, at least two long-tail question variants (e.g. `how does X work`, `what is X`), and alternative phrasings a user might search.

**`mentions`**
Full names of all people quoted or meaningfully referenced. Strings only, no URLs.

**`about`**
Organizations, products, or frameworks central to the story.
⚠️ **Only use URLs the user explicitly provided.** If no URL was provided for an entity, omit the `url` field or use the entity's known official homepage if obvious (e.g. `https://openai.com`). Never fabricate or assume URLs.

**`citations`**
⚠️ **Only use URLs explicitly provided by the user.** Do not add citations from memory or search results. If the user provides no source URLs, leave `citations` as an empty list `[]`.

**`relatedArticles`**
Only include if user provides internal article paths. Otherwise use `relatedArticles: []`.

**`tags`**
Always include the `tag` value as the first item in `tags`. Add 2–5 more topically relevant tags. Use title case. Limit: 6 tags maximum.

---

## Step 3: Write the Article Body

### Voice and Style

- **Publication:** Daily AI Mail — editorial, sharp, neutral-to-analytical tone
- **Not a press release rewrite.** Restructure, reframe, and editorialize. Add context.
- **Audience:** Mixed — technical teams, business leaders, and general tech-savvy readers. No jargon without explanation. No condescension.
- **Angle:** Practical where possible. Explain implications, not just facts.
- **Length:** Match the word count target given. Default: ~600 words for news, ~2000 words for explainers/guides.

### Structure

```
[Lede paragraph — no heading. 2–3 sentences. The core news + why it matters.]

## [Section Heading]

[Body paragraphs...]

## [Section Heading]

[Body paragraphs...]
```

- Use `##` (H2) for all section headings. No H1 (the headline serves as H1). H3 only for genuine sub-sections.
- Prose paragraphs, not bullet lists. Use inline lists naturally: "...covering x, y, and z."
- Bold key terms or sub-labels sparingly, only when scanning benefit is clear.
- No fluff closers ("In conclusion...", "Time will tell..."). End on a substantive note.

### Links in Body

⚠️ **Only hyperlink URLs the user explicitly provided.** Use varied anchor text — never repeat the same anchor for the same URL across the article. Do not fabricate links. Do not add links from memory.

Inline link format: `[anchor text](https://url.com)`

### YouTube Embeds

When the user provides or references a YouTube video, embed using this exact block:

```html
<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="[Video title]"
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID` with the ID from the URL. If the video ID is unknown, insert a visible note:
`> **Note:** Replace VIDEO_ID with the actual YouTube video ID before publishing.`

---

## Step 4: Append the Gemini Enterprise Image Prompt

After the article body, always append an image generation prompt under this label:

```
---

**Image prompt for Gemini Enterprise:**

> [Detailed visual description. Include: subject matter, composition, color palette (Deep Navy, Electric Gold, Neon Cyan, Ice White, Steel), style (editorial tech, vector, minimal), and explicit exclusions (no people, no readable text, no logos — unless the user requests otherwise).]
```

The image prompt must:
- Match the article's specific subject — not be generic "AI technology"
- Reference the Pulse color palette: **Deep Navy** background, **Electric Gold** accents, **Neon Cyan** for data/flow elements, **Ice White** for typography elements, **Steel** for structural elements
- Exclude people, logos, and readable text by default
- Be one dense descriptive paragraph

---

## Step 5: Final Output Format

Deliver the complete article as a single fenced markdown code block:

````
```markdown
---
[frontmatter]
---

[article body]

---

**Image prompt for Gemini Enterprise:**

> [prompt]
```
````

No commentary before or after the code block unless the user needs a note (e.g. unknown YouTube ID, missing URL for a citation).

---

## Critical Rules — Never Violate

1. **No fabricated URLs.** If the user did not provide a link, do not invent one. Omit the field or flag it.
2. **No press release voice.** Rewrite with editorial intent. Cut marketing language.
3. **isoDate must use the user's provided local time.** Always confirm before writing if not given.
4. **Do not add tags beyond what the user specified** unless they explicitly ask for suggestions.
5. **One article per output.** Do not produce multiple variations unless asked.
6. **The `tag` field is always a single string.** The `tags` field is the list.
7. **Image slug must derive from the headline** — not from the source article's title.

---

## Quick Reference: Minimal Viable Frontmatter Checklist

Before outputting, verify:

- [ ] `tag` is a single string
- [ ] `tags` includes `tag` as first item
- [ ] `headline` is rewritten (not copied from source)
- [ ] `isoDate` uses UTC+2 and the user's provided time
- [ ] `modifiedDate` matches `isoDate` calendar date
- [ ] `image` slug derives from the rewritten headline
- [ ] All URLs in `about` and `citations` were provided by the user
- [ ] `relatedArticles` is `[]` if no internal paths provided
- [ ] `keywords` has 6+ phrases including long-tail variants
- [ ] Article body has no bullet lists (prose only)
- [ ] YouTube embed present if video was referenced
- [ ] Gemini image prompt appended at end