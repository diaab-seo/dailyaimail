export type Article = {
  slug: string;
  tag: string;
  headline: string;
  excerpt: string;
  body: string;
  date: string;
  isoDate: string;
  author: string;
  readingTime: string;
  image?: string;
};

export const articles: Article[] = [
  // ── ANTHROPIC ──────────────────────────────────────────────
  {
    slug: 'claude-4-changes-everything',
    tag: 'Anthropic',
    headline: 'Claude 4 Changes Everything: What You Need to Know',
    excerpt: "A deep dive into Anthropic's most powerful model and what it means for the industry.",
    body: `Anthropic's Claude 4 represents a significant leap in capability, safety, and multimodal understanding. Released in early 2026, the model outperforms previous benchmarks across coding, reasoning, and long-context tasks.

## What's New in Claude 4

The most notable improvement is the model's extended context window — now supporting up to 500,000 tokens, enabling analysis of entire codebases, legal documents, or research papers in a single prompt.

Claude 4 also introduces a refined Constitutional AI approach, where the model has been trained with a more nuanced set of principles, reducing both over-refusals and harmful outputs simultaneously.

## Industry Impact

Analysts at several research firms have noted that Claude 4's coding performance now rivals specialized coding models, which could disrupt the market for dedicated developer tools.

## What This Means for You

If you're a developer, the extended API context window opens new possibilities for agentic workflows. If you're a business user, the improved reasoning makes Claude 4 one of the most reliable AI assistants available today.`,
    date: 'Mar 15, 2026',
    isoDate: '2026-03-15',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'anthropic-raises-3b-funding',
    tag: 'Anthropic',
    headline: 'Anthropic Raises $3B in New Funding Round',
    excerpt: "The AI safety company secures fresh capital to accelerate model research.",
    body: `Anthropic has closed a $3 billion funding round, bringing its total valuation to over $40 billion. The round was led by a consortium of institutional investors, with participation from several sovereign wealth funds.

## How the Capital Will Be Used

According to Anthropic's announcement, the majority of funds will go toward compute infrastructure — specifically, building out dedicated training clusters that reduce dependence on third-party cloud providers.

A smaller portion is earmarked for safety research, including interpretability work and new evaluation frameworks for frontier models.

## What It Means for Competition

The raise signals that the AI arms race is far from over. With OpenAI, Google DeepMind, and xAI all flush with capital, Anthropic is ensuring it remains competitive in model development while maintaining its safety-first positioning.`,
    date: 'Mar 12, 2026',
    isoDate: '2026-03-12',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },
  {
    slug: 'constitutional-ai-approach',
    tag: 'Anthropic',
    headline: "Inside Anthropic's Constitutional AI Approach",
    excerpt: 'How the company trains models to follow a set of principles rather than just human feedback.',
    body: `Constitutional AI (CAI) is Anthropic's framework for training language models to be helpful, harmless, and honest — without relying solely on human labellers to flag every problematic output.

## How It Works

Rather than training exclusively on human preferences, CAI uses a set of written principles — a "constitution" — that the model uses to critique and revise its own outputs during training. This creates a self-correction loop that scales better than pure RLHF.

## The Evolution of the Constitution

Anthropic has refined its constitution significantly since the original 2022 paper. The latest version incorporates principles drawn from the UN Declaration of Human Rights, existing AI safety research, and empirical testing on where previous model versions failed.

## Limitations and Criticisms

Critics argue that the constitution itself reflects the values of its authors, and that no written document can anticipate every edge case. Anthropic acknowledges this, framing CAI as one layer in a broader safety stack rather than a complete solution.`,
    date: 'Mar 10, 2026',
    isoDate: '2026-03-10',
    author: 'Mohamed Diab',
    readingTime: '5 min read',
  },
  {
    slug: 'claude-memory-feature-explained',
    tag: 'Anthropic',
    headline: "Claude's New Memory Feature Explained",
    excerpt: 'Anthropic rolls out persistent memory for Claude, letting it recall context across sessions.',
    body: `Anthropic has begun rolling out persistent memory for Claude users on Pro and Team plans. The feature allows Claude to remember facts, preferences, and prior conversation context across separate chat sessions.

## How Memory Works

Memory in Claude is not stored as raw conversation logs. Instead, Claude extracts and stores structured facts — for example, "User prefers concise answers" or "User is building a React app using Vite." These facts are surfaced at the start of new sessions.

## Privacy Controls

Users have full visibility into what Claude has remembered, with the ability to delete individual memories or wipe the entire memory store from the settings panel.

## Early User Reactions

Early access users have reported the feature significantly reduces repetitive context-setting at the start of sessions, particularly for ongoing projects.`,
    date: 'Mar 13, 2026',
    isoDate: '2026-03-13',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },

  // ── OPENAI ────────────────────────────────────────────────
  {
    slug: 'gpt5-extended-reasoning',
    tag: 'OpenAI',
    headline: 'GPT-5 Launches With Extended Reasoning Mode',
    excerpt: 'OpenAI unveils its most capable model yet, featuring a new reasoning chain visible to users.',
    body: `OpenAI has officially launched GPT-5, its most capable model to date. The headline feature is Extended Reasoning Mode — a chain-of-thought process that is visible to users in real time, offering transparency into how the model arrives at its answers.

## Extended Reasoning in Practice

In testing, Extended Reasoning Mode performs notably better on multi-step math, complex code debugging, and tasks that require holding many constraints simultaneously. The visible reasoning chain also allows users to spot errors mid-process and redirect the model.

## API Availability

GPT-5 is available via the OpenAI API at launch, with Extended Reasoning Mode priced as a premium tier. Standard GPT-5 access is included in existing ChatGPT Plus subscriptions.

## How It Compares

Early benchmarks place GPT-5 ahead of Claude 4 on coding tasks and slightly behind on long-context retrieval. Both models represent a step-change from their predecessors.`,
    date: 'Mar 15, 2026',
    isoDate: '2026-03-15',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'sora-2-4k-scenes',
    tag: 'OpenAI',
    headline: 'Sora 2.0 Generates Full 4K Scenes in Seconds',
    excerpt: "OpenAI's video model receives a major upgrade with cinematic quality and longer durations.",
    body: `Sora 2.0 is a significant upgrade to OpenAI's text-to-video model, now generating 4K video clips up to 60 seconds in length — a dramatic increase from the original 1080p, 20-second limit.

## New Capabilities

Beyond resolution improvements, Sora 2.0 introduces scene consistency across multiple generated clips, enabling users to build multi-shot sequences that maintain character appearance and environmental coherence.

## Creative Industry Response

Early access has been granted to a cohort of filmmakers and creative studios. Several have published sample work online, with reactions ranging from admiration for the technical quality to concern about the implications for entry-level production roles.

## Pricing

Sora 2.0 is currently in limited access through the ChatGPT interface and is expected to enter general availability via API later this quarter.`,
    date: 'Mar 13, 2026',
    isoDate: '2026-03-13',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },
  {
    slug: 'openai-us-government-deal',
    tag: 'OpenAI',
    headline: 'OpenAI Signs Historic Deal With US Government',
    excerpt: "A new partnership will see GPT technology used across federal agencies.",
    body: `OpenAI and the US federal government have signed a multi-year procurement agreement that will make GPT-based tools available across a range of civilian agencies. The deal is one of the largest AI government contracts ever disclosed.

## Scope of the Agreement

Initial deployments will focus on document summarization, citizen services automation, and internal knowledge retrieval. Defense-adjacent use cases are explicitly excluded from this agreement.

## Data Privacy Provisions

A dedicated government API instance will be used, with data processing confined to US-based infrastructure and subject to FedRAMP compliance standards.

## Political Context

The deal arrives amid ongoing congressional debate about AI regulation. Critics have argued that deploying AI at scale in government should come after, not before, comprehensive governance frameworks are in place.`,
    date: 'Mar 11, 2026',
    isoDate: '2026-03-11',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'chatgpt-500-million-users',
    tag: 'OpenAI',
    headline: 'ChatGPT Hits 500 Million Weekly Active Users',
    excerpt: "OpenAI's flagship product continues its record-breaking growth trajectory.",
    body: `ChatGPT has reached 500 million weekly active users, OpenAI confirmed in a company blog post. The milestone represents a doubling of the figure reported just twelve months ago.

## Growth Drivers

The acceleration has been attributed to international expansion, the launch of ChatGPT in education tiers with institutional pricing, and the growing popularity of the mobile app, which now accounts for 55% of sessions.

## Enterprise Momentum

The ChatGPT Enterprise tier — which offers private deployments, custom instructions at scale, and admin controls — has grown to over 50,000 business customers, up from 10,000 at its launch.

## What Comes Next

OpenAI's CEO has signalled that the next major product milestone will be an "agentic" tier of ChatGPT that can autonomously execute multi-step tasks on behalf of users.`,
    date: 'Mar 8, 2026',
    isoDate: '2026-03-08',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },

  // ── GOOGLE AI ─────────────────────────────────────────────
  {
    slug: 'gemini-2-realtime-video',
    tag: 'Google AI',
    headline: 'Gemini 2.0 Gets Real-Time Video Understanding',
    excerpt: "Google expands Gemini's multimodal capabilities with live video stream analysis.",
    body: `Google has updated Gemini 2.0 with real-time video understanding, allowing the model to analyze live video streams rather than only pre-recorded clips. The feature is available through the Gemini API and in Google AI Studio.

## Technical Details

The implementation uses a frame-sampling approach that balances latency with comprehension quality. At standard settings, Gemini processes approximately 2 frames per second, sufficient for tasks like meeting transcription, live sports analysis, or accessibility assistance.

## Use Cases in Preview

Google demonstrated several use cases at its developer briefing: automatic sports commentary generation, real-time sign language interpretation, and live monitoring of manufacturing assembly lines for defect detection.

## Pricing and Availability

Real-time video understanding is available in the Gemini 2.0 Flash tier at no additional cost during the preview period, with pricing to be confirmed at general availability.`,
    date: 'Mar 14, 2026',
    isoDate: '2026-03-14',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'deepmind-alphafold-rna',
    tag: 'Google AI',
    headline: "DeepMind's New AlphaFold Update Covers RNA",
    excerpt: 'The protein-folding AI expands its scope to RNA structures, opening new biological frontiers.',
    body: `DeepMind has released a major update to AlphaFold that extends its structure prediction capabilities to RNA molecules. The original AlphaFold model was trained almost exclusively on protein structures; this update addresses a long-standing gap in the tool's biological coverage.

## Why RNA Matters

RNA plays a central role in gene expression, and many diseases — including certain cancers and viral infections — are driven by RNA dysfunction. Accurate RNA structure prediction could accelerate drug discovery in these areas substantially.

## Accuracy Benchmarks

In head-to-head comparisons against existing RNA structure prediction tools, the updated AlphaFold outperformed competitors on 80% of benchmark structures, according to DeepMind's internal testing.

## Access

The updated model is freely available to academic researchers through the AlphaFold Server, with commercial API access available via Google Cloud.`,
    date: 'Mar 14, 2026',
    isoDate: '2026-03-14',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'google-labs-ai-notebook',
    tag: 'Google AI',
    headline: 'Google Labs Launches AI Notebook for Researchers',
    excerpt: 'A new product from Google Labs brings AI-powered literature search to academics.',
    body: `Google Labs has launched AI Research Notebook, a product designed specifically for academic researchers that combines AI-powered literature search with a structured note-taking environment.

## Key Features

The tool ingests research papers from Google Scholar, arXiv, and institutional repositories, then surfaces conceptually related work as users write notes and draft papers. Citations are generated automatically in APA, MLA, and Chicago formats.

## AI Summarization

Each paper in a user's library can be summarized at three levels of depth: abstract-equivalent, section-by-section, or full critical analysis. The critical analysis mode identifies methodological limitations, which researchers have described as particularly useful.

## Availability

AI Research Notebook is available for free to any Google account holder with a .edu or institutional email address. A general public version is expected later in 2026.`,
    date: 'Mar 11, 2026',
    isoDate: '2026-03-11',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },
  {
    slug: 'gemini-api-free-tier',
    tag: 'Google AI',
    headline: 'Gemini API Now Free for 10M Tokens Per Month',
    excerpt: 'Google increases the free tier dramatically, aiming to attract developers at scale.',
    body: `Google has increased the free tier for the Gemini API to 10 million tokens per month, a tenfold increase from the previous 1 million token limit. The change takes effect immediately for all existing API keys.

## Strategic Context

The move is widely read as a competitive response to OpenAI's recent pricing adjustments and Anthropic's generous free tier for Claude. Google appears to be prioritizing developer adoption over near-term API revenue.

## Rate Limits

The free tier operates at reduced rate limits: 60 requests per minute, compared to 1,000 per minute on paid plans. For prototyping and small-scale applications, the free tier is now broadly sufficient.

## What Developers Are Saying

Responses in developer communities have been positive. Several teams have announced they are migrating prototype applications from paid tiers of competing models to the Gemini free tier to reduce costs during early development.`,
    date: 'Mar 9, 2026',
    isoDate: '2026-03-09',
    author: 'Mohamed Diab',
    readingTime: '3 min read',
  },

  // ── TOOLS & APPS ──────────────────────────────────────────
  {
    slug: 'cursor-voice-commands',
    tag: 'Tools & Apps',
    headline: 'Cursor AI Editor Now Supports Voice Commands',
    excerpt: 'The popular AI coding tool introduces hands-free mode powered by Whisper.',
    body: `Cursor, the AI-powered code editor, has released a voice command mode in its latest update. Powered by OpenAI's Whisper model, the feature allows developers to dictate code, give refactoring instructions, and navigate their codebase without touching the keyboard.

## How It Works

Voice mode is activated with a configurable hotkey. Once active, Cursor streams audio through Whisper for transcription, then passes the transcribed text to its underlying model (users can choose between GPT-4 and Claude). The result is applied as an edit or a chat response depending on context.

## Accuracy in Practice

Early users report transcription accuracy is high for technical vocabulary, including function names, library names, and programming terminology, though punctuation and special characters occasionally require manual correction.

## Accessibility Implications

The feature has been particularly welcomed by developers with repetitive strain injuries, who have described it as a genuine quality-of-life improvement for extended coding sessions.`,
    date: 'Mar 15, 2026',
    isoDate: '2026-03-15',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'ai-tools-replaced-teams-2026',
    tag: 'Tools & Apps',
    headline: '10 AI Tools That Replaced Whole Teams in 2026',
    excerpt: 'A roundup of the most impactful productivity tools transforming how companies operate.',
    body: `The pace of AI tooling adoption has accelerated dramatically in 2026. Several categories of software that previously required teams of specialists can now be handled by a single person equipped with the right AI tools.

## 1. Legal Document Review

Tools like Harvey and Ironclad AI have reduced the time required for standard contract review by 80%, allowing small legal teams to process volumes previously requiring large outside counsel engagements.

## 2. Financial Reporting

AI-assisted FP&A tools can now generate full quarterly reports from raw ERP data with minimal human input, compressing a process that previously took finance teams two weeks into a single afternoon.

## 3. Customer Support

Several mid-market SaaS companies have publicly disclosed reducing support headcount by 50–70% after deploying LLM-based support agents that handle tier-1 and tier-2 queries autonomously.

## 4. Content Production

Marketing teams that previously employed five to eight content producers are now operating with two, supplemented by AI tools for drafting, SEO optimization, and image generation.

## The Broader Picture

These shifts are concentrated in knowledge work that involves processing, classifying, and generating text and structured data. Physical and interpersonal roles remain largely unaffected.`,
    date: 'Mar 12, 2026',
    isoDate: '2026-03-12',
    author: 'Mohamed Diab',
    readingTime: '6 min read',
  },
  {
    slug: 'perplexity-vs-searchgpt',
    tag: 'Tools & Apps',
    headline: 'Perplexity vs. SearchGPT: A Full Comparison',
    excerpt: 'We pit the two leading AI search products against each other in 12 real-world tests.',
    body: `AI-powered search has matured significantly in the past year. Perplexity AI and SearchGPT — OpenAI's native search product — are now the two dominant players. We tested both across 12 categories to determine which serves different use cases better.

## Methodology

Each tool was tested with identical queries across: factual lookups, academic research, product comparisons, current events, code documentation, local search, travel planning, and more. Results were scored on accuracy, citation quality, and response clarity.

## Where Perplexity Wins

Perplexity outperformed on academic and technical queries, with deeper citation coverage and better handling of nuanced follow-up questions. Its Pro tier with Claude integration was notably stronger than its base tier.

## Where SearchGPT Wins

SearchGPT produced more natural conversational responses and handled current events more reliably, benefiting from OpenAI's direct integration with Bing's index. Local search results were also more accurate.

## Overall Verdict

For research-heavy workflows: Perplexity. For general daily use and current events: SearchGPT. Neither is definitively better across all use cases.`,
    date: 'Mar 10, 2026',
    isoDate: '2026-03-10',
    author: 'Mohamed Diab',
    readingTime: '7 min read',
  },

  // ── POLICY & ETHICS ───────────────────────────────────────
  {
    slug: 'eu-ai-act-enforcement',
    tag: 'Policy & Ethics',
    headline: 'EU AI Act Enforcement Begins: What Changes Now',
    excerpt: 'The landmark regulation officially enters enforcement phase, with billions in potential fines.',
    body: `The European Union's AI Act has entered its enforcement phase, meaning companies operating in EU markets must now comply with its provisions or face fines of up to €35 million or 7% of global annual revenue — whichever is higher.

## What's Now Mandatory

High-risk AI systems — including those used in hiring, credit scoring, biometric identification, and critical infrastructure — must register in the EU's new AI database, provide technical documentation, and implement human oversight mechanisms.

## General Purpose AI Rules

Large AI models with significant systemic risk (defined as those trained with over 10^25 FLOPs) face additional transparency requirements, including publishing training data summaries and red-team testing results.

## Early Enforcement Actions

Three companies have already received preliminary notices from national supervisory authorities. While none have resulted in fines yet, legal experts expect the first formal penalty to be issued before the end of Q2 2026.

## What It Means for Non-EU Companies

Any AI system made available to users in the EU is subject to the Act, regardless of where the company is headquartered. US-based AI providers have been actively updating their compliance postures in anticipation of enforcement.`,
    date: 'Mar 15, 2026',
    isoDate: '2026-03-15',
    author: 'Mohamed Diab',
    readingTime: '5 min read',
  },
  {
    slug: 'ai-training-data-transparency',
    tag: 'Policy & Ethics',
    headline: 'Should AI Models Disclose Their Training Data?',
    excerpt: 'A growing coalition of researchers argues for mandatory training data transparency.',
    body: `A coalition of over 400 researchers has published an open letter calling for mandatory disclosure of training datasets used in commercial AI systems. The letter argues that without transparency, it is impossible to properly audit AI systems for bias, copyright infringement, or safety risks.

## The Core Argument

The researchers contend that training data disclosure is a prerequisite for meaningful AI accountability. Without knowing what data a model was trained on, external auditors cannot verify the claims companies make about their models' capabilities or limitations.

## Industry Opposition

Major AI labs have pushed back, citing competitive sensitivity and the practical impossibility of enumerating the full scope of web-scraped training corpora. Several have proposed alternative transparency mechanisms — such as independent audits — as a compromise.

## Regulatory Momentum

The letter has been cited in hearings before both the EU Parliament and the US Senate. Legal scholars note that the EU AI Act's existing provisions on training data transparency for general-purpose models may serve as a model for broader legislation.`,
    date: 'Mar 13, 2026',
    isoDate: '2026-03-13',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
  {
    slug: 'china-ai-governance-framework',
    tag: 'Policy & Ethics',
    headline: 'China Unveils New AI Governance Framework',
    excerpt: "Beijing's latest rules set strict requirements for generative AI providers operating domestically.",
    body: `China's Cyberspace Administration has published its latest AI governance framework, the most comprehensive update to domestic AI regulation since the 2023 Generative AI Interim Measures.

## Key New Requirements

Providers of generative AI services to Chinese users must now obtain certification from an approved testing body before deployment. Models must be capable of filtering content deemed inconsistent with "socialist core values," and providers must maintain detailed user interaction logs for a minimum of six months.

## Impact on International Providers

The rules effectively create a distinct compliance regime that makes it difficult for international AI providers to offer standard models in China without significant localization. Several US providers have quietly wound down or never launched Chinese operations as a result.

## Comparison With EU Approach

While both the EU AI Act and China's framework address AI risk and transparency, their underlying goals diverge significantly. The EU framework prioritizes fundamental rights; China's prioritizes content control and national security.`,
    date: 'Mar 11, 2026',
    isoDate: '2026-03-11',
    author: 'Mohamed Diab',
    readingTime: '4 min read',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns all unique category tags */
export function getAllCategories(): string[] {
  return [...new Set(articles.map((a) => a.tag))];
}

/** Returns articles filtered by tag */
export function getArticlesByCategory(tag: string): Article[] {
  return articles.filter((a) => a.tag === tag);
}

/** Returns a single article by slug */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Returns the 3 most recent articles (for Latest section) */
export function getLatestArticles(count = 3): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, count);
}

/** Returns category slug used in URLs — lowercased, spaces replaced */
export function categoryToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

/** Returns tag colour CSS variable name */
export function tagColor(tag: string): string {
  const map: Record<string, string> = {
    'Anthropic':       'var(--tag-anthropic)',
    'Google AI':       'var(--tag-google)',
    'OpenAI':          'var(--tag-openai)',
    'Meta AI':         'var(--tag-meta)',
    'Tools & Apps':    'var(--tag-tools)',
    'Policy & Ethics': 'var(--tag-policy)',
  };
  return map[tag] ?? 'var(--tag-default)';
}
