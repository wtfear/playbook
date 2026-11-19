---
title: "Engineering Applicability and Tailoring Matrix"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./candidate-practices.md"
  - "../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains research and evaluation materials. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


# Engineering Applicability and Tailoring Matrix

## 1. Purpose
Defines a contextual framework for tailoring engineering controls to match project realities. A one-size-fits-all engineering process creates excessive overhead for small prototypes while leaving mission-critical systems vulnerable.

> [!IMPORTANT]
> This framework proposes situational tiers based on qualitative risk factors. It **does not impose arbitrary numeric scoring formulas**. Technical leads evaluate context collaboratively during technical intake and solution design.

---

## 2. Core Project Context Factors

Engineering controls are tailored by evaluating 6 qualitative dimensions:

| Risk Dimension | Low Exposure / Simple | Moderate Exposure / Standard | High Exposure / Critical |
| :--- | :--- | :--- | :--- |
| **Data Sensitivity** | Public marketing content; no user data | Non-sensitive business data; basic user profiles | PII, financial transactions, healthcare data, credentials |
| **Business Impact** | Minor inconvenience if offline; low stakes | Delays internal workflows; temporary productivity loss | Direct revenue loss, severe reputational harm, business shutdown |
| **Integration Complexity** | Standalone; no external dependencies | Standard REST/GraphQL APIs; webhooks | Multi-system sync, legacy databases, real-time message buses |
| **Operational Exposure** | Static pages; internal-only utility | Client-facing portal; moderate concurrency | Publicly exposed web application; high attack surface |
| **Availability Needs** | Best-effort; 9-to-5 recovery acceptable | Standard business hours; hours-to-recover | High availability; minutes-to-recover; zero-downtime releases |
| **Client Obligations** | Basic commercial engagement; no audit | Standard commercial SOW; basic warranty | Strict regulatory mandates (HIPAA, SOC 2, GDPR), enterprise security review |

---

## 3. Engineering Control Tailoring by Project Archetype

| Engineering Domain | Tier 1: Lightweight / Prototype (e.g., Marketing site, exploratory POC) | Tier 2: Standard Commercial (e.g., Internal tool, SaaS MVP, workflow automation) | Tier 3: High-Assurance / Critical (e.g., Fintech integration, public auth, core ERP) |
| :--- | :--- | :--- | :--- |
| **Architecture & Design** | Lightweight architectural sketch in PR/ticket | Structured Solution Architecture Document (SAD) with data model | Full Architecture Decision Records (ADRs), threat model, formal capacity plan |
| **Source Control & Branching** | Simple feature branches; self-merge permitted for solo spikes | Branch protection on `main`; mandatory 1 peer review | Strict branch protection, required CI pass, 2 approvals, signed commits |
| **Secrets & Config** | `.env.example` file; local developer secrets | Centralized secrets manager (e.g., 1Password, Doppler); separate staging | Dedicated cloud secret stores (e.g., AWS Secrets Mgr), ephemeral access, audit logs |
| **Testing & Quality** | Smoke testing; linting; basic automated build check | Unit test suite for business logic; integration smoke tests; automated CI | Comprehensive unit, integration, and E2E test suites; automated regression gates |
| **Accessibility (WCAG)** | Basic semantic HTML check | WCAG 2.2 Level AA automated scanning (axe-core) on key pages | Full WCAG 2.2 Level AA manual keyboard and screen-reader audit |
| **Deployment & Release** | Automated Git-push deploy to PaaS (Vercel, Netlify) | Staging environment verification; automated migration; manual production trigger | Automated blue/green or canary release; migration rollback verification; release sign-off |
| **Observability** | Platform-level error alerts (e.g., Sentry free tier) | Structured application logging, error alerting, uptime monitoring | APM tracing, centralized log aggregation, real-time alert paging with runbooks |
| **Handover & Documentation** | Basic README with setup instructions | Comprehensive architecture doc, environment runbook, API documentation | Formal client training session, infrastructure transfer runbook, security sign-off |

---

## 4. Tailoring Governance and Approval
- **Initial Assessment:** Conducted during Lifecycle Stage 01 (*Technical Intake*) and Stage 05 (*Feasibility & Planning*).
- **Recorded In:** The project's Solution Architecture Document and project repository `README.md`.
- **Downward Tailoring Exceptions:** If a client requests dropping a standard control (e.g., bypassing code review to accelerate release), this constitutes a formal risk waiver governed by [`../01-engineering-governance/exceptions-and-escalation.md`](../../categories/01-development-and-engineering/01-engineering-governance/exceptions-and-escalation.md).
