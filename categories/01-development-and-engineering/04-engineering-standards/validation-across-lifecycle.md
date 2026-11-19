---
title: "Standard: Validation Across the Lifecycle"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./testing-and-quality-engineering.md"
  - "./security-and-privacy-engineering.md"
  - "../03-delivery-lifecycle/02-discovery-and-requirements.md"
  - "../03-delivery-lifecycle/08-verification-and-client-acceptance.md"
---

# Standard: Validation Across the Lifecycle

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies across all software engineering projects, web applications, APIs, automation workflows, and AI integrations. Validation operates at three distinct lifecycle boundaries:
1. **Early Requirements Validation:** Before implementation begins (verifying feasibility, scope constraints, and explicit acceptance criteria).
2. **Server-Side Input & File-Upload Validation:** During software runtime (verifying client data, headers, payloads, file types, and size bounds before processing).
3. **Client Acceptance Validation:** Prior to production release or milestone acceptance (verifying delivery against agreed acceptance criteria with stakeholders).

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Server-Side Runtime Validation:** Never rely exclusively on client-side UI validation. Every API endpoint and background consumer must validate input schemas on the server using strict validation libraries (e.g., Zod, Pydantic, Joi).
- **File Upload Safeguards:** Restrict file uploads to explicit MIME-type and extension whitelists, enforce strict max file-size limits, and inspect magic bytes/signatures for binary uploads. Prohibit direct execution of uploaded assets.
- **Acceptance Gate Sign-off:** Production deployments require documented acceptance validation confirming core user journeys pass verified acceptance criteria.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Fail Fast & Return Structured Errors:** Return RFC 7807 problem details or structured error payloads pinpointing invalid fields with clear, actionable error messages (without exposing internal stack traces).
- **Small-Team Practicality:** Use shared schema validation definitions (e.g., sharing TypeScript types/Zod schemas between frontend and backend where appropriate) to avoid maintaining duplicate validation logic.
- **Multi-Tenant Validation:** Validate tenant context (`tenant_id`) on every database query and service call to ensure zero cross-client data leakage on shared systems.
- **Sanitize Before Storage:** Strip harmful characters, escape HTML where rendering, and normalize email/text inputs before storing in databases.

---

## 4. Common Failure Modes
- **Client-Side-Only Security Fallacy:** Assuming frontend form validation prevents malicious payloads; exposed endpoints receive raw malformed or injection payloads directly via curl/scripts.
- **Unrestricted File Upload Vulnerability:** Permitting executable uploads (.php, .html, .exe) or processing zip bombs that exhaust disk or memory resources.
- **Ambiguous Acceptance Criteria:** Shipping deliverables without pre-agreed criteria, resulting in contentious client disputes during final invoice sign-off.
- **Silent Type Coercion:** Permitting loose types that cause unexpected logic branches or silent corruption in financial/database calculations.

---

## 5. Evidence that it's done (Checklist)
- [ ] Automated schema validation middleware active on all API mutation routes (`POST`, `PUT`, `PATCH`).
- [ ] Unit and integration tests verify invalid payloads return HTTP 400/422 with structured field errors.
- [ ] File upload handlers enforce size caps, extension checks, and store assets in isolated object storage (e.g., S3/GCS) with private ACLs.
- [ ] Client Acceptance Verification log completed and signed off prior to milestone handover.

---

## 6. Template
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): System Foundation & Sign-off Gate.
- [`../../../templates/checklist-template.md`](../../../templates/checklist-template.md): UAT Verification Checklist.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Initial requirements capture must establish clear boundaries of what will and will not be validated.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates client UAT scheduling, milestone acceptance sign-offs, and dispute triage.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Defines data sanitization and regulatory input compliance standards (OWASP, GDPR, DPDP Act).

---

## 8. Open Decisions
- What standard schema validation library should be adopted by default per technology stack (e.g., Zod for TypeScript, Pydantic for Python)?
- What is the formal dispute procedure when a client refuses acceptance validation for out-of-scope preferences?
