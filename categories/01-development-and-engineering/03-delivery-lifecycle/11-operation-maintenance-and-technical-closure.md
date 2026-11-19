---
title: "Lifecycle 11: Operation, Maintenance, and Technical Closure"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./10-handover-and-support-transition.md"
  - "./12-retirement-and-client-exit.md"
  - "../04-engineering-standards/observability-and-operational-readiness.md"
  - "../04-engineering-standards/backup-recovery-and-incident-engineering.md"
  - "../05-engagement-patterns/ongoing-maintenance.md"
---

# Lifecycle 11: Operation, Maintenance, and Technical Closure

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Defines the proposed practices for operating, monitoring, maintaining, and supporting production applications that remain under agency retainer or internal operational management, up until formal project technical closure.

---

## 2. SRE Operational Principles & Toil Budget

To ensure engineers are not overwhelmed by repetitive operational tasks, all production operations adhere to pragmatic toil management principles:

- **The Toil Budget:** Engineering capacity should prioritize automation, defect prevention, and system hardening over manual operational churn ("toil"). Manual tasks (deployments, resets, repetitive triage) should not dominate daily delivery.
- **On-Call & Support Model:** [Pending Founder Decision — see ENG-Q08 in [`../open-questions.md`](../open-questions.md)]. Support and on-call models for a 1–3 person agency must be decided commercially by founders before any operational policy is codified. Availability tiers, on-call compensation, and coverage hours must align with commercial contracts rather than theoretical enterprise rotations.
- **Toil Elimination Automations:** Any operational procedure performed manually more than three times should be converted into an automated script, CI workflow, or self-service administrative endpoint where feasible.

---

## 3. Error Budget Burn & Action Policy

Production systems operate under a quantitative error budget derived from agreed SLOs (e.g., 99.9% uptime allows 43.2 minutes of downtime or degraded error budget per 30-day window). Engineering actions are gated by remaining budget:

| Error Budget State | Operational Condition | Engineering & Deployment Action |
| :--- | :--- | :--- |
| **Healthy (100% – 50% remaining)** | System operating within targets. | Normal feature release velocity; standard deployment cadence. |
| **Degraded (50% – 25% remaining)** | Elevated error or latency trends. | Review upcoming releases; high-risk architectural or database changes delayed until stability is re-established. |
| **Critical (25% – 0% remaining)** | Approaching complete SLO exhaustion. | Elevated release scrutiny; non-critical deployments paused pending Technical Owner and Project Delivery review. |
| **Exhausted (0% remaining)** | SLO breached. | **Reliability Escalation & Client Alignment.** Engineering documents technical root causes, quantifies ongoing operational risk, and recommends stabilization work. Any schedule adjustment, feature freeze, or milestone reprioritization requires explicit commercial approval by **Project Delivery** ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)) and the client. |

---

## 4. Operational Telemetry: System Observability vs. Product Analytics

Operations maintains a strict boundary between infrastructure health and product usage:

1. **System Observability (Infrastructure & Service Health):**
   - Monitored via RED (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors) metrics.
   - Paging alerts configured on user-impacting anomalies (HTTP 5xx spikes, p95 latency breaches).
   - Real-time dashboards displaying service health, memory usage, and queue depth.
2. **Product Analytics (User Value & Funnels):**
   - Captures user journey progression (activation, checkout, retention).
   - Monitored asynchronously to guide feature optimization and client reporting.
   - Gated by formal event taxonomy contracts ([`../04-engineering-standards/observability-and-operational-readiness.md`](../04-engineering-standards/observability-and-operational-readiness.md)).

---

## 5. Routine Maintenance Cycles & Disaster Recovery Drills

- **Weekly Routine:** Vulnerability triage, failed background job inspection, log volume review.
- **Monthly Routine:** Dependency minor updates, cloud cost audit against budgets, operational SLA reporting.
- **Quarterly Disaster Recovery Drill:** Mandatory simulated backup restoration into an isolated sandbox to measure actual Recovery Time Objective (RTO) and Recovery Point Objective (RPO) against targets.

---

## 6. Related Documents
- [`./10-handover-and-support-transition.md`](./10-handover-and-support-transition.md): Transition into maintenance.
- [`./12-retirement-and-client-exit.md`](./12-retirement-and-client-exit.md): Downstream system retirement.
- [`../04-engineering-standards/observability-and-operational-readiness.md`](../04-engineering-standards/observability-and-operational-readiness.md): Monitoring standards.
- [`../04-engineering-standards/backup-recovery-and-incident-engineering.md`](../04-engineering-standards/backup-recovery-and-incident-engineering.md): Disaster recovery.
- [`../05-engagement-patterns/ongoing-maintenance.md`](../05-engagement-patterns/ongoing-maintenance.md): Maintenance commercial pattern.
