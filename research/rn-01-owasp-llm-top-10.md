---
title: "Research Note: OWASP Top 10 for Large Language Model Applications"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../categories/01-development-and-engineering/README.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/security-and-privacy-engineering.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/llmops-and-model-governance.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/rag-and-retrieval-systems.md"
---

# Research Note: OWASP Top 10 for Large Language Model Applications

> [!NOTE]
> A Research Note records external evidence, observations, benchmark sources, and candidate practices. **Informs a decision; not policy.** It does NOT represent approved agency policy or binding operational instructions.

## 1. Objective and Research Questions

What are the definitive vulnerability vectors in applications integrating foundation models, and how should a small engineering team defend against them?
- Question 1: What are the consensus security failure modes for LLM applications and autonomous agents?
- Question 2: What defensive engineering patterns mitigate prompt injection and excessive privileges?

## 2. External Sources and Evidence Examined

- **Source 1:** OWASP Foundation — *OWASP Top 10 for Large Language Model Applications* (Published 2025/2026 Editions; URL: `owasp.org/www-project-top-10-for-large-language-model-applications`, accessed Nov 2026).
  - *Summary of findings:* Identifies the ten most critical vulnerabilities in LLM applications, highlighting Prompt Injection (LLM01), Sensitive Information Disclosure (LLM02), Supply Chain Vulnerabilities (LLM03), Excessive Agency (LLM06), Vector Weaknesses (LLM08), and Unbounded Consumption (LLM10).

## 3. Analysis of External Practices

- **Critical Threats for Agency Deliverables:**
  - *LLM01 (Prompt Injection):* Direct user manipulation or indirect injection via poisoned third-party documents/web pages ingested into RAG context.
  - *LLM02 (Sensitive Information Disclosure):* Accidental leakage of client proprietary data, customer PII, or API keys in model outputs.
  - *LLM06 (Excessive Agency):* Granting autonomous agents broad tool access or write permissions without human approval gates.
  - *LLM10 (Unbounded Consumption):* Denial-of-wallet loops exhausting client API credits.

## 4. Evaluation for Our Agency Context

- **Relevance to a 1–3 Person Agency:**
  - Essential: Every client requesting an AI bot or RAG tool must have defenses against prompt injection, token budget exhaustion, and data leakage.
- **Trade-offs & Heavyweight Pitfalls:**
  - Avoid complex enterprise security gateways that add 2+ seconds of latency to every chat response. Use lightweight local schema validation and rate limiting.

## 5. Candidate Practices Proposed for Consideration

1. **Strict Context Window Sanitization:** Strip HTML, script tags, and prompt injection triggers from retrieved documents before passing them to the model.
2. **Hard Rate and Budget Limits:** Place explicit monthly spend caps on API keys to prevent denial-of-wallet incidents.

## 6. Uncertainties, Risks, and Open Questions

- Indirect prompt injection remains an active research challenge with no 100% deterministic solution; client contracts must reflect this limitation.

## 7. Recommended Next Steps

- Informs a decision; not policy.
- [x] Reference OWASP LLM Top 10 in `security-and-privacy-engineering.md` and `llmops-and-model-governance.md`.
