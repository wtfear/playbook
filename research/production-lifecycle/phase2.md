---
title: "Research: Production Lifecycle - Phase 2: Build & Test"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/testing-and-quality-engineering.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains external research and candidate reference material. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

# Phase 2: Build & Test — A Generalized Guide

## What Phase 2 actually is

Phase 1 produced code that works on a developer's machine and emits telemetry. Phase 2 answers a harder question: **Can this code be turned into a verified, safe, deployable artifact that will not break production?**

Phase 2 is the **quality gate** between development and production. It is where code stops being a collection of files and becomes a **release candidate** — an immutable, tested, scanned, signed, and traceable unit of software.

The critical mental shift: **Phase 2 is not about running tests. It is about building confidence.** Tests, scans, staging deployments, and load tests are all instruments for answering one question: *"Do we have enough evidence that this release will not cause an incident?"*

---

## Section 2.1 — The Build: From Code to Artifact

**Why this section exists:** In development, you run code directly from source. In production, you deploy an **artifact** — a compiled, packaged, versioned, immutable unit that can be deployed identically to any environment.

### 2.1.1 The CI pipeline

The CI pipeline is the automated process that turns a Git commit into a verified artifact. It runs on every push and pull request.

**Pipeline stages (in order):**

| Stage | What it does | Tool examples | Failure action |
|---|---|---|---|
| **Checkout** | Pull the exact commit | Git | Fail |
| **Secrets scan** | Detect leaked credentials | Gitleaks, TruffleHog | Block merge |
| **Dependency scan** | Check third-party libraries for CVEs | pip-audit, npm audit, Snyk, Dependabot | Block merge on critical |
| **Lint** | Code style and static analysis | ESLint, Pylint, Ruff, SonarCloud | Block merge |
| **Type check** | Type safety validation | TypeScript, mypy, Pyright | Block merge |
| **Unit tests** | Fast, isolated logic tests | Jest, pytest, JUnit, Go test | Block merge |
| **Integration tests** | Component interaction tests | Testcontainers, Docker Compose | Block merge |
| **Contract tests** | API agreement validation | Pact, Dredd, Schemathesis | Block merge |
| **SAST** | Static application security testing | Semgrep, CodeQL, Bandit, SonarCloud | Block merge on critical/high |
| **Build** | Compile / bundle / containerize | Docker, Gradle, webpack, Go build | Fail |
| **Container scan** | Scan built image for vulnerabilities | Trivy, Grype, Clair | Block merge on critical |
| **SBOM generation** | Record all dependencies | Syft, CycloneDX, SPDX | Warn or fail |
| **Artifact sign** | Cryptographically sign the artifact | Cosign, Sigstore, GPG | Fail |
| **Publish artifact** | Store in registry | Container registry, artifact repository | Fail |

A real-world DevSecOps pipeline bakes security into every stage rather than treating it as an afterthought. Every push triggers secrets scanning, dependency auditing, SAST, DAST, container scanning, and SBOM generation before the artifact is allowed to proceed.

### 2.1.2 Artifact rules

An artifact is the **only thing** that should ever reach production. It must be:

- **Immutable.** Once built, never modified. If a change is needed, build a new artifact. This is non-negotiable. Rebuilding "the latest" on each machine produces subtly different builds of "the same" version, which is how servers end up running different code than intended.
- **Versioned.** Tagged with a semantic version (e.g., `v1.4.2`) or Git SHA. The version must map back to the exact commit.
- **Signed.** Cryptographically signed so its integrity can be verified at deployment time. Sigstore/Cosign is the modern standard for keyless signing and provenance attestation.
- **Traceable.** Accompanied by provenance metadata (which commit, which pipeline run, which dependencies) and an SBOM (Software Bill of Materials) listing every component.
- **Promoted, not rebuilt.** The **same artifact** that passes staging must be the one deployed to production. Rebuilding between environments introduces the possibility of divergence.

