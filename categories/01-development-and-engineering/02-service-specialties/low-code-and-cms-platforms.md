---
title: "Specialty: Low-Code and CMS Platforms"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./web-applications-and-websites.md"
  - "./automation-and-business-systems.md"
  - "../../05-sales/README.md"
  - "../../11-project-delivery-and-client-service/README.md"
---

# Specialty: Low-Code and CMS Platforms

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** Projects leveraging Content Management Systems (WordPress, Webflow, Ghost), headless content backends (Sanity, Strapi, Contentful), visual website builders, and low-code workflow platforms (n8n, Make, Zapier, Airtable).
- **What Does NOT Apply:** High-performance bespoke web applications requiring fully custom relational data models and microservice architectures.

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate technical areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **Architecture Selection Rubric:** Establishing explicit decision criteria for choosing between headless CMS (decoupled frontend via Next.js/Astro) versus monolithic CMS (WordPress/Webflow) based on client editorial workflows and technical maintenance capacity.
- [ ] **Lock-in & Data Export Ownership:** Ensuring client data schemas, media assets, and content entries can be fully exported via standard formats (JSON, CSV, SQL dumps) to prevent proprietary platform hostage scenarios.
- [ ] **Safe Client Editing Boundaries:** Configuring role-based permissions in the CMS admin panel to allow client content editors to publish without the ability to alter core layouts, injected scripts, or global design tokens.
- [ ] **Workflow Version Control:** Establishing version control practices for platform automations (e.g., n8n workflow JSON exported to Git, Webflow custom code repository tracking).
- [ ] **Sanitized Custom Code Injection:** Enforcing code review standards on all custom JavaScript and CSS snippets embedded within visual site builders.

---

## 3. Should (Recommended Practice & Judgment)

- When does an automation workflow exceed low-code platform capabilities (e.g., execution timeouts, complex state machines) and require migration to a custom serverless or background worker script?
- How should commercial software subscription licenses (e.g., Webflow Workspace, Sanity Team tier) be structured during development and handed over at launch?
- What backup and restore mechanisms are feasible for visual builder platforms that do not provide native point-in-time database snapshots?

---

## 4. Common Failure Modes

- **Unrestricted Client Admin Access:** Granting full administrative privileges to non-technical client staff who inadvertently delete core site templates or break global styling.
- **Third-Party Plugin Bloat:** Installing dozens of unmaintained WordPress plugins, causing severe security vulnerabilities and performance degradation.
- **Runaway Task Execution Costs:** Designing looping Make or Zapier workflows that consume tens of thousands of paid execution operations within hours.

---

## 5. Evidence That It's Done

- [ ] Content model schemas documented and backed up to version control.
- [ ] Client user roles configured with scoped editor permissions (preventing layout/script breakage).
- [ ] Automated full data export verified and saved to independent cloud storage.

---

## 6. Template

- `None yet`

---

## 7. Boundaries & Handoffs

- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Sets commercial expectations regarding platform recurring SaaS subscription fees versus agency implementation fees.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Conducts client training sessions for CMS editors and verifies account ownership transfer.
- **Development & Engineering:** Configures schemas, develops custom code blocks, connects webhooks, and optimizes assets.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q15`: Architectural rubric for selecting headless CMS versus traditional monolithic CMS.
- **Related Documents:**
  - [`./web-applications-and-websites.md`](./web-applications-and-websites.md): Web application deliverable standards.
- **Candidate Evidence (candidate example, not a decision):**
  - Thoughtworks Technology Radar: *Headless CMS Platforms & Decoupled Web*.
  - Sanity Documentation: *Content Modeling Best Practices* (`sanity.io/docs`).
