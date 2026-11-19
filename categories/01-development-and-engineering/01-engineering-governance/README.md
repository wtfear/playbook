---
title: "Engineering Governance Overview"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "./roles-and-ownership.md"
  - "./project-risk-and-tailoring.md"
  - "./review-gates-and-evidence.md"
  - "./exceptions-and-escalation.md"
  - "./engineering-decisions.md"
---

# 01. Engineering Governance

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


This directory defines the proposed governance framework, technical roles, review gates, exception mechanisms, and decision-making processes for Development and Engineering.

## Purpose

To ensure that engineering decisions are made with clear accountability, appropriate technical rigor, consistent evidence standards, and transparent trade-offs across all client and internal projects.

## What Belongs Here

- Proposed engineering roles, responsibilities, and technical ownership boundaries.
- Project risk assessment and standards tailoring framework.
- Formal review gates (Architecture Gate, Implementation Gate, Release Gate).
- Technical exception, waiver, and escalation procedures.
- Agency-wide engineering decisions and link to Operating Decision Records.

## What Does Not Belong Here

- **Day-to-day Project Management:** Tracking sprint tasks and client updates belongs to [`../../11-project-delivery-and-client-service/`](../../11-project-delivery-and-client-service/README.md).
- **Agency Founder Decision Rights:** High-level corporate and commercial decision rights belong to [`../../03-business-strategy-and-governance/`](../../03-business-strategy-and-governance/README.md).
- **Organizational Policies:** Mandatory personnel or legal policies belong to People or Legal categories.

## Directory Navigation

| Document | Focus | Status |
| :--- | :--- | :--- |
| [`roles-and-ownership.md`](./roles-and-ownership.md) | Technical leadership roles, code ownership, and reviewer responsibilities | Proposed |
| [`project-risk-and-tailoring.md`](./project-risk-and-tailoring.md) | Applying risk profiles to determine necessary engineering controls | Proposed |
| [`review-gates-and-evidence.md`](./review-gates-and-evidence.md) | Phase review gates and mandatory evidence required for milestone sign-off | Proposed |
| [`exceptions-and-escalation.md`](./exceptions-and-escalation.md) | Managing technical trade-offs, deviations, and emergency technical escalations | Proposed |
| [`engineering-decisions.md`](./engineering-decisions.md) | Technical decision framework and catalog of engineering ODRs | Proposed |

## Open Questions

- Who acts as the ultimate technical authority when architectural opinions differ?
- How are solo-developer projects reviewed to maintain independent quality checks?
