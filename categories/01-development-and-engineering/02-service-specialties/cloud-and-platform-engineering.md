---
title: "Specialty: Cloud and Platform Engineering"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../04-engineering-standards/environments-configuration-and-secrets.md"
  - "../../10-finance-and-money-management/README.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Specialty: Cloud and Platform Engineering

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to engagements requiring custom cloud infrastructure provisioning, container orchestration, Infrastructure as Code (IaC), virtual networking (VPCs), serverless platforms, and cloud landing zones (AWS, GCP, Azure, DigitalOcean). *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Declarative Infrastructure as Code (IaC):** All production and staging cloud resources must be provisioned and managed declaratively via version-controlled IaC (e.g., Terraform, OpenTofu, AWS CDK, Pulumi). Manual click-ops in web consoles is strictly prohibited for production environments.
- **Least-Privilege Identity & Access Management (IAM):** Service accounts, container task roles, and developer access must adhere to strict least-privilege permissions. Wildcard permissions (`"Action": "*"`) are forbidden.
- **Client Billing Ownership & Direct Custody:** Cloud accounts and root billing credentials must remain under the client's direct ownership. The agency operates using delegated federated IAM roles or SSO invitations.
- **Automated Cloud Cost Controls & Budgets:** Every provisioned environment must enforce automated billing alerts (e.g., AWS Budgets, GCP Budget Alerts) at 50%, 80%, and 100% of the agreed monthly run-rate.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Environment Isolation:** Maintain strictly segregated cloud accounts or projects for `development`, `staging`, and `production` to prevent staging mistakes from impacting live users.
- **Multi-Tenant Tooling Isolation:** Agency internal platform tools must keep client environments strictly isolated using separate cloud projects, IAM boundaries, and state files.
- **State File Security:** Remote IaC state files (e.g., Terraform S3/GCS backends) must be encrypted at rest, versioned, and protected by state-locking (DynamoDB/object lock).
- **Small-Team Practicality:** Favor managed PaaS or modern serverless platforms (e.g., AWS App Runner, Cloud Run, Vercel, Supabase) for early-stage clients rather than operating self-managed Kubernetes clusters.

---

## 4. Common Failure Modes
- **Orphaned Zombie Cloud Resources:** Provisioning unattached elastic IPs, orphaned EBS volumes, or idle GPU instances that silently accumulate thousands of dollars in monthly cloud invoices.
- **State Drift from Console Tweaks:** Modifying a production database setting manually in the cloud console, which gets silently overwritten or torn down on the next Terraform apply.
- **Over-Privileged Root Access:** Using account root credentials or overly permissive IAM admin policies for daily CI/CD runners, creating a critical vulnerability vector.
- **Missing Resource Tagging:** Deploying resources without owner/project tags, making it impossible to audit which client or environment incurred specific cloud charges.

---

## 5. Evidence that it's done (Checklist)
- [ ] 100% of production infrastructure codified in version-controlled IaC modules.
- [ ] Automated Terraform/IaC plan checks executed and verified in CI on pull requests.
- [ ] IAM roles audited to confirm least-privilege access with zero wildcard admin rights.
- [ ] Cloud billing alerts verified and configured to email project leads and client owners.
- [ ] Remote state backend configured with server-side encryption and state locking.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.7 Architecture & Cloud Components.

---

## 7. Handoffs & Cross-Category Boundaries
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reviews cloud infrastructure estimates, monitors run-rates, and ensures agency cards are not billed for client workloads.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Verifies cloud data residency compliance (GDPR/DPDP) and customer encryption key ownership.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Communicates projected monthly cloud hosting costs to the client during proposal delivery.

---

## 8. Open Decisions
- Should the agency standardize on Terraform/OpenTofu vs. AWS CDK / SST as the default IaC toolchain?
- What is our default recommended managed platform (e.g., AWS ECS/Fargate vs. GCP Cloud Run) for small-to-medium client backend deployments?
