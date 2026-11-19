---
title: "Document Templates Overview"
document_type: template
category: "13-knowledge-systems-and-automation"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "../structure-guide.md"
---

# Document Templates

This directory contains standardized Markdown templates for official document types and system contracts in the agency knowledge base.

## Purpose

Standardized templates ensure consistency, readability, clear ownership, and systematic lifecycle management across all 13 operating categories and cross-functional records.

## Document Types and Available Templates

| Document Type | Template File | Primary Purpose | Authority Level |
| :--- | :--- | :--- | :--- |
| **Policy** | [`policy-template.md`](./policy-template.md) | Mandatory boundaries, requirements, or approval rules | Binding when approved |
| **Playbook** | [`playbook-template.md`](./playbook-template.md) | Recommended approaches, judgment guidelines, exceptions, and escalation paths | Advisory / Guidance |
| **Workflow** | [`workflow-template.md`](./workflow-template.md) | Concrete sequence of actions, roles, handoffs, inputs, and outputs | Operational standard |
| **Checklist** | [`checklist-template.md`](./checklist-template.md) | Compact verification lists to prevent errors at key milestones | Quality assurance |
| **Engineering Topic** | [`engineering-topic-template.md`](./engineering-topic-template.md) | 8-part topic scaffold for engineering standards, specialties, and patterns | Engineering standard scaffold |
| **Foundation Contract** | [`foundation-document-template.md`](./foundation-document-template.md) | Production application system foundation, SLOs, NFRs, architecture, and gates | Engineering contract |
| **Research Note** | [`research-note-template.md`](./research-note-template.md) | External evidence, citations, benchmark observations, and candidate options | Informational |
| **Decision Record** | [`decision-record-template.md`](./decision-record-template.md) | Formal records of architectural, operational, or commercial decisions | Authoritative record |
| **Meeting Note** | [`meeting-note-template.md`](./meeting-note-template.md) | Agendas, discussions, decisions made, and follow-up action items | Operational record |
| **Retrospective** | [`retrospective-template.md`](./retrospective-template.md) | Post-mortem or milestone reflections, lessons learned, and systemic improvements | Continuous improvement |

## Standard Metadata Header

Every document created from these templates must include the standard YAML frontmatter block:

```yaml
---
title: "Document Title"
document_type: policy | playbook | workflow | checklist | template | reference | research-note | decision-record | meeting-note | retrospective
category: "Category Name or Cross-Functional"
status: proposed | draft | in-review | approved | superseded
owner: null # or "unassigned" / Name of responsible role
last_reviewed: null # or YYYY-MM-DD
related_documents:
  - "../relative/path/to/doc.md"
---
```

### Status Lifecycle
- `proposed`: Idea or candidate practice undergoing initial consideration. Not operational.
- `draft`: Actively being written or revised. Not ready for reliance.
- `in-review`: Under review by relevant stakeholders or founders.
- `approved`: Formally authorized and active operational practice.
- `superseded`: Deprecated and replaced by a newer version (moved to archive or tombstoned).

> [!IMPORTANT]
> Never set `status: approved` on unreviewed documents. Do not invent owners, dates, or approval thresholds. Keep values set to `null` or `unassigned` until officially determined by human founders.
