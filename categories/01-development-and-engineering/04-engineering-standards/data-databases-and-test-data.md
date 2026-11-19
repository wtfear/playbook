---
title: "Standard: Data, Databases, and Test Data"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./security-and-privacy-engineering.md"
  - "./ci-cd-and-release-engineering.md"
  - "../03-delivery-lifecycle/09-release-readiness-and-deployment.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: Data, Databases, and Test Data

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies across all projects utilizing persistent state: relational (SQL), document/key-value (NoSQL), cache, and vector databases (e.g., pgvector, Pinecone, Qdrant) for AI embeddings. Covers schema evolution, data classification, multi-tenant isolation, automated backups, restore testing, and test data sanitization.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Multi-Client Data Isolation:** Systems handling multiple clients must enforce complete logical or physical data isolation. Shared database instances must utilize tenant identifiers (`tenant_id`), schema separation, or Row-Level Security (RLS) verified by automated tests to guarantee zero cross-client leakage.
- **Version-Controlled Forward & Rollback Migrations:** All schema modifications must be committed as versioned migration scripts tested in CI. Breaking changes must provide verified rollback or non-destructive down-migration paths.
- **Absolute Ban on Production PII in Development:** Raw, unmasked customer PII or production database dumps must never be imported into local developer workstations or staging environments.
- **Regular Restore Testing:** Automated backups must undergo scheduled restoration testing to a sandbox environment to verify Recovery Point Objective (RPO) and Recovery Time Objective (RTO) targets.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Zero-Downtime Expand-Contract Pattern:** Execute breaking schema changes across deployment phases: Expand (add nullable column & dual-write) $\to$ Backfill historical rows $\to$ Switch reads $\to$ Contract (drop old column).
- **Vector Database Hygiene:** For AI/RAG systems, pair vector stores (e.g., pgvector) with metadata filters enforcing tenant isolation and access controls before cosine/similarity searches execute.
- **Automated Retention & Purging:** Implement database lifecycle rules to automatically prune ephemeral audit logs, session records, and soft-deleted entities past retention windows.
- **Small-Team Practicality:** Standardize on robust, well-supported ORM/migration tools (e.g., Prisma, Drizzle, Alembic) that prevent raw SQL injection and offer type-safe queries.

---

## 4. Common Failure Modes
- **Table-Locking Alter Outages:** Running an unindexed `ALTER TABLE ... ADD COLUMN ... NOT NULL` on a multi-million-row production table, locking the table and causing catastrophic HTTP 504 timeouts.
- **Cross-Tenant Data Leak:** Forgetting a `WHERE tenant_id = ?` clause on a multi-tenant query, accidentally exposing Client A's data to Client B.
- **Unverified Backups:** Relying on automated daily cloud snapshots for years without ever testing a restoration, discovering during an outage that backups were corrupt or incomplete.
- **Accidental Vector Leakage:** Storing sensitive, unencrypted PII directly in vector database chunk metadata, exposing it to downstream LLM prompts.

---

## 5. Evidence that it's done (Checklist)
- [ ] Schema migrations checked in Git and executed automatically in CI pipeline.
- [ ] Expand-contract migration checklist followed for breaking schema updates.
- [ ] Multi-tenant isolation verified with automated boundary test suite.
- [ ] Synthetic mock datasets (e.g., Faker) configured for local development and CI test runs.
- [ ] Quarterly backup restore drill completed and logged with RTO/RPO metrics.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.8 Data Lifecycle & Backup Targets.

---

## 7. Handoffs & Cross-Category Boundaries
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates maintenance windows for high-risk schema migrations and scheduled backup restore drills.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Defines statutory data retention periods, GDPR/DPDP deletion requests, and cryptographic erasure protocols.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Approves storage tiering costs and managed database instance sizing.

---

## 8. Open Decisions
- What standard ORM / migration framework should be standard for Node.js (Prisma vs. Drizzle) and Python (Alembic vs. Django ORM)?
- Should multi-client systems use separate databases per client or shared databases with Row-Level Security (RLS)?
