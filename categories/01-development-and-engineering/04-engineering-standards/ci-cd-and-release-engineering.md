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

## 2. The 13-Stage DevSecOps CI Pipeline

Every pull request and merge to the trunk branch (`main`) must execute through an automated pipeline enforcing quality, security, and build integrity:

| Stage # | Pipeline Stage | Primary Tool / Mechanism | Pass / Fail Gate Criteria |
| :---: | :--- | :--- | :--- |
| `01` | **Pre-commit / Secret Scan** | Git hooks, Gitleaks, Trufflehog | Zero detected high-entropy credentials or API keys. |
| `02` | **Software Composition (SCA)**| Dependabot, Snyk, `npm audit` | Zero unpatched High/Critical known CVEs in libraries. |
| `03` | **Static Security (SAST)** | Semgrep, SonarQube, CodeQL | Zero OWASP Top 10 vulnerabilities detected in code. |
| `04` | **Linting & Code Style** | ESLint, Biome, Ruff, Prettier | 100% adherence to project style rules; zero warnings. |
| `05` | **Type Checking** | `tsc --noEmit`, `mypy`, `pyright` | Zero static type errors. |
| `06` | **Unit Testing** | Vitest, Jest, PyTest, Go test | 100% test pass rate; minimum line coverage enforced. |
| `07` | **Integration Testing** | Testcontainers, LocalStack | Successful communication with containerized dependencies. |
| `08` | **Contract & API Testing** | Pact, Schemathesis, OpenAPI diff | Zero breaking changes to public or inter-service schemas. |
| `09` | **Immutable Build** | Docker, Cloud Native Buildpacks | Deterministic, reproducible build artifact generated. |
| `10` | **Container Vulnerability Scan**| Trivy, Grype | Zero Critical CVEs in OS base layers or installed packages. |
| `11` | **Signing & SBOM Generation** | Cosign / Sigstore, Syft, CycloneDX | Signed cryptographic digest and exported software bill of materials. |
| `12` | **Staging Smoke Deployment** | Ephemeral preview / Staging runner | Health probe `/health/live` and `/health/ready` return 200 OK. |
| `13` | **Performance Benchmark** | Lighthouse CI, k6 | Performance budgets and p95 latency targets satisfied. |

---

## 3. The 5 Principles of Immutable Artifacts

Modern deployment pipelines forbid rebuilding software artifacts per environment. Code must follow these immutable principles:

1. **Build Once, Deploy Anywhere:** The exact same binary, container image, or bundle deployed to staging is promoted to production. Configuration is never compiled into the artifact; it is injected at runtime via environment variables or secret vaults.
2. **Cryptographic Signing:** Production images must be signed using Cosign/Sigstore with keyless OIDC provenance, establishing verifiable supply-chain security (SLSA Level 2+).
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
