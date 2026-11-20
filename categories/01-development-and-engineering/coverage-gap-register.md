---
title: "Development and Engineering Coverage Gap Register"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./coverage-matrix.md"
  - "./open-questions.md"
  - "../../research/README.md"
---

# Development and Engineering Coverage Gap Register

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. Executive Summary & Purpose

This register records the findings of the systematic coverage gap analysis conducted across Category 01 (`Development and Engineering`) of the `wtfear/playbook` knowledge base.

To keep the agency repository lightweight, actionable, and maintainable for a 1–3 person engineering team, a strict **Consolidation Rule** is applied:
- **Maximum 8 Major New Standalone Files:** Only high-impact, cross-cutting architectural or service areas receive dedicated new files.
- **Sub-Items for Existing Files:** Feature-level gaps (e.g., forms, search, browser extensions, speech systems, email deliverability) are consolidated as structured sub-items into existing files rather than proliferating dozens of shallow scaffolds.
- **Out of Scope (Founder Decision Pending):** Non-core domains (games, embedded IoT, blockchain, AR/VR) are explicitly tagged and recorded for exclusion without creating premature scaffolds.

---

## 2. Methodology & Multi-Angle Discovery

The gap discovery was executed across four distinct evaluation angles:

### Angle A: Known Candidate Gaps Analysis
Directly audited the repository against candidate technical topics: Technical SEO, deep system design, e-commerce mechanics, build-vs-buy/low-code platforms, messaging bots, AI & data engineering, client enterprise constraints, and team practices.

