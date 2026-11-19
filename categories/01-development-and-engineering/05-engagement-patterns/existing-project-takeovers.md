---
title: "Pattern: Existing Project Takeovers"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/03-existing-system-assessment.md"
  - "../04-engineering-standards/dependencies-and-software-supply-chain.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Pattern: Existing Project Takeovers

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed engineering practices, triage protocols, and liability boundaries for taking over existing, inherited, or partially completed codebases from client internal teams or previous external agencies.

## 2. Proposed Scope
- Mandatory initial Codebase Assessment & Discovery phase (Lifecycle Stage 03).
- Technical liability baselining: documenting pre-existing bugs, security vulnerabilities, and architectural flaws before assuming operational ownership.
- Immediate security stabilization: rotating all administrative credentials, database passwords, and API keys.
- Developer environment standardization: containerizing local dev environments (Docker) to eliminate "works on my machine" bottlenecks.
- Establishing automated CI pipelines: introducing automated linting, test runners, and dependency vulnerability scans to the legacy repository.
- Formulating a phased remediation roadmap: separating urgent stabilization fixes from new feature development.

## 3. Applicability
Applies whenever the agency assumes development, maintenance, or feature expansion responsibility for an existing codebase built outside the agency.

## 4. Related Documents
- [`../03-delivery-lifecycle/03-existing-system-assessment.md`](../03-delivery-lifecycle/03-existing-system-assessment.md): Audit methodology.
- [`./modernization-and-migrations.md`](./modernization-and-migrations.md): Refactoring legacy systems.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Pre-existing defect liability waivers.

## 5. Questions to Research or Decide
- Should the agency ever accept a takeover project without a paid initial Assessment & Stabilization sprint?
- What legal language is required in SOWs to exempt the agency from pre-existing system vulnerabilities?
- What criteria justify recommending a complete rewrite rather than attempting a legacy takeover?

## 6. Candidate Evidence and Artifacts
- Codebase Takeover Audit & Vulnerability Report.
- Credential Rotation & Access Verification Confirmation.
- Legacy System Stabilization & Remediation Backlog.

## 7. Next Action
Draft a standard Codebase Takeover SOW Addendum detailing liability boundaries for pre-existing code.
