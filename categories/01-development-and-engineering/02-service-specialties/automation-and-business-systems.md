---
title: "Specialty: Automation and Business Systems"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/reliability-and-resilience.md"
  - "../04-engineering-standards/environments-configuration-and-secrets.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Specialty: Automation and Business Systems

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to client engagements delivering workflow automations, internal tooling, business system integrations (e.g., CRM to ERP, billing syncs), low-code/pro-code platforms (n8n, Make, Zapier), and custom serverless automated event pipes. *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Secure Credential Storage & Isolation:** Automation credentials, OAuth tokens, and API secrets must never be hardcoded in workflow nodes or shared spreadsheets. Credentials must reside in platform credential vaults, environment variables, or encrypted secret managers (e.g., AWS Secrets Manager, 1Password Secrets). Multi-client workflows must maintain strictly separated credential scopes.
- **Automated Failure Alerting & Dead-Letter Handling:** Every automation workflow must have automated error catching that routes execution failures immediately to dedicated alert channels (e.g., Slack `#alerts-ops`, PagerDuty, or email) with execution IDs and payload contexts.
- **Platform Rate & Execution Limits Adherence:** Workflows must monitor and throttle operations to stay strictly within third-party vendor rate limits (e.g., HubSpot 100 req/10s, Airtable 5 req/s) and monthly execution allowances to prevent account suspension.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Idempotency by Design:** Design all automation flows to be re-runnable without side effects. Check for existing records or deduplication hashes before triggering creation actions.
- **Client Account Ownership:** Automation platform subscriptions (n8n Cloud, Make, Zapier) and connected business app accounts must be owned directly by the client. The agency receives role-based admin/developer access.
- **Self-Hosted vs. Cloud Automation:** For clients with strict data residency (GDPR/DPDP) or large transaction volumes, evaluate self-hosted automation instances (e.g., n8n on client AWS/GCP) over multi-tenant SaaS tools to minimize per-execution costs.
- **Small-Team Practicality:** Avoid chaining more than 5 disparate SaaS tools into a single brittle workflow; consolidate transformations in clean serverless scripts where appropriate.

---

## 4. Common Failure Modes
- **Silent Automation Failures:** A Zapier or n8n workflow quietly failing due to an expired OAuth refresh token, going unnoticed for 3 weeks while leads or invoices fail to sync.
- **Third-Party API Rate Limit Lockouts:** A batch automation firing 1,000 simultaneous webhook calls to a CRM, triggering an IP ban and disrupting the client's internal sales team.
- **Infinite Update Loops:** Workflow A updates System 1, which triggers Workflow B to update System 2, which triggers Workflow A again, consuming the client's entire monthly plan in 20 minutes.
- **Hardcoded Developer API Keys:** Connecting agency developer personal credentials to client automation nodes; when the developer leaves the agency, the client's business system halts.

---

## 5. Evidence that it's done (Checklist)
- [ ] All API keys and OAuth connections verified to use client-owned corporate accounts.
- [ ] Automated error routing node verified via intentional failure test payload.
- [ ] Platform execution rate limits and pagination boundaries documented in runbook.
- [ ] Idempotent deduplication checked and verified against duplicate execution.
- [ ] Workflow recovery runbook authored for client handover.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/workflow-template.md`](../../../templates/workflow-template.md): Automation Workflow Template.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Establishes client responsibility for ongoing SaaS automation subscription costs (Make, Zapier, n8n).
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates business stakeholder UAT for critical business processes (e.g., payroll syncs, order routing).
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews third-party data processing agreements (DPAs) for automated data transfers.

---

## 8. Open Decisions
- Should the agency standardize on self-hosted n8n as the primary pro-code automation offering vs. managed Make?
- What is our standard incident SLA for broken client business automations during business hours?
