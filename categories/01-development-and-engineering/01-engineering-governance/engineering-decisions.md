---
title: "Engineering Decisions and Architecture Decision Records"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../decisions/README.md"
  - "../04-engineering-standards/architecture-and-technical-decisions.md"
---

# Engineering Decisions and Architecture Decision Records

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes the process for proposing, evaluating, and recording technical and architectural decisions, linking project-level Architectural Decision Records (ADRs) with agency-wide Operating Decision Records (ODRs).

## 2. Proposed Scope
- **Agency-Wide Engineering Decisions:** Strategic choices affecting all projects (e.g., default cloud providers, sanctioned programming languages, AI coding policies). Recorded centrally in [`../../decisions/`](../../../decisions/README.md).
- **Project-Specific Decisions:** Architectural choices tailored to individual client repositories (e.g., database selection, third-party auth service). Recorded within the client repository's `docs/decisions/` directory.
- **ADR Format & Lifecycle:** Standard status values (`proposed`, `accepted`, `rejected`, `deprecated`, `superseded`).
- **Review Cadence:** Periodic review of past technical decisions to identify obsolete practices.

## 3. Applicability
Applies to any consequential technical choice that introduces new dependencies, long-term operational commitments, or significant security/cost implications.

## 4. Related Documents
- [`../../decisions/README.md`](../../../decisions/README.md): Central agency-wide ODR repository.
- [`../04-engineering-standards/architecture-and-technical-decisions.md`](../04-engineering-standards/architecture-and-technical-decisions.md): Technical standard for architecture.
- [`../../templates/decision-record-template.md`](../../../templates/decision-record-template.md): Reusable decision template.

## 5. Questions to Research or Decide
- What threshold distinguishes a local project ADR from an agency-wide ODR?
- How are project ADRs preserved when a client repository is handed over at project exit?
- How do we keep decision records lightweight to encourage engineers to document trade-offs?

## 6. Candidate Evidence and Artifacts
- Technical Decision Log / Index.
- Architecture Decision Record (ADR) template in client repositories.

## 7. Next Action
Adopt standard lightweight Markdown ADR template for client project repositories.
