---
title: "Standard: API and Integration Engineering"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../02-service-specialties/backend-apis-and-integrations.md"
  - "../02-service-specialties/automation-and-business-systems.md"
  - "./reliability-and-resilience.md"
  - "./observability-and-operational-readiness.md"
  - "../../05-sales/README.md"
---

# Standard: API and Integration Engineering

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to all systems exposing REST/GraphQL endpoints, consuming external third-party APIs (payments, email, SMS, WhatsApp, cloud storage), processing webhooks, or orchestrating multi-system integrations.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Client vs. Agency Account Ownership:** All third-party production service accounts (Stripe, Twilio, SendGrid, AWS S3, OpenAI) must be owned and billed directly to the client. The agency accesses these services via delegated IAM roles, organization invites, or client-provided restricted API keys. The agency must never hold client production services on agency credit cards or master accounts.
- **Webhook Cryptographic Signature Verification:** All incoming webhooks (e.g., Stripe, Shopify, GitHub) must verify cryptographic signatures (HMAC-SHA256) and timestamp freshness before processing payloads.
- **Contract-First Documentation:** Every production API must maintain a version-controlled OpenAPI 3.1 specification validating all request and response schemas.
- **Standardized Error Formatting:** APIs must return machine-readable errors adhering to RFC 7807 (Problem Details for HTTP APIs) with explicit `type`, `title`, `status`, and `detail` fields.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Integration Categories & Patterns:**
  - *Payment Gateways (Stripe, Razorpay):* Implement webhook-driven state machines; never assume a checkout succeeded without receiving a signed webhook event.
  - *Communications (Postmark, SendGrid, Twilio, WhatsApp):* Use asynchronous message queues and dead-letter queues to handle delivery throttling and external provider latency.
  - *Object Storage (S3, GCS, R2):* Use pre-signed upload URLs with strict expiration (e.g., 15 minutes) rather than streaming large files through application API servers.
- **Idempotency Keys:** Require `Idempotency-Key` headers on all state-mutating endpoints (`POST /orders`, `POST /charges`) to ensure network retries do not trigger duplicate records.
- **Multi-Client Isolation:** Keep API keys, webhook signing secrets, and tokens strictly isolated per client workspace. Shared integration middleware must never cross-pollinate client tokens.
- **Foreign Clients & Localizations:** Ensure APIs support international currencies, ISO 8601 UTC timestamps, and UTF-8 multi-language encoding by default.

---

## 4. Common Failure Modes
- **Account Stranding:** Building client infrastructure on agency-owned developer accounts; when the contract ends, transferring billing and ownership becomes a painful, high-friction dispute.
- **Unverified Webhooks (Spoofing):** Accepting unauthenticated webhook calls at public endpoints, allowing attackers to simulate successful payment notifications.
- **Blocking on Slow Third Parties:** Making synchronous outbound HTTP calls to slow email or WhatsApp gateways inside user-facing web requests, causing request timeouts.
- **Breaking API Changes:** Modifying response payloads without API versioning, breaking mobile apps or third-party client integrations.

---

## 5. Evidence that it's done (Checklist)
- [ ] Client confirms ownership and billing setup for all third-party production service accounts.
- [ ] OpenAPI 3.1 schema validated with Spectral linter and published in repository.
- [ ] Webhook handlers verify HMAC signatures and reject invalid payloads with HTTP 400 Bad Request or 403 Forbidden (per RFC 9110 and standard webhook provider conventions).
- [ ] Mutation endpoints enforce idempotency key tracking.
- [ ] Integration tests verify outbound API failure handling and exponential backoff.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.7 Architecture & External Dependencies.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Informs clients during proposal stages that third-party service fees (payments, SMS, hosting) are billed directly by vendors to the client's corporate account.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates client invitation and role assignment to third-party vendor consoles during project onboarding.
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Confirms agency cards are never placed on client vendor infrastructure.

---

## 8. Open Decisions
- What standard OpenAPI documentation viewer (e.g., Scalar vs. Swagger UI vs. Redoc) should be default across agency API repositories?
- What is the default expiration window for pre-signed upload URLs?
