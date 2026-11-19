---
title: "Standard: UX, UI, and Accessibility"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "../03-delivery-lifecycle/04-experience-and-solution-design.md"
  - "../03-delivery-lifecycle/08-verification-and-client-acceptance.md"
---

# Standard: UX, UI, and Accessibility

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for user experience consistency, accessible interface design, responsive layout behavior, and conformance with W3C Web Content Accessibility Guidelines (WCAG 2.2 Level AA).

## 2. Proposed Scope
- Design token usage, responsive breakpoints, and consistent component state styling (hover, focus, active, disabled).
- Semantic HTML markup principles (correct headings, landmarks, ARIA attributes used sparingly).
- WCAG 2.2 Level AA conformance criteria:
  - Visible focus appearance (SC 2.4.11) and non-obscured focus indicators.
  - Minimum touch/click target sizing (SC 2.5.8: 24x24 CSS pixels minimum).
  - Alternative inputs for dragging movements (SC 2.5.7).
  - Accessible cognitive authentication without memorization traps (SC 3.3.8).
  - High color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text and UI components).
- Automated accessibility scanning in CI (e.g., axe-core, Pa11y).
- Manual keyboard-only navigation verification and screen-reader sanity testing.

## 3. Applicability
Applies to all user-facing web applications, client portals, mobile applications, and marketing websites.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): W3C WCAG 2.2 evidence.
- [`../03-delivery-lifecycle/04-experience-and-solution-design.md`](../03-delivery-lifecycle/04-experience-and-solution-design.md): Design stage.
- [`../03-delivery-lifecycle/08-verification-and-client-acceptance.md`](../03-delivery-lifecycle/08-verification-and-client-acceptance.md): Acceptance verification.

## 5. Questions to Research or Decide
- What headless component library (e.g., Radix UI, Headless UI, React Aria) should be recommended as default to provide pre-built accessible primitives?
- What level of manual screen-reader testing (e.g., VoiceOver, NVDA) is commercially viable for startup client budgets?
- How is accessibility compliance documented for client legal deliverables?

## 6. Candidate Evidence and Artifacts
- Automated CI Accessibility Audit Report (axe-core / Lighthouse).
- Manual Keyboard Navigation Verification Log.
- WCAG 2.2 AA Conformance Statement template.

## 7. Next Action
Select default accessible UI component library and integrate axe-core automated checks into project starter kits.
