---
title: "Specialty: Data Engineering and Analytics"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/data-databases-and-test-data.md"
  - "../04-engineering-standards/security-and-privacy-engineering.md"
  - "../../10-finance-and-money-management/README.md"
---

# Specialty: Data Engineering and Analytics

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to client engagements involving analytical data warehouses (Snowflake, BigQuery, ClickHouse), ETL/ELT pipelines, data transformation frameworks (dbt), business intelligence reporting, and event telemetry infrastructure. *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Automated Data Quality & Schema Testing:** Pipelines must enforce automated data tests (e.g., dbt tests, Great Expectations) verifying unique keys, null checks, referential integrity, and expected value ranges before loading into downstream analytics marts.
- **Data Lineage & Traceability:** Data models must document provenance from raw source ingestion through staging transformations to final reporting tables, enabling root-cause debugging when upstream schemas change.
- **Deterministic Pipeline Scheduling & Retries:** Batch pipelines must be managed by reliable schedulers (e.g., Airflow, Dagster, cron/workers) configured with idempotent execution, explicit task dependencies, and automatic alerts upon job failure.
- **Dashboard Accuracy & Metric Consistency:** Published BI dashboards must map directly to certified semantic layer definitions or single-source SQL models. Ad-hoc unversioned dashboard SQL queries are prohibited for critical business metrics.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **ELT over ETL Architecture:** Load raw data directly into the cloud warehouse (extract and load) and perform transformations inside the warehouse using SQL/dbt, preserving raw historical data for reprocessing.
- **Multi-Tenant Data Segregation:** Enforce tenant-based partition filtering or dedicated analytical datasets to prevent cross-client data contamination in reporting.
- **Cost Controls & Query Guardrails:** Configure warehouse compute auto-suspend timers (e.g., suspend idle warehouses after 5 minutes) and daily query cost quotas to avoid unexpected billing surges ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)).
- **Small-Team Practicality:** Avoid over-engineering complex streaming infrastructure (e.g., Kafka) when micro-batch or standard daily SQL models satisfy the client's business reporting needs.

---

## 4. Common Failure Modes
- **Upstream Silent Schema Breaking:** An application engineer renames a column in the transactional database, silently crashing the nightly analytics pipeline without generating an alert.
- **Runaway Warehouse Query Costs:** An analyst runs an unpartitioned cross-join query on a multi-terabyte dataset in BigQuery, burning hundreds of dollars in query fees in seconds.
- **Conflicting Metric Definitions:** Sales dashboard and Finance dashboard showing different "Active Customer" counts because each tool wrote its own custom SQL filtering logic.
- **Unmanaged Pipeline Lag:** A batch pipeline failing repeatedly overnight; business executives make decisions the next morning based on stale, unrefreshed data.

---

## 5. Evidence that it's done (Checklist)
- [ ] dbt / pipeline data tests pass in CI and during scheduled runs.
- [ ] Data lineage graph documented and accessible in data dictionary.
- [ ] Scheduler configured with failure alerts routed to operations channels.
- [ ] Warehouse compute auto-suspend and spend alert limits verified.
- [ ] Dashboard metrics reconciled and signed off against source transaction data.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.8 Data Lifecycle.

---

## 7. Handoffs & Cross-Category Boundaries
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reconciles financial metric definitions and approves data warehouse infrastructure budgets.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Establishes client ownership of warehouse billing accounts and clarifies query cost responsibilities.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Ensures analytical data pipelines comply with customer anonymization and data masking mandates.

---

## 8. Open Decisions
- What standard cloud warehouse (e.g., BigQuery vs. Snowflake vs. ClickHouse) should be recommended for startup client data stacks?
- What lightweight orchestration tool (e.g., Dagster vs. dbt Cloud vs. GitHub Actions) should be standard for early-stage data pipelines?