**Placeholder:**
- Artifact type: `_________________` (container image, binary, bundle, zip)
- Artifact registry: `_________________` (Docker Hub, GHCR, ECR, Artifactory)
- Versioning scheme: `_________________` (semver, Git SHA, date-based)
- Signing tool: `_________________` (Cosign, Sigstore, GPG)
- SBOM format: `_________________` (CycloneDX, SPDX)

### 2.1.3 Deterministic builds

A deterministic build produces the **same artifact hash** from the same source code, regardless of when or where it is built. This is the foundation of supply-chain integrity.

**Requirements:**
- Pin all dependencies to exact versions (lock files committed).
- Use fixed base images with digest references, not floating tags like `latest`.
- Reproducible build tooling where available.
- Build in a clean, isolated environment.

**Placeholder:**
- Dependency lock file: `_________________`
- Base image pinning strategy: `_________________`

---

## Section 2.2 — Security Scanning (DevSecOps Gates)

**Why this section exists:** Security vulnerabilities found in production are 100× more expensive than those found in the pipeline. Phase 2 is where automated security gates block bad code from advancing.

### 2.2.1 Types of security scanning

| Scan type | What it finds | When it runs | Tool examples |
|---|---|---|---|
| **Secrets scanning** | Leaked API keys, tokens, passwords in code or history | Every commit | Gitleaks, TruffleHog |
| **Dependency scanning (SCA)** | Known CVEs in third-party libraries | Every commit | pip-audit, npm audit, Snyk, Dependabot |
| **SAST** | Insecure code patterns (SQL injection, hardcoded credentials, unsafe deserialization) | Every commit | Semgrep, CodeQL, Bandit, SonarCloud |
| **Container scanning** | Vulnerabilities in OS packages and libraries inside container images | After build | Trivy, Grype, Clair |
| **DAST** | Runtime vulnerabilities in a running application | After staging deploy | OWASP ZAP, Burp Suite |
| **License scanning** | Risky or incompatible open-source licenses | Every commit | FOSSA, Snyk, Licensee |
| **IaC scanning** | Misconfigurations in infrastructure-as-code | Every commit | Checkov, tfsec, KICS |

### 2.2.2 Security gate policy

Not every finding should block a release. Define a policy:

| Severity | Action | Exception process |
|---|---|---|
| **Critical** | Block release. Must fix before deploy. | Requires security owner approval with documented compensating control |
| **High** | Block release unless exception approved | Security owner approval |
| **Medium** | Warn. Track in backlog. | No exception needed |
| **Low** | Informational. Fix opportunistically. | No exception needed |

**Placeholder:**
- Security gate policy: `_________________`
- Exception approver: `_________________`
- Vulnerability tracking tool: `_________________`

---

## Section 2.3 — Test Strategy

**Why this section exists:** Phase 1 wrote tests. Phase 2 defines the **strategy** — which tests exist, what they validate, and how they fit together into a coherent quality system.

### 2.3.1 The test pyramid

The test pyramid is the organizing principle for a healthy test suite. The shape matters: many fast tests at the bottom, fewer slower tests at the top. This is described as "pyramid, not ice cream cone" — many fast unit tests, fewer integration tests, minimal end-to-end tests.

```
        /\
       /  \        E2E tests (5-10%)
      /----\       Critical user journeys
     /      \
    /--------\     Integration tests (15-25%)
   /          \    API, database, queues
  /------------\
 /              \  Unit tests (60-70%)
/________________\ Business logic in isolation
```

| Layer | What it tests | Speed | Quantity | Dependencies |
|---|---|---|---|---|
| **Unit** | Individual functions and classes | Milliseconds | Many | None (mocked) |
| **Integration** | Components working together | Seconds | Moderate | Real DB, cache, queue |
| **Contract** | API agreements between services | Seconds | One per boundary | Consumer/provider |
| **E2E** | Full user journeys | Minutes | Few | Full system |

