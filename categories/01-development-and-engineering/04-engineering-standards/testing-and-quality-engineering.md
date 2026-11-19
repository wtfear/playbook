---
title: "Standard: Testing and Quality Engineering"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "./ci-cd-and-release-engineering.md"
  - "../03-delivery-lifecycle/08-verification-and-client-acceptance.md"
---

# Standard: Testing and Quality Engineering

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for automated testing pyramids, test design, quality verification gates, defect management, and continuous feedback to ensure software reliability without slowing developer velocity.

## 2. Proposed Scope
- The Testing Pyramid: high volume of fast unit tests, targeted integration tests for service boundaries, and selective end-to-end (E2E) smoke tests for critical user journeys.
- Meaningful test coverage over arbitrary vanity metrics: prioritizing coverage of complex domain logic, security checks, and financial calculations over trivial getters/setters.
- Test isolation and determinism: avoiding flaky tests by eliminating shared state, managing mock boundaries carefully, and using reproducible fixtures.
- Test execution speed: maintaining fast local and CI feedback loops (unit test suites targeted to complete in < 60 seconds).
- Defect classification and triage rubric:
  - *Critical (P0):* Data loss, security breach, total service outage.
  - *Major (P1):* Core feature broken with no viable workaround.
  - *Minor (P2):* Feature broken but viable workaround exists.
  - *Cosmetic (P3):* Visual misalignment, typo, minor UI imperfection.
- Bug reproduction standards: mandatory failing test or reproducible script attached to bug reports.

## 3. Applicability
Applies to all software engineering deliverables, tailored according to project risk tier.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): DORA Automated Testing capabilities.
- [`./ci-cd-and-release-engineering.md`](./ci-cd-and-release-engineering.md): Automated CI execution.
- [`../03-delivery-lifecycle/08-verification-and-client-acceptance.md`](../03-delivery-lifecycle/08-verification-and-client-acceptance.md): Acceptance verification.

## 5. Questions to Research or Decide
- What default testing frameworks (e.g., Vitest, Jest, Pytest) will be standardized across tech stacks?
- What E2E testing tool (e.g., Playwright) provides the most reliable headless browser execution in CI?
- What policy governs test maintenance when deadlines tighten during client delivery sprints?

## 6. Candidate Evidence and Artifacts
- CI Automated Test Suite Execution Logs.
- Test Coverage and Mutation Testing Reports.
- Standard Defect Classification & Triage Rubric.

## 7. Next Action
Integrate default test runner and sample test suites into agency repository starter kits.
