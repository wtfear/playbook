---
title: "Development and Engineering Roadmap"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./coverage-matrix.md"
  - "./open-questions.md"
---

# Development and Engineering Roadmap

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


This roadmap tracks the progressive research, discussion, drafting, and validation status of all architectural areas within the Development and Engineering category.

> [!NOTE]
> Dates and personal assignees are deliberately omitted to prevent fabricating arbitrary commitments. Topics are prioritized based on their foundational role in establishing safe technical operations and client delivery.

---

## 1. Governance & Foundations

| Topic | Priority & Rationale | Research Status | Discussion Status | Drafting Status | Validation Status | Next Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **[Project Risk & Engineering Tailoring](./01-engineering-governance/project-risk-and-tailoring.md)** | **High:** Required to prevent over-engineering small projects or leaving critical systems vulnerable. | Verified | Scaffolding | Draft | Walkthrough 1 & 2 | Finalize lightweight intake risk questionnaire |
| **[Review Gates & Evidence](./01-engineering-governance/review-gates-and-evidence.md)** | **High:** Defines mandatory technical evidence required before client milestone releases. | Verified | Scaffolding | Draft | Walkthrough 5 | Draft PR and Release Gate checklists |
| **[Roles & Ownership](./01-engineering-governance/roles-and-ownership.md)** | **Medium:** Clarifies tech lead and reviewer accountability as team scales. | Ongoing | Scaffolding | Stubs | Pending | Founder discussion on technical authority |
| **[Exceptions & Escalation](./01-engineering-governance/exceptions-and-escalation.md)** | **Medium:** Prevents unapproved shortcuts from becoming permanent technical debt. | Ongoing | Scaffolding | Stubs | Walkthrough 5 | Create Exception Request issue template |
| **[Engineering Decisions (ADRs)](./01-engineering-governance/engineering-decisions.md)** | **High:** Preserves technical decision rationale and prevents circular architectural debates. | Verified | Scaffolding | Stubs | Pending | Standardize project ADR Markdown format |

---

## 2. Core Engineering Standards

