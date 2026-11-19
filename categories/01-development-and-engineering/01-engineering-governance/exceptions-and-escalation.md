---
title: "Technical Exceptions and Escalation"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./review-gates-and-evidence.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Technical Exceptions and Escalation

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines proposed procedures for requesting, evaluating, and documenting exceptions to engineering standards, and the escalation paths for critical technical blockers, security risks, or delivery failures.

## 2. Proposed Scope
- **Technical Exception Requests:** Deviations from standard frameworks, skipping mandatory tests, temporary secrets handling, or bypassing PR reviews.
- **Risk Acceptance & Time-Boxing:** Mandatory expiration dates on technical waivers, technical debt logging, and required remediation plans.
- **Escalation Triggers:** Unresolved architectural disputes, severe production incidents, discovered high-severity zero-day vulnerabilities, or critical third-party dependency outages.
- **Escalation Protocol:** Notification sequence from developer to Tech Lead, Project Delivery Lead, and Agency Founders.

## 3. Applicability
Applies to all engineering contributors when standard guidelines cannot be met due to extraordinary technical or commercial constraints.

## 4. Related Documents
- [`../06-engineering-improvement/technical-debt-management.md`](../06-engineering-improvement/technical-debt-management.md): Tracking waived items.
- [`../04-engineering-standards/backup-recovery-and-incident-engineering.md`](../04-engineering-standards/backup-recovery-and-incident-engineering.md): Incident handling.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Security escalations.

## 5. Questions to Research or Decide
- Who holds the sole authority to approve an exception involving security, data privacy, or production credentials?
- How do we prevent temporary technical waivers from silently becoming permanent technical debt?
- Under what conditions is an engineer obligated to stop a production release regardless of commercial pressure?

## 6. Candidate Evidence and Artifacts
- Technical Exception Log (record of approved waivers, rationale, and expiry).
- Incident Escalation Directory and on-call contact list.

## 7. Next Action
Draft a lightweight Exception Request issue template in the project management tool.
