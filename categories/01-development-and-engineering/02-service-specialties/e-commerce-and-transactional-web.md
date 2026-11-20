---
title: "Specialty: E-Commerce and Transactional Web"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./web-applications-and-websites.md"
  - "../04-engineering-standards/security-and-privacy-engineering.md"
  - "../../10-finance-and-money-management/README.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Specialty: E-Commerce and Transactional Web

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** Online storefronts, subscription platforms, digital goods checkouts, and transactional web applications handling client payments, order processing, and inventory state.
- **What Does NOT Apply:** Pure content websites, informational landing pages, or lead-generation forms without financial transaction processing.

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate technical areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **PCI DSS Compliance Scope Reduction:** Enforcing client-side tokenization and hosted checkout elements (candidate examples: Stripe Elements, Shopify Checkout, Paddle) to ensure zero raw credit card data touches agency servers (PCI DSS SAQ-A scope).
- [ ] **Webhook Idempotency & Signature Verification:** Requiring cryptographic signature validation and idempotent processing on all payment provider webhooks to prevent duplicate charges or double-fulfilled orders.
- [ ] **Inventory Concurrency & Race Condition Protection:** Implementing database row locks, optimistic concurrency, or atomic decrement operations to prevent overselling limited inventory.
- [ ] **Automated Transactional Notifications:** Ensuring critical customer communications (order receipts, shipping notices, password resets) are decoupled via reliable message queues.
- [ ] **Tax & Regulatory Calculation:** Integrating compliant third-party tax engines (candidate examples: Stripe Tax, TaxJar, Avalara) rather than hand-coding custom regional tax algorithms.

---

## 3. Should (Recommended Practice & Judgment)

- What criteria dictate building a custom headless commerce frontend (e.g., Medusa, Saleor, Shopify Storefront API) versus deploying a standard monolithic platform (Shopify, WooCommerce)?
- How should cart state persist across anonymous user browsing sessions and subsequent authenticated logins?
- What fallback mechanism triggers when a payment gateway's primary processing API experiences downtime?

---

## 4. Common Failure Modes

- **Silent Webhook Drops:** Failing to acknowledge or retry failed payment webhooks, leading to charged customers whose accounts or orders never activate.
- **Client-Side Price Tampering:** Blindly trusting prices or cart totals submitted from client browsers rather than validating SKU pricing strictly on the server.
- **Accidental PCI Scope Creep:** Storing unencrypted credit card CVVs or Primary Account Numbers (PAN) in server logs, triggering severe PCI DSS non-compliance fines.

---

## 5. Evidence That It's Done

- [ ] Payment gateway test transactions executed across success, 3D Secure challenge, card decline, and refund flows.
- [ ] Webhook idempotency test verifying duplicate webhook payloads trigger exactly one order creation.
- [ ] Cart price validation confirmed by automated penetration test attempting client-side price modification.

---

## 6. Template

- `None yet`

---

## 7. Boundaries & Handoffs

- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Reviews client payment gateway merchant accounts, fee structures, and payout schedules; agency never holds client sales revenue.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Verifies terms of service, refund policy language, and PCI DSS SAQ-A compliance documentation.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Ensures commercial proposals clarify scope boundaries between standard gateway integration and custom ERP/accounting integrations.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q01`: Default technology stack for web applications.
  - `ENG-Q17`: Transactional messaging and deliverability provider selection.
- **Related Documents:**
  - [`../04-engineering-standards/security-and-privacy-engineering.md`](../04-engineering-standards/security-and-privacy-engineering.md): Security standards.
- **Candidate Evidence (candidate example, not a decision):**
  - PCI Security Standards Council: *PCI DSS v4.0 SAQ A Guidance* (`pcisecuritystandards.org`).
  - Stripe Documentation: *Designing Robust Webhook Integrations* (`docs.stripe.com/webhooks`).
