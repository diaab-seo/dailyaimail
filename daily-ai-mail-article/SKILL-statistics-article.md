# SKILL: AI Statistics Article Writer (Daily AI Mail)

## When To Use This Skill

Use this skill when Mohamed provides raw, unstructured, or dumped statistical data about an AI platform (usage numbers, traffic data, user counts, growth rates, demographic breakdowns, API call volumes, revenue figures, funding rounds, etc.) and wants it converted into a single, fully formatted Daily AI Mail statistics article in `.mdx` format — suitable for citation by news outlets, journalists, and academic publications.

---

## What "Raw Data" Looks Like

Mohamed will provide one or more of:
- Scraped tables from SimilarWeb, Semrush, Statista, or data.ai
- Raw CSV or JSON exports from analytics tools
- Screenshot descriptions of charts
- Copy-pasted text from press releases, earnings calls, or SEC filings
- Numbers pulled from multiple sources in no particular order
- Fragments like "Claude has 18.9M MAU per Backlinko Jan 2026, grew from 5M in Jan 2024"

Your job is to structure this raw material into a verified, citable, publication-ready article.

---

## Output Format

The output is a single `.mdx` file with two parts:

### Part 1: Frontmatter (YAML)

```yaml
---
headline: "[Entity] Statistics [Year]: Users, Traffic & Growth Data"
excerpt: "Verified [Entity] usage statistics including monthly active users, web traffic, demographics, and growth trends as of [Month Year]."
date: "Month DD, YYYY"
isoDate: "YYYY-MM-DDTHH:MM:SS+02:00"
author: "Daily AI Mail Editorial Staff"
authorUrl: "https://dailyaimail.news/about-us/editorial-team"
image: "/images/statistics/[entity-slug]-statistics-[year].jpg"
imageWidth: 1200
imageHeight: 630
imageCaption: "[Entity] monthly active user growth chart, [Year]"
imageAlt: "[Entity] statistics and usage data [Year]"
keywords:
  - "[entity] statistics"
  - "how many people use [entity]"
  - "[entity] monthly active users"
  - "[entity] user demographics"
  - "[entity] traffic data"
  - "[entity] growth rate"
topic: "[Entity] Statistics"
entity: "[Entity]"
dataUpdated: "Month YYYY"
sources:
  - name: "[Source Name]"
    url: "[exact URL provided by Mohamed]"
keyStats:
  - label: "Monthly Active Users"
    value: "[formatted number e.g. 18.9M]"
    note: "As of [Month Year]"
  - label: "Monthly Web Visits"
    value: "[formatted]"
    note: "Source: SimilarWeb"
  - label: "YoY Growth"
    value: "[%]"
    note: "MAU year-over-year"
mentions: []
citations: []
---
```

**Rules for frontmatter:**
- `isoDate` must use Cairo time offset `+02:00`
- `authorUrl` is always `https://dailyaimail.news/about-us/editorial-team`
- `mentions` is always `string[]`, never objects
- `image` path must be exactly as Mohamed specifies or use the Gemini image prompt convention
- `keyStats` maximum 4 entries — pick the 4 most newsworthy numbers
- All URLs in `sources` must be real URLs provided by Mohamed — never fabricate

---

### Part 2: Article Body (MDX)

Structure the body in this exact section order:

#### Section 1: Key [Entity] Stats (Stat Cards)

Write 5–8 bullet-point stat callouts as a tight list. These are the "skim-friendly" facts for readers who won't read the full article. Format:

```mdx
## Key [Entity] Stats

- **[Entity] has [X] monthly active users** as of [Month Year]
- **[X]% of users** are located in [top country]
- **[Entity]'s website receives [X] million monthly visits**
- **The platform grew [X]%** year-over-year from [Year] to [Year]
- **[X]% of [Entity] users are aged [range]**
- **[Entity]'s API serves [X] requests** per [period] [if data available]
```

No fabrication. Only include bullets where Mohamed has provided a source.

#### Section 2: How Many People Use [Entity]?

2–3 paragraphs discussing total user count, monthly active users vs. registered users (if distinction is in the data), and trajectory over time. End with an `<InteractiveChart>` showing user growth over time if Mohamed provides at least 3 time-series data points:

