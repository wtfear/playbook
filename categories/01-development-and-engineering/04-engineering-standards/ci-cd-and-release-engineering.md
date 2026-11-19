---
title: "Standard: CI/CD and Release Engineering"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../../research/01-development-and-engineering/evidence-register.md"
  - "./source-control-and-change-integration.md"
  - "./data-databases-and-test-data.md"
  - "../03-delivery-lifecycle/09-release-readiness-and-deployment.md"
---

# Standard: CI/CD and Release Engineering

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for automated continuous integration (CI), continuous delivery (CD), automated DevSecOps validation, immutable artifact generation, and zero-downtime deployment strategies.

---

## 2. Risk-Tiered CI/CD Pipeline & Candidate Stages

To maintain rapid developer feedback loops without sacrificing security, pipelines are tailored by project risk tier and trigger event per [`../01-engineering-governance/project-risk-and-tailoring.md`](../01-engineering-governance/project-risk-and-tailoring.md). Heavy validation stages must never block routine PRs or solo-developer iteration.

### 2.1 Fast Pull Request Baseline (Lightweight PR Candidate)
Every routine pull request executes a fast-feedback check (< 3–5 minutes target duration):
- **Secret Scan:** Pre-commit or CI secret detection (e.g., Gitleaks) to prevent credential leaks.
- **Linting & Code Style:** Fast static linters (e.g., ESLint, Ruff, Biome).
- **Type Checking:** Static type verification (e.g., `tsc --noEmit`, `mypy`).
- **Unit Testing:** Fast, isolated unit tests (e.g., Vitest, pytest).

### 2.2 Extended Stages (Release Branches & Tier 2/3 Engagements)
Heavier stages run conditionally on release tags, scheduled nightly builds, or high-risk Tier 3 engagements—**never mandatory on every routine PR**:

| Stage | Candidate Purpose | Example Tools | When Triggered / Applicable |
| :--- | :--- | :--- | :--- |
| **SCA & Dependency Audit** | Check for unpatched Critical CVEs | `npm audit`, Dependabot | Scheduled / Release PRs |
| **Static Security (SAST)** | Static vulnerability scanning | Semgrep, CodeQL | Release branches / Tier 3 |
| **Integration Testing** | Containerized service testing | Testcontainers, LocalStack | Pre-release or Tier 2/3 builds |
| **Contract & API Testing** | Inter-service API schema compatibility | OpenAPI diff, Pact | Multi-service API releases |
| **Immutable Build & Packaging** | Produce versioned container/bundle | Docker, Buildpacks | Merge to `main` / Release |
| **Container Scan** | Scan container OS layers | Trivy, Grype | Containerized release builds |
| **Signing & SBOM** | Attest provenance and software bill of materials | Cosign, Syft | High-compliance / Tier 3 client releases |
| **Staging Smoke Deployment** | Verify ephemeral preview or staging health | Cloud PaaS / Health probe | Staging deploy trigger |
| **Performance Benchmark** | Load or frontend regression testing | k6, Lighthouse CI | Major milestone releases |

---

## 3. The 5 Principles of Immutable Artifacts

Modern deployment pipelines forbid rebuilding software artifacts per environment. Code must follow these immutable principles:

1. **Build Once, Deploy Anywhere:** The exact same binary, container image, or bundle deployed to staging is promoted to production. Configuration is never compiled into the artifact; it is injected at runtime via environment variables or secret vaults.
2. **Cryptographic Signing & Provenance:** Where client contracts or Tier 3 security require verifiable supply-chain security (SLSA Level 2+), production images should be signed using Cosign/Sigstore with keyless OIDC provenance.
3. **Traceability to Commit SHA:** Artifact tags must map directly to the immutable Git commit SHA (`image:sha-4b3f8a1`) rather than mutable labels like `latest`.
4. **Software Bill of Materials (SBOM):** Every build automatically generates a CycloneDX or SPDX JSON manifest cataloging all third-party dependencies, licenses, and hashes.
5. **Promotion Without Rebuild:** Moving from Staging to Production is an orchestration metadata update, pointing the production router to the verified artifact digest.

---

## 4. Deployment Strategies Decision Matrix

Choose the release deployment strategy based on the project risk tier, infrastructure architecture, and downtime tolerance:

| Strategy | Mechanism | Key Advantages | Trade-Offs / Risks | Recommended Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Rolling Deployment** | Progressively replaces old instances with new instances across nodes. | Zero downtime; requires no additional infrastructure capacity. | **The Mixed-Version Trap:** Old and new code run simultaneously during rollout. | Standard stateless APIs, background worker pools. |
| **Blue-Green Deployment** | Deploys new version to an idle identical environment ("Green"), verifies health, then flips router. | Instant cutover; instant rollback by flipping traffic back to "Blue". | Requires 2x infrastructure footprint and temporary double cost. | Mission-critical monoliths, high-risk production upgrades. |
| **Canary Deployment** | Routes small slice of real traffic (1% -> 5% -> 25% -> 100%) to new version while monitoring SLIs. | Minimizes blast radius; automatically aborts if error rates spike. | Complex traffic routing layer required; requires significant traffic volume to measure. | High-traffic SaaS products, consumer-facing applications. |
| **Feature Flags / Dark Launch**| Code is deployed dark into production; feature toggled per user cohort. | Decouples deployment from business release; granular user testing. | Technical debt accumulation if stale flags are not regularly purged. | Rapid continuous deployment, beta testing user groups. |

### The "Mixed-Version Trap"
During rolling deployments, instances running Version $N$ and Version $N+1$ exist simultaneously in production.
- **Rule:** API contracts and database structures must remain backward compatible with at least $N-1$ releases.
- **Enforcement:** Never introduce breaking schema changes in the same release that updates application read/write logic (see [`./data-databases-and-test-data.md`](./data-databases-and-test-data.md) for the Expand-Contract pattern).

---

## 5. Automated Rollback Protocol

An automated rollback must immediately trigger without requiring human intervention if:
1. Container readiness probes (`/health/ready`) fail for 3 consecutive intervals post-deployment.
2. HTTP 5xx error rate exceeds the SLO threshold (e.g., > 1% over a 3-minute window).
3. The p95 latency spikes by more than 100% over the pre-deployment baseline.

---

## 6. Related Documents
- [`./source-control-and-change-integration.md`](./source-control-and-change-integration.md): Git branching and commit rules.
- [`./data-databases-and-test-data.md`](./data-databases-and-test-data.md): Expand-contract database migration pattern.
- [`../03-delivery-lifecycle/09-release-readiness-and-deployment.md`](../03-delivery-lifecycle/09-release-readiness-and-deployment.md): Release readiness stage.
- [`../../../research/01-development-and-engineering/evidence-register.md`](../../../research/01-development-and-engineering/evidence-register.md): DORA CD benchmarks.
