---
title: "Standard: LLMOps and Model Governance"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../02-service-specialties/ai-applications-and-agents.md"
  - "./rag-and-retrieval-systems.md"
  - "./security-and-privacy-engineering.md"
  - "../../../research/rn-01-owasp-llm-top-10.md"
  - "../../../research/rn-01-nist-ai-rmf-governance.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: LLMOps and Model Governance

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** All production applications, agents, APIs, and background automations that call commercial or open-source Large Language Models (LLMs) at runtime.
- **What Does NOT Apply:** Local IDE coding assistants used by human engineers during internal development (governed by `ai-assisted-development.md`).

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate technical areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **Prompt Engineering & Version Control:** Managing prompt templates as version-controlled code artifacts rather than hardcoded runtime strings, with parameterization, template regression tests, and audit trails.
- [ ] **Model Gateway & Unified Proxy:** Abstracting external model API providers through a unified gateway layer (candidate examples: LiteLLM, Portkey, Langfuse) to enable automated provider fallbacks, unified rate limiting, and centralized token logging.
- [ ] **Token Spend Tracking & Cost Ceilings:** Tracking real-time token consumption per tenant, user, or workflow, with hard budget ceilings to prevent runaway billing from infinite agent loops.
- [ ] **Latency Optimization & Streaming:** Implementing chunked streaming responses (via Server-Sent Events) to minimize Time to First Token (TTFT) for interactive user-facing applications.
- [ ] **Input & Output Guardrails:** Implementing lightweight safety filters (candidate tools: Guardrails AI, NeMo Guardrails, Llama Guard) to intercept prompt injection attempts and sanitize sensitive outputs.
- [ ] **Privacy-Preserving Telemetry & Prompt Logging:** Capturing execution traces, latency, and token counts without logging raw customer PII or proprietary trade secrets to third-party monitoring platforms.
- [ ] **Multi-Provider Fallback Resilience:** Gracefully catching upstream provider outages (e.g., OpenAI 5xx errors or rate-limit exhaustion) and automatically falling back to secondary providers (e.g., Anthropic Claude, Google Gemini, or self-hosted open models).

---

## 3. Should (Recommended Practice & Judgment)

- What is the most cost-effective and operationally lightweight model proxy layer for a 1–3 person agency managing multiple client AI apps?
- How should commercial API key billing be managed: should clients supply their own OpenAI/Anthropic organizational API keys, or does the agency re-bill with a margin?
- What standardized dataset of adversarial prompts should be run in CI to verify prompt injection resilience before deploying new agent features?

---

## 4. Common Failure Modes

- **Unbounded Agent Loops:** An autonomous agent triggering repeated tool calls in an unresolved loop, running up hundreds of dollars in API tokens in minutes.
- **Upstream Provider Rate Limit Halts:** Relying on a single model provider without fallback routing, resulting in total application outages during provider degradation.
- **PII Leakage to Third-Party Logging:** Sending unmasked customer credit cards, emails, or medical data to external APM platforms via unredacted prompt logging.

---

## 5. Evidence That It's Done

- [ ] Hard token spend limit and rate limiting verified by automated load test.
- [ ] Automated provider fallback test proving secondary model takes over seamlessly when primary provider returns HTTP 503.
- [ ] Telemetry logs audited to confirm zero customer PII is persisted in raw prompt traces.

---

## 6. Template

- `None yet`

---

## 7. Boundaries & Handoffs

- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Establishes hard spending limits and client invoicing procedures for model token usage.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews model provider Terms of Service, data retention policies (zero-data-retention agreements), and liability for AI-generated outputs.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Communicates variable inference pricing and token budget assumptions in client proposals.
- **Development & Engineering:** Implements model gateways, configures fallback routing, manages prompt versions, and tunes latency.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q01`: Default technology stack for AI and backend services.
  - `ENG-Q06`: AI coding governance and commercial provider data privacy.
- **Related Documents:**
  - [`../02-service-specialties/ai-applications-and-agents.md`](../02-service-specialties/ai-applications-and-agents.md): AI applications and agents.
  - [`./rag-and-retrieval-systems.md`](./rag-and-retrieval-systems.md): Retrieval-augmented generation standards.
- **Candidate Evidence (candidate example, not a decision):**
  - OWASP GenAI Security Project: *OWASP Top 10 for Large Language Model Applications* (LLM01 Prompt Injection, LLM10 Unbounded Consumption).
  - NIST: *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (NIST AI 100-1).
