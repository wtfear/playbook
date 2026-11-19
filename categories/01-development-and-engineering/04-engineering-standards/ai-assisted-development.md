---
title: "Standard: AI-Assisted Development"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./code-quality-and-review.md"
  - "./security-and-privacy-engineering.md"
  - "../../../ai-contribution-guide.md"
  - "../../13-knowledge-systems-and-automation/README.md"
---

# Standard: AI-Assisted Development

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed guidelines, security guardrails, quality verification gates, and data protection practices for engineering contributors utilizing Artificial Intelligence (AI) coding assistants, code generation tools, and LLM-based developer environments.

> [!WARNING]
> **Proposed Safeguards for Discussion:** The standards in this document represent **proposed technical safeguards** under active evaluation. They do not constitute approved organizational policy until reviewed by agency leadership and legal counsel.

## 2. Proposed Scope
- Sanctioned developer tool configurations (e.g., GitHub Copilot, Cursor, Claude Code, Gemini Code Assist).
- Strict data confidentiality and intellectual property boundaries:
  - Prohibition against inputting client secrets, credentials, API keys, or private customer PII into public LLM prompts.
  - Verification that commercial tool settings enforce zero data-retention for model training.
- Mandatory human-in-the-loop review: all AI-generated code must be read, understood, and validated line-by-line by a human engineer before submitting for peer review.
- Automated verification: requiring unit and integration tests for all AI-generated functions and algorithms.
- Guardrails against common AI coding risks: hallucinated package dependencies, insecure default cryptographic configurations, subtle logic edge cases, and license contamination.
- Documentation standards: noting significant AI-assisted architectural spikes in pull request descriptions.

## 3. Applicability
Applies to all internal engineers and contractors utilizing AI development tools while working on agency codebases or client deliverables.

## 4. Related Documents
- [`../../ai-contribution-guide.md`](../../../ai-contribution-guide.md): Agency-wide AI rules.
- [`./code-quality-and-review.md`](./code-quality-and-review.md): Peer review standards.
- [`./dependencies-and-software-supply-chain.md`](./dependencies-and-software-supply-chain.md): Vetting hallucinated dependencies.
- [`../../13-knowledge-systems-and-automation/README.md`](../../13-knowledge-systems-and-automation/README.md): AI usage governance.

## 5. Questions to Research or Decide
- How do we verify that developers are actively reading and reviewing AI-generated code rather than blindly accepting completions?
- What package-checker tool can automatically detect references to non-existent (hallucinated) third-party packages in PRs?
- What are the contractual and legal disclosure obligations regarding AI usage in client software development agreements?

## 6. Candidate Evidence and Artifacts
- AI Tool Configuration & Privacy Audit Record.
- AI Code Generation Security & Quality Review Checklist.
- Hallucinated Dependency Detection CI Gate.

## 7. Next Action
Draft standard AI Coding Guidelines document and review enterprise data-sharing terms with Legal (Category 12).
