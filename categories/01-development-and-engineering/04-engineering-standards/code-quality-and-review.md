---
title: "Standard: Code Quality and Review"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../01-engineering-governance/roles-and-ownership.md"
  - "../03-delivery-lifecycle/07-iterative-implementation.md"
  - "./source-control-and-change-integration.md"
---

# Standard: Code Quality and Review

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for code readability, automated formatting, static linting, peer code review protocols, and quality gates to maintain high craftsmanship and shared context.

## 2. Proposed Scope
- Automated code formatting (e.g., Prettier, Black, Biome) and strict static linting rules enforced via pre-commit and CI.
- Static type checking (e.g., TypeScript strict mode, mypy, Go vet) with zero unchecked `any` exceptions in production code.
- Pull request (PR) author responsibilities: self-review, concise descriptions, screenshots/recordings for UI changes, and linked issue tickets.
- Pull request sizing guidelines (target: < 400 lines of diff to ensure thorough reviewer comprehension).
- Code reviewer responsibilities: checking architectural alignment, edge-case coverage, test quality, and providing constructive, actionable feedback.
- Approval and merge rules: when two or more engineers are assigned to a project, at least one approved peer review is required before merging into default branches.
- **Solo-Engineer Fallback:** [Pending Founder Decision — see [`../open-questions.md`](../open-questions.md) and [`../01-engineering-governance/roles-and-ownership.md`](../01-engineering-governance/roles-and-ownership.md)]. When a project is staffed by a single engineer, merge blocking must not halt delivery; solo projects operate under an approved fallback protocol (e.g., green automated CI checks combined with an explicit author self-review checklist, or asynchronous founder review) so delivery is never paralyzed.

## 3. Applicability
Applies to all code committed to agency repositories or client deliverables.

## 4. Related Documents
- [`../01-engineering-governance/roles-and-ownership.md`](../01-engineering-governance/roles-and-ownership.md): Code review ownership.
- [`../03-delivery-lifecycle/07-iterative-implementation.md`](../03-delivery-lifecycle/07-iterative-implementation.md): Implementation stage.
- [`./source-control-and-change-integration.md`](./source-control-and-change-integration.md): Branching and Git workflow.

## 5. Questions to Research or Decide
- What is the turnaround SLA for peer code reviews in a fast-paced agency sprint (e.g., within 4 business hours)?
- How do we maintain independent code quality verification when a project is staffed by a single solo developer?
- When, if ever, is a developer permitted to self-merge a PR to a protected branch?

## 6. Candidate Evidence and Artifacts
- Standard `.eslintrc` / `biome.json` / `pyproject.toml` configuration files.
- GitHub Pull Request Template with built-in author self-review checklist.
- Code Review Verification Audit Trail in Git history.

## 7. Next Action
Draft standard Pull Request template and standardize language-specific linting rules across repositories.
