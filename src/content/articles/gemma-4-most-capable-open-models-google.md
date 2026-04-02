---
tag: Google AI
tags:
  - Google AI
  - Vertex AI
  - Open Source
  - AI Models
  - Machine Learning
headline: "Gemma 4: Byte for Byte, the Most Capable Open Models Google Has Ever Built"
excerpt: >-
  Google has released Gemma 4, its most capable open model family yet — four sizes from edge-optimized 2B to a 31B dense model, all under Apache 2.0 and built on the same research that powers Gemini 3.
date: 'Apr 3, 2026'
isoDate: '2026-04-03T00:45:00+02:00'
modifiedDate: '2026-04-03'
author: Daily AI Mail Editorial Staff
authorUrl: 'https://dailyaimail.news/about-us/editorial-team'
readingTime: 4 min read
image: /images/gemma-4-most-capable-open-models-google.png
imageWidth: 1200
imageHeight: 675
imageCaption: >-
  Google releases Gemma 4 in four sizes — E2B, E4B, 26B MoE, and 31B Dense — under an Apache 2.0 license, making frontier-class AI accessible on everything from phones to workstations.
keywords:
  - Gemma 4 release
  - Google open source AI models
  - Gemma 4 Apache 2.0
  - Google AI open models 2026
  - Gemma 4 benchmark performance
  - Vertex AI Gemma
articleSection:
  - Technology
  - Artificial Intelligence
mentions:
  - Clément Delangue
about:
  - name: Google
    url: 'https://deepmind.google'
    type: Organization
  - name: Gemma 4
    url: 'https://ai.google.dev/gemma'
    type: SoftwareApplication
  - name: Vertex AI
    url: 'https://cloud.google.com/vertex-ai'
    type: SoftwareApplication
  - name: Hugging Face
    url: 'https://huggingface.co'
    type: Organization
citations:
  - name: 'Google: Gemma 4 announcement'
    url: 'https://blog.google/technology/developers/gemma-4/'
    type: CreativeWork
  - name: 'Google AI Studio'
    url: 'https://aistudio.google.com'
    type: CreativeWork
relatedArticles: []
---

Google has launched Gemma 4, its most capable family of open models to date — and the first to be released under a fully permissive Apache 2.0 license. Built on the same research and architecture that underpins Gemini 3, the new family spans four sizes designed to run everywhere from Android phones and Raspberry Pi boards to developer workstations and cloud TPUs.

The launch comes as the Gemma ecosystem has crossed 400 million developer downloads and produced over 100,000 community variants — a scale that makes this release as much a platform moment as a model drop.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/jZVBoFOJK-Q"
    title="What's new with Gemma 4"
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

## Four Sizes, One Family

Gemma 4 arrives in four distinct configurations, each targeting a specific hardware tier:

The **31B Dense** model currently ranks third among all open models on the Arena AI text leaderboard, while the **26B Mixture of Experts (MoE)** holds the sixth spot — with both outperforming models twenty times their parameter count. The MoE variant activates only 3.8 billion parameters during inference, delivering high token throughput with low latency, while the 31B Dense is optimized for raw output quality and fine-tuning workloads. Both fit on a single 80GB NVIDIA H100 unquantized, with quantized versions available for consumer GPUs.

At the edge, the **E2B and E4B models** were engineered from the ground up for on-device deployment. Developed in close collaboration with Google's Pixel team, Qualcomm Technologies, and MediaTek, they run fully offline on Android devices, Raspberry Pi, and NVIDIA Jetson Orin Nano hardware — with near-zero latency and minimal battery draw. Android developers can already explore agentic flows today through the [AICore Developer Preview](https://developer.android.com/ml/aicore).

## What's Actually New Under the Hood

Beyond size, Gemma 4 introduces a set of capabilities that move the family beyond conversational chat into genuine agentic utility:

**Advanced reasoning** — significant benchmark improvements in multi-step math, planning, and instruction-following tasks that require chained logic.

**Native agentic support** — function-calling, structured JSON output, and native system instruction handling are built in, enabling reliable tool-use and API-connected workflows without workarounds.

**Multimodal input across the entire family** — all four models process images and video natively, with strong performance on visual tasks including OCR and chart comprehension. The edge models additionally support audio input for speech recognition.

**Longer context windows** — 128K tokens for the edge models; up to 256K for the 26B and 31B, making it practical to pass full codebases or long documents in a single prompt.

**140+ languages** — trained natively on over 140 languages, with direct implications for developers building for Arabic, Southeast Asian, and other underserved markets.

## Apache 2.0: The License Change That Matters

Previous Gemma releases carried a custom license that created friction for commercial use. Gemma 4 ships under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0), removing restrictions on commercial deployment, redistribution, and derivative works. Hugging Face co-founder and CEO Clément Delangue called the change "a huge milestone," with the platform supporting all Gemma 4 variants on day one.

## Where to Run It

Google has made Gemma 4 available across a wide range of surfaces from day one:

- **[Google AI Studio](https://aistudio.google.com)** — 31B and 26B MoE models, accessible immediately in the browser with no setup
- **[Google AI Edge Gallery](https://ai.google.dev/edge/gallery)** — E4B and E2B for on-device testing
- **[Vertex AI](https://cloud.google.com/vertex-ai)** — production deployment with full compliance guarantees, TPU-accelerated serving, and Sovereign Cloud options
- **[Hugging Face](https://huggingface.co/google)** — model weights with day-one support across Transformers, TRL, Transformers.js, and Candle
- **[Kaggle](https://www.kaggle.com/models/google/gemma)** and **[Ollama](https://ollama.com)** — for direct download and local experimentation
- Fine-tuning is supported on Google Colab, Vertex AI, and consumer GPUs via Unsloth, LM Studio, and MLX

For developers who want to apply the model toward social impact use cases, Google has also opened the [Gemma 4 Good Challenge on Kaggle](https://www.kaggle.com/competitions/gemma-4-good-challenge).

## The Bigger Picture

Gemma 4's release positions Google with a credible answer to Meta's Llama series at every hardware tier — with the critical addition of on-device audio and video capabilities that Llama currently lacks. For developers building on [Vertex AI](https://cloud.google.com/vertex-ai) or targeting Arabic-language and multilingual applications, the 140-language coverage and Apache 2.0 licensing lower the barrier to production deployment considerably.

The real test will be in fine-tuning results. Google's own examples — including a Bulgarian-first language model built by INSAIT and cancer pathway research from Yale — suggest the architecture responds well to domain adaptation. Whether the broader developer community reaches the same conclusion will determine how much of the 400-million-download momentum carries forward into the Gemma 4 generation.