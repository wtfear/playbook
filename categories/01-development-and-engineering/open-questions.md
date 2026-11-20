---
title: "Development and Engineering Open Questions"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./coverage-matrix.md"
  - "../../open-questions.md"
---

# Development and Engineering Open Questions

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


This register tracks unresolved architectural, operational, and technical governance questions specific to the Development and Engineering category.

> [!NOTE]
> Resolving these questions requires collaborative discussion between engineering leads, commercial leads, and agency founders. Decisions will be formalized via Operating Decision Records (ODRs) or project ADRs.

---

## 1. Questions Register

| ID | Domain | Unresolved Technical Question | Impact / Risk | Status | Next Action |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **ENG-Q01** | Stack Selection | What default programming languages, backend runtimes, and frontend frameworks constitute the agency's primary default tech stack? | High: Affects starter repos, hiring, and delivery velocity. | Open | Founder technical workshop |
| **ENG-Q02** | Cloud Ownership | Should client cloud infrastructure (AWS/GCP/PaaS) be provisioned under client-owned billing accounts or agency-managed master accounts? | High: Billing liability, credit card exposure, and handover complexity. | Open | Align with Finance & Legal |
| **ENG-Q03** | Code Review Model | What is our mandatory code review standard when a client project is staffed by a solo engineer? | High: Balance between review overhead and independent quality control. | Open | Evaluate cross-project peer reviews |
| **ENG-Q04** | Commercial Warranty | What standard warranty duration (e.g., 14 days vs. 30 days) is included post-launch for bug fixes before transitioning to a paid retainer? | High: Scope creep and unpaid support friction. | Open | Align with Sales & Delivery |
| **ENG-Q05** | Legacy Liability | What legal waiver and technical baseline protects the agency from pre-existing bugs and security vulnerabilities during codebase takeovers? | Critical: Unwarranted liability for third-party legacy flaws. | Open | Consult with Legal (Cat 12) |
| **ENG-Q06** | AI Code Governance | What contractual disclosure obligations exist regarding the use of AI coding assistants, and which enterprise data-sharing tiers are mandatory? | High: Client IP confidentiality and copyright concerns. | Open | Review vendor DPA terms |
| **ENG-Q07** | Migration Verification | Should CI pipelines strictly mandate automated down-migration verification for all relational database schema changes? | Medium: Migration safety vs. developer CI pipeline speed. | Open | Pilot on Tier 3 projects |
| **ENG-Q08** | On-Call & SLAs | How will after-hours on-call support be staffed, rotated, and compensated for client maintenance retainers? | Medium: Team burnout and SLA breach penalties. | Open | Align with People & Finance |
| **ENG-Q09** | Domain & DNS Billing | Who registers and pays for client production domains, SSL certificates, and DNS services post-handover? | Medium: Recurring billing disputes and account ownership transfer. | Open | Align with Finance & Delivery |
| **ENG-Q10** | Pre-Commit Hooks | Should local pre-commit secret scanning hooks (e.g., Gitleaks) be enforced via repository configs or left to individual developer choice? | High: Preventing accidental secret leakage before remote push. | Open | Standardize in starter repos |
| **ENG-Q11** | Service Boundaries | Should game development and 3D interactive graphics be formally ruled out-of-scope for the agency? | Medium: Focus agency positioning and sales pipeline. | Open | Discuss with Sales & Leadership |
| **ENG-Q12** | Service Boundaries | Under what conditions (if any) should the agency accept embedded systems, firmware, or physical IoT engineering projects? | High: Hardware lab overhead, specialized testing equipment. | Open | Discuss with Leadership |
| **ENG-Q13** | Service Boundaries | What is the agency policy on smart contract development, Web3 protocols, and cryptocurrency integrations? | High: Regulatory, security liability, smart contract audit overhead. | Open | Align with Legal & Leadership |
| **ENG-Q14** | Service Boundaries | Are native AR/VR (VisionOS, Meta Quest) spatial computing applications in scope or referred to specialized partners? | Low: Niche market demand vs. hardware investment. | Open | Discuss with Sales |
| **ENG-Q15** | Architecture | When building content sites, what criteria determine choosing a headless CMS (Sanity, Strapi) vs traditional monolithic CMS (WordPress, Webflow)? | Medium: Client self-service editorial autonomy vs. engineering control. | Open | Establish architectural rubric |
| **ENG-Q16** | Infrastructure | Should vector databases for AI RAG be hosted as embedded engines (pgvector, Chroma) or dedicated managed cloud clusters (Pinecone, Qdrant)? | High: Cost efficiency, maintenance overhead, query latency. | Open | Benchmark cost vs query scale |
| **ENG-Q17** | Infrastructure | What default transactional email service provider (ESP) should the agency recommend to clients (Resend, Postmark, AWS SES)? | Medium: Developer experience, deliverability reputation, pricing tier. | Open | Evaluate ESP vendor tiers |

