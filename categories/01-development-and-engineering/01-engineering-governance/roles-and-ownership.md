---
title: "Engineering Roles and Ownership"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../04-engineering-standards/code-quality-and-review.md"
  - "../../04-people-and-relationship-management/README.md"
---

# Engineering Roles and Ownership

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed technical roles, areas of accountability, and ownership boundaries across the engineering lifecycle to ensure clear responsibility without rigid organizational silos.

## 2. Proposed Scope
- **Proposed Technical Roles:** Lead Engineer / Architect, Senior/Staff Engineer, Contributing Developer, Technical Reviewer.
- **Code Ownership Models:** Component ownership vs. collective repository ownership.
- **Repository Administration Rights:** Write access, pull request merge rights, and production deployment authorization.
- **Operational Ownership:** Accountability for monitoring alerts, runbook maintenance, and technical incident response.

## 3. Applicability
Applies to all internal and external engineers, contractors, and technical leads contributing to agency repositories or client deliverables.

## 4. Related Documents
- [`./review-gates-and-evidence.md`](./review-gates-and-evidence.md): Specifies who signs off on review gates.
- [`../04-engineering-standards/code-quality-and-review.md`](../04-engineering-standards/code-quality-and-review.md): Standard review procedures.
- [`../../04-people-and-relationship-management/README.md`](../../04-people-and-relationship-management/README.md): Contractor and employee management.

## 5. Questions to Research or Decide
- How is technical leadership assigned when a founder is not the primary hands-on developer?
- In small teams (1–3 engineers), what backup ownership model prevents single-point-of-failure risks?
- Can external contractors be granted administrative merge or deployment rights to client production environments?

## 6. Candidate Evidence and Artifacts
- GitHub / GitLab `CODEOWNERS` configuration files.
- Role-responsibility matrix for technical milestones.
- Production environment access register.

## 7. Next Action
Conduct founder review on technical authority delegation and contractor access boundaries.
