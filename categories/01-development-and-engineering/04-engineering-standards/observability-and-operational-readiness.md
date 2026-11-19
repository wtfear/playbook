---
title: "Standard: Observability and Operational Readiness"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./backup-recovery-and-incident-engineering.md"
  - "../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md"
  - "../../../templates/foundation-document-template.md"
---

# Standard: Observability and Operational Readiness

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


## 1. Purpose
Establishes proposed standards for structured application logging, service metrics collection, distributed tracing, health check probes, proactive alerting, and event telemetry to ensure systems are observable, debuggable, and operationally reliable in production.

## 2. The Three Pillars of Production Observability

### Pillar 1: Structured JSON Logging
All application logs must be output to stdout/stderr formatted as structured JSON. Plain text formatting is prohibited in production runtimes.

#### Required Log Schema
Every log entry must contain the following standard JSON attributes:

```json
{
  "timestamp": "2026-11-18T14:32:00.123Z",
  "level": "INFO",
  "service": "billing-service",
  "environment": "production",
  "correlation_id": "c7a8b291-9e23-41cf-9f0e-561b2d3e4f5a",
  "user_id": "usr_9982341",
  "event": "invoice_payment_processed",
  "message": "Payment of 45000 cents succeeded via Stripe",
  "context": {
    "invoice_id": "inv_12345",
    "gateway": "stripe",
    "latency_ms": 142
  }
}
```

- **Correlation ID Propagation:** Every HTTP request or incoming job must be assigned a unique `correlation_id` (or take `X-Correlation-ID` from ingress). This ID must be injected into every log statement and forwarded across downstream HTTP/gRPC calls and message queues.
- **PII Scrubbing:** Log formatting middleware must automatically sanitize or redact sensitive data before serialization (e.g., credit card numbers, passwords, Bearer tokens, Social Security numbers).

### Pillar 2: Service & Infrastructure Metrics
Engineering teams track performance and health using two complementary metric frameworks:

1. **The RED Method (For Request-Driven Services):**
   - **Rate:** Number of requests processed per second (`requests/sec`).
   - **Errors:** Number of failed requests per second (`errors/sec` or % 5xx responses).
   - **Duration:** Request latency distribution (tracking p50, p95, and p99 percentiles).
2. **The USE Method (For Infrastructure & Resources):**
   - **Utilization:** Percentage of time or capacity a resource is busy (CPU, memory, disk I/O, DB connection pool).
   - **Saturation:** Degree to which extra work is queued waiting for service (queue depth, runqueue length, thread pool wait).
   - **Errors:** Count of hardware, kernel, or resource errors.

### Pillar 3: Distributed Tracing
- Services must implement OpenTelemetry standards to trace transactions across multi-service boundaries.
- Context propagation must follow the W3C `traceparent` specification across HTTP headers and event brokers.
- Spans must capture database queries, external API calls, cache lookups, and critical business logic operations.

---

## 3. Health Probe Standard

Applications deployed on containerized or managed orchestrators (Kubernetes, AWS ECS, GCP Cloud Run) must expose standardized HTTP probe endpoints:

| Endpoint | Probe Type | Purpose | Behavior on Failure |
| :--- | :--- | :--- | :--- |
| `/health/live` | **Liveness Probe** | Verifies process vitality; checks if event loop or server thread is hung. | Orchestrator terminates and restarts the container instance. |
| `/health/ready` | **Readiness Probe** | Verifies readiness to receive client traffic; tests active database connection, cache reachability, and critical downstream dependencies. | Orchestrator temporarily removes instance from traffic router until health passes (NO restart). |
| `/health/startup` | **Startup Probe** | Monitors slow initializations (DB migrations, schema pre-warming) before liveness checks engage. | Prevents premature restart loops during cold starts. |

> [!IMPORTANT]
> `/health/live` must NEVER check downstream dependencies (like the database). If the database experiences a momentary blip, a dependency check on liveness will cause a cascading restart of all application containers, converting a minor slow-down into a catastrophic system crash.

---

## 4. User Interaction Event Taxonomy & Analytics

To avoid divergence between engineering logs and product telemetry, systems must maintain a formal event tracking specification:

- **Naming Convention:** `<object>_<action>` in `lower_snake_case` (e.g., `user_signed_up`, `cart_item_added`, `invoice_generated`).
- **Standard Event Properties:** Every emitted event must include:
  - `user_id`: Hashed or synthetic identifier of the actor.
  - `session_id`: Unique user session identifier.
  - `correlation_id`: Link to backend server trace.
  - `timestamp`: UTC ISO-8601 timestamp of occurrence.
  - `platform`: `web`, `ios`, `android`, or `backend`.
  - `version`: Software semantic version.
- **Hybrid Capture Strategy:**
  - *Server-Side:* Mission-critical state changes (payments, user sign-ups, permission edits) must be emitted server-side to guarantee delivery and security.
  - *Client-Side:* Lightweight UI interactions (button clicks, hover states, scroll depth) are emitted from frontend clients.

---

## 5. Alerting Hygiene & Operational Runbooks

- **Alert on Symptoms, Not Causes:** Page engineers when user experience is impaired (high error rate, p95 latency violation, SLO error budget burn) rather than raw server CPU spikes.
- **Triage Tiers:**
  - **P1 (Critical / Page):** Immediate user impact, data loss risk, or error budget rapid burn. PagerDuty / Opsgenie wake-up alert.
  - **P2 (High / Warn):** Degraded performance, single AZ redundancy loss, or slow error budget depletion. Slack/Teams notification during business hours.
  - **P3 (Informational):** Diagnostic trends, automated retry spikes. Handled during routine sprint reviews.
- **Runbook Requirement:** Every automated alert must include a direct hyperlink to an updated Markdown operational runbook detailing:
  1. What the alert means.
  2. Potential root causes.
  3. Immediate containment/mitigation steps.
  4. Verification steps to confirm resolution.

---

## 6. Related Documents
- [`./backup-recovery-and-incident-engineering.md`](./backup-recovery-and-incident-engineering.md): Incident triage and on-call rotations.
- [`../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md`](../03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md): Maintenance operations.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Phase 0 Observability Contract.

## 7. Open Questions
- What default managed observability provider (e.g., Datadog vs. Grafana Cloud vs. Sentry) represents the best cost-to-performance ratio for early-stage clients?
- How should multi-tenant log retention be isolated for compliance-sensitive clients?
