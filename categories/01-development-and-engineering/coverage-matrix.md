---
title: "Engineering Coverage Matrix"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./development-roadmap.md"
  - "./open-questions.md"
  - "../../research/01-development-and-engineering/evidence-register.md"
---

# Engineering Coverage Matrix

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


This matrix establishes explicit canonical documentation homes for all core engineering requirements, design elements, implementation practices, quality standards, release gates, operational handovers, and decommissioning procedures.

> [!NOTE]
> Every required subject has an unambiguous canonical document. Where subjects intersect multiple stages, cross-cutting dependencies and lifecycle stages are explicitly traced.

---

## 1. Requirements Engineering Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Business problem and intended users** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 01, 02 | [`05-sales`](../05-sales/README.md), [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All projects | Primary (GitLab Methodology) | Format for user persona capture |
| **Functional requirements** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 02, 07 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All projects | Primary (Agile Alliance) | Issue tracker format standardization |
| **Quality attributes and constraints** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 02, 04 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Tiers 2 & 3 | Primary (ISO 25010) | Standard latency/uptime SLA tiers |
| **Assumptions and exclusions** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 01, 02, 05 | [`05-sales`](../05-sales/README.md) (SOW boundary) | All commercial projects | Primary (GitLab PS) | Pre-sales exclusion language |
| **Acceptance criteria** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 02, 07, 08 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All projects | Primary (Agile Alliance) | BDD Gherkin vs Checklist format |
| **Requirement-to-test traceability** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 02, 08 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Tiers 2 & 3 | Primary (NIST SP 800-218) | Lightweight matrix tooling |
| **Requirement changes & technical impact** | [`03-delivery-lifecycle/02-discovery-and-requirements.md`](./03-delivery-lifecycle/02-discovery-and-requirements.md) | Stage 02, 05, 07 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) (Change Orders) | All projects | Primary (GitLab PS) | Scope change threshold ($ / hours) |
| **Unresolved questions backlog** | [`open-questions.md`](./open-questions.md) | All stages | All categories | Agency-wide | Internal register | Prioritization for founder review |

---

## 2. Design and Architecture Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **User journeys and interface behavior** | [`04-engineering-standards/ux-ui-and-accessibility.md`](./04-engineering-standards/ux-ui-and-accessibility.md) | Stage 04 | [`06-marketing`](../06-marketing/README.md) | All UI projects | Primary (Nielsen Norman) | Wireframe handover tool choice |
| **Accessibility (WCAG 2.2 AA)** | [`04-engineering-standards/ux-ui-and-accessibility.md`](./04-engineering-standards/ux-ui-and-accessibility.md) | Stage 04, 08 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Public UI projects | Primary (W3C WCAG 2.2) | Scope of manual screen-reader tests |
| **Architecture and data modeling** | [`04-engineering-standards/architecture-and-technical-decisions.md`](./04-engineering-standards/architecture-and-technical-decisions.md) | Stage 04 | None (Engineering owned) | All projects | Primary (C4 Model) | Default ERD diagramming tool |
| **Integration boundaries** | [`04-engineering-standards/api-and-integration-engineering.md`](./04-engineering-standards/api-and-integration-engineering.md) | Stage 04, 07 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Integration projects | Primary (OpenAPI 3.1) | Third-party rate limit handling |
| **Build-versus-buy decisions** | [`04-engineering-standards/architecture-and-technical-decisions.md`](./04-engineering-standards/architecture-and-technical-decisions.md) | Stage 04, 05 | [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) (SaaS budgets) | All projects | Primary (Martin Fowler) | Commercial approval threshold |
| **Technology trade-offs & ADRs** | [`01-engineering-governance/engineering-decisions.md`](./01-engineering-governance/engineering-decisions.md) | Stage 04 | [`../../decisions/`](../../decisions/README.md) | All projects | Primary (ADR GitHub) | Repo vs Agency ODR boundary |
| **Security and privacy considerations** | [`04-engineering-standards/security-and-privacy-engineering.md`](./04-engineering-standards/security-and-privacy-engineering.md) | Stage 04, 08 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All projects | Primary (NIST SP 800-218) | Threat model lightweight format |
| **System Foundation Contract & Gate** | [`../../templates/foundation-document-template.md`](../../templates/foundation-document-template.md) | Stage 01, 02, 04 | [`03-business-strategy-and-governance`](../03-business-strategy-and-governance/README.md) | All production projects | Primary (Production Lifecycle) | Minimum required fields for fast-track |
| **Prototypes for uncertain assumptions** | [`05-engagement-patterns/prototypes-and-proofs-of-concept.md`](./05-engagement-patterns/prototypes-and-proofs-of-concept.md) | Stage 04 | [`05-sales`](../05-sales/README.md) | Exploratory projects | Primary (DORA Capabilities) | Commercial boundary for spikes |

