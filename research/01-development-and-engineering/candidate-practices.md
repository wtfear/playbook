---
title: "Candidate Engineering Practices"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./evidence-register.md"
  - "./applicability-matrix.md"
  - "../../categories/01-development-and-engineering/01-engineering-governance/engineering-decisions.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains research and evaluation materials. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


# Candidate Engineering Practices

This document analyzes candidate technical practices under evaluation for agency adoption. Each entry provides a structured assessment to support future Operating Decision Records (ODRs).

> [!NOTE]
> Inclusion in this catalog indicates active evaluation, not approved policy. Decisions are marked as `proposed`, `modify`, `defer`, or `reject` until ratified.

---

## Practice CP-01: Automated Pre-Commit Secret Scanning

- **Problem Addressed:** Accidental leakage of API keys, database credentials, and tokens into Git repositories, causing critical security exposure and costly credential rotation.
- **Source / Evidence:** NIST SP 800-218 (PS.1.1, PS.3.1); OWASP Secrets Management Guidelines.
- **Applicability:** All client and agency codebases regardless of technology stack.
- **Expected Benefit:** Prevents secret leakage at the developer workstation before code is pushed to remote repositories.
- **Cost and Complexity:** Low cost; requires local git hook setup or IDE extensions (e.g., Gitleaks, detect-secrets).
- **Dependencies:** Standardized developer onboarding scripts; secrets manager adoption.
- **Proposed Owner:** Engineering Lead / Security Lead (unassigned).
- **Minimum Useful Implementation:** A lightweight pre-commit hook scanning staged diffs for common secret patterns, coupled with an automated GitHub/GitLab Actions CI gate.
- **Exceptions:** Projects where client infrastructure strictly forbids local hook installation (fallback to CI-only scanning).
- **Validation Evidence:** Validated in Scenario Walkthrough 2 (Custom App) and Scenario Walkthrough 4 (Project Takeover).
- **Preliminary Decision:** **Adopt** (pending tooling selection ODR).

---

## Practice CP-02: Mandatory Peer Code Review Before Production Merge

- **Problem Addressed:** Unchecked bugs, architectural misalignment, poor maintainability, and single-developer silos.
- **Source / Evidence:** DORA Core Capabilities (Continuous Integration); NIST SP 800-218 (PW.7.1).
- **Applicability:** All production-targeted code across all engagement patterns.
- **Expected Benefit:** Improved software quality, shared technical context across the team, and early defect prevention.
- **Cost and Complexity:** Moderate; requires at least two technical team members and can slow down single-developer prototype velocity if not tailored.
- **Dependencies:** GitHub/GitLab pull request workflows; branch protection rules.
- **Proposed Owner:** Senior Engineer / Tech Lead (unassigned).
- **Minimum Useful Implementation:** At least one mandatory peer approval on pull requests to the default branch, with automated linting and tests passing first.
- **Exceptions:** Rapid throwaway prototypes (Engagement Pattern 01) or emergency production hotfixes where an owner approves post-hoc review.
- **Validation Evidence:** Validated in Scenario Walkthrough 5 (Failed Release Post-Mortem).
- **Preliminary Decision:** **Modify** (adopt for production projects; exempt throwaway spikes with explicit client acknowledgment).

---

## Practice CP-03: Definition of Ready (DoR) Prior to Sprint Intake

- **Problem Addressed:** Developers starting work on ambiguous, half-baked user stories leading to rework, missed estimates, and scope friction.
- **Source / Evidence:** GitLab Professional Services Delivery Methodology; Agile Alliance standards.
- **Applicability:** All iterative client development projects.
- **Expected Benefit:** Clear requirements, verifiable acceptance criteria, and reduced mid-sprint blockers.
- **Cost and Complexity:** Low technical cost; requires discipline during discovery and client backlog grooming.
- **Dependencies:** Collaboration with [`../../11-project-delivery-and-client-service/`](../../categories/11-project-delivery-and-client-service/README.md).
- **Proposed Owner:** Project Delivery Lead / Tech Lead (unassigned).
- **Minimum Useful Implementation:** A 5-point checklist verifying: business objective defined, user journey mapped, mockups available, acceptance criteria written, dependencies unblocked.
- **Exceptions:** Early exploratory discovery spikes or proof-of-concept sprints.
- **Validation Evidence:** Validated in Scenario Walkthrough 2 (Custom App) and Walkthrough 3 (Automation).
- **Preliminary Decision:** **Adopt** (coordinate with Project Delivery category).

---

## Practice CP-04: Automated Database Migration Rollback Verification

- **Problem Addressed:** Irreversible schema changes causing prolonged outages during failed releases or rollbacks.
- **Source / Evidence:** DORA Database Change Management; Evolutionary Database Design principles.
- **Applicability:** Applications with relational or stateful databases.
- **Expected Benefit:** Ensures deployments can be safely aborted or reversed without data corruption.
- **Cost and Complexity:** Moderate-to-high complexity; requires down-migration scripts and isolated CI database testing.
- **Dependencies:** Standardized migration frameworks (e.g., Prisma, Flyway, Alembic).
- **Proposed Owner:** Backend / Data Lead (unassigned).
- **Minimum Useful Implementation:** CI check running `migrate up` followed immediately by `migrate down` against a fresh test database container.
- **Exceptions:** No-code tools or simple document stores where schemas are unmanaged.
- **Validation Evidence:** Validated in Scenario Walkthrough 5 (Failed Release).
- **Preliminary Decision:** **Modify** (tailor based on data sensitivity and operational tier).

---

## Practice CP-05: AI-Assisted Code Generation Safeguards

- **Problem Addressed:** Insertion of unverified, insecure, or hallucinated code, outdated library dependencies, or proprietary client data leakage into commercial LLMs.
- **Source / Evidence:** NIST SP 800-218 (PW.1.1); OWASP Top 10 for LLMs.
- **Applicability:** All developers using AI assistants (Copilot, Claude, ChatGPT, etc.).
- **Expected Benefit:** Accelerates boilerplate authoring while preventing security regressions and license contamination.
- **Cost and Complexity:** Low technical cost; requires clear human-review policies and prompt hygiene.
- **Dependencies:** [`../../12-legal-security-and-risk-management/`](../../categories/12-legal-security-and-risk-management/README.md) and [`../../13-knowledge-systems-and-automation/`](../../categories/13-knowledge-systems-and-automation/README.md).
- **Proposed Owner:** Principal Engineer (unassigned).
- **Minimum Useful Implementation:** Policy mandating human line-by-line review, banning submission of client credentials or proprietary logic to public models, and requiring automated unit tests for all AI-generated logic.
- **Exceptions:** None for production code.
- **Validation Evidence:** Walkthrough 2 (Custom App).
- **Preliminary Decision:** **Adopt as Proposed Guideline** (requires founder review).
