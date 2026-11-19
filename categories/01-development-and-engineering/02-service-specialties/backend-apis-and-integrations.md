---
title: "Specialty: Backend APIs and Integrations"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/api-and-integration-engineering.md"
  - "../04-engineering-standards/reliability-and-resilience.md"
  - "../04-engineering-standards/data-databases-and-test-data.md"
---

# Specialty: Backend APIs and Integrations

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to commercial engagements focused on standalone backend service architectures, microservices, headless API platforms, partner integration hubs, and event-driven data distribution. *(Specialty status: proposed & unconfirmed).*

> [!IMPORTANT]
> **Cross-Reference Notice:** Reusable technical standards (OpenAPI schemas, REST conventions, idempotency headers, HTTP error schemas) are defined centrally in [`../04-engineering-standards/api-and-integration-engineering.md`](../04-engineering-standards/api-and-integration-engineering.md). This document defines backend specialty scoping, commercial boundaries, and domain architecture risks.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **API Versioning & Deprecation Policy:** Public and client-facing APIs must implement URI path versioning (e.g., `/api/v1/`) or header versioning, maintaining backward compatibility with existing versions during active client contracts.
- **Asynchronous Message Queue Decoupling:** Heavy processing tasks (generating reports, processing videos, bulk emailing, multi-step webhooks) must be decoupled from HTTP endpoints and offloaded to durable message queues (e.g., Redis Streams, RabbitMQ, SQS).
- **Inbound Webhook Verification & Processing:** External incoming webhooks must be verified using HMAC signatures, saved to persistent event logs, and processed asynchronously via background workers.
- **Client & IP Rate Limiting:** Expose rate-limiting protections (e.g., token-bucket algorithms returning HTTP 429) to shield database connections and downstream services from abuse or runaway scripts.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Dead-Letter Queue (DLQ) Monitoring:** Configure dead-letter queues for unprocessable messages with automated alerting when queue depth exceeds thresholds ([`../04-engineering-standards/reliability-and-resilience.md`](../04-engineering-standards/reliability-and-resilience.md)).
- **Database Query Throttling & Pooling:** Enforce connection pooling (e.g., PgBouncer) between serverless/containerized API instances and relational databases to prevent connection exhaustion.
- **Client Account Ownership:** Ensure third-party messaging, database, and hosting infrastructure is owned directly by the client organization.
- **Small-Team Simplicity:** Favor modular monoliths or lightweight serverless functions over complex microservices meshes for early-stage clients to minimize operational overhead.

---

## 4. Common Failure Modes
- **Synchronous Webhook Bottlenecks:** Processing external payment or CRM webhooks synchronously inside the webhook receiver HTTP handler; if processing takes > 5s, the caller times out and spams retries.
- **Unversioned Breaking Schema Changes:** Renaming a database column and immediately removing it from the API response, crashing active mobile clients or partner integrations.
- **Queue Backup Cascades:** A slow external email provider blocking worker queues, causing unhandled jobs to accumulate until memory runs out.
- **Missing Ingress Rate Limits:** Exposing an unprotected login or search endpoint that gets hit by a brute-force script, exhausting database CPU.

---

## 5. Evidence that it's done (Checklist)
- [ ] Versioning strategy implemented and documented in the API specification.
- [ ] Asynchronous worker queue operational with dead-letter queue routing.
- [ ] Webhook receiver verifies HMAC signatures and processes jobs asynchronously.
- [ ] Rate-limiting middleware active and verified via load test simulation.
- [ ] Integration tests verify backward compatibility across API releases.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Backend Architecture Contract.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Scoping must specify supported integration volume (RPS, monthly events) and API SLA parameters.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates sandbox testing and integration credentials with client partner engineering teams.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews API terms of use, rate limit allowances, and data sharing agreements.

---

## 8. Open Decisions
- What standard queue/worker framework should be adopted for Python (Celery vs. RQ vs. Temporal) and Node.js (BullMQ vs. Hatchet)?
- What is our standard API deprecation notice window for commercial clients (e.g., 30 vs. 90 days)?