### Angle B: Independent Industry Standards Benchmark
Cross-benchmarked against authoritative industry engineering bodies of knowledge:
- **IEEE SWEBOK v4 (2024):** IEEE Computer Society, *Guide to the Software Engineering Body of Knowledge v4.0* (URL: `computer.org/education/bodies-of-knowledge/software-engineering/v4`, accessed Nov 2026). Identified standalone KAs for Software Architecture, Software Security, and Software Operations.
- **NIST AI RMF 1.0 (NIST AI 100-1):** National Institute of Standards and Technology, *Artificial Intelligence Risk Management Framework* (URL: `nist.gov/itl/ai-risk-management-framework`, accessed Nov 2026). Identified GOVERN, MAP, MEASURE, MANAGE functions.
- **OWASP Top 10 for Large Language Models (2025/2026):** OWASP Foundation (URL: `owasp.org/www-project-top-10-for-large-language-model-applications`, accessed Nov 2026). Identified Prompt Injection (LLM01), Sensitive Info Disclosure (LLM02), Vector Weaknesses (LLM08), and Unbounded Consumption (LLM10).
- **ISO/IEC 25010:2023:** International Organization for Standardization, *Product Quality Model* (URL: `iso.org/standard/78176.html`, accessed Nov 2026). Identified 9 quality characteristics for non-functional requirements.
- **Google Search Central:** Google, *JavaScript SEO Basics and Search Pipeline* (URL: `developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`, accessed Nov 2026). Identified crawlability vs rendering vs indexing boundaries.
- **The Twelve-Factor App & Beyond:** Heroku / Kevin Hoffman (O'Reilly) (URL: `12factor.net`, accessed Nov 2026). Identified modern cloud-native extensions: API-first, Telemetry, and Zero-Trust identity.

### Angle C: 10 Project Delivery Lifecycle Scenario Walkthroughs
Manually traced the 12-phase lifecycle against 10 realistic agency client engagements:
1. *Restaurant Website:* Needs Technical SEO, local schema microdata, online reservation forms, CMS client editing.
2. *E-Commerce Store:* Needs cart, checkout, payment gateway tokenization (PCI DSS SAQ-A), inventory sync, transactional order emails.
3. *WhatsApp Chatbot:* Needs conversational UI, webhook concurrency, message deduplication, and provider rate limits.
4. *RAG Assistant:* Needs document chunking, embedding generation, vector database isolation, and grounded retrieval evaluation.
5. *Analytics Dashboard:* Needs data aggregation pipelines, query caching, metric definitions, and chart rendering.
6. *Mobile Application:* Needs store deployment guidelines, offline caching, push notifications, and native hardware permissions.
7. *Workflow Automation:* Needs low-code platform export ownership, webhook retry logic, error alerting, and execution budgets.
8. *SaaS MVP:* Needs architecture style selection (modular monolith), multi-tenancy, authentication, subscription billing, and transactional email.
9. *ML Model Deployment:* Needs dataset versioning, parameter-efficient fine-tuning (LoRA), model quantization, and inference serving.
10. *Legacy Takeover of Undocumented Site:* Needs enterprise access handling, credential discovery, codebase audit, and liability cutoff boundaries.

### Angle D: Relevance Filter & Consolidation Rule
Tagged every gap as `Core` (universal across projects), `Specialty` (specific deliverable types), or `Situational` (specific contract/client types), capping new standalone scaffolds at **<= 8** files.

---

## 3. Master Coverage Gap Register

| ID | Gap Name | Tag | Status | Evidence in Current Repo | Source | Boundary Owner | Recommended Action | Planned Canonical Home |
| :---: | :--- | :---: | :---: | :--- | :---: | :--- | :--- | :--- |
| **GAP-01** | System Architecture Styles & Patterns | `Core` | `PARTIAL` | `04-engineering-standards/architecture-and-technical-decisions.md` covers ADR templates, but lacks guidance on monolith vs microservices, async boundaries, or event-driven patterns. | A, B | Engineering | **New File (1 of 8)** | `04-engineering-standards/system-architecture-styles-and-patterns.md` |
| **GAP-02** | Technical SEO & Web Discoverability | `Specialty` | `PARTIAL` | `04-engineering-standards/performance-and-capacity.md` touches Core Web Vitals, but crawlable rendering (SSR/SSG), sitemaps, canonicals, and Schema.org are completely absent. | A, B, C | Engineering / Marketing | **New File (2 of 8)** | `04-engineering-standards/technical-seo-and-web-discoverability.md` |
| **GAP-03** | E-Commerce & Transactional Web | `Specialty` | `ABSENT` | No coverage of shopping cart state, checkout flows, payment tokenization, inventory races, or tax calculations anywhere in repo. | A, C | Engineering / Finance / Legal | **New File (3 of 8)** | `02-service-specialties/e-commerce-and-transactional-web.md` |
| **GAP-04** | Low-Code & CMS Platforms | `Specialty` | `ABSENT` | `02-service-specialties/automation-and-business-systems.md` covers custom automation scripts, but headless vs traditional CMS (WordPress, Webflow, Shopify, Sanity) and visual builders are missing. | A, C | Engineering / Sales | **New File (4 of 8)** | `02-service-specialties/low-code-and-cms-platforms.md` |
| **GAP-05** | Messaging Bots & Conversational Agents | `Specialty` | `ABSENT` | `02-service-specialties/ai-applications-and-agents.md` discusses general LLMs, but chat platform webhooks (WhatsApp, Telegram, Slack), deduplication, and rate limits have no home. | A, C | Engineering / Delivery | **New File (5 of 8)** | `02-service-specialties/messaging-bots-and-conversational-agents.md` |
| **GAP-06** | RAG & Retrieval Systems | `Core` (AI) | `ABSENT` | `02-service-specialties/ai-applications-and-agents.md` mentions RAG as a concept, but chunking, embeddings, vector DBs, reranking, and retrieval evals are completely absent. | A, B, C | Engineering | **New File (6 of 8)** | `04-engineering-standards/rag-and-retrieval-systems.md` |
| **GAP-07** | LLMOps & Model Governance | `Core` (AI) | `ABSENT` | `04-engineering-standards/ai-assisted-development.md` covers developer IDE assistants, but production prompt versioning, gateways, token spend limits, and guardrails are absent. | A, B, C | Engineering / Finance | **New File (7 of 8)** | `04-engineering-standards/llmops-and-model-governance.md` |
| **GAP-08** | Client Constraints & Enterprise Access | `Situational` | `PARTIAL` | `03-delivery-lifecycle/01-technical-intake-and-handoff.md` mentions client environments, but lacks procedures for corporate VPNs, ZTNA, package proxies, and compliance audits. | A, C | Engineering / Legal / Delivery | **New File (8 of 8)** | `04-engineering-standards/client-constraints-and-enterprise-access.md` |
| **GAP-09** | Email Deliverability & Transactional Messaging | `Core` | `PARTIAL` | Missing SPF, DKIM, DMARC DNS records, bounce handling webhooks, and transactional template management. | A, C | Engineering / Marketing | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/environments-configuration-and-secrets.md` and `api-and-integration-engineering.md` |
| **GAP-10** | Real-Time WebSockets & Streaming | `Specialty` | `PARTIAL` | `04-engineering-standards/api-and-integration-engineering.md` covers REST/GraphQL, but lacks WebSocket connection lifecycles, SSE, room fan-out, and backpressure. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/api-and-integration-engineering.md` |
| **GAP-11** | Forms, Anti-Spam & User Input Security | `Core` | `PARTIAL` | `04-engineering-standards/validation-across-lifecycle.md` covers validation, but CAPTCHA policy (never solve programmatically), honeypots, and spam filtering need explicit homes. | A, C | Engineering / Legal | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/security-and-privacy-engineering.md` |
| **GAP-12** | Media Uploads, Storage & CDN | `Core` | `PARTIAL` | Missing S3 presigned upload URLs, media processing, video streaming, and CDN cache headers. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/performance-and-capacity.md` and `data-databases-and-test-data.md` |
| **GAP-13** | Site Search & Filtering | `Specialty` | `PARTIAL` | Missing full-text search indexing (PostgreSQL `pg_trgm`/tsvector, Meilisearch, Algolia) vs vector search distinctions. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/data-databases-and-test-data.md` |
| **GAP-14** | Consent-Aware Analytics & Event Tracking | `Core` | `PARTIAL` | Missing cookie banner technical triggers, cookieless event tracking, and PII anonymization in frontend telemetry. | A | Engineering / Legal | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/observability-and-operational-readiness.md` and `security-and-privacy-engineering.md` |
| **GAP-15** | Browser Extensions | `Specialty` | `ABSENT` | Manifest V3, background service workers, content script sandboxing, and Web Store review lead times. | A | Engineering / Legal | **Sub-item of Existing File** | Sub-item in `02-service-specialties/web-applications-and-websites.md` |
| **GAP-16** | Voice Agents & Speech Systems | `Specialty` | `ABSENT` | WebRTC audio streaming, STT/TTS pipeline latency budgets (<800ms), and telephony SIP trunking. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `02-service-specialties/ai-applications-and-agents.md` |
| **GAP-17** | ML Model Lifecycle & Fine-Tuning | `Specialty` | `PARTIAL` | Dataset versioning, LoRA/QLoRA fine-tuning, model quantization, and local/cloud inference serving runtimes (vLLM, Ollama). | A, B, C | Engineering / Finance | **Sub-item of Existing File** | Sub-item in `02-service-specialties/ai-applications-and-agents.md` and `data-engineering-and-analytics.md` |
| **GAP-18** | Web Scraping & Data Extraction | `Specialty` | `ABSENT` | Ethical crawling, robots.txt parsing, politeness throttling, headless rendering, and DOM mutation resilience. | A, C | Engineering / Legal | **Sub-item of Existing File** | Sub-item in `02-service-specialties/data-engineering-and-analytics.md` |
| **GAP-19** | Developer Onboarding & Dev Setup | `Core` | `PARTIAL` | `03-delivery-lifecycle/06-project-engineering-setup.md` covers project setup, but workstation runtime management (`mise`/`asdf`), Dev Containers, and seed data scripts need homes. | A, C | Engineering / People | **Sub-item of Existing File** | Sub-item in `03-delivery-lifecycle/06-project-engineering-setup.md` |
| **GAP-20** | Solo-Developer Continuity & Bus-Factor | `Core` | `PARTIAL` | Code review and handover when only one developer is assigned to a client codebase. | A | Engineering / Delivery | **Sub-item of Existing File** | Sub-item in `01-engineering-governance/roles-and-ownership.md` and `04-engineering-standards/code-quality-and-review.md` |
| **GAP-21** | Estimation Learning & Feedback Loops | `Core` | `PARTIAL` | Comparing estimated vs actual engineering effort to refine future pre-sales scoping. | A | Engineering / Sales / Delivery | **Sub-item of Existing File** | Sub-item in `06-engineering-improvement/retrospective-and-root-cause-learning.md` |
| **GAP-22** | Bug Triage & Severity Levels | `Core` | `PARTIAL` | Severity (P1–P4) vs Priority definitions for incoming client defect reports. | A, C | Engineering / Delivery | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/testing-and-quality-engineering.md` |
| **GAP-23** | Technical Demos & Trade-Off Walkthroughs | `Situational`| `PARTIAL` | Conducting milestone demos and explaining technical compromises in non-technical terms to client stakeholders. | A, C | Engineering / Delivery | **Sub-item of Existing File** | Sub-item in `03-delivery-lifecycle/08-verification-and-client-acceptance.md` |
| **GAP-24** | Internationalization (i18n, l10n, Currencies)| `Specialty` | `PARTIAL` | Multi-language routing, currency formatting, and UTC date/timezone storage conventions. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `04-engineering-standards/ux-ui-and-accessibility.md` and `data-databases-and-test-data.md` |
| **GAP-25** | Admin Panels & Internal Back-Office Tools | `Specialty` | `PARTIAL` | Internal CRUD generation, RBAC permissions, and audit logging for client administrative portals. | A, C | Engineering | **Sub-item of Existing File** | Sub-item in `02-service-specialties/web-applications-and-websites.md` |
| **GAP-26** | Game Development & 3D Interactive Graphics | `Out-of-Scope`| `ABSENT` | Heavy 3D engine overhead (Unreal, Unity) and asset pipelines outside core agency focus. | A, D | Leadership / Sales | **Out-of-Scope (Decision Pending)** | `open-questions.md` (`ENG-Q11`) |
| **GAP-27** | Embedded Systems & Firmware / IoT | `Out-of-Scope`| `ABSENT` | Hardware testing lab, electrical schematics, firmware safety; outside core agency focus. | A, D | Leadership / Sales | **Out-of-Scope (Decision Pending)** | `open-questions.md` (`ENG-Q12`) |
| **GAP-28** | Smart Contracts, Web3 & Cryptocurrency | `Out-of-Scope`| `ABSENT` | Irreversible code liability, severe regulatory volatility, smart contract auditing overhead. | A, D | Leadership / Legal | **Out-of-Scope (Decision Pending)** | `open-questions.md` (`ENG-Q13`) |
| **GAP-29** | Native Spatial Computing (AR / VR) | `Out-of-Scope`| `ABSENT` | Hardware-dependent headsets (VisionOS, Meta Quest), niche market demand; refer to partners. | A, D | Leadership / Sales | **Out-of-Scope (Decision Pending)** | `open-questions.md` (`ENG-Q14`) |

---

## 4. Synthesis of Recommended Standalone Scaffolds (Max 8)

The following 8 high-impact technical files are proposed for creation in Phase 2, strictly following the repo's 8-part topic shape and `status: proposed` convention:

1. **`04-engineering-standards/system-architecture-styles-and-patterns.md` (GAP-01):**  
   Establishes core architectural patterns (modular monolith default, microservices extraction thresholds, event-driven decoupling, CQRS, C4 diagrams) to prevent premature over-engineering while ensuring scalability.
2. **`04-engineering-standards/technical-seo-and-web-discoverability.md` (GAP-02):**  
   Defines the technical crawlability, rendering (SSR/SSG), XML sitemaps, robots.txt, canonicalization, and Schema.org structured data standards required for discoverable web deliverables.
3. **`02-service-specialties/e-commerce-and-transactional-web.md` (GAP-03):**  
   Provides the deliverable archetype guide for transactional websites, cart and checkout handling, payment tokenization (PCI DSS SAQ-A), webhook idempotency, and inventory concurrency.
4. **`02-service-specialties/low-code-and-cms-platforms.md` (GAP-04):**  
   Defines architectural and technical delivery rubrics for headless CMS vs monolithic CMS (WordPress, Webflow, Shopify, Sanity), visual builders, and automation platform export ownership.
5. **`02-service-specialties/messaging-bots-and-conversational-agents.md` (GAP-05):**  
   Guides engineering for conversational bots (WhatsApp, Telegram, Slack), platform webhook concurrency, message deduplication, rate limits, and fallback to human agents.
6. **`04-engineering-standards/rag-and-retrieval-systems.md` (GAP-06):**  
   Establishes retrieval engineering standards for AI projects: document chunking, embeddings, vector database selection, reranking, and RAG Triad evaluation metrics.
7. **`04-engineering-standards/llmops-and-model-governance.md` (GAP-07):**  
   Establishes runtime operational governance for LLMs: prompt versioning, unified model gateways, fallback routing, token spend ceilings, and prompt injection defenses.
8. **`04-engineering-standards/client-constraints-and-enterprise-access.md` (GAP-08):**  
   Establishes engineering procedures when operating inside client-owned environments, corporate VPNs/ZTNA, package proxies, enterprise Git repositories, and compliance audit frameworks.

---

## 5. Next Steps for Phase 2

Upon user review and approval of this register:
1. Proceed with Phase 2 scaffolding for the **approved standalone files** (up to 8 files).
2. Sequentially incorporate the approved **sub-items into existing files**.
3. Record boundary questions (`ENG-Q11`–`ENG-Q14`) in `open-questions.md`.
4. Validate all links, frontmatter, and headings with `node scripts/validate-docs.js`.
