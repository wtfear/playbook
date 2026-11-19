---
title: "Pattern: Modernization and Migrations"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./existing-project-takeovers.md"
  - "../04-engineering-standards/data-databases-and-test-data.md"
  - "../03-delivery-lifecycle/09-release-readiness-and-deployment.md"
---

# Pattern: Modernization and Migrations

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering patterns for refactoring legacy software systems, executing cloud platform migrations, upgrading runtime versions, and performing high-stakes database migrations with minimal operational disruption.

## 2. Proposed Scope
- Incremental modernization patterns: implementing the Strangler Fig pattern to replace legacy functionality component-by-component without risky "big-bang" rewrites.
- Cloud and platform re-hosting: containerizing bare-metal applications and migrating to modern cloud PaaS/IaaS providers.
- Database migration engineering: schema refactoring, ETL data transformation, dual-writing verification, and cutover synchronization.
- Characterization testing: writing regression suites around legacy black-box behavior before refactoring internal code.
- Fallback and abort architecture: ensuring the legacy system remains runnable in parallel until the modernized system proves stable in production.

## 3. Applicability
Applies to system overhauls, database re-platforming, framework version upgrades, and cloud migration engagements.

## 4. Related Documents
- [`./existing-project-takeovers.md`](./existing-project-takeovers.md): Assessing legacy code.
- [`../04-engineering-standards/data-databases-and-test-data.md`](../04-engineering-standards/data-databases-and-test-data.md): Database migration standards.
- [`../03-delivery-lifecycle/09-release-readiness-and-deployment.md`](../03-delivery-lifecycle/09-release-readiness-and-deployment.md): Cutover release gating.

## 5. Questions to Research or Decide
- How do we calculate the commercial risk multiplier for legacy database migrations?
- What dual-write / shadow-traffic tools can verify that modernized endpoints return identical responses to legacy endpoints?
- How long should legacy systems run in parallel before final decommissioning?

## 6. Candidate Evidence and Artifacts
- Migration & Cutover Architecture Runbook.
- Characterization Regression Test Suite.
- Dual-Write Data Consistency Verification Log.

## 7. Next Action
Document standard Strangler Fig reference architecture and database cutover playbook.
