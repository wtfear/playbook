---
title: "Standard: Source Control and Change Integration"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./code-quality-and-review.md"
  - "./ci-cd-and-release-engineering.md"
  - "../03-delivery-lifecycle/06-project-engineering-setup.md"
---

# Standard: Source Control and Change Integration

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed conventions for Git repository structure, branching models, commit message formats, and change integration practices to maintain clean, auditable, and bisectable version history.

## 2. Proposed Scope
- Git repository layout conventions (monorepo vs. polyrepo guidance).
- Branching strategy: short-lived feature branches merging into `main` (trunk-based development inspired by DORA research).
- Branch naming conventions: `feat/[issue-id]-[slug]`, `fix/[issue-id]-[slug]`, `chore/[slug]`.
- Commit message standards: Conventional Commits specification (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- Branch protection configuration: mandatory linear history, rebase/squash workflows, and requiring CI checks to pass prior to merge.
- Git tag management: Semantic Versioning (`vMAJOR.MINOR.PATCH`) for release candidates and production deployments.

## 3. Applicability
Applies to all source code repositories managed by the agency or delivered to clients.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): DORA Version Control capabilities.
- [`../03-delivery-lifecycle/06-project-engineering-setup.md`](../03-delivery-lifecycle/06-project-engineering-setup.md): Initial repository setup.
- [`./ci-cd-and-release-engineering.md`](./ci-cd-and-release-engineering.md): Automated CI triggering.

## 5. Questions to Research or Decide
- Should we mandate squash-and-merge or rebase-and-merge as the agency standard on GitHub/GitLab?
- How should release branches (e.g., `release/v1.0.0`) be handled for projects requiring formal staging release stabilization?
- What pre-commit hooks (e.g., Husky, pre-commit framework) should enforce commit message formatting automatically?

## 6. Candidate Evidence and Artifacts
- Standard `.gitignore` and `.gitattributes` baseline templates.
- Branch protection ruleset documentation.
- Commitlint configuration file.

## 7. Next Action
Configure standardized branch protection rulesets and commit validation hooks in agency starter templates.
