---
title: "Research Note: NIST AI Risk Management Framework (AI RMF 1.0)"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../categories/01-development-and-engineering/README.md"
  - "../categories/01-development-and-engineering/02-service-specialties/ai-applications-and-agents.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/llmops-and-model-governance.md"
  - "../categories/12-legal-security-and-risk-management/README.md"
---

# Research Note: NIST AI Risk Management Framework (AI RMF 1.0)

> [!NOTE]
> A Research Note records external evidence, observations, benchmark sources, and candidate practices. **Informs a decision; not policy.** It does NOT represent approved agency policy or binding operational instructions.

## 1. Objective and Research Questions

How should a small technical agency govern risks, safety, and reliability when building custom AI agents, automated workflows, and LLM applications for clients?
- Question 1: What structured framework exists for identifying and mitigating risks unique to AI systems?
- Question 2: How can NIST's federal AI risk management principles be tailored into a lean agency delivery workflow?

## 2. External Sources and Evidence Examined

- **Source 1:** National Institute of Standards and Technology (NIST) — *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1 (Published January 2023; URL: `nist.gov/itl/ai-risk-management-framework`, accessed Nov 2026).
  - *Summary of findings:* Defines four core operational functions: **GOVERN** (organizational policies and risk culture), **MAP** (context, capability, and hazard identification), **MEASURE** (objective evaluation and benchmark tracking), and **MANAGE** (allocating resources to reduce prioritized risks).
- **Source 2:** NIST — *Generative Artificial Intelligence Profile (NIST AI 600-1)* (Published July 2024; URL: `nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence`, accessed Nov 2026).
  - *Summary of findings:* Focuses on generative risks: hallucination, toxic content, data privacy leakage, and autonomous action hazards.

## 3. Analysis of External Practices

- **The NIST Core Functions for AI Systems:**
  - *GOVERN:* Establishing clear boundaries where autonomous execution is prohibited without human confirmation.
  - *MAP:* Identifying data privacy constraints, prompt injection surfaces, and model dependencies during project intake.
  - *MEASURE:* Establishing reproducible evaluation benchmarks (groundedness, relevance) before deploying agent updates.
  - *MANAGE:* Implementing deterministic guardrails, token spend ceilings, and fallback handlers.

## 4. Evaluation for Our Agency Context

- **Relevance to a 1–3 Person Agency:**
  - Highly actionable: gives the agency an objective structure to explain AI safety to non-technical clients and prevent runaway LLM costs.
- **Trade-offs & Heavyweight Pitfalls:**
  - Avoid 50-page enterprise compliance filings. Distill NIST guidance into a 5-question pre-flight intake checklist and deterministic code-level guardrails.

## 5. Candidate Practices Proposed for Consideration

1. **Pre-Deployment AI Hazard Screening:** Add AI risk questions to intake (e.g., Does the agent execute external financial or data mutations?).
2. **Deterministic Guardrails:** Never permit an autonomous LLM agent to execute irreversible database writes without human confirmation.

## 6. Uncertainties, Risks, and Open Questions

- Client expectations: Clients often ask for "fully autonomous agents" without understanding legal and financial liabilities.

## 7. Recommended Next Steps

- Informs a decision; not policy.
- [x] Link NIST AI RMF in `04-engineering-standards/llmops-and-model-governance.md` and `02-service-specialties/ai-applications-and-agents.md`.
