---
title: "Lifecycle 06: Project Engineering Setup"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./07-iterative-implementation.md"
  - "../04-engineering-standards/source-control-and-change-integration.md"
  - "../04-engineering-standards/environments-configuration-and-secrets.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
---

# Lifecycle 06: Project Engineering Setup

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines the proposed setup sequence for establishing developer environments, initializing source control repositories, configuring secrets managers, setting up branch protection rules, and provisioning staging infrastructure before writing project code.

## 2. Proposed Scope
- Git repository initialization and folder structure conventions.
- Branch protection rules (mandatory PR review, required status checks, linear history).
- Contributor onboarding and local development environment setup (containerization via Docker, dev containers).
- Configuration and secrets setup: `.env.example` templates, centralized secrets injection (e.g., 1Password / Doppler / cloud secrets).
- Initial CI pipeline configuration (linting, type checking, automated testing, pre-commit secret scanning).
- Staging and preview deployment environment provisioning.
- Baseline dependency lockfile generation and package manager verification.

## 3. Applicability
Mandatory initial milestone for all new build projects and major system modernizations.

## 4. Related Documents
- [`../04-engineering-standards/source-control-and-change-integration.md`](../04-engineering-standards/source-control-and-change-integration.md): Git conventions.
- [`../04-engineering-standards/environments-configuration-and-secrets.md`](../04-engineering-standards/environments-configuration-and-secrets.md): Secrets hygiene.
- [`../04-engineering-standards/ci-cd-and-release-engineering.md`](../04-engineering-standards/ci-cd-and-release-engineering.md): Pipeline setup.
- [`./07-iterative-implementation.md`](./07-iterative-implementation.md): Subsequent development stage.

## 5. Questions to Research or Decide
- What standard project template or starter repository (scaffold) will be used for each primary framework?
- How are client developers given access to agency staging environments without exposing agency-wide secrets?
- What is the target duration for completing engineering setup (e.g., < 1 business day)?

## 6. Candidate Evidence and Artifacts
- Project Repository Setup Checklist.
- Initialized Git Repository with passing CI "Hello World" build.
- Staging Environment Health Check URL.

## 7. Next Action
Build reusable repository starter templates with pre-configured CI/CD workflows and linting rules.
