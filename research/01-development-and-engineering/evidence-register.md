---
title: "Engineering Evidence Register"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./research-plan.md"
  - "./candidate-practices.md"
  - "../README.md"
  - "../../categories/01-development-and-engineering/README.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains research and evaluation materials. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


# Engineering Evidence Register

This register records primary external standards, verified literature, and industry benchmarks evaluated to support the agency's engineering practices.

> [!NOTE]
> All sources recorded below have been independently verified against primary publications as of November 2026. External benchmarks provide evidence and guidance; they do not constitute approved internal agency policy.

---

## 1. Verified Primary Sources

### Evidence Item EVD-01: NIST Secure Software Development Framework (SSDF)
- **Title:** *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities*
- **Publication Identifier:** NIST Special Publication (SP) 800-218
- **Publisher:** National Institute of Standards and Technology (NIST), U.S. Department of Commerce
- **Publication Date:** February 2022 (Final Publication)
- **Primary URL:** `https://csrc.nist.gov/pubs/sp/800/218/final`
- **Date Accessed:** 2026-11-18
- **Document Status:** Final Official Recommendation (distinguished from SP 800-218 Rev. 1 drafts and SP 800-218A AI profile drafts).
- **Core Findings & Principles:**
  - Establishes 4 core practice groups:
    1. *Prepare the Organization (PO):* Ensure people, processes, and tech are prepared for secure development.
    2. *Protect the Software (PS):* Protect all components from unauthorized access and tampering (code repos, pipelines).
    3. *Produce Well-Secured Software (PW):* Minimize security vulnerabilities in releases (secure defaults, code reviews).
    4. *Respond to Vulnerabilities (RV):* Identify, remediate, and address root causes of vulnerabilities.
  - Framework is outcome-based rather than prescriptive, allowing organizations to select tools fitting their scale.
- **Agency Applicability & Limitations:**
  - *Applicability:* Provides a structured vocabulary and checklist for client contracts requiring compliance with modern supply chain standards (e.g., Executive Order 14028 alignment).
  - *Limitations:* Written primarily from an enterprise/federal perspective. Full formal attestation can introduce administrative overhead that must be tailored down for early-stage startup projects.

---

### Evidence Item EVD-02: DORA Core Engineering Capabilities
- **Title:** *DORA Capabilities Catalog (DevOps Research and Assessment)*
- **Publisher:** DORA / Google Cloud
- **Publication Details:** Ongoing longitudinal research program (2014–Present)
- **Primary URL:** `https://dora.dev/capabilities/`
- **Date Accessed:** 2026-11-18
- **Document Status:** Authoritative Industry Benchmark
- **Core Findings & Principles:**
  - Comprehensive version control (tracking code, application configurations, test scripts, and infrastructure-as-code) is a primary technical predictor of continuous delivery performance.
  - Continuous Delivery (CD) makes deployments low-risk, repeatable events executable on-demand.
  - Automated testing integrated into fast-feedback CI pipelines significantly lowers change failure rates and prevents defects from accumulating.
  - Loosely coupled architecture enables teams to test and deploy services independently without synchronized multi-team coordination.
- **Agency Applicability & Limitations:**
  - *Applicability:* Validates our architectural standard that version control must manage configurations and schemas alongside code. Guides CI/CD baseline expectations.
  - *Limitations:* DORA studies focus on product engineering organizations with dedicated platform teams. A service agency managing multiple distinct client codebases must adapt these practices to multi-tenant, variable client environments.

---

### Evidence Item EVD-03: W3C Web Accessibility Guidelines (WCAG 2.2)
- **Title:** *Web Content Accessibility Guidelines (WCAG) 2.2*
- **Publisher:** World Wide Web Consortium (W3C) Web Accessibility Initiative (WAI)
- **Publication Date:** October 5, 2023 (W3C Recommendation; minor editorial update December 12, 2024)
- **Primary URL:** `https://www.w3.org/TR/WCAG22/`
- **Date Accessed:** 2026-11-18
- **Document Status:** Official Web Standard (Backward-compatible with WCAG 2.1 and 2.0).
- **Core Findings & Principles:**
  - Adds 9 new success criteria addressing cognitive disabilities, mobile/touch interactions, and low-vision needs: Focus Appearance (2.4.11), Target Size (2.5.8), Dragging Movements (2.5.7), Consistent Help (3.2.6), Accessible Authentication (3.3.7 & 3.3.8), Redundant Entry (3.3.9).
  - Deprecates and removes criterion 4.1.1 (Parsing) due to modern HTML parser robustness.
  - Establishes Level AA as the recognized global standard for public commercial interfaces.
- **Agency Applicability & Limitations:**
  - *Applicability:* Informs front-end standards in `04-engineering-standards/ux-ui-and-accessibility.md` and provides verification criteria during client acceptance testing.
  - *Limitations:* Complete Level AAA compliance is rarely commercially justified for early-stage MVPs. Level AA must be tailored to client legal obligations and target audience requirements.

---

### Evidence Item EVD-04: GitLab Professional Services Delivery Methodology
- **Title:** *Professional Services Delivery Methodology*
- **Publisher:** GitLab Inc. (GitLab Team Handbook)
- **Primary URL:** `https://handbook.gitlab.com/handbook/customer-success/professional-services-engineering/delivery-methodology/`
- **Date Accessed:** 2026-11-18
- **Document Status:** Public Professional Services Practice Model
- **Core Findings & Principles:**
  - Structures consulting and implementation delivery into explicit phases: Discovery, Planning, Iterative Execution, and Customer Transition.
  - Enforces Definition of Ready (DoR) before scheduling technical tasks and Definition of Done (DoD) before marking deliverables complete.
  - Utilizes standard delivery archetypes and accelerators for common technical engagements (migrations, integrations, architecture reviews).
- **Agency Applicability & Limitations:**
  - *Applicability:* Directly informs the 12-stage technical delivery lifecycle in `03-delivery-lifecycle/`, specifically the technical intake, requirements validation, and client handover gates.
  - *Limitations:* GitLab’s methodology is designed around its proprietary platform and dedicated enterprise engagement managers. Our agency must adapt these steps for smaller, multi-disciplinary teams using diverse tooling stacks.

---

## 2. Research Queue and Pending Verifications

| ID | Subject / Tool | Source to Evaluate | Target Category Document | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **RES-Q1** | Automated Dependency Vulnerability Scanning | Open Source Security Foundation (OpenSSF) Scorecard | `04-engineering-standards/dependencies-and-software-supply-chain.md` | Pending |
| **RES-Q2** | Secret Detection in Git Commits | OWASP Automated Secrets Management Cheat Sheet | `04-engineering-standards/environments-configuration-and-secrets.md` | Pending |
| **RES-Q3** | Mobile App Store Release Constraints | Apple App Store Review Guidelines & Google Play Policy | `02-service-specialties/mobile-applications.md` | Pending |
| **RES-Q4** | Database Migration Verification | Martin Fowler: Evolutionary Database Design | `04-engineering-standards/data-databases-and-test-data.md` | Pending |
| **RES-Q5** | AI Coding Assistant Risk Mitigation | OWASP Top 10 for Large Language Model Applications | `04-engineering-standards/ai-assisted-development.md` | Pending |