---

## 3. Implementation Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Contributor setup** | [`03-delivery-lifecycle/06-project-engineering-setup.md`](./03-delivery-lifecycle/06-project-engineering-setup.md) | Stage 06 | [`04-people-and-relationship-management`](../04-people-and-relationship-management/README.md) | All developers | Primary (DORA Version Control) | Docker dev container standards |
| **Repo & source control conventions** | [`04-engineering-standards/source-control-and-change-integration.md`](./04-engineering-standards/source-control-and-change-integration.md) | Stage 06, 07 | None (Engineering owned) | Universal | Primary (DORA Capabilities) | Squash vs rebase merge rule |
| **Code review and ownership** | [`04-engineering-standards/code-quality-and-review.md`](./04-engineering-standards/code-quality-and-review.md) | Stage 07 | [`01-engineering-governance`](./01-engineering-governance/roles-and-ownership.md) | Universal | Primary (NIST SP 800-218) | Solo developer review policy |
| **Configuration and secrets handling** | [`04-engineering-standards/environments-configuration-and-secrets.md`](./04-engineering-standards/environments-configuration-and-secrets.md) | Stage 06, 07 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Universal | Primary (NIST SSDF PS.1) | Enterprise secrets manager tool |
| **Dependency & service selection** | [`04-engineering-standards/dependencies-and-software-supply-chain.md`](./04-engineering-standards/dependencies-and-software-supply-chain.md) | Stage 06, 07 | [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) (License cost) | All projects | Primary (NIST SSDF PW.4) | Automated dependency bot rules |
| **Licensing review handoffs** | [`04-engineering-standards/dependencies-and-software-supply-chain.md`](./04-engineering-standards/dependencies-and-software-supply-chain.md) | Stage 06, 07 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All projects | Primary (OpenSSF) | Approved open-source whitelist |
| **Technical documentation** | [`04-engineering-standards/technical-documentation.md`](./04-engineering-standards/technical-documentation.md) | Stage 06, 07, 10 | [`13-knowledge-systems-and-automation`](../13-knowledge-systems-and-automation/README.md) | Universal | Primary (Diátaxis Framework) | CI markdown linting tool |
| **AI-assisted coding safeguards** | [`04-engineering-standards/ai-assisted-development.md`](./04-engineering-standards/ai-assisted-development.md) | Stage 07 | [`../../ai-contribution-guide.md`](../../ai-contribution-guide.md) | All developers | Proposed (OWASP LLM Top 10) | Automated hallucination checker |

---