| Topic | Priority & Rationale | Research Status | Discussion Status | Drafting Status | Validation Status | Next Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **[Architecture & Technical Decisions](./04-engineering-standards/architecture-and-technical-decisions.md)** | **High:** Ensures consistency across micro-decisions and documents ADR lifecycle. | Verified | Scaffolding | Draft | Walkthrough 2 | Standardize lightweight ADR format |
| **[Source Control & Change Integration](./04-engineering-standards/source-control-and-change-integration.md)** | **High:** Branching strategy (Trunk/GitHub Flow), PR size limits, linear history. | Verified | Scaffolding | Draft | Walkthrough 2 | Define standard branch protection rules |
| **[Validation Across Lifecycle](./04-engineering-standards/validation-across-lifecycle.md)** | **High:** Three-part validation framework (requirements, input/data schemas, acceptance). | Verified | Scaffolding | Draft | Walkthrough 1, 2 | Standardize runtime schema validation library |
| **[Reliability & Resilience](./04-engineering-standards/reliability-and-resilience.md)** | **High:** Fault isolation, timeouts, backoff/retry, idempotency, graceful degradation. | Verified | Scaffolding | Draft | Walkthrough 3 | Draft standard retry and timeout guidelines |
| **[Environments, Config & Secrets](./04-engineering-standards/environments-configuration-and-secrets.md)** | **Critical:** Accidental secret leaks create catastrophic commercial and legal liability. | Verified | Scaffolding | Draft | Walkthrough 2 | Deploy Gitleaks pre-commit hooks to starter repo |
| **[Code Quality & Review](./04-engineering-standards/code-quality-and-review.md)** | **High:** Foundation of technical quality and peer context sharing. | Verified | Scaffolding | Draft | Walkthrough 2 & 5 | Draft PR template with self-review checklist |
| **[Testing & Quality Engineering](./04-engineering-standards/testing-and-quality-engineering.md)** | **High:** Predictor of continuous delivery performance (DORA); prevents regressions. | Verified | Scaffolding | Draft | Walkthrough 2 | Select standard test runner per stack |
| **[CI/CD & Release Engineering](./04-engineering-standards/ci-cd-and-release-engineering.md)** | **High:** Automates quality checks and deployment safety. | Verified | Scaffolding | Draft | Walkthrough 1, 2, 5 | Build reusable GitHub Actions composite workflows |
| **[UX, UI & Accessibility (WCAG 2.2)](./04-engineering-standards/ux-ui-and-accessibility.md)** | **Medium:** Essential for public web interfaces and legal compliance. | Verified | Scaffolding | Draft | Walkthrough 1 | Configure automated axe-core scanning in CI |
| **[Dependencies & Supply Chain](./04-engineering-standards/dependencies-and-software-supply-chain.md)** | **High:** Open-source vulnerabilities and license compliance risks (NIST SSDF). | Verified | Scaffolding | Draft | Walkthrough 4 | Establish approved open-source license whitelist |
| **[API & Integration Engineering](./04-engineering-standards/api-and-integration-engineering.md)** | **High:** Core discipline for automation, backend, and third-party integrations. | Verified | Scaffolding | Draft | Walkthrough 3 | Standardize OpenAPI Spectral linting & RFC 7807 |
| **[Data, Databases & Migrations](./04-engineering-standards/data-databases-and-test-data.md)** | **Critical:** Data loss and failed schema migrations cause extended outages. | Verified | Scaffolding | Draft | Walkthrough 5 | Draft database down-migration verification rule |
| **[Security & Privacy Engineering](./04-engineering-standards/security-and-privacy-engineering.md)** | **Critical:** Protects against OWASP Top 10 vulnerabilities and PII data leaks. | Verified | Scaffolding | Draft | Walkthrough 2 | Configure Semgrep SAST rulesets in starter repo |
| **[Observability & Readiness](./04-engineering-standards/observability-and-operational-readiness.md)** | **Medium:** Ensures production systems are monitorable and alertable. | Ongoing | Scaffolding | Stubs | Walkthrough 3 | Standardize JSON logger with PII masking |
| **[Backup & Incident Recovery](./04-engineering-standards/backup-recovery-and-incident-engineering.md)** | **High:** Protects business continuity and recovery time objectives (RTO/RPO). | Ongoing | Scaffolding | Stubs | Walkthrough 5 | Draft Blameless Post-Mortem template |
| **[Technical Documentation](./04-engineering-standards/technical-documentation.md)** | **Medium:** Ensures system maintainability and client handover clarity. | Verified | Scaffolding | Stubs | Walkthrough 6 | Build standard `README.md` and `RUNBOOK.md` |
| **[AI-Assisted Development](./04-engineering-standards/ai-assisted-development.md)** | **Medium:** Balances developer productivity with code security and IP hygiene. | Ongoing | Scaffolding | Draft | Walkthrough 2 | Review commercial AI tool data-sharing terms |
| **[Performance & Capacity](./04-engineering-standards/performance-and-capacity.md)** | **Low:** Tailored to high-traffic deliverables; premature for basic MVPs. | Ongoing | Scaffolding | Stubs | Pending | Draft k6 baseline load test script |

---

## 3. Delivery Lifecycle Execution

