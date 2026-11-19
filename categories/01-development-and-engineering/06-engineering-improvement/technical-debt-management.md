---
title: "Improvement: Technical Debt Management"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./improvement-backlog.md"
  - "../01-engineering-governance/exceptions-and-escalation.md"
  - "../05-engagement-patterns/ongoing-maintenance.md"
---

# Improvement: Technical Debt Management

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes a proposed framework for identifying, cataloging, risk-ranking, and systematically retiring technical debt to prevent codebase entropy, velocity degradation, and operational fragility.

---

## 2. Technical Debt Classification

All technical debt must be categorized using Martin Fowler's Technical Debt Quadrant to distinguish calculated engineering trade-offs from sloppy execution:

| | **Deliberate** | **Inadvertent** |
| :--- | :--- | :--- |
| **Prudent** | *"We must ship now to validate market fit, but we know we will have to refactor the payment worker next sprint."*<br/>*(Documented, accepted, tracked)* | *"Now we understand the domain model much better than when we designed the initial schema."*<br/>*(Natural learning through delivery)* |
| **Reckless** | *"We don't have time to write unit tests or setup CI."*<br/>*(Prohibited shortcut; causes immediate compound debt)* | *"What do you mean layered architecture? We just put everything in one 5,000-line controller."*<br/>*(Ignorance/unskilled practice; requires mentoring)* |

---

## 3. Debt Tagging Taxonomy & Backlog Protocol

Technical shortcuts taken to meet commercial milestones must be logged immediately in the repository issue tracker:

- **Issue Tag:** `debt/*` (`debt/security`, `debt/architecture`, `debt/performance`, `debt/testing`, `debt/documentation`).
- **Required Issue Fields:**
  1. *Location:* Exact file paths, modules, or services affected.
  2. *Shortcut Taken:* Why the suboptimal implementation was chosen.
  3. *Debt Interest:* How this debt slows current development or elevates failure risk.
  4. *Remediation Plan:* Clear definition of done for the refactor.

---

## 4. Repayment Capacity Model

To prevent technical debt from permanently degrading engineering velocity, delivery teams apply standard capacity allocation models:

- **Continuous 15–20% Allocation:** Every standard sprint reserves 15% to 20% of engineering points specifically for debt remediation, test coverage improvements, and dependency maintenance.
- **Dedicated Hardening Sprints:** For projects with accelerated initial MVPs, schedule a dedicated 1-week refactoring and stabilization sprint prior to major production launches.
- **Pre-Handover Debt Audit:** Before transferring code to a client, conduct an objective static analysis audit (SonarQube/Semgrep) to ensure no undocumented critical debt items are transferred.

---

## 5. Related Documents
- [`./improvement-backlog.md`](./improvement-backlog.md): Central backlog of internal improvements.
- [`../01-engineering-governance/exceptions-and-escalation.md`](../01-engineering-governance/exceptions-and-escalation.md): Logging debt resulting from approved exceptions.
- [`../05-engagement-patterns/ongoing-maintenance.md`](../05-engagement-patterns/ongoing-maintenance.md): Ongoing maintenance workflows.
- [`../03-delivery-lifecycle/03-existing-system-assessment.md`](../03-delivery-lifecycle/03-existing-system-assessment.md): Assessing inherited debt.
