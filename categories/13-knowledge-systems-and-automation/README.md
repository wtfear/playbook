---
title: "Category 13: Knowledge, Systems, and Automation"
document_type: reference
category: "13-knowledge-systems-and-automation"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../../README.md"
  - "../../structure-guide.md"
  - "../README.md"
---

# Category 13: Knowledge, Systems, and Automation

## 1. Purpose
Defines how the agency captures, curates, organizes, retrieves, and preserves operational knowledge, manages its internal tooling ecosystem, governs artificial intelligence (AI) usage, and safely designs internal workflow automations.

## 2. Scope
- Knowledge base governance, Markdown standards, and taxonomy maintenance.
- Documentation lifecycle: drafting, reviewing, approving, maintaining, and archiving documents.
- Operating Decision Record (ODR) framework administration.
- Central research note standards and external literature curation.
- Retrospective and lessons-learned preservation.
- Internal tooling ecosystem evaluation, maintenance, and integration.
- Responsible AI usage policies, prompt engineering standards, and verification guidelines.
- Internal automation design, execution safety, and human-in-the-loop approval gates.
- Knowledge retrieval optimization for both human team members and AI assistants.

## 3. Out of Scope (Boundaries)
- **Content Accuracy of Functional Playbooks:** While this category owns documentation governance and templates, **each functional category directly owns the factual accuracy and technical validity of its own documents**.
- **Client Software Engineering:** Building software, APIs, and client-facing automations belongs to [`../01-development-and-engineering/`](../01-development-and-engineering/README.md).
- **IT Tooling Budget Approvals:** Financial sign-off for software licenses belongs to [`../10-finance-and-money-management/`](../10-finance-and-money-management/README.md).
- **Security & Data Privacy Policies:** Security policies governing credential storage, NDAs, and breach notifications are governed by [`../12-legal-security-and-risk-management/`](../12-legal-security-and-risk-management/README.md).

## 4. Related Categories
- All 12 operating categories consume templates, follow documentation rules, and record decision records through this governance layer.
- [`../01-development-and-engineering/`](../01-development-and-engineering/README.md): Partners on developer toolchains, CI/CD automations, and AI coding assistants.
- [`../09-internal-operations-and-work-management/`](../09-internal-operations-and-work-management/README.md): Connects task management boards with automated notifications.
- [`../12-legal-security-and-risk-management/`](../12-legal-security-and-risk-management/README.md): Reviews AI data-sharing risks, vendor terms of service, and IP implications.

## 5. Candidate Playbooks and Workflows to Investigate
*(All items below are proposed candidates for future research and discussion; none are approved yet).*

- **[Proposed Policy] AI Tool Usage & Intellectual Property Policy:** Explicit boundaries regarding what agency or client data may be inputted into commercial LLMs, and mandatory human review of all AI output.
- **[Proposed Workflow] Operating Decision Record (ODR) Workflow:** Lifecycle for proposing, debating, approving, and recording major operational decisions in [`../../decisions/`](../../decisions/README.md).
- **[Proposed Playbook] Documentation Maintenance & Review Playbook:** Cadence and checklist for auditing stale playbooks and archiving superseded procedures.
- **[Proposed Playbook] Internal Automation Design & Safe Deployment Playbook:** Rules requiring test environments, idempotency, error handling, and human fallback for internal automations.
- **[Proposed Checklist] Periodic Knowledge Base Audit Checklist:** Quarterly audit of links, orphan documents, status tags, and open questions.

## 6. Important Handoffs
- **From Knowledge & Systems (13) → All Categories:** Standardized templates, documentation rules, and AI contribution guidelines.
- **From All Categories → Knowledge & Systems (13):** New ODRs, research notes, meeting summaries, and retrospective outputs for cataloging.
- **From Knowledge & Systems (13) → Internal Operations (09):** Automated notifications, dashboard integrations, and workflow scripts.

## 7. Open Questions
- What is the definitive relationship between Notion (raw idea capture/drafting) and this Markdown repository (version-controlled source of truth)?
- What automated link-checking or linting scripts should be added to maintain Markdown repository health?
- What specific guardrails are required before allowing autonomous AI agents to execute actions within agency systems?
- How often should operating playbooks undergo mandatory human recertification?

## 8. Suggested Next Discussion Topics
1. Architecture decision on Notion vs. Markdown source-of-truth and sync boundaries.
2. Formulating the AI Tool Usage and Verification Policy.
3. Establishing the quarterly documentation audit schedule.