| Topic | Priority & Rationale | Research Status | Discussion Status | Drafting Status | Validation Status | Next Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **[01 Technical Intake & Handoff](./03-delivery-lifecycle/01-technical-intake-and-handoff.md)** | **High:** Prevents accepting unfeasible projects or misaligned scopes. | Verified | Scaffolding | Draft | Walkthrough 1–4 | Align with Sales on intake brief template |
| **[02 Discovery & Requirements](./03-delivery-lifecycle/02-discovery-and-requirements.md)** | **Critical:** Requirements ambiguity is the primary cause of agency project failure. | Verified | Scaffolding | Draft | Walkthrough 1–4 | Draft User Story & Acceptance Criteria template |
| **[03 Existing System Assessment](./03-delivery-lifecycle/03-existing-system-assessment.md)** | **High:** Essential for safe codebase takeovers and legacy migrations. | Ongoing | Scaffolding | Stubs | Walkthrough 4 | Create Codebase Audit Checklist |
| **[04 Experience & Solution Design](./03-delivery-lifecycle/04-experience-and-solution-design.md)** | **High:** De-risks architecture before writing production code. | Verified | Scaffolding | Draft | Walkthrough 2 | Draft Solution Architecture Document outline |
| **[05 Feasibility & Estimation](./03-delivery-lifecycle/05-feasibility-estimation-and-planning.md)** | **High:** Directly drives commercial profitability and fixed-price safety. | Ongoing | Scaffolding | Stubs | Pending | Build Three-Point Estimation spreadsheet |
| **[06 Project Engineering Setup](./03-delivery-lifecycle/06-project-engineering-setup.md)** | **High:** Eliminates environment setup bottlenecks. | Verified | Scaffolding | Draft | Walkthrough 1, 2 | Build reusable project starter repository |
| **[07 Iterative Implementation](./03-delivery-lifecycle/07-iterative-implementation.md)** | **High:** Daily sprint rhythm and PR velocity. | Verified | Scaffolding | Stubs | Walkthrough 2 | Define Definition of Ready (DoR) gate |
| **[08 Verification & Acceptance](./03-delivery-lifecycle/08-verification-and-client-acceptance.md)** | **Critical:** Gate for client sign-off and milestone revenue collection. | Verified | Scaffolding | Draft | Walkthrough 2 | Draft standard UAT Protocol |
| **[09 Release & Deployment](./03-delivery-lifecycle/09-release-readiness-and-deployment.md)** | **Critical:** Production release safety and rollback preparedness. | Verified | Scaffolding | Draft | Walkthrough 5 | Draft Production Release Runbook template |
| **[10 Handover & Transition](./03-delivery-lifecycle/10-handover-and-support-transition.md)** | **High:** Prevents post-project support scope creep and stranded credentials. | Verified | Scaffolding | Stubs | Walkthrough 6 | Draft Technical Handover Acceptance Form |
| **[11 Operation & Maintenance](./03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md)** | **Medium:** Supports recurring maintenance retainer revenue. | Ongoing | Scaffolding | Stubs | Walkthrough 3 | Define SLA response times with Sales |
| **[12 Retirement & Client Exit](./03-delivery-lifecycle/12-retirement-and-client-exit.md)** | **Low:** Needed only when systems reach end-of-life or clients exit. | Ongoing | Scaffolding | Stubs | Walkthrough 7 | Draft System Decommissioning Checklist |

---

## 4. Service Specialties & Engagement Patterns

