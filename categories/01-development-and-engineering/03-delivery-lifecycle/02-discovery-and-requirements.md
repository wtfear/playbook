---
title: "Lifecycle 02: Discovery and Requirements Analysis"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./01-technical-intake-and-handoff.md"
  - "./04-experience-and-solution-design.md"
  - "../../11-project-delivery-and-client-service/README.md"
---

# Lifecycle 02: Discovery and Requirements Analysis

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines the proposed methodology for eliciting, structuring, validating, and tracing functional and non-functional technical requirements, establishing clear acceptance criteria, and assessing the technical impact of scope changes.

## 2. Proposed Scope
- Elicitation of the core business problem, intended user personas, and operational context.
- Definition of functional requirements (user stories, system behaviors, workflows).
- Identification of non-functional quality attributes (performance, security, availability, scalability, accessibility).
- Explicit documentation of project assumptions, dependencies, and exclusions.
- Formulation of verifiable Acceptance Criteria (Given/When/Then or checklist format).
- Requirements-to-test and acceptance traceability mapping.
- Technical impact assessment workflow for mid-project requirement changes.
- Maintenance of an unresolved technical questions backlog.

## 3. Applicability
Applies to all client engagements post-qualification, tailored according to project risk tier.

## 4. Related Documents
- [`./01-technical-intake-and-handoff.md`](./01-technical-intake-and-handoff.md): Preceding intake stage.
- [`./04-experience-and-solution-design.md`](./04-experience-and-solution-design.md): Downstream architectural design.
- [`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md): Client expectation management and change request governance.

## 5. Questions to Research or Decide
- What requirements management format (e.g., Markdown specification in repository vs. Jira/Linear issue backlog) is agency standard?
- How is requirement-to-test traceability maintained without heavy requirements management software?
- What process triggers a formal commercial Change Request when requirements evolve during discovery?

## 6. Candidate Evidence and Artifacts
- Technical Requirements Specification (TRS) / Product Requirements Document (PRD).
- Requirements Traceability Matrix (RTM).
- Scope Change Technical Impact Assessment Log.

## 7. Next Action
Draft standard User Story & Acceptance Criteria template incorporating Definition of Ready (DoR) gates.
