---
tag: "Technology"
tags: ["GitHub", "Microsoft", "Copilot", "AI Training Data", "Developer Tools"]
headline: "GitHub Will Use Your Copilot Interactions as AI Training Data — Here's How to Opt Out"
excerpt: "Microsoft is now collecting GitHub Copilot interactions — including code snippets, comments, and file names — to train its AI models, with an opt-out available but enabled by default."
date: "Mar 25, 2026"
isoDate: "2026-03-25"
modifiedDate: "2026-03-25"
author: "Daily AI Mail Editorial Staff"
authorUrl: "https://dailyaimail.news/about-us/editorial-team"
readingTime: "3 min read"
image: "/images/github-copilot-ai-training-data-opt-out.png"
imageWidth: 1200
imageHeight: 675
imageCaption: "GitHub is now using Copilot interactions to train its AI models by default, with free and paid users equally affected unless they opt out."
keywords: ["GitHub Copilot training data", "GitHub AI opt out", "Microsoft Copilot privacy", "GitHub Copilot data collection", "AI training data policy"]
articleSection: ["Technology", "Artificial Intelligence"]
mentions:
  - name: "GitHub"
    url: "https://github.com"
    type: "Organization"
  - name: "Microsoft"
    url: "https://microsoft.com"
    type: "Organization"
  - name: "Visual Studio Code"
    url: "https://code.visualstudio.com"
    type: "SoftwareApplication"
about:
  - name: "GitHub Copilot"
    url: "https://github.com/features/copilot"
    type: "SoftwareApplication"
citations:
  - name: "GitHub Blog: Copilot AI Training Data Announcement"
    url: "https://github.blog/changelog/copilot-ai-training-data"
    type: "CreativeWork"
  - name: "GitHub Copilot Privacy Settings"
    url: "https://github.com/settings/copilot"
    type: "CreativeWork"
---

Microsoft is turning one of its most widely used developer tools into a new source of AI training data. GitHub announced today that interactions with [GitHub Copilot](https://github.com/features/copilot) will now be collected and used to "train and improve our AI models" — by default, and across both free and paid accounts.

## What Gets Collected

The scope of collection is broad. Any input or output data generated through Copilot is in scope, including code snippets, inline comments and documentation, file names, repository structure, and other contextual information passed through the tool. This applies whether you are using [code completion in Visual Studio Code](https://code.visualstudio.com), asking Copilot questions directly on the GitHub website, or working with any other Copilot-integrated feature.

If you have never used GitHub Copilot, nothing changes. But if you have — even casually — your interactions may now be feeding into Microsoft's model improvement pipeline.

The policy covers Copilot Free, Copilot Pro, and Copilot Pro+ users. Notably, Copilot Business and Copilot Enterprise accounts are excluded, likely reflecting the stricter data handling obligations those tiers carry for organizational customers.

## The Rationale

GitHub was candid about its reasoning. The original Copilot models were built from publicly available data and hand-crafted code samples — a process that drew criticism from parts of the developer community over questions of consent and intellectual property. The company says it has since seen meaningful model improvements by incorporating interaction data from Microsoft employees, and is now extending that approach to its broader user base.

In the [announcement on the GitHub Blog](https://github.blog/changelog/copilot-ai-training-data), the company framed participation as a collective benefit: "By participating, you'll help our models better understand development workflows, deliver more accurate and secure code pattern suggestions, and improve their ability to help you catch potential bugs before they reach production."

## How to Opt Out

Opting out is straightforward. From your GitHub account, navigate to **Settings → Copilot → Privacy**, and locate the "Allow GitHub to use my data for AI model training" toggle. Set it to **Disabled**. If you maintain multiple GitHub accounts, the setting must be changed individually on each one — there is no global toggle across accounts.

The opt-out is available immediately. GitHub has not indicated that it will prompt users proactively or surface the setting during normal Copilot usage, so the default-on nature of the policy means users who want to opt out will need to seek out the setting themselves.