The goal is a test suite that is **fast, reliable, and meaningful**. Flaky tests (tests that pass and fail randomly) are worse than no tests, because they erode confidence in the entire suite.

**Placeholder:**
- Unit test coverage target: `________%` (critical paths 90%+)
- Integration test coverage target: `________%`
- E2E tests: `_________________` (list critical journeys)
- Contract tests: `_________________` (list API boundaries)

### 2.3.2 Shift-left and shift-right

**Shift-left:** Move testing earlier in the development cycle. Catch defects before they reach production.
- Test-driven development (TDD) and behavior-driven development (BDD).
- Static analysis and linting.
- Unit and integration tests in CI.

**Shift-right:** Test in production or production-like environments. Validate real-world behavior.
- Canary deployments and A/B testing.
- Synthetic monitoring and real user monitoring (RUM).
- Chaos engineering.
- Feature flags for safe rollout.

Shift-left targets predictable defects during development. Shift-right addresses unpredictable failures in production. Together, they form a continuous quality loop.

### 2.3.3 Test types and their purpose

| Test type | Validates | When | Environment |
|---|---|---|---|
| **Unit** | Business logic in isolation | Every commit | Local + CI |
| **Integration** | Components working together | Every commit | CI with containers |
| **Contract** | API compatibility between services | Every commit | CI |
| **End-to-end** | Full user flow | Pre-deploy | Staging |
| **Load** | System under expected and peak traffic | Pre-release | Staging or prod-like |
| **Stress** | System beyond peak, to find breaking point | Pre-release | Staging |
| **Soak** | System under sustained load for hours | Pre-release | Staging |
| **Chaos** | Resilience to infrastructure failures | Periodically | Staging or production |
| **Security** | Vulnerabilities | Every commit (SAST) + pre-release (DAST) | CI + staging |
| **Accessibility** | WCAG compliance | Pre-release | Staging |
| **Compatibility** | Browser, device, OS support | Pre-release | Device farm or cloud |

### 2.3.4 Load testing

Load testing answers: *"Can the system handle expected traffic without degrading?"*

**Types of load tests:**

| Test | Purpose | Load level | Duration |
|---|---|---|---|
| **Smoke** | Verify system works under minimal load | 1-5 users | Minutes |
| **Load** | Validate expected traffic | Expected peak | 30+ minutes |
| **Stress** | Find breaking point | Beyond peak until failure | Until failure |
| **Spike** | Test sudden traffic surge | Sudden 10× increase | Minutes |
| **Soak** | Find memory leaks, resource exhaustion | Expected peak | Hours |

**Key metrics to capture:**
- Throughput (requests per second)
- Latency percentiles (p50, p95, p99)
- Error rate under load
- Resource utilization (CPU, memory, connections)

**Load test target:** `________ RPS` at `________ p95 latency` with `<________%` error rate.

**Tool:** `_________________` (k6, Locust, Gatling, JMeter)

### 2.3.5 Chaos engineering

Chaos engineering deliberately introduces failures to verify that the system degrades gracefully.

**Experiments to run:**
- Kill a database instance and verify failover.
- Introduce network latency between services.
- Fill a disk and verify alerting.
- Terminate an application instance and verify load balancing.
- Block an external API and verify circuit breaker behavior.

**Placeholder:**
- Chaos experiments planned: `_________________`
- Chaos tool: `_________________` (Chaos Monkey, Litmus, Gremlin, custom)

---

## Section 2.4 — Staging Environment & Environment Promotion

**Why this section exists:** Staging is where the artifact proves itself before production. It must be as close to production as possible, or the validation is meaningless.

### 2.4.1 Environment strategy

| Environment | Purpose | Data | Access | Deploy trigger |
|---|---|---|---|---|
| **Development** | Feature work | Mock / synthetic | Developers | On every commit |
| **Staging** | Pre-production validation | Production-like (anonymized) | Team | On promotion from dev |
| **Production** | Live users | Real | Restricted | On approval |

