---
title: "Category 12: Legal, Security, and Risk Management"
document_type: reference
category: "12-legal-security-and-risk-management"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../../README.md"
  - "../../structure-guide.md"
  - "../README.md"
---

# Category 12: Legal, Security, and Risk Management

## 1. Purpose
Defines the agency's legal protections, contractual safeguards, intellectual property rights, data security policies, credential controls, vendor risk evaluations, incident response procedures, and business continuity plans.

> [!CAUTION]
> **Confidentiality & Security Boundary:** This repository documents *how* sensitive information and credentials are managed. It **MUST NEVER** store actual secrets, passwords, API keys, private keys, banking details, personal identification numbers, or confidential client code. Use clearly labeled fictional placeholders if examples are required.

## 2. Scope
- Standard commercial contract templates (MSA, SOW, Mutual NDA).
- Intellectual Property (IP) ownership, copyright assignments, and open-source license governance.
- Client confidentiality obligations, data protection, and privacy compliance (e.g., GDPR, CCPA).
- Identity and access management (IAM), mandatory Multi-Factor Authentication (MFA), and least-privilege principles.
- Credential management and secrets hygiene (password managers, ephemeral secrets).
- Third-party SaaS vendor risk assessment and software supply-chain security.
- System backups, disaster recovery, and business continuity planning.
- Security incident classification, containment, root-cause investigation, and client disclosure.
- Statutory compliance and regulatory obligation tracking.

## 3. Out of Scope (Boundaries)
- **No Legal or Tax Advice:** Documents in this category are operating frameworks and templates, **not certified legal advice**. Material legal agreements must be vetted by licensed legal counsel.
- **Hands-on Technical Implementation:** Writing secure application code, configuring firewalls, or patching server packages belongs to [`../01-development-and-engineering/`](../01-development-and-engineering/README.md).
- **Commercial Negotiations:** Negotiating project scope and pricing belongs to [`../05-sales/`](../05-sales/README.md), operating within Legal's redline boundaries.
- **Financial Controls & Invoicing:** Banking management, invoice collection, and tax filings belong to [`../10-finance-and-money-management/`](../10-finance-and-money-management/README.md).

## 4. Related Categories
- [`../01-development-and-engineering/`](../01-development-and-engineering/README.md): Implements technical security standards, automated vulnerability scans, and secure coding practices.
- [`../05-sales/`](../05-sales/README.md): Uses approved contract templates (MSA/SOW) and seeks legal review for client markups.
- [`../04-people-and-relationship-management/`](../04-people-and-relationship-management/README.md): Executes NDAs and IP assignment agreements with all contractors and employees prior to onboarding.
- [`../13-knowledge-systems-and-automation/`](../13-knowledge-systems-and-automation/README.md): Ensures data governance and security compliance for AI tools and internal automations.

## 5. Candidate Playbooks and Workflows to Investigate
*(All items below are proposed candidates for future research and discussion; none are approved yet).*

- **[Proposed Policy] Secrets Management & Access Control Policy:** Mandatory enforcement of 1Password/Bitwarden, mandatory hardware/app-based MFA, and prohibition of secrets in code repositories.
- **[Proposed Playbook] Security Incident Response & Notification Playbook:** Step-by-step severity classification, technical containment, investigation, and client notification protocol.
- **[Proposed Playbook] Standard Contract Terms & Redline Negotiation Playbook:** Acceptable compromise ranges for indemnification, liability caps, warranties, and payment milestones.
- **[Proposed Checklist] Third-Party Vendor & Tool Security Checklist:** Standardized evaluation of security, data privacy, and compliance before onboarding new SaaS tools.
- **[Proposed Playbook] Backup Verification & Disaster Recovery Playbook:** Cadence and procedures for verifying automated database and repository backups.

## 6. Important Handoffs
- **From Legal (12) → Sales (05):** Approved contract templates (MSA, SOW, NDA) and negotiation guidelines.
- **From Legal (12) → People Management (04):** Standard contractor and employee agreements with strong IP assignment clauses.
- **From Engineering (01) / Delivery (11) → Legal & Security (12):** Security incidents, data leak alerts, or client contract disputes requiring escalation.

## 7. Open Questions
- What licensed legal counsel will review the agency's baseline MSA, SOW, and Contractor agreements?
- What governing jurisdiction and choice of law will be specified in agency agreements?
- What standard liability cap (e.g., total fees paid in previous 6 months) will be our non-negotiable legal floor?
- What enterprise password manager will be made mandatory across the team?

## 8. Suggested Next Discussion Topics
1. Drafting standard Mutual NDA and Master Services Agreement (MSA) templates.
2. Formulating the mandatory Secrets Management & Access Control Policy.
3. Defining security incident classification tiers and escalation contacts.
