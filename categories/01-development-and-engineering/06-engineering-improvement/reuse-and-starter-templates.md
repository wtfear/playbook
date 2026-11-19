---
title: "Improvement: Reuse and Starter Templates"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./technical-debt-management.md"
  - "../03-delivery-lifecycle/06-project-engineering-setup.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Improvement: Reuse and Starter Templates

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to new project initialization, technology evaluation, recurring feature implementations, and the ongoing curation of agency-owned boilerplate templates, component libraries, and workflow automations.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Intellectual Property (IP) Isolation:** Never copy client-owned proprietary business logic, schemas, branding, or credentials into internal starter repositories or shared packages.
- **Security Baseline in All Starters:** Starter templates must come pre-configured with secure defaults: automated secret scanning (Gitleaks), linting, dependency audits, and strict environment variable handling.
- **No Stale Dependencies:** Starter templates must be maintained on an active update cycle; initializing a new project from a starter must never pull obsolete or insecure base packages.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Opinionated Minimal Starters:** Starters should be lightweight and modular (e.g., Next.js + Tailwind + TypeScript + PostgreSQL starter) rather than bloated "everything-including-the-kitchen-sink" monoliths.
- **Extract After Three Uses:** Follow the "Rule of Three" for code extraction. Do not build an abstract shared library for a single project; extract common utilities into internal agency packages only after solving the same problem across 3 distinct projects.
- **Small-Team Simplicity:** Favor Git template repositories and npm/pip packages over complex monorepo tooling unless multi-package version coordination is explicitly required.

---

## 4. Common Failure Modes
- **Client IP Contamination:** Accidentally pushing client code or domain-specific algorithms to an open or agency-wide shared template, violating client confidentiality and NDAs.
- **Starter Template Rot:** Starters remaining unmaintained for 6 months, causing engineers to spend the first sprint updating breaking dependencies rather than delivering client value.
- **Premature Generalization:** Spending billable client hours attempting to turn a one-off feature into a general-purpose agency framework before requirements are proven.

---

## 5. Evidence that it's done (Checklist)
- [ ] Curated, version-controlled starter repositories maintained for primary service offerings (e.g., Web App Starter, API Starter, Automation Starter).
- [ ] Automated dependency updates (Dependabot/Renovate) active on all starter templates.
- [ ] Legal and IP review confirmed for any reusable utility extracted from a client engagement.
- [ ] Developer onboarding documentation tests confirm a new developer can bootstrap a local working instance from a starter in under 15 minutes.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/checklist-template.md`](../../../templates/checklist-template.md): Project Kickoff Verification Checklist.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Reusable components reduce project delivery risk and baseline hours, enabling competitive scoping and predictable margins.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Verifies client contract language preserves agency ownership of pre-existing intellectual property and foundational toolkits.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Budgets internal non-billable development hours dedicated to maintaining and upgrading starter templates.

---

## 8. Open Decisions
- What license (e.g., MIT vs. Private Agency Commercial License) should govern agency internal starter templates?
- How should hours spent maintaining starters be budgeted (e.g., fixed % of operational overhead vs. dedicated internal sprint)?