## 4. Quality and Testing Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Automated and manual testing** | [`04-engineering-standards/testing-and-quality-engineering.md`](./04-engineering-standards/testing-and-quality-engineering.md) | Stage 07, 08 | None (Engineering owned) | Universal | Primary (DORA Capabilities) | Standard test runner per stack |
| **Test-data management** | [`04-engineering-standards/data-databases-and-test-data.md`](./04-engineering-standards/data-databases-and-test-data.md) | Stage 06, 08 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All DB projects | Primary (NIST SSDF PW.1) | PII anonymization tooling |
| **Defect triage** | [`04-engineering-standards/testing-and-quality-engineering.md`](./04-engineering-standards/testing-and-quality-engineering.md) | Stage 08, 11 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Universal | Primary (GitLab Methodology) | Severity vs priority definitions |
| **Security verification** | [`04-engineering-standards/security-and-privacy-engineering.md`](./04-engineering-standards/security-and-privacy-engineering.md) | Stage 08 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Tiers 2 & 3 | Primary (OWASP ASVS) | Automated SAST tool selection |
| **Lifecycle validation (3 kinds)** | [`04-engineering-standards/validation-across-lifecycle.md`](./04-engineering-standards/validation-across-lifecycle.md) | Stage 02, 07, 08 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Universal | Primary (NIST SSDF, OWASP) | Runtime schema library standard |
| **Reliability & error handling** | [`04-engineering-standards/reliability-and-resilience.md`](./04-engineering-standards/reliability-and-resilience.md) | Stage 07, 09, 11 | None (Engineering owned) | Production systems | Primary (SRE Patterns) | Default backoff & retry limits |
| **Performance & accessibility checks** | [`04-engineering-standards/performance-and-capacity.md`](./04-engineering-standards/performance-and-capacity.md) | Stage 08 | None (Engineering owned) | UI / API projects | Primary (W3C WCAG, Google CWV) | k6 load test mandatory criteria |
| **Client validation & acceptance evidence** | [`03-delivery-lifecycle/08-verification-and-client-acceptance.md`](./03-delivery-lifecycle/08-verification-and-client-acceptance.md) | Stage 08 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All client builds | Primary (GitLab PS) | Formal sign-off document format |
| **Known limitations & residual risks** | [`03-delivery-lifecycle/08-verification-and-client-acceptance.md`](./03-delivery-lifecycle/08-verification-and-client-acceptance.md) | Stage 08, 09 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All client builds | Proposed (Risk governance) | Client risk acceptance authority |

---

## 5. Release Engineering Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Build and artifact handling** | [`04-engineering-standards/ci-cd-and-release-engineering.md`](./04-engineering-standards/ci-cd-and-release-engineering.md) | Stage 09 | None (Engineering owned) | Universal | Primary (DORA CD) | Container registry choice |
| **Deployment environments** | [`04-engineering-standards/ci-cd-and-release-engineering.md`](./04-engineering-standards/ci-cd-and-release-engineering.md) | Stage 06, 09 | [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) (Cloud hosting) | Universal | Primary (12-Factor App) | Staging/preview cost limits |
| **Database migration & verification** | [`04-engineering-standards/data-databases-and-test-data.md`](./04-engineering-standards/data-databases-and-test-data.md) | Stage 08, 09 | None (Engineering owned) | All DB projects | Primary (Evol. DB Design) | CI down-migration check rule |
| **Compatibility and API changes** | [`04-engineering-standards/api-and-integration-engineering.md`](./04-engineering-standards/api-and-integration-engineering.md) | Stage 09 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All API projects | Primary (OpenAPI 3.1) | Deprecation notice window |
| **Release approval ownership** | [`01-engineering-governance/review-gates-and-evidence.md`](./01-engineering-governance/review-gates-and-evidence.md) | Stage 09 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Universal | Primary (DORA Governance) | Deployment freeze hours |
| **Rollback or recovery planning** | [`03-delivery-lifecycle/09-release-readiness-and-deployment.md`](./03-delivery-lifecycle/09-release-readiness-and-deployment.md) | Stage 09 | None (Engineering owned) | Universal | Primary (DORA CD) | Automated abort trigger thresholds |
| **Operational readiness** | [`04-engineering-standards/observability-and-operational-readiness.md`](./04-engineering-standards/observability-and-operational-readiness.md) | Stage 09 | None (Engineering owned) | Tiers 2 & 3 | Primary (Google SRE) | Mandatory alert checklist |
| **Release notes** | [`03-delivery-lifecycle/09-release-readiness-and-deployment.md`](./03-delivery-lifecycle/09-release-readiness-and-deployment.md) | Stage 09 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md), [`06-marketing`](../06-marketing/README.md) | Universal | Primary (Keep a Changelog) | Automated changelog generator |

