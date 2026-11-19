---
title: "Improvement: Retrospectives and Root-Cause Learning"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./improvement-backlog.md"
  - "../../../templates/retrospective-template.md"
  - "../../13-knowledge-systems-and-automation/README.md"
---

# Improvement: Retrospectives and Root-Cause Learning

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed practices for conducting blameless milestone retrospectives, investigating technical failures through Root Cause Analysis (RCA), and systematically feeding lessons learned back into agency engineering standards and checklists.

## 2. Proposed Scope
- Regular engineering retrospective cadences: bi-weekly sprint retrospectives, major release wrap-ups, and project conclusion reviews.
- Blameless culture principles: focusing on process gaps, tooling failures, and ambiguous requirements rather than attributing blame to individuals.
- Root Cause Analysis (RCA) techniques: 5-Whys analysis, timeline reconstruction, and contributing factor mapping.
- Actionable improvement generation: converting retrospective insights into prioritized tickets in the engineering improvement backlog.
- Knowledge base synchronization: updating relevant engineering standards (`04-engineering-standards/`) or review checklists whenever an incident reveals a systemic gap.

## 3. Applicability
Applies following every production incident (Sev 1 / Sev 2), sprint completion, and client project conclusion.

## 4. Related Documents
- [`../../templates/retrospective-template.md`](../../../templates/retrospective-template.md): Shared agency retrospective template.
- [`./improvement-backlog.md`](./improvement-backlog.md): Tracking generated action items.
- [`../04-engineering-standards/backup-recovery-and-incident-engineering.md`](../04-engineering-standards/backup-recovery-and-incident-engineering.md): Incident handling.
- [`../../13-knowledge-systems-and-automation/README.md`](../../13-knowledge-systems-and-automation/README.md): Updating operational playbooks.

## 5. Questions to Research or Decide
- Who facilitates incident post-mortems to ensure discussions remain objective and blameless?
- How do we track that retrospective action items are actually implemented rather than forgotten?
- What retrospective findings should be shared transparently with clients versus kept internal?

## 6. Candidate Evidence and Artifacts
- Milestone Retrospective Meeting Records.
- Blameless Incident Post-Mortem & 5-Whys Analysis Documents.
- Knowledge Base Update Log tracking changes resulting from retrospectives.

## 7. Next Action
Conduct first dry-run retrospective review using the standard retrospective template on recent scaffolding work.
