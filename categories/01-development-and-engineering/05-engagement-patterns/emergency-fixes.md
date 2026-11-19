---
title: "Pattern: Emergency Fixes and Hotfixes"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../04-engineering-standards/source-control-and-change-integration.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../04-engineering-standards/backup-recovery-and-incident-engineering.md"
  - "../../11-project-delivery-and-client-service/README.md"
---

# Pattern: Emergency Fixes and Hotfixes

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies when an active production application experiences an unplanned critical incident (Sev 1 / Sev 2), severe security vulnerability (zero-day CVE), data integrity defect, or major feature outage that cannot wait for the standard weekly/bi-weekly sprint deployment cycle.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Minimal Diff Scope:** Hotfixes must contain only the absolute minimal code changes required to restore service stability or patch the vulnerability. Bundling unrelated refactors, cosmetic tweaks, or unreleased features into a hotfix branch is strictly prohibited.
- **Dedicated Hotfix Branch:** Emergency fixes must be branched directly from the current production release tag (`hotfix/<issue-slug>`), never from an active feature branch.
- **CI Verification Before Production:** Even during severe incidents, the automated CI security and test suite must execute and pass before pushing the hotfix to production. Skipping CI is prohibited unless explicitly authorized by the Technical Lead.
- **Mandatory Dual-Merge Back:** Immediately after deploying to production, the hotfix branch must be merged back into `main` and all active staging branches to prevent the regression from resurfacing in subsequent releases.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Prefer Rollback Over Roll-Forward:** If an incident was triggered by a recent release, prioritize reverting to the previous known good deployment digest rather than rushing an untested patch into production under pressure.
- **Fast-Track Peer Review:** Require at least one expedited peer review from another engineer (or technical founder) focusing exclusively on side effects and blast radius.
- **Small-Team Communication:** Keep communication transparent and continuous. Post status updates in the incident Slack channel every 30 minutes during Sev 1 incidents.
- **Post-Mortem Requirement:** Every Sev 1 hotfix must be followed by a blameless retrospective and root-cause analysis within 48 hours to identify preventative guardrails.

---

## 4. Common Failure Modes
- **Secondary Outages from Rushed Fixes:** Deploying a panic fix that solves the immediate symptom but accidentally deletes database records or introduces a more catastrophic regression.
- **Branch Divergence (The Forgotten Merge):** Hotfixing production successfully, but failing to merge the fix back into the trunk development branch, causing the bug to mysteriously reappear two weeks later during the next scheduled release.
- **Scope Creep in the Emergency:** Attempting to fix "other small issues" discovered while investigating the bug, increasing diff complexity and delaying service recovery.

---

## 5. Evidence that it's done (Checklist)
- [ ] Dedicated `hotfix/*` branch created from production tag.
- [ ] Minimal diff verified and approved by at least one secondary reviewer.
- [ ] CI pipeline executed with passing security and regression tests.
- [ ] Production deployment verified via health probes and telemetry.
- [ ] Hotfix merged back into `main` and active feature branches.
- [ ] Incident post-mortem scheduled or completed.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/retrospective-template.md`](../../../templates/retrospective-template.md): Incident Post-Mortem Template.

---

## 7. Handoffs & Cross-Category Boundaries
- **Project Delivery & Client Service ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Project Manager manages direct client communication, executive status updates, and SLA milestone notifications during an active hotfix.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reconciles whether emergency hours are covered under a support retainer, warranty, or require out-of-scope emergency billing.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Assesses regulatory breach notification triggers (e.g., GDPR 72-hour notification) if the hotfix addresses a security exploit or data leak.

---

## 8. Open Decisions
- What criteria differentiate an emergency hotfix from an expedited standard sprint bug fix?
- What are the contractual emergency hourly rates for clients without active maintenance retainers?
