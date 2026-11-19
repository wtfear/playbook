---
title: "Standard: Technical Documentation"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/10-handover-and-support-transition.md"
  - "../../13-knowledge-systems-and-automation/README.md"
---

# Standard: Technical Documentation

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for docs-as-code practices, repository documentation structures, operational runbooks, and client-facing technical handover guides to ensure systems remain maintainable over their full lifecycle.

## 2. Proposed Scope
- Documentation-as-code principles: keeping technical documentation version-controlled in Markdown alongside application code.
- Mandatory repository documentation set:
  - `README.md`: System overview, prerequisites, quickstart setup commands, environment variables reference, and testing instructions.
  - `ARCHITECTURE.md` (or `docs/architecture/`): High-level system design, component boundaries, and C4 diagrams.
  - `CONTRIBUTING.md`: Branching rules, PR formatting, commit standards, and linting setup.
  - `RUNBOOK.md` (or `docs/runbooks/`): Common operational procedures, backup restoration, deployment steps, and alert troubleshooting.
  - `docs/decisions/`: Project Architectural Decision Records (ADRs).
- Structuring technical documentation using the Diátaxis framework:
  1. *Tutorials:* Onboarding guides for new developers.
  2. *How-To Guides:* Operational procedures and deployment instructions.
  3. *Reference:* API specifications, schema definitions, environment variable lists.
  4. *Explanation:* Architectural rationale and design trade-offs.
- Documentation currency: updating documentation as part of the Definition of Done in Pull Requests.

## 3. Applicability
Applies to all internal agency repositories and client deliverables.

## 4. Related Documents
- [`../03-delivery-lifecycle/10-handover-and-support-transition.md`](../03-delivery-lifecycle/10-handover-and-support-transition.md): Handover package.
- [`../../13-knowledge-systems-and-automation/README.md`](../../13-knowledge-systems-and-automation/README.md): Agency documentation governance.

## 5. Questions to Research or Decide
- What automated link-checking or markdown-linting tools should run in CI to catch stale or broken documentation?
- What is the minimum documentation set required for Tier 1 prototype projects?
- How should sensitive operational documentation (e.g., credentials access procedures) be isolated from public or contractor-accessible documentation?

## 6. Candidate Evidence and Artifacts
- Standard Project `README.md` and `RUNBOOK.md` boilerplate templates.
- Markdown Linter configuration (`.markdownlint.json`).
- Technical Handover Documentation Checklist.

## 7. Next Action
Build standard `README.md` and `RUNBOOK.md` templates into repository scaffolds.