---

## 6. Operations, Handover, and Support Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Monitoring, logging & alert ownership** | [`04-engineering-standards/observability-and-operational-readiness.md`](./04-engineering-standards/observability-and-operational-readiness.md) | Stage 09, 11 | [`09-internal-operations-and-work-management`](../09-internal-operations-and-work-management/README.md) | Tiers 2 & 3 | Primary (OpenTelemetry) | On-call rotation after hours |
| **Runbooks** | [`04-engineering-standards/technical-documentation.md`](./04-engineering-standards/technical-documentation.md) | Stage 10, 11 | None (Engineering owned) | Tiers 2 & 3 | Primary (Google SRE) | Runbook maintenance schedule |
| **Incident triage and escalation** | [`04-engineering-standards/backup-recovery-and-incident-engineering.md`](./04-engineering-standards/backup-recovery-and-incident-engineering.md) | Stage 11 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Production systems | Primary (NIST SP 800-61) | Client alert communication SLA |
| **Backup and restoration testing** | [`04-engineering-standards/backup-recovery-and-incident-engineering.md`](./04-engineering-standards/backup-recovery-and-incident-engineering.md) | Stage 11 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All stateful systems | Primary (NIST SP 800-218) | Restoration drill frequency |
| **Vulnerability intake and response** | [`04-engineering-standards/security-and-privacy-engineering.md`](./04-engineering-standards/security-and-privacy-engineering.md) | Stage 11 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Universal | Primary (NIST SSDF RV.1) | External disclosure contact |
| **Dependency updates** | [`04-engineering-standards/dependencies-and-software-supply-chain.md`](./04-engineering-standards/dependencies-and-software-supply-chain.md) | Stage 11 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Maintained systems | Primary (OpenSSF) | Monthly maintenance cadence |
| **Technical support boundaries** | [`03-delivery-lifecycle/10-handover-and-support-transition.md`](./03-delivery-lifecycle/10-handover-and-support-transition.md) | Stage 10, 11 | [`05-sales`](../05-sales/README.md), [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All client projects | Proposed (Commercial boundary) | In-scope vs out-of-scope support |
| **Client training and documentation** | [`03-delivery-lifecycle/10-handover-and-support-transition.md`](./03-delivery-lifecycle/10-handover-and-support-transition.md) | Stage 10 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Handover projects | Primary (GitLab PS) | Training session format |
| **Repo, infra, domain & service transfer** | [`03-delivery-lifecycle/10-handover-and-support-transition.md`](./03-delivery-lifecycle/10-handover-and-support-transition.md) | Stage 10 | [`10-finance-and-money-management`](../10-finance-and-money-management/README.md), [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All client handovers | Proposed (Transfer protocol) | Domain ownership transfer steps |
| **Access changes via approved controls** | [`03-delivery-lifecycle/10-handover-and-support-transition.md`](./03-delivery-lifecycle/10-handover-and-support-transition.md) | Stage 10 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Universal | Primary (NIST SSDF PS.1) | Access offboarding verification |
| **Warranty vs ongoing support boundary** | [`03-delivery-lifecycle/10-handover-and-support-transition.md`](./03-delivery-lifecycle/10-handover-and-support-transition.md) | Stage 10, 11 | [`05-sales`](../05-sales/README.md), [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All client contracts | **Unresolved commercial boundary** | Standard warranty duration |

---

## 7. Retirement and Decommissioning Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Decommissioning approval & ownership** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md), [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Retired systems | Proposed (Retirement protocol) | Decommissioning sign-off role |
| **Data export, retention & deletion** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | All data systems | Primary (GDPR / NIST) | Post-exit data retention days |
| **Access revocation** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) | Universal | Primary (NIST SSDF PS.1) | Complete IAM teardown check |
| **Infrastructure shutdown** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) (Stop cloud bills) | Cloud systems | Proposed (Teardown runbook) | Cloud disk wipe verification |
| **Dependency & integration impact** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | External integration partners | Integrated systems | Proposed (Impact analysis) | Partner decommission notices |
| **Client transition & completion records** | [`03-delivery-lifecycle/12-retirement-and-client-exit.md`](./03-delivery-lifecycle/12-retirement-and-client-exit.md) | Stage 12 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md), [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) | All exiting clients | Proposed (Exit audit) | Final legal discharge notice |