---

## 2. In-Depth Context on Priority Decisions

### ENG-Q01: Default Technology Stack Selection
- **Context:** Delivering technical excellence as a boutique agency requires focus. Spreading in-house knowledge across too many disparate stacks (e.g., Python + Django, TypeScript + Next.js, Go + HTMX, Ruby on Rails, PHP + Laravel) dilutes code review rigor and prevents reusable component libraries.
- **Trade-offs:** A unified TypeScript/JavaScript full-stack ecosystem (e.g., Next.js/React + Node.js/TypeScript + PostgreSQL) maximizes full-stack code reuse and shared context. However, specialized domains (AI pipelines, high-concurrency microservices, data engineering) frequently benefit from Python or Go.
- **Proposed Direction:** Standardize on TypeScript as the default language for web, mobile, and standard APIs; designate Python as the secondary sanctioned language for AI, data pipelines, and automation scripting.

### ENG-Q02: Cloud Infrastructure & Billing Account Ownership
- **Context:** When deploying staging and production infrastructure for a client, two commercial models exist:
  1. *Client-Owned:* Client creates their own AWS/GCP/Vercel organization, inputs their own credit card, and invites agency engineers as IAM users.
  2. *Agency-Managed:* Agency hosts the client on its own multi-tenant agency cloud account and re-bills the client monthly with a markup.
- **Trade-offs:** Client-owned accounts completely eliminate agency billing liability and simplify handover. However, clients frequently face procurement bottlenecks creating their own accounts. Agency-managed hosting creates cash flow exposure if a client disputes a bill or defaults.
- **Proposed Direction:** Default to client-owned cloud accounts for production deliverables; provide ephemeral agency staging environments strictly during active development.

### ENG-Q04: Post-Launch Warranty vs. Ongoing Maintenance
- **Context:** Clients frequently expect "free lifetime bug fixes" for any issue discovered after launch, leading to disputes over whether a bug is a defect in the original SOW or an environmental change (e.g., third-party API update, browser deprecation).
- **Trade-offs:** A generous warranty (e.g., 60 days) builds client goodwill but creates open-ended unpaid developer commitments. A short warranty (e.g., 14 days) requires strict acceptance testing discipline.
- **Proposed Direction:** A strict 14-day post-launch warranty limited to defects reproducing against original written acceptance criteria, followed by a mandatory transition to a monthly maintenance retainer for ongoing support.

---

## 3. The 4 Agency Realities as Decision Drivers

All open questions, architectural evaluations, and engineering standards in Category 01 are evaluated against four operational constraints that reflect the agency's commercial and delivery model:

### 1. Multi-Client Isolation on Shared Tools
- **Operating Context:** Engineers work across multiple client engagements simultaneously or consecutively using agency laptops, development tooling, CI/CD runners, and communications platforms.
- **Decision Rule:** Architectural patterns and developer workflows must enforce strict isolation between client codebases, data, and credentials. Shared multi-tenant staging databases or co-mingled secrets across clients are strictly prohibited. Every project must maintain independent IAM boundaries, isolated repositories, and zero data leakage paths.

### 2. Foreign Clients and Cross-Border Data Privacy (GDPR, DPDP Act 2023)
- **Operating Context:** The agency serves domestic and international clients subject to diverse data protection regimes (e.g., EU GDPR, India DPDP Act 2023, US state privacy acts).
- **Division of Responsibility:** Category 12 (`Legal, Security, and Risk Management`) establishes the legal requirements, privacy notices, data classification tiers, and client contract terms. Category 01 (`Development and Engineering`) is strictly responsible for implementing technical controls: PII masking, encryption at rest and in transit, data residency routing, audit logging, and automated data retention and deletion workflows.

### 3. Small-Team Lightweight Constraint
- **Operating Context:** Delivery teams are small and agile (typically 1 to 5 engineers per engagement) without dedicated full-time QA departments, Site Reliability Engineers, or 24/7 operations centers.
- **Decision Rule:** Engineering policies and review gates must be lean, practical, and highly automated. Bureaucratic approval chains that paralyze velocity are rejected. If a quality or security control cannot be executed by a small team or automated via CI/CD, it must be simplified or scaled back to a workable tier.

### 4. AI-Assisted Coding Boundaries and IP Hygiene
- **Operating Context:** Engineers leverage modern AI coding assistants to accelerate development, research, and documentation.
- **Decision Rule:** High developer velocity must never compromise client confidentiality or intellectual property rights. AI tools must be evaluated for zero-data-retention terms; proprietary client business logic or secrets must never be exposed to public AI training corpuses; and human developers retain 100% accountability for verifying the correctness, security, performance, and licensing compliance of every line of committed code.