### 2.4.2 Environment promotion gates

Changes should be validated in lower environments before being promoted to the next. The flow:

```
Feature Branch → Development → Staging → Production
```

**Development gate:**
- Build, lint, unit tests pass.
- Database migrations run against dev database.
- Smoke tests pass.

**Staging gate:**
- Full test suite (integration, contract, E2E) passes.
- Database migrations run against staging database.
- E2E tests pass against staging URL.
- DAST scan passes.
- Manual approval before production promotion.

**Production gate:**
- Database migrations run against production database (with rollback plan).
- Build and deploy artifact.
- Post-deploy health check.
- Rollback procedure if health check fails.

**Placeholder:**
- Environment URLs: `_________________`
- Promotion process: `_________________` (automated, manual, PR-based)
- Approval required: `Yes / No` — Who: `_________________`

### 2.4.3 Staging parity

Staging must match production in:
- OS and runtime versions.
- Database version and configuration.
- Environment variables (values may differ, structure must match).
- Network topology and security groups.
- Data volume and characteristics (anonymized production data preferred).
- Third-party service configurations (sandbox mode).

**Red flag:** If staging uses SQLite while production uses PostgreSQL, staging validation is incomplete.

**Placeholder:**
- Staging/production parity gaps: `_________________`
- Data anonymization strategy: `_________________`

---

## Section 2.5 — Database Migration Testing

**Why this section exists:** Database migrations are one of the most dangerous operations in production. A bad migration can cause data loss, downtime, or corruption. Migrations must be tested in staging before touching production.

### 2.5.1 Migration testing requirements

| Requirement | Why |
|---|---|
| **Run against production-like data** | Small test datasets hide performance and constraint issues |
| **Dry-run / validation step** | Catch syntax errors before applying |
| **Backward compatible** | No breaking schema changes without multi-step rollout |
| **Rollback tested** | Every migration must have a tested rollback procedure |
| **Performance tested** | Long-running migrations can lock tables and cause downtime |
| **Block deploy on failure** | A failed migration must prevent the application from deploying |

### 2.5.2 Migration safety patterns

| Pattern | When to use | How |
|---|---|---|
| **Additive only** | Default | Add columns/tables; never drop in the same release |
| **Multi-step rollout** | Renaming or restructuring | Step 1: add new column. Step 2: migrate data. Step 3: switch reads. Step 4: drop old column (next release) |
| **Online migrations** | Large tables | Use tools like pt-online-schema-change or gh-ost |
| **Feature-flagged migrations** | Risky changes | Gate reads/writes behind feature flags during transition |

**Placeholder:**
- Migration tool: `_________________` (Flyway, Alembic, Drizzle, Prisma, Rails migrations)
- Rollback procedure: `_________________`
- Migration testing in staging: `_________________`
- Long-running migration strategy: `_________________`

---

## Section 2.6 — Release Readiness Assessment

**Why this section exists:** Before promoting to production, you need an evidence-based confidence check. Release readiness is not about completing tasks — it is about answering: *"Can we ship this without causing critical issues?"*

### 2.6.1 The seven readiness signals

| Signal | Question | What to check |
|---|---|---|
| **Test** | Are tests passing and stable? | All tests pass. No flaky tests. Coverage adequate. Regression tests cover previous bugs. |
| **Code quality** | Is code review complete? | 100% of production code reviewed. No open comments. Security-sensitive changes reviewed by security owner. |
| **Requirements** | Are features validated? | Acceptance criteria met. Edge cases tested. PM sign-off. |
| **Risk** | Are high-risk changes protected? | Migrations tested with production-like data. Breaking changes have migration plan. Load testing done. |
| **Environment** | Does staging match production? | Staging configuration matches. Smoke tests pass. |
| **Rollout** | Is the rollout safe? | Canary or blue-green plan. Feature flags ready. Rollback tested. |
| **Team** | Is the team prepared? | Runbooks updated. Monitoring configured. On-call briefed. |