---

## 8. Situational Engagement Patterns and Engineering Improvement Coverage

| Required Subject | Canonical Document | Related Lifecycle Stage(s) | Cross-Category Dependency | Applicability | Evidence Status | Open Gap / Decision |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **Emergency hotfixes & critical patches** | [`05-engagement-patterns/emergency-fixes.md`](./05-engagement-patterns/emergency-fixes.md) | Stage 09, 11 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Active production systems | Primary (SRE Incident Response) | Fast-track approval authority |
| **Greenfield new build delivery** | [`05-engagement-patterns/new-build-projects.md`](./05-engagement-patterns/new-build-projects.md) | Stages 01–10 | [`05-sales`](../05-sales/README.md), [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All new builds | Primary (DORA Capabilities) | Standard starter repo stack |
| **Existing codebase takeovers & audits** | [`05-engagement-patterns/existing-project-takeovers.md`](./05-engagement-patterns/existing-project-takeovers.md) | Stage 01, 03 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) (Liability waiver) | Takeover engagements | Proposed (Audit protocol) | Baseline liability cut-off date |
| **System modernizations & migrations** | [`05-engagement-patterns/modernization-and-migrations.md`](./05-engagement-patterns/modernization-and-migrations.md) | Stages 03, 04, 07 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | Legacy replacements | Primary (Strangler Fig Pattern) | Parallel run duration standard |
| **Ongoing maintenance retainers** | [`05-engagement-patterns/ongoing-maintenance.md`](./05-engagement-patterns/ongoing-maintenance.md) | Stage 11 | [`05-sales`](../05-sales/README.md), [`10-finance-and-money-management`](../10-finance-and-money-management/README.md) | Retainer clients | Proposed (Maintenance SLA) | Monthly allocated hours policy |
| **Software asset reuse & starter templates** | [`06-engineering-improvement/reuse-and-starter-templates.md`](./06-engineering-improvement/reuse-and-starter-templates.md) | Stage 06, 07 | [`12-legal-security-and-risk-management`](../12-legal-security-and-risk-management/README.md) (IP isolation) | All developers | Primary (Software Engineering at Google) | Permissible client IP re-use rules |
| **Technical debt tracking & remediation** | [`06-engineering-improvement/technical-debt-management.md`](./06-engineering-improvement/technical-debt-management.md) | Stage 07, 11 | [`11-project-delivery-and-client-service`](../11-project-delivery-and-client-service/README.md) | All active projects | Primary (Martin Fowler Tech Debt) | Tech debt sprint capacity limit (%) |
| **Delivery velocity & quality measures** | [`06-engineering-improvement/delivery-and-quality-measures.md`](./06-engineering-improvement/delivery-and-quality-measures.md) | All stages | [`09-internal-operations-and-work-management`](../09-internal-operations-and-work-management/README.md) | Agency-wide | Primary (DORA Core 4) | Lightweight team dashboard tool |
| **Retrospectives & root-cause learning** | [`06-engineering-improvement/retrospective-and-root-cause-learning.md`](./06-engineering-improvement/retrospective-and-root-cause-learning.md) | All stages | None (Engineering owned) | Completed milestones | Primary (Blameless Post-Mortem) | Post-mortem trigger severity |
| **Engineering improvement backlog** | [`06-engineering-improvement/improvement-backlog.md`](./06-engineering-improvement/improvement-backlog.md) | All stages | None (Engineering owned) | Internal operations | Internal register | Quarterly review rhythm |
