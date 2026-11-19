---
title: "Pattern: New Build Projects"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/README.md"
---

# Pattern: New Build Projects

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering practices for executing greenfield software development projects, where the agency builds an application or platform from the ground up through the complete technical delivery lifecycle.

## 2. Proposed Scope
- Full lifecycle execution: progressing systematically from Stage 01 (*Intake*) through Stage 10 (*Handover*).
- Establishing a clean architectural foundation using modular design patterns, ADRs, and clear data models.
- Initializing clean repositories with automated CI/CD pipelines, pre-commit secret hooks, and strict branch protection.
- Applying standard engineering quality gates (unit/integration test coverage, peer code reviews, accessibility standards).
- Delivering a structured project handover package with comprehensive documentation, clean commit history, and infrastructure runbooks.

## 3. Applicability
Applies to all net-new custom software, web applications, mobile apps, or backend services initiated without legacy codebase constraints.

## 4. Related Documents
- [`../03-delivery-lifecycle/README.md`](../03-delivery-lifecycle/README.md): All 12 lifecycle stages.
- [`../04-engineering-standards/README.md`](../04-engineering-standards/README.md): Full engineering standards.
- [`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md): Project delivery management.

## 5. Questions to Research or Decide
- What standard project template repository provides the fastest setup for full-stack greenfield projects?
- How do we structure sprint milestones to ensure visible client progress demos every 2 weeks?
- What is our standard policy regarding code copyright assignment upon final invoice payment?

## 6. Candidate Evidence and Artifacts
- Project Solution Architecture Document.
- Greenfield Repository with complete CI/CD audit logs.
- Formal Project Handover Package.

## 7. Next Action
Refine agency repository starter templates for modern full-stack web applications.
