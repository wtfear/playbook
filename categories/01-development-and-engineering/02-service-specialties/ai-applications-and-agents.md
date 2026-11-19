---
title: "Specialty: AI Applications and Agents"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/ai-assisted-development.md"
  - "../04-engineering-standards/security-and-privacy-engineering.md"
  - "../04-engineering-standards/performance-and-capacity.md"
---

# Specialty: AI Applications and Agents

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to client engagements and internal projects involving generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), vector embeddings, or autonomous agents executing tool workflows. *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Prompt Injection Defense & Guardrails:** All untrusted user inputs fed into LLM prompts or RAG retrieval contexts must pass input sanitization and delimiter fencing to prevent prompt injection and unauthorized jailbreaking.
- **Strict Sandboxed Tool Permissions:** Autonomous agents with tool-calling capabilities must operate under least-privilege permissions. Dangerous operations (deleting records, executing financial transactions, sending broadcast emails) must require explicit **human approval steps** (Human-in-the-Loop / HITL).
- **Model Vendor Data Retention Verification:** Commercial client applications must exclusively use enterprise/API model agreements that guarantee zero training on customer data and defined data retention windows (e.g., OpenAI zero-data-retention endpoints).
- **Automated Evals for Non-Deterministic Output:** Projects must maintain ground-truth evaluation datasets (evals) run automatically in CI to benchmark hallucination rates, retrieval recall, and response accuracy before deployments.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Model Deprecation & Version Pinning:** Always pin exact model snapshot versions (e.g., `gpt-4o-2024-08-06` rather than floating aliases like `gpt-4o`) to insulate the client from unexpected upstream model deprecation, behavioral drift, or output degradation.
- **Hallucination Handling & Fallbacks:** Structure prompts to return structured JSON schemas (e.g., function calling / tool calling) with explicit fallback instructions to answer "I do not know" when context is insufficient.
- **Testing Non-Deterministic Output:** Use probabilistic assertions, semantic similarity distance, and deterministic mock LLM responses in standard unit test suites.
- **Cost & Token Monitoring:** Track token consumption per user and request to prevent cost spikes ([`../04-engineering-standards/performance-and-capacity.md`](../04-engineering-standards/performance-and-capacity.md)).

---

## 4. Common Failure Modes
- **Autonomous Runaway Loops:** An agent entering an infinite recursive tool-calling loop, consuming thousands of dollars in API credits within minutes.
- **Accidental PII Ingestion:** Feeding unmasked customer personal information into external model endpoints without client consent or statutory data processing agreements.
- **Silent Behavioral Drift:** Relying on unpinned model endpoints that get updated upstream by the vendor, silently breaking application output formatting.
- **Hallucinated Actions:** An agent confidently executing an erroneous database deletion because a prompt lacked verification guardrails.

---

## 5. Evidence that it's done (Checklist)
- [ ] Evaluation suite (evals) established with quantitative accuracy/hallucination metrics.
- [ ] Tool permissions scoped to least privilege with human confirmation required for high-risk actions.
- [ ] Model vendor zero-retention / privacy policy documented in client architecture package.
- [ ] Input delimiters and system prompt injection guards verified by automated adversarial tests.
- [ ] Token rate limiting and budget alerts active in production monitoring.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): AI Risk Assessment.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Communicates the non-deterministic nature of AI systems to clients upfront, establishing realistic accuracy expectations and ongoing token billing arrangements.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews model provider Terms of Service, copyright liabilities, and data privacy compliance (GDPR/DPDP).
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Sets hard token budget limits on client and agency LLM accounts.

---

## 8. Open Decisions
- What default evaluation framework (e.g., DeepEval, Ragas, promptfoo) should be standardized across agency AI projects?
- What is our default human-approval mechanism for autonomous agents (Slack interactive buttons vs. in-app modal)?
