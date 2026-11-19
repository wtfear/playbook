---
title: "Standard: Performance and Capacity"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./observability-and-operational-readiness.md"
  - "../02-service-specialties/web-applications-and-websites.md"
  - "../02-service-specialties/ai-applications-and-agents.md"
  - "../../10-finance-and-money-management/README.md"
---

# Standard: Performance and Capacity

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to all production web applications, APIs, database architectures, background workers, and AI systems. Governs latency targets, throughput scaling, infrastructure capacity sizing, cloud spending limits, and AI token cost controls.

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Strict Billing & Cost Alerting:** Every cloud infrastructure provider (AWS, GCP, Azure, DigitalOcean) and AI model vendor (OpenAI, Anthropic) must have automated billing alerts configured at 50%, 80%, and 100% of the agreed monthly budget.
- **AI Token Cost Caps & Rate Limits:** Systems integrating commercial LLMs must enforce per-user rate limits, maximum token length restrictions on inputs/outputs, and hard monthly spending caps to prevent runaway bills from infinite agent loops or scrapers.
- **Mandatory Query Pagination:** API endpoints returning lists of resources must enforce server-side pagination with a strict maximum page size (e.g., max 100 records). Unbounded `SELECT * FROM table` queries are strictly prohibited.
- **Core Web Vitals Thresholds:** Client-facing web applications must meet Google Core Web Vitals targets on simulated mobile profiles (LCP < 2.5s, INP < 200ms, CLS < 0.1).

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Multi-Tiered Caching:** Implement edge CDN caching for static assets, HTTP `stale-while-revalidate` headers for semi-static pages, and in-memory caching (Redis) for hot, read-heavy database queries.
- **AI Token Optimization:** Cache deterministic LLM prompts and embeddings, utilize smaller/cheaper models (e.g., flash / mini tiers) for routine classification or extraction, and route only complex reasoning tasks to frontier models.
- **Asset Optimization:** Enforce modern image formats (WebP/AVIF), font subsetting, tree-shaking, and lazy loading for below-the-fold media.
- **Small-Team Practicality:** Rely on lightweight load-testing tools (e.g., k6, autocannon) to benchmark critical paths (checkout, authentication, search) without establishing heavy enterprise performance testing harnesses.

---

## 4. Common Failure Modes
- **Runaway Cloud & AI Bills:** A runaway recursive loop or unauthenticated public endpoint makes millions of OpenAI or AWS calls overnight, resulting in an unexpected \$10,000 invoice.
- **N+1 Query Explosion:** An ORM query fetching related records in a loop, converting a single page load into 500 synchronous database roundtrips.
- **Unbounded Memory Leaks:** Worker processes accumulating uncollected objects or holding database connections open, causing container crashes under sustained load.
- **Bloated JavaScript Bundles:** Importing entire libraries (e.g., complete lodash or icon packs) rather than tree-shaken modules, degrading mobile page speed and SEO rank.

---

## 5. Evidence that it's done (Checklist)
- [ ] Cloud billing alerts and AI token spending limits configured and verified.
- [ ] Automated Lighthouse CI audit confirms Core Web Vitals pass performance budgets.
- [ ] Database query profiling confirms zero unindexed scans or N+1 queries on core user journeys.
- [ ] Baseline load test report (k6) proves API satisfies p95 latency targets under expected peak concurrency.
- [ ] Token usage telemetry active in production logging dashboard.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.6 Performance & Cost Targets.

---

## 7. Handoffs & Cross-Category Boundaries
- **Finance ([`../../10-finance-and-money-management/README.md`](../../10-finance-and-money-management/README.md)):** Establishes infrastructure budgets, alerts on monthly cloud burn rates, and reconciles token costs.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Ensures performance targets and third-party consumption costs (e.g., estimated monthly AI tokens) are explicitly documented in client proposals.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Reviews load testing sign-offs before high-traffic client marketing launches.

---

## 8. Open Decisions
- What automated performance budget tool should be incorporated into the default CI workflow?
- What default monthly AI token budget threshold triggers an immediate hard spend stop?
