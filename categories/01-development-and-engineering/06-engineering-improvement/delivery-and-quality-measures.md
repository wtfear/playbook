---
title: "Improvement: Delivery and Quality Measures"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
---

# Improvement: Delivery and Quality Measures

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering metrics, delivery performance indicators, and quality measures to evaluate team velocity, system stability, and engineering health without weaponizing metrics against individuals.

## 2. Proposed Scope
- Core delivery performance measures inspired by DORA research:
  - *Deployment Frequency:* How often code is successfully deployed to staging and production.
  - *Lead Time for Changes:* Elapsed time from code commit to running in production.
  - *Change Failure Rate (CFR):* Percentage of production releases requiring immediate remediation, hotfix, or rollback.
  - *Failed Service Restoration Time (MTTR):* Elapsed time required to restore service when a production incident occurs.
- Software quality indicators:
  - *Defect Escape Rate:* Ratio of bugs discovered by clients in production versus defects caught by automated tests in CI/staging.
  - *PR Review Turnaround Time:* Time elapsed from pull request opening to first constructive review.
  - *Automated Test Suite Duration:* Wall-clock time required for CI pipeline execution.
- Qualitative measures: developer friction surveys, tool dissatisfaction indicators, and cognitive load tracking.
- Strict policy against individual performance tracking (e.g., lines of code, commit counts) to prevent perverse incentives.

## 3. Applicability
Applies to engineering-wide retrospective reviews, quarterly operational audits, and delivery process optimizations.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): DORA benchmarks.
- [`./retrospective-and-root-cause-learning.md`](./retrospective-and-root-cause-learning.md): Using measures in retrospectives.
- [`../04-engineering-standards/ci-cd-and-release-engineering.md`](../04-engineering-standards/ci-cd-and-release-engineering.md): Pipeline telemetry.

## 5. Questions to Research or Decide
- What lightweight tool (e.g., GitHub Insights, Apache DevLake, or simple weekly logs) can track DORA metrics without manual logging?
- What target threshold should define "acceptable" change failure rates for an early-stage agency (< 15%)?
- How should delivery measures be shared transparently with clients without creating contractual disputes?

## 6. Candidate Evidence and Artifacts
- Engineering Delivery & Quality Dashboard Specification.
- Monthly DORA Metrics & Stability Report.
- Quarterly Developer Experience (DevEx) Survey Results.

## 7. Next Action
Evaluate automated GitHub Actions plugins for tracking PR review cycle time and deployment frequency.