```mdx
<InteractiveChart
  type="line"
  title="[Entity] Monthly Active Users Growth"
  labels={[...]}
  datasets={[{ label: "MAU", data: [...], borderColor: "var(--color-electric-gold)" }]}
/>
```

#### Section 3: [Entity] Website Traffic

2 paragraphs on web traffic (monthly visits, bounce rate, pages per visit, avg session duration if available). Include a `<SortableTable>` showing monthly traffic trend if at least 4 months of data are provided.

#### Section 4: [Entity] Users by Country

2 paragraphs on geographic distribution. Include a `<SortableTable>` with country breakdown:

```mdx
<SortableTable
  caption="[Entity] Web Traffic by Country (Month Year)"
  headers={["Country", "Share of Traffic", "Monthly Visits (est.)"]}
  rows={[...]}
/>
```

#### Section 5: [Entity] User Demographics

2 paragraphs covering age breakdown, gender split, and device usage if data is available. Include an `<InteractiveChart type="doughnut">` for age distribution if data allows.

#### Section 6: [Entity] Growth Rate & Trends

2–3 paragraphs on YoY and MoM growth. Compare to category average if Mohamed provides competitor context. Include a bar chart if multi-platform comparison data is available.

#### Section 7: [Entity] vs. Competitors (optional — only if Mohamed provides comparison data)

`<SortableTable>` comparing the entity against 3–5 competitors across MAU, traffic, and growth rate. Do not fabricate competitor numbers.

#### Section 8: Conclusion — What the Data Tells Us

1 concise paragraph summarizing the key trend signal from the data. Avoid hype language. Write in the register of a factual briefing note, not a marketing summary.

#### Sources & Methodology (auto-rendered by StatisticsLayout)

Do NOT include a Sources section in the MDX body — the layout renders this automatically from the `sources` frontmatter field.

---

## Writing Style Rules

- **Verb tense**: Present tense for current stats ("Claude has 18.9M MAU"), past tense for historical comparisons ("In January 2024, the platform had 5M MAU")
- **Number formatting**: Always format large numbers with commas or M/B shorthand (18,900,000 → 18.9M). Do not mix formats in the same article
- **Hedging**: When a data point comes from a third-party estimator (SimilarWeb, Statista, data.ai), add a parenthetical: "(estimated, SimilarWeb)"
- **No fabrication**: If Mohamed did not provide a specific stat, do not estimate or extrapolate and present it as fact. Leave a `[DATA NEEDED: describe what's missing]` placeholder instead
- **No puffery**: Do not write "explosive growth" or "dominates the market." Write "grew 89% year-over-year" instead
- **Citation anchor convention**: When referencing a source inline, write `[Source Name]` as a superscript-style anchor at end of the sentence. Do not use footnote numbers — the sources block handles attribution
- **Gemini image prompt**: At the very end of the file, after all content, include a comment block:

```mdx
{/* GEMINI IMAGE PROMPT:
A clean editorial data visualization graphic for a statistics article about [Entity].
Dark navy background matching a modern AI publication aesthetic.
Feature a bold central statistic "[key number]" in electric gold typography.
Include subtle bar chart or line graph elements in the background in cyan and gold.
No logos, no faces, no text beyond the statistic itself.
16:9 aspect ratio, 1200x630px target.
*/}
```

---

## Frontmatter Gemini Prompt Field (if site uses it)

If Mohamed's workflow includes a `geminiPrompt` frontmatter field, add it:

```yaml
geminiPrompt: "Editorial statistics graphic for [Entity], dark navy background, bold electric gold '[key stat]' typography, subtle bar chart background elements in cyan. No logos. 1200x630."
```

---

## Quality Checklist Before Outputting

- [ ] Every number in the article traces to a source Mohamed provided
- [ ] No URLs in `sources` are fabricated
- [ ] `mentions` field is `string[]`
- [ ] `authorUrl` is exactly `https://dailyaimail.news/about-us/editorial-team`
- [ ] `isoDate` uses `+02:00` offset
- [ ] `keyStats` has 2–4 entries, not more
- [ ] All chart `labels` and `data` arrays are numerically consistent with the body text
- [ ] `[DATA NEEDED]` placeholders are used instead of guesses
- [ ] Gemini image prompt comment is included at end of file
- [ ] File is valid MDX (no unclosed JSX tags, no stray curly braces)