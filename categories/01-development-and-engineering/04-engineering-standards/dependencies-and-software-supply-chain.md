---
title: "Standard: Dependencies and Software Supply Chain"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "./security-and-privacy-engineering.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: Dependencies and Software Supply Chain

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for managing third-party libraries, locking dependencies, scanning for known vulnerabilities, vetting open-source licenses, and mitigating software supply chain risks.

## 2. Proposed Scope
- Deterministic builds: mandatory lockfile enforcement (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`, `go.sum`) with frozen installs in CI.
- Automated vulnerability scanning: running security audits (e.g., `npm audit`, Snyk, Trivy, GitHub Dependabot) on PRs.
- Dependency upgrade cadence: scheduled maintenance routines to patch out-of-date packages and runtime versions.
- Open-source license compliance: vetting packages against copyleft (GPL, AGPL) restrictions and escalating questionable licenses to Legal.
- Supply chain protection: verifying package registry integrity, avoiding typosquatting, and limiting dependency bloat.
- Software Bill of Materials (SBOM) generation (e.g., CycloneDX / SPDX) when required for enterprise client compliance.

## 3. Applicability
Applies to all codebases importing external libraries, container images, or third-party SDKs.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): NIST SSDF (PW.4) supply chain evidence.
- [`./security-and-privacy-engineering.md`](./security-and-privacy-engineering.md): Threat modeling and vulnerability response.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Legal licensing boundaries.

## 5. Questions to Research or Decide
- What severity threshold (e.g., Critical / High CVEs) automatically blocks a production build in CI?
- How should dependency update automation (e.g., Renovate bot) be configured to prevent PR notification fatigue?
- What is our approved open-source license whitelist (e.g., MIT, Apache 2.0, BSD, ISC) that does not require individual legal review?

## 6. Candidate Evidence and Artifacts
- Automated CI Dependency Vulnerability Scan Audit Log.
- Open Source License Compliance Report.
- Software Bill of Materials (SBOM) JSON export.

## 7. Next Action
Draft agency open-source license whitelist in consultation with Legal (Category 12).
