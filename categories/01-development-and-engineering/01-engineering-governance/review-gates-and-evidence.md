---
title: "Review Gates and Engineering Evidence"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./roles-and-ownership.md"
  - "../03-delivery-lifecycle/README.md"
---

# Review Gates and Engineering Evidence

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed milestone review gates across the delivery lifecycle, specifying the mandatory technical evidence required before a project advances to subsequent stages.

## 2. Proposed Scope
- **Gate 1: Architecture Gate (Stage 04 → 05):** Verification of technical feasibility, data model, security boundaries, and build-vs-buy decisions before development commitments.
- **Gate 2: Sprint Implementation Quality Gate (Stage 07):** Continuous PR gates (tests passing, linting clean, peer review sign-off, secrets scanned).
- **Gate 3: Release Readiness Gate (Stage 08 → 09):** Verification of staging testing, migration rehearsal, rollback plan, and operational observability prior to production deploy.
- **Gate 4: Handover & Exit Gate (Stage 10 → 11):** Verification of documentation, repository transfer, credential rotation, and client acceptance.

## 3. Applicability
Applies to all client deliverables and major internal systems, tailored according to project risk tier.

## 4. Related Documents
- [`./roles-and-ownership.md`](./roles-and-ownership.md): Authority to sign off on review gates.
- [`../03-delivery-lifecycle/09-release-readiness-and-deployment.md`](../03-delivery-lifecycle/09-release-readiness-and-deployment.md): Release gate operational workflow.
- [`../04-engineering-standards/testing-and-quality-engineering.md`](../04-engineering-standards/testing-and-quality-engineering.md): Quality verification criteria.

## 5. Questions to Research or Decide
- What evidence format is most lightweight for small teams (e.g., automated PR checks and issue tracker checklists vs. signed documents)?
- How are review gates conducted when only a single engineer is staffing a project?
- Can a client override a failed engineering review gate?

## 6. Candidate Evidence and Artifacts
- Architecture Review Checklist.
- CI/CD automated pipeline build logs.
- Release Readiness Sign-off Checklist.
- Client Acceptance Verification Certificate.

## 7. Next Action
Develop concise, automated GitHub PR and release checklist templates.
