---
title: "Research and Source Notes Overview"
document_type: reference
category: "13-knowledge-systems-and-automation"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "../structure-guide.md"
  - "./01-development-and-engineering/README.md"
  - "./production-lifecycle/README.md"
---

# Research and Source Notes

This directory is the central repository for external research, industry benchmarks, market analyses, literature notes, and candidate practices investigated for the agency.

## Primary Architectural Convention: Centralized Research

We deliberately house all research notes centrally in `research/` rather than scattering them across the 13 individual category folders.

### Rationale:
1. **Single Point of Discovery:** Founders and contributors have one dedicated location to look for external findings, market analyses, and background research without checking 13 disparate folders.
2. **Handles Cross-Functional Research Gracefully:** Many research investigations (e.g., pricing strategy, AI tooling governance, client onboarding best practices) span multiple functional areas (e.g., Strategy + Sales + Finance, or Engineering + Legal). Centralizing prevents artificial compartmentalization or duplicate notes.
3. **Strict Separation of Operating Practice vs. External Exploration:** Keeping `categories/` strictly reserved for operational documents (policies, playbooks, workflows, checklists) ensures team members do not confuse an external benchmark or candidate idea with an approved internal agency standard.
4. **Shallow Folder Hierarchy:** Prevents creating dozens of empty nested subdirectories across the 13 categories before research has occurred.

## How to Structure Research Notes

- **Template:** Use [`../templates/research-note-template.md`](../templates/research-note-template.md).
- **Naming Pattern:** `rn-[category-prefix]-[topic-slug].md` (e.g., `rn-01-automated-testing-frameworks.md` or `rn-05-value-based-pricing-models.md`). For cross-category research, use `rn-cross-[topic-slug].md`.
- **Status:** All research notes must maintain `status: proposed` or `status: draft` unless formal review is completed. Research notes never have the authority of approved policies.
- **Cross-Referencing:** When a candidate practice is adopted into an operational playbook or workflow, reference the research note in the playbook's "References" section, and update the research note to link to the new playbook.

## Research Index

| Directory / Collection | Topic | Primary Category | Status | Key Focus |
| :--- | :--- | :--- | :---: | :--- |
| [`01-development-and-engineering/`](./01-development-and-engineering/README.md) | Engineering Standards & Evidence | `01-development-and-engineering` | `proposed` | Primary citations (NIST, DORA, W3C), applicability matrix, candidate practices, validation logs. |
| [`production-lifecycle/`](./production-lifecycle/README.md) | Production Lifecycle Framework | `01-development-and-engineering` | `proposed` | 8-phase reference framework (Phases 0–7) covering production readiness, telemetry, release safety, and retirement. |