| Topic | Priority & Rationale | Research Status | Discussion Status | Drafting Status | Validation Status | Next Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **[Web Applications & Websites](./02-service-specialties/web-applications-and-websites.md)** | **High:** Primary expected client demand area. | Ongoing | Scaffolding | Stubs | Walkthrough 1 | Evaluate headless CMS pairings |
| **[Automation & Business Systems](./02-service-specialties/automation-and-business-systems.md)** | **High:** High-margin agency niche; requires idempotency standards. | Ongoing | Scaffolding | Stubs | Walkthrough 3 | Test self-hosted vs cloud n8n/Make patterns |
| **[Backend APIs & Integrations](./02-service-specialties/backend-apis-and-integrations.md)** | **High:** Foundational to both web and automation specialties. | Ongoing | Scaffolding | Stubs | Walkthrough 2, 3 | Draft API design standards |
| **[AI Applications & Agents](./02-service-specialties/ai-applications-and-agents.md)** | **Medium:** High market interest; requires strict eval and cost guardrails. | Ongoing | Scaffolding | Stubs | Pending | Draft RAG evaluation benchmark |
| **[New-Build Projects](./05-engagement-patterns/new-build-projects.md)** | **High:** Standard green-field lifecycle execution path for new client projects. | Verified | Scaffolding | Draft | Walkthrough 1, 2 | Validate starter boilerplate setup |
| **[Emergency Fixes](./05-engagement-patterns/emergency-fixes.md)** | **High:** Fast-track triage, hotfix branch isolation, minimal diffs, dual-merge protocol. | Verified | Scaffolding | Draft | Walkthrough 5 | Draft emergency hotfix release protocol |
| **[Existing Project Takeovers](./05-engagement-patterns/existing-project-takeovers.md)** | **High:** Common client scenario; requires strong liability boundaries. | Ongoing | Scaffolding | Stubs | Walkthrough 4 | Draft Takeover Liability Addendum |
| **[Prototypes & POCs](./05-engagement-patterns/prototypes-and-proofs-of-concept.md)** | **High:** Low-risk commercial entry point for new clients. | Ongoing | Scaffolding | Stubs | Walkthrough 1 | Draft Prototype Risk Waiver template |
| **[Ongoing Maintenance](./05-engagement-patterns/ongoing-maintenance.md)** | **Medium:** Predictable recurring agency revenue stream. | Ongoing | Scaffolding | Stubs | Walkthrough 3 | Align maintenance hours allocation with Finance |
| **[Modernization & Migrations](./05-engagement-patterns/modernization-and-migrations.md)** | **Medium:** Complex, high-value consulting engagements. | Ongoing | Scaffolding | Stubs | Walkthrough 4 | Document Strangler Fig reference design |
| **[Mobile Applications](./02-service-specialties/mobile-applications.md)** | **Low:** High distribution complexity; evaluate demand first. | Ongoing | Scaffolding | Stubs | Pending | Research cross-platform framework trade-offs |
| **[Cloud & Platform Engineering](./02-service-specialties/cloud-and-platform-engineering.md)** | **Low:** Specialized; offer primarily as part of web/API delivery. | Ongoing | Scaffolding | Stubs | Pending | Standardize baseline Terraform modules |
| **[Desktop Applications](./02-service-specialties/desktop-applications.md)** | **Low:** Niche requirement; activate only upon explicit client demand. | Ongoing | Scaffolding | Stubs | Pending | Evaluate Tauri vs Electron footprint |
| **[Data Engineering & Analytics](./02-service-specialties/data-engineering-and-analytics.md)** | **Low:** Specialized; evaluate client data scale requirements first. | Ongoing | Scaffolding | Stubs | Pending | Evaluate lightweight dbt-core patterns |

---

## 5. Engineering Improvement & Continuous Learning

| Topic | Priority & Rationale | Research Status | Discussion Status | Drafting Status | Validation Status | Next Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **[Reuse & Starter Templates](./06-engineering-improvement/reuse-and-starter-templates.md)** | **High:** Accelerates initial velocity across client engagements while strictly enforcing IP boundaries. | Verified | Scaffolding | Draft | Walkthrough 1, 2 | Build sanitized TypeScript starter template |
| **[Technical Debt Management](./06-engineering-improvement/technical-debt-management.md)** | **High:** Systematically catalogues and prioritizes technical debt before it causes delivery failures. | Verified | Scaffolding | Stubs | Walkthrough 3 | Create inline TODO and debt tagging standard |
| **[Delivery & Quality Measures](./06-engineering-improvement/delivery-and-quality-measures.md)** | **Medium:** Tracks DORA Core 4 and defect escape rates without heavy metric bureaucracy. | Ongoing | Scaffolding | Stubs | Pending | Standardize monthly engineering metric review |
| **[Retrospectives & Root-Cause Learning](./06-engineering-improvement/retrospective-and-root-cause-learning.md)** | **High:** Blameless post-mortems and project delivery retrospectives drive operational improvement. | Verified | Scaffolding | Stubs | Walkthrough 5 | Draft blameless post-mortem incident template |
| **[Improvement Backlog](./06-engineering-improvement/improvement-backlog.md)** | **Medium:** Central register for internal engineering tooling, documentation updates, and process fixes. | Ongoing | Scaffolding | Stubs | Pending | Establish quarterly backlog review cadence |
