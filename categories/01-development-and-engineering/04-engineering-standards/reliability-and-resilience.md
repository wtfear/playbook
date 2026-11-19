---
title: "Standard: Reliability and Resilience"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./observability-and-operational-readiness.md"
  - "./backup-recovery-and-incident-engineering.md"
  - "./api-and-integration-engineering.md"
---

# Standard: Reliability and Resilience

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to all production services, backend APIs, background job workers, third-party integrations (payments, emails, webhooks), and automation pipelines. Essential for ensuring systems recover gracefully from transient network failures, third-party outages, and unexpected server restarts.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Network Timeouts:** Every outbound network request (HTTP, database connection, cache call, third-party API) must have an explicit, conservative timeout configured (e.g., connect timeout 3s, read timeout 10s). Infinite hangs are strictly prohibited.
- **Backoff & Jitter on Retries:** Never retry immediately in a tight loop. Retries on transient errors (HTTP 429, 502, 503, 504) must apply exponential backoff with full jitter to avoid causing "retry storms" or thundering herds.
- **Idempotency on State-Changing Retries:** Any operation that modifies persistent state (charges payments, sends emails, writes database records) must support idempotent re-runs using unique transaction/idempotency keys.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Circuit Breakers for Brittle External APIs:** Implement lightweight circuit breakers (e.g., stopping outbound calls after consecutive failures and failing fast for a cooldown window) when relying on unpredictable client backends or third-party gateways.
- **Graceful Degradation:** When non-essential services fail (e.g., recommendation engine, analytics logging, avatar rendering), return cached responses or sensible defaults rather than breaking the primary user experience.
- **Dead-Letter Queues (DLQ):** Failed background jobs must be routed to a DLQ with alarm triggers after exhausting maximum retries (e.g., 3–5 attempts), preventing poisoned jobs from blocking worker queues.
- **Small-Team Practicality:** Avoid complex service mesh or heavyweight orchestration setups for simple deliverables; use standard application-level libraries (e.g., Tenacity for Python, async-retry / p-retry for Node.js).

---

## 4. Common Failure Modes
- **Cascading Outages (Retry Storms):** All clients and workers simultaneously retry a struggling backend service, overwhelming it completely and turning a 2-second hiccup into a prolonged outage.
- **Double Charges / Duplicate Records:** Retrying a payment or order submission without an idempotency key, resulting in double-billing a customer.
- **Hung Worker Threads:** Missing HTTP client timeouts causing all background worker threads to block indefinitely waiting for a dead external webhook, exhausting the thread pool.
- **Silent Failures:** Catching all exceptions with a broad `try / except: pass`, hiding critical errors from telemetry until customer complaints surface.

---

## 5. Evidence that it's done (Checklist)
- [ ] All external HTTP clients have explicit connection and read timeouts configured in code.
- [ ] Retries on third-party APIs implement exponential backoff with randomized jitter.
- [ ] Mutation endpoints accept and verify `Idempotency-Key` headers or database unique constraints.
- [ ] Background worker queues have configured dead-letter queues (DLQs) with alerting.
- [ ] Chaos or fault-injection tests verify application behaves gracefully when downstream database or cache is temporarily paused.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Failure Modes and Redundancy Strategy.

---

## 7. Handoffs & Cross-Category Boundaries
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Communicates expected service availability and graceful degradation behavior during client onboarding.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reviews retry and compute auto-scaling costs to ensure runaway worker retries do not cause billing surges.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Aligns incident resilience with client business continuity obligations.

---

## 8. Open Decisions
- What standard circuit breaker and retry libraries should be endorsed for Node.js, Python, and Go?
- What is the default maximum retry attempt limit across asynchronous worker pipelines?
