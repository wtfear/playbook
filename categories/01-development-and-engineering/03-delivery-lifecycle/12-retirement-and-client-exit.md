---
title: "Lifecycle 12: Retirement and Client Exit"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./11-operation-maintenance-and-technical-closure.md"
  - "../04-engineering-standards/data-databases-and-test-data.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Lifecycle 12: Retirement and Client Exit

## 1. Purpose
Defines the proposed procedure for safely decommissioning software systems, conducting secure data export and sanitization, shutting down cloud infrastructure, terminating integrations, and recording formal technical exit upon product sunset or client relationship termination.

---

## 2. Decommissioning Triggers & Authorization

A system enters Lifecycle 12 under one of the following validated triggers:
1. **Contractual Expiration / Client Exit:** Commercial engagement reaches end of term without renewal.
2. **Product Sunset:** System has been superseded by a modern replacement or retired due to business pivot.
3. **Security Obsolescence:** Critical underlying dependencies or runtimes are end-of-life (EOL) and cannot be remediated economically.
4. **Economic Deprecation:** Operational infrastructure costs exceed the economic utility of the service.

> [!CAUTION]
> Decommissioning is irreversible. No destruction commands may execute without written sign-off from both the Technical Owner and the Client Authorized Representative.

---

## 3. The 5 Decommissioning Go/No-Go Gates

Before executing irreversible resource destruction, the team must verify:

| Gate | Verification Question | Mandatory Evidence |
| :---: | :--- | :--- |
| **G1** | Have all internal and external consumers been notified 30+ days in advance? | Broadcast notification log & client acknowledgement. |
| **G2** | Has active production traffic ceased? | Access logs show 0 inbound requests for 14 continuous days. |
| **G3** | Has a complete data export been generated and verified by the client? | SHA-256 checksummed archive delivery receipt. |
| **G4** | Have DNS TTLs been lowered to 300s and redirect/tombstone pages activated? | DNS record query showing HTTP 410 Gone or 301 Redirect. |
| **G5** | Has legal/compliance signed off on statutory data retention periods? | Written approval from Legal/Risk officer. |

---

## 4. NIST SP 800-88 Compliant Data Sanitization

All customer data and sensitive credentials must be purged following NIST SP 800-88 Rev 1 guidelines:

1. **Clear:** Logical sanitization of all databases, storage volumes, and caches via administrative reset and database truncation commands.
2. **Cryptographic Erase (Purge):** For cloud storage buckets (AWS S3, GCP GCS) and encrypted databases (RDS, Cloud SQL), delete the customer-managed KMS master key (`kms:ScheduleKeyDeletion`). Without the key, underlying ciphertext is permanently unrecoverable.
3. **Destruction Verification:** Obtain and archive cloud provider audit logs confirming resource deletion.

---

## 5. Cloud Infrastructure Teardown Checklist

Prevent runaway cloud costs and security vulnerabilities using the systematic teardown protocol:

- [ ] **DNS & Routing:** Remove Route53 / Cloudflare DNS records; delete ingress load balancers.
- [ ] **Compute & Containers:** Scale ECS services / Kubernetes deployments to 0; terminate EC2 instances; delete container repository images (ECR/GCR).
- [ ] **Databases & Caches:** Create final automated snapshot; export snapshot to cold storage; delete primary and read-replica database instances; delete Redis/Memcached clusters.
- [ ] **Storage Buckets:** Empty bucket objects and versioned objects; delete S3 / GCS buckets.
- [ ] **Networking & IPs:** Release Elastic IPs / static NAT gateways; delete VPC peering connections.
- [ ] **Identity & Access Management (IAM):** Revoke and delete service accounts, API keys, IAM users, and role permissions associated with the project.
- [ ] **Monitoring & Alerts:** Silence and delete PagerDuty services, Datadog/Grafana dashboards, Sentry projects, and webhook endpoints.
- [ ] **Billing Audit:** Inspect cloud billing console 48 hours post-teardown to confirm daily run rate drops to exactly \$0.00.

---

## 6. Related Documents
- [`./11-operation-maintenance-and-technical-closure.md`](./11-operation-maintenance-and-technical-closure.md): Preceding operational stage.
- [`../04-engineering-standards/data-databases-and-test-data.md`](../04-engineering-standards/data-databases-and-test-data.md): Data retention standards.
- [`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md): Legal compliance on data deletion.