### 2.6.2 Go/No-Go decision

Before production promotion, the following must be true:

- ✅ All automated gates passed (CI, security, staging).
- ✅ Artifact is immutable, signed, and traceable.
- ✅ Database migrations tested and rollback procedure documented.
- ✅ Load testing completed with acceptable results.
- ✅ Rollback plan tested and documented.
- ✅ Monitoring and alerts configured for new features.
- ✅ Runbooks updated for new failure modes.
- ✅ On-call team briefed on changes.
- ✅ Feature flags set to safe defaults (off).
- ✅ Release notes drafted.

**Who makes the Go/No-Go decision:** `_________________`

---

## Section 2.7 — Release Artifacts & Documentation

**Why this section exists:** A release is not just an artifact. It is a package of software, documentation, and communication.

### 2.7.1 Release package

Every release should include:

| Artifact | Purpose |
|---|---|
| **Immutable artifact** | The deployable software |
| **SBOM** | Software Bill of Materials — all dependencies |
| **Provenance attestation** | Proof of where the artifact came from |
| **Release notes** | What changed, for users and support |
| **Changelog** | Technical summary of changes |
| **Migration guide** | For breaking changes (if any) |
| **Rollback procedure** | Step-by-step rollback instructions |
| **Monitoring plan** | What to watch after deploy |

### 2.7.2 Release notes template

```
## Release vX.Y.Z — [Date]

### New Features
- ...

### Improvements
- ...

### Bug Fixes
- ...

### Breaking Changes
- ...

### Migration Required
- Yes / No — Details

### Rollback
- Procedure: ...

### Known Issues
- ...
```

**Placeholder:**
- Release notes location: `_________________`
- Changelog tool: `_________________`
- Communication channel: `_________________`

---

## Section 2.8 — Phase 2 Completion Gate

Before moving to Phase 3 (Release & Deploy), confirm:

- [ ] CI pipeline runs on every commit with all stages
- [ ] Secrets scanning is active and passing
- [ ] Dependency scanning is active with policy for critical/high CVEs
- [ ] SAST is running and findings are triaged
- [ ] Container image is scanned for vulnerabilities
- [ ] SBOM is generated for every build
- [ ] Artifact is immutable, versioned, signed, and traceable
- [ ] Artifact is promoted (not rebuilt) between environments
- [ ] Unit tests pass with coverage target met
- [ ] Integration tests pass
- [ ] Contract tests pass (if applicable)
- [ ] E2E tests pass against staging
- [ ] Load testing completed with acceptable results
- [ ] Chaos experiments run (if applicable)
- [ ] DAST scan passes against staging
- [ ] Staging environment matches production configuration
- [ ] Database migrations tested in staging with rollback verified
- [ ] Release readiness assessment completed
- [ ] Go/No-Go decision made
- [ ] Release notes and rollback procedure documented
- [ ] Monitoring and alerts configured for new features
- [ ] Runbooks updated
- [ ] On-call team briefed

**If any box is unchecked, the release is not ready. Fix the gap or explicitly accept the risk with a documented decision.**

---

## How Phase 2 connects to the rest of the lifecycle

Phase 2 takes the instrumented code from Phase 1 and transforms it into a **verified release candidate**. It produces three things:

1. **An immutable artifact** — signed, versioned, with SBOM and provenance.
2. **Evidence of validation** — test results, security scans, load test results, staging validation.
3. **A release package** — artifact, release notes, rollback procedure, monitoring plan.

Phase 3 (Release & Deploy) takes this artifact and deploys it using canary, blue-green, or rolling strategies. Phase 4 (Operate) monitors the deployed service using the telemetry from Phase 1. Phase 5 (Observe & Analyze) measures user impact. Phase 6 (Maintain & Improve) uses the release evidence and post-deploy data to refine the next cycle.

**Without Phase 2, deployment is a gamble.** Phase 2 is what turns "we think this works" into "we have evidence this is safe to ship."
