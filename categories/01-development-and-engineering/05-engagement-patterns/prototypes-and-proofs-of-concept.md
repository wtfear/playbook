---
title: "Pattern: Prototypes and Proofs of Concept"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/applicability-matrix.md"
  - "../03-delivery-lifecycle/README.md"
---

# Pattern: Prototypes and Proofs of Concept

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering practices, lightweight controls, and risk boundaries for executing rapid prototypes, technical spikes, and commercial proofs of concept (POCs) designed to validate assumptions quickly.

## 2. Proposed Scope
- Goal-driven scoping: defining the single critical hypothesis or architectural uncertainty to validate.
- Tailored lightweight engineering controls (Tier 1): bypassing long-term maintenance overhead, comprehensive test pyramids, or multi-stage release pipelines.
- Speed-oriented tooling: managed BaaS (e.g., Supabase, Firebase), rapid UI kits, and mock services.
- Explicit documentation of throwaway status: preventing clients or founders from assuming prototype code is production-ready.
- Evaluation gates: clear criteria for deciding whether to discard, refactor, or rebuild the solution following POC completion.

## 3. Applicability
Applies to exploratory R&D sprints, pre-sales technical spikes, and early-stage client feasibility engagements.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/applicability-matrix.md`](../../../research/01-development-and-engineering/applicability-matrix.md): Tier 1 tailoring.
- [`./new-build-projects.md`](./new-build-projects.md): Transitioning validated concepts to greenfield builds.
- [`../03-delivery-lifecycle/04-experience-and-solution-design.md`](../03-delivery-lifecycle/04-experience-and-solution-design.md): Prototyping uncertain assumptions.

## 5. Questions to Research or Decide
- How do we legally and commercially prevent a client from deploying an unhardened prototype directly to live customer traffic?
- What is the maximum duration for a prototype engagement (e.g., 1 to 2 weeks maximum)?
- Under what specific circumstances can prototype code be refactored rather than rewritten from scratch?

## 6. Candidate Evidence and Artifacts
- Prototype Hypothesis & Validation Goal Brief.
- Rapid POC Repository with explicit "Not for Production" warning banner.
- Prototype Evaluation & Recommendation Report.

## 7. Next Action
Draft a standard "Prototype Risk Waiver & Commercial Boundary" notice for client SOWs.
