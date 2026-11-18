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

| Defect Severity | Target Response Time | Target Workaround / Fix | Notification Channel |
| :--- | :--- | :--- | :--- |
| **Sev 1 (Critical Outage)** | < 1 hour | < 4 hours | PagerDuty / Emergency Phone Call |
| **Sev 2 (Degraded Feature)**| < 4 hours | < 24 hours | Dedicated Support Slack / Email |
| **Sev 3 (Minor Defect)** | Next business day | Next scheduled sprint | Issue Tracker |
| **Sev 4 (Cosmetic / Tweak)**| 2 business days | Backlog prioritization | Issue Tracker |

---

## 5. Related Documents
- [`../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md`](../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md): Operational stage.
- [`../04-engineering-standards/observability-and-operational-readiness.md`](../04-engineering-standards/observability-and-operational-readiness.md): Monitoring and health checks.
- [`../06-engineering-improvement/technical-debt-management.md`](../06-engineering-improvement/technical-debt-management.md): Technical debt retirement.
- [`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md): Retainer billing and hours reconciliation.
