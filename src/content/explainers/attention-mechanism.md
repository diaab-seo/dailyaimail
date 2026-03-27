---
term: "Attention Mechanism"
slug: "attention-mechanism"
category: "architecture"
definition: "Attention is a technique that lets a neural network dynamically weight the relevance of different parts of the input when producing each part of the output."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "large-language-model", "context-window"]
---

## Definition

The attention mechanism allows a model to assign varying importance to different input tokens when computing each output token. Multi-head self-attention runs this process in parallel across multiple learned subspaces, capturing diverse contextual relationships.

## Why It Matters

Attention is what allows transformers to understand long-range dependencies in language — connecting a pronoun at the end of a paragraph to its referent at the beginning.

## How It Works

Each token produces three vectors: Query, Key, and Value. Attention scores are computed as dot products of Queries against all Keys, scaled and softmaxed into weights. The output is a weighted sum of the Value vectors, telling the model which other tokens to "pay attention to."

## Applications

Core to all transformer-based models. Also used in cross-attention layers for multimodal tasks where a model must attend to image patches when generating text.

## Limitations

Quadratic compute complexity with sequence length. Very long documents require architectural modifications (sliding window attention, linear attention variants).

## Related Terms

[Transformer Architecture](/explainers/transformer-architecture) · [Context Window](/explainers/context-window) · [Large Language Model](/explainers/large-language-model)

## Further Reading

- [Attention Is All You Need (original paper)](https://arxiv.org/abs/1706.03762)
