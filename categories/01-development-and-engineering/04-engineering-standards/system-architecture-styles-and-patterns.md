---
title: "Standard: System Architecture Styles and Patterns"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./architecture-and-technical-decisions.md"
  - "../03-delivery-lifecycle/04-experience-and-solution-design.md"
  - "../../../research/rn-01-swebok-v4-knowledge-areas.md"
  - "../../../research/rn-01-twelve-factor-modern-evolution.md"
---

# Standard: System Architecture Styles and Patterns

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** Greenfield solution design, system modernizations, major feature additions, and architectural reviews across web, API, and backend applications.
- **What Does NOT Apply:** Minor UI tweaks, content updates, or routine bug fixes that do not alter component boundaries or data flow topology.

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate architectural areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **Default Architecture Baseline:** Researching the modular monolith as the default starting architecture for small-agency deliverables to prevent premature microservice operational overhead.
- [ ] **Microservices Extraction Threshold:** Formulating objective criteria (team scaling, distinct deployment cadences, compute heterogeneity) required before splitting services.
- [ ] **Synchronous vs. Asynchronous Communication:** Establishing patterns for synchronous request-response (REST/GraphQL/gRPC) versus asynchronous messaging (queues/event streams).
- [ ] **Stateless Application Tier:** Ensuring backend instances remain stateless to support zero-downtime rolling deploys and horizontal scaling.
- [ ] **Component Diagramming:** Documenting system context and container boundaries using C4 model conventions.

---

## 3. Should (Recommended Practice & Judgment)

- What architectural heuristics determine when a background job queue (e.g., Redis/BullMQ, Celery) is necessary versus in-process async handling?
- How should event schemas be versioned and validated across service boundaries to prevent breaking downstream consumers?
- When is CQRS (Command Query Responsibility Segregation) justified versus standard relational database query patterns for agency MVPs?

---

## 4. Common Failure Modes

- **Distributed Monolith:** Splitting a system into microservices that share a single database or require tightly coupled lockstep deployments.
- **Premature Event Sourcing:** Adopting event sourcing for simple CRUD business applications, adding severe debugging and data migration complexity.
- **Unbounded In-Memory State:** Storing session data or long-lived job states in local server memory, breaking horizontal autoscaling.

---

## 5. Evidence That It's Done

- [ ] System architecture diagram (C4 Context and Container level) included in the solution design document.
- [ ] Documented justification for the chosen architectural style (monolith, modular monolith, event-driven, or serverless).
- [ ] Data flow and service communication boundaries explicitly mapped.

---

## 6. Template

- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.5 System Architecture.
- [`../../../templates/decision-record-template.md`](../../../templates/decision-record-template.md): Decision Record Template.

---

## 7. Boundaries & Handoffs

- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Validates delivery timelines against architectural complexity.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reviews cloud infrastructure operational cost projections for proposed topologies.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Communicates architectural suitability and maintenance expectations to clients.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q01`: Default technology stack and architectural baseline.
- **Related Documents:**
  - [`./architecture-and-technical-decisions.md`](./architecture-and-technical-decisions.md): Decision recording and ADR workflows.
- **Candidate Evidence (candidate example, not a decision):**
  - Martin Fowler: *MonolithFirst* (`martinfowler.com/bliki/MonolithFirst.html`).
  - IEEE Computer Society: *SWEBOK v4* (Software Architecture Knowledge Area).
