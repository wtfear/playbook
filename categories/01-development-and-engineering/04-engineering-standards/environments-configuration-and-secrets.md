---
title: "Standard: Environments, Configuration, and Secrets"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./security-and-privacy-engineering.md"
  - "../../../research/01-development-and-engineering/candidate-practices.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: Environments, Configuration, and Secrets

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for strict separation of configuration from code, prevention of credential leakage, management of environment parity, and secure handling of sensitive API keys and secrets.

## 2. Proposed Scope
- Twelve-Factor App configuration principles: storing runtime configuration in environment variables, never hardcoded in source code.
- Mandatory `.env.example` templates documenting all required environment variables with dummy placeholder values.
- Absolute prohibition against committing plaintext secrets, passwords, private keys, or tokens to version control.
- Automated secret detection: pre-commit hooks (e.g., Gitleaks) and CI repository scanners.
- Centralized secrets management: evaluating team secret vaults (e.g., 1Password, Doppler, AWS Secrets Manager).
- Environment isolation: strict separation between Local, Ephemeral Preview, Staging, and Production environments with distinct credentials.
- Emergency credential rotation runbook for leaked or compromised API keys.

## 3. Applicability
Universal and non-negotiable across all repositories, contributors, and client deliverables.

## 4. Related Documents
- [`../../../research/01-development-and-engineering/candidate-practices.md`](../../../research/01-development-and-engineering/candidate-practices.md): Candidate Practice CP-01 (Pre-Commit Secret Scanning).
- [`./security-and-privacy-engineering.md`](./security-and-privacy-engineering.md): Broader application security standards.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Organizational secrets policy.

## 5. Questions to Research or Decide
- What enterprise secrets platform (e.g., 1Password developer tools vs. Doppler vs. Infisical) provides the best developer experience and client handover?
- What automated remediation workflow triggers if a secret is accidentally pushed to a public or private GitHub repository?
- How should ephemeral preview environments safely access database credentials without exposing production data?

## 6. Candidate Evidence and Artifacts
- Standard `.env.example` specification and linting rules.
- Gitleaks configuration file (`.gitleaks.toml`).
- Emergency Secret Revocation & Rotation Runbook.

## 7. Next Action
Select primary secrets management platform for engineering and deploy standard Gitleaks pre-commit hooks.
