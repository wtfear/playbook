---
title: "Standard: Security and Privacy Engineering"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "./environments-configuration-and-secrets.md"
  - "./dependencies-and-software-supply-chain.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: Security and Privacy Engineering

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies universally across all deliverables: web applications, mobile apps, backend APIs, automation workflows, AI integrations, and cloud infrastructure. Tailored by project risk tier, with heightened rigor for systems handling financial transactions, authentication credentials, or personal identifiable information (PII).

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **OWASP Top 10 Defenses:** Mandatory parameterized queries / ORMs (zero raw SQL string concatenation), context-aware output encoding (XSS prevention), strict server-side authorization checks on every endpoint (preventing IDOR and Broken Access Control), and secure cookie attributes (`HttpOnly`, `Secure`, `SameSite=Lax/Strict`).
- **Cryptographic Baseline:** Enforce TLS 1.3 in transit with HSTS; AES-256 or ChaCha20-Poly1305 at rest for sensitive data; modern password hashing via Argon2id or bcrypt.
- **Dependency Vulnerability & License Audit:** Automated Software Composition Analysis (SCA) active in CI, blocking merges with unpatched High/Critical CVEs or prohibited copyleft licenses.
- **Privacy Implementation (GDPR & DPDP Act):** While Legal sets compliance rules, Development must implement technical controls: consent storage, automated export scripts, and hard deletion/cryptographic erasure routines.
- **Multi-Client Isolation on Shared Tools:** Never store multiple clients' credentials, API tokens, or operational databases in unsegregated environments. Shared development tooling must enforce strict workspace isolation.
- **AI Coding Data Boundary:** Never paste client secrets, API tokens, proprietary client algorithms, or unmasked customer PII into public or commercial AI generation tools.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Lightweight Threat Modeling (STRIDE-lite):** Conduct a 30-minute threat modeling session during Solution Design (Lifecycle 04) to map trust boundaries, data flows, and external attack surfaces before writing code.
- **Small-Team Simplicity:** Favor automated SAST tooling with low false-positive rates (e.g., Semgrep default security rules) and automated dependency patching bots (Dependabot/Renovate).
- **Security Headers by Default:** Configure standard HTTP security headers across all web servers and API gateways: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Scoped Outbound Egress & Allowlisting:** Where network isolation or egress controls are applied to runtime environments, enforce an allowlist/proxy model that explicitly permits documented external endpoints required for agency workloads (such as LLM provider APIs for AI agents, payment gateways, messaging APIs, and approved webhooks) rather than blanket egress lockdowns that break legitimate integrations.
- **Foreign Client Nuance:** When serving international clients across borders, account for data residency requirements and localized privacy mandates early in the architecture phase.

---

## 4. Common Failure Modes
- **Insecure Direct Object References (IDOR):** Relying on client-supplied IDs (e.g., `GET /api/invoices/1234`) without verifying that the authenticated user actually owns that invoice.
- **Cross-Client Contamination on Agency Tools:** Storing API keys or webhooks for Client A in an agency-wide shared Slack or automation account that Client B contractors have access to.
- **AI-Assisted Secret Leakage:** Pasting an `.env` file containing live API keys into a web-based AI chat tool to ask for debugging assistance.
- **Neglected Patching of Transitive Dependencies:** Maintaining direct dependencies but ignoring a known critical remote code execution vulnerability in a deeply nested sub-dependency.

---

## 5. Evidence that it's done (Checklist)
- [ ] Threat model completed as part of the Solution Design artifact.
- [ ] Automated SAST (Semgrep) and SCA (Dependabot) passing in CI with 0 High/Critical findings.
- [ ] Parameterized queries verified across 100% of database interactions.
- [ ] Server-side authorization verified by automated role-based integration tests.
- [ ] Outbound egress connections scoped and verified to allowlisted endpoints (LLM APIs, payment gateways, messaging) where network filtering is active.
- [ ] Data erasure and export endpoints verified against privacy compliance requirements.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.9 Threat Model & Security Posture.

---

## 7. Handoffs & Cross-Category Boundaries
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Legal establishes organizational compliance policies, privacy rules (GDPR / India's DPDP Act), NDA terms, and security incident disclosure rules; Development implements and verifies the technical controls.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Communicates agency security standards and completes vendor security questionnaires during pre-sales.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Schedules external penetration tests and client security sign-offs.

---

## 8. Open Decisions
- What standard automated SAST tool should be integrated into our starter repo CI templates?
- At what commercial deal size or client risk profile is an independent third-party penetration test mandated?
