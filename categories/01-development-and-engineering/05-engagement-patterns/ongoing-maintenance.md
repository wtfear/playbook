---
title: "Pattern: Ongoing Maintenance"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md"
  - "../04-engineering-standards/observability-and-operational-readiness.md"
  - "../06-engineering-improvement/technical-debt-management.md"
  - "../../10-finance-and-money-management/README.md"
---

# Pattern: Ongoing Maintenance

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering workflows, operational rhythms, SLA tracking, and scope boundaries for delivering ongoing technical maintenance, support retainers, and preventative system care under contract.

---

## 2. ISO/IEC 14764 Software Maintenance Typology

To avoid confusion between routine maintenance and new feature development, all maintenance activities are classified under the international standard ISO/IEC 14764:

| Maintenance Type | Industry Effort Share | Definition & Operational Scope | Example Activities |
| :--- | :---: | :--- | :--- |
| **Corrective Maintenance** | ~21% | Reactive modification of a software product performed after delivery to correct discovered defects. | Bug fixes, memory leak triage, unhandled exception patching, database deadlock resolution. |
| **Adaptive Maintenance** | ~25% | Modification of a software product performed after delivery to keep it usable in a changed or changing environment. | Updating payment webhooks after Stripe API changes; adapting to new iOS/Android runtime requirements. |
| **Perfective Maintenance** | ~50% | Modification of a software product after delivery to improve performance, maintainability, or user experience. | Optimizing slow SQL queries, refactoring brittle components, minor UX usability tweaks. |
| **Preventive Maintenance** | ~4% | Modification of a software product after delivery to detect and correct latent faults before they manifest as operational failures. | Dependency vulnerability updates (SCA), TLS/SSL certificate renewal, database vacuuming/reindexing. |

> [!WARNING]
> **Scope Creep Rule:** New functional features, novel product modules, and major workflow changes are strictly excluded from maintenance retainers. They must be scoped and estimated as separate fixed-scope features or agile sprints.

---

## 3. Dedicated Maintenance Backlog Swimlane & Tagging

Maintenance tasks must not be buried in general development backlogs. Teams maintain a dedicated `maintenance` swimlane in the project management tracker, with standardized tags:

- `debt/security`: Vulnerability remediation, credential rotation, dependency upgrades.
- `debt/architecture`: Structural refactoring, modularization, decoupling dependencies.
- `debt/performance`: Query optimization, caching implementation, asset minification.
- `debt/testing`: Missing unit tests, flaky test stabilization, integration fixtures.
- `debt/documentation`: Stale runbooks, missing API specs, outdated onboarding guides.

---

## 4. SLA Tiers & Operational Rhythms

[Pending Founder Decision — see ENG-Q04 and ENG-Q08 in [`../open-questions.md`](../open-questions.md)].

All service level agreements (SLAs), target response times, escalation paths, after-hours coverage, and communication channels are commercial contractual commitments owned by **Sales** ([`../../05-sales/README.md`](../../05-sales/README.md)) and **Legal & Risk Management** ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)) on a per-contract basis.

Engineering does not establish unilateral SLA numbers or emergency on-call promises in technical documentation. Technical teams execute against the specific SLA schedule agreed in the signed client Statement of Work (SOW) or Maintenance Agreement.

---

## 5. Related Documents
- [`../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md`](../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md): Operational stage.
- [`../04-engineering-standards/observability-and-operational-readiness.md`](../04-engineering-standards/observability-and-operational-readiness.md): Monitoring and health checks.
- [`../06-engineering-improvement/technical-debt-management.md`](../06-engineering-improvement/technical-debt-management.md): Technical debt retirement.
- [`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md): Retainer billing and hours reconciliation.
