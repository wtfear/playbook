---
title: "Category 11: Project Delivery and Client Service"
document_type: reference
category: "11-project-delivery-and-client-service"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../../README.md"
  - "../../structure-guide.md"
  - "../README.md"
---

# Category 11: Project Delivery and Client Service

## 1. Purpose
Defines how the agency manages client commitments, guides client onboarding, plans and tracks milestones, communicates project progress, manages scope boundaries, coordinates user acceptance, and executes smooth project handovers and closures.

## 2. Scope
- Post-contract client onboarding and kickoff meetings.
- Project delivery planning, milestone scheduling, and dependency management.
- Client communication channels, meeting rhythms, and weekly status reporting.
- Requirements coordination, user story definition, and backlog grooming.
- Scope change control, out-of-scope request management, and Change Requests (CRs).
- Client feedback loops and expectation management.
- User Acceptance Testing (UAT) coordination and formal client sign-off.
- Final deliverable handover, client documentation, and knowledge transfer.
- Post-launch warranty, ongoing support arrangements, and maintenance retainers.
- Formal project closeout and retrospective initiation.

## 3. Out of Scope (Boundaries)
- **Technical Implementation & Code Quality:** Writing code, technical system architecture, unit testing, and deployment pipelines belong to [`../01-development-and-engineering/`](../01-development-and-engineering/README.md).
- **Pre-Sales Discovery & Commercial Proposals:** Upfront discovery calls, proposal authoring, and commercial closing belong to [`../05-sales/`](../05-sales/README.md).
- **Invoicing & Cash Collection:** Generating invoices, managing collections, and resolving billing disputes belong to [`../10-finance-and-money-management/`](../10-finance-and-money-management/README.md).
- **Legal Contract Amendments:** Formal legal amendments to MSAs or Master Agreements are governed by [`../12-legal-security-and-risk-management/`](../12-legal-security-and-risk-management/README.md).

## 4. Related Categories
- [`../01-development-and-engineering/`](../01-development-and-engineering/README.md): Partners directly to translate client commitments into working technical software.
- [`../05-sales/`](../05-sales/README.md): Receives the project handoff upon deal closure; alerts Sales to upsell opportunities.
- [`../10-finance-and-money-management/`](../10-finance-and-money-management/README.md): Provides signed acceptance documentation to trigger milestone invoices.
- [`../06-marketing/`](../06-marketing/README.md): Alerts marketing upon successful project delivery for case study production.

## 5. Candidate Playbooks and Workflows to Investigate
*(All items below are proposed candidates for future research and discussion; none are approved yet).*

- **[Proposed Workflow] Client Onboarding & Project Kickoff Workflow:** Step-by-step sequence from welcome email, questionnaire, tech access gathering, to kickoff meeting.
- **[Proposed Playbook] Scope Change Control & Change Request Playbook:** Practical guidelines for diplomatically identifying scope creep and framing Change Requests without damaging client rapport.
- **[Proposed Playbook] Client Status Reporting & Expectation Management Playbook:** Standard weekly async update format, progress transparency, and handling delivery delays.
- **[Proposed Workflow] User Acceptance Testing (UAT) & Handover Workflow:** Structured verification, bug triage during UAT, and formal sign-off protocol.
- **[Proposed Checklist] Project Closeout & Offboarding Checklist:** Verification checks ensuring final deliverables transferred, access documented, and review scheduled.

## 6. Important Handoffs
- **From Sales (05) → Project Delivery (11):** Completed Sales-to-Delivery package, signed SOW, client background, and expectations.
- **From Project Delivery (11) → Engineering (01):** Validated requirements, deliverable roadmap, sprint priorities, and client acceptance criteria.
- **From Engineering (01) → Project Delivery (11):** Staging deployment links, feature demos, and technical blockers.
- **From Project Delivery (11) → Finance (10):** Client-signed milestone acceptance certificates triggering billing.
- **From Project Delivery (11) → Marketing (06):** Project success summaries and client quote introductions for case studies.

## 7. Open Questions
- What primary client collaboration channels will be supported (e.g., dedicated Slack Connect channels, email, or a client portal)?
- What is our standard change request threshold (e.g., any feature requiring more than X hours requires a formal SOW addendum)?
- What warranty period (e.g., 14 days, 30 days) is included post-handover for bug fixes before transitioning to a paid retainer?
- How do we handle unresponsive clients who delay feedback or UAT sign-off?

## 8. Suggested Next Discussion Topics
1. Client Onboarding and Kickoff agenda template.
2. Scope Change Request (CR) workflow and pricing policy.
3. Weekly client status report structure.
