---
title: "Lifecycle 03: Existing System Assessment"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../05-engagement-patterns/existing-project-takeovers.md"
  - "../05-engagement-patterns/modernization-and-migrations.md"
  - "../04-engineering-standards/dependencies-and-software-supply-chain.md"
---

# Lifecycle 03: Existing System Assessment

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines the proposed methodology for inspecting, auditing, and baselining legacy or client-provided codebases, infrastructure, and third-party dependencies before assuming operational responsibility or building new features.

## 2. Proposed Scope
- Initial code inspection: architecture patterns, language versions, maintainability, and code quality.
- Dependency audit: identifying deprecated packages, end-of-life runtimes, and known vulnerabilities (CVEs).
- Security and secrets scan: detecting hardcoded credentials, exposed API keys, and insecure network configurations.
- Infrastructure and deployment review: CI/CD state, environment parity, hosting costs, and backup verification.
- Test coverage and technical debt assessment.
- Formulation of an Existing System Baseline Report and remediation recommendations.

## 3. Applicability
Mandatory for all project takeovers, system modernizations, legacy migrations, and ongoing maintenance engagements. (Skipped for pure greenfield builds).

## 4. Related Documents
- [`../05-engagement-patterns/existing-project-takeovers.md`](../05-engagement-patterns/existing-project-takeovers.md): Project takeover engagement pattern.
- [`../04-engineering-standards/dependencies-and-software-supply-chain.md`](../04-engineering-standards/dependencies-and-software-supply-chain.md): Dependency scanning standard.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Pre-existing vulnerability liability.

## 5. Questions to Research or Decide
- What automated scanning tools (e.g., Gitleaks, Snyk, SonarQube, Trivy) should be run as standard during intake audits?
- How is technical liability framed when an audited system contains critical unpatched zero-day vulnerabilities?
- What is the standard duration and fee structure for a standalone Codebase Assessment sprint?

## 6. Candidate Evidence and Artifacts
- Existing System Audit & Technical Debt Report.
- Automated Dependency & Vulnerability Scan Log.
- System Takeover Risk & Remediation Roadmap.

## 7. Next Action
Develop a standardized Codebase Audit Checklist covering security, architecture, and dependencies.
