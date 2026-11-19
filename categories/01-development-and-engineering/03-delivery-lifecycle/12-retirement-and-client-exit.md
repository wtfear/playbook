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

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


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
| **G2** | Has active business traffic ceased and cutover completed? | Verify DNS cutover/shutdown or maintenance redirect, confirm zero active authenticated/business traffic (filtering out automated internet scanner/crawler noise), and obtain written client sign-off via Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)). |
| **G3** | Has a complete data export been generated and verified by the client? | SHA-256 checksummed archive delivery receipt. |
| **G4** | Have DNS TTLs been lowered to 300s and redirect/tombstone pages activated? | DNS record query showing HTTP 410 Gone or 301 Redirect. |
| **G5** | Has legal/compliance signed off on statutory data retention periods? | Written approval from Legal/Risk officer. |

---

## 4. NIST SP 800-88 Compliant Data Sanitization & Asset Handover

All customer data and sensitive credentials must be managed following safe sanitization and handover protocols aligned with NIST SP 800-88 Rev 1 guidelines:

1. **Export & Asset Handover:** Export and transfer all agreed client data, configuration, and artifacts to client-designated storage, verified via checksums.
2. **Scoped Agency Access Revocation:** Revoke and delete ONLY agency IAM users, roles, cross-account permissions, and API tokens. Never delete customer-managed KMS master keys, shared encryption keys, or broad cloud account resources unilaterally.
3. **Client-Owned Cryptographic Deletion / Purge:** Any cryptographic erasure, key deletion, or physical/cloud data destruction inside client-owned accounts requires explicit written client authorization and must be executed or authorized directly by the client's infrastructure owner, never performed unilaterally by agency engineers.
4. **Destruction Verification:** Where agency-hosted temporary staging/backup volumes exist, execute logical sanitization and archive provider deletion logs.

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
