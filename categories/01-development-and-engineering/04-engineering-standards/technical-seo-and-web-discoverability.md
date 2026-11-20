---
title: "Standard: Technical SEO and Web Discoverability"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "./performance-and-capacity.md"
  - "../02-service-specialties/web-applications-and-websites.md"
  - "../../06-marketing/README.md"
  - "../../../research/rn-01-google-search-central-technical-seo.md"
---

# Standard: Technical SEO and Web Discoverability

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** Public-facing websites, web portals, e-commerce storefronts, and marketing pages where search engine discoverability and crawl indexing are required.
- **What Does NOT Apply:** Internal back-office portals, admin dashboards, or private web applications behind authentication walls (which should enforce `noindex, nofollow`).

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate technical areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **Rendering Architecture Selection:** Evaluating Server-Side Rendering (SSR) or Static Site Generation (SSG) for public discoverability pages to avoid client-side JavaScript rendering indexing delays.
- [ ] **Automated Sitemap & Robots Protocol:** Implementing automated generation of valid XML sitemaps and `robots.txt` conforming to IETF RFC 9309.
- [ ] **Canonicalization & Clean URLs:** Standardizing self-referencing canonical tags, clean URL slugs, trailing slash consistency, and proper HTTP 301 permanent redirect chains.
- [ ] **Structured Data (Schema.org):** Implementing valid JSON-LD structured microdata schemas (Organization, Article, Product, BreadcrumbList) validated via Google Rich Results standards.
- [ ] **Core Web Vitals Performance:** Aligning page load and interactivity metrics (LCP, INP, CLS) with search engine user experience benchmarks.

---

## 3. Should (Recommended Practice & Judgment)

- What automated validation tool (e.g., Lighthouse CI, Google Search Console API) should run in CI pipelines to flag SEO regressions before release?
- How should multi-language or regional sites implement `hreflang` headers and alternate link annotations to prevent duplicate content penalties?
- What is the boundary between engineering's technical SEO responsibilities and marketing's content/editorial SEO scope?

---

## 4. Common Failure Modes

- **Blank HTML Shell (SPA Crawl Failure):** Shipping a pure client-side React/Vue SPA that renders empty `<div id="root"></div>` tags, resulting in search crawlers indexing empty pages.
- **Accidental Disallow Directives:** Leaving `Disallow: /` in production `robots.txt` after staging deployment, de-indexing the entire live client site.
- **Broken Redirect Loops:** Creating circular 301 redirects or non-canonical URL internal links that waste crawl budgets.

---

## 5. Evidence That It's Done

- [ ] XML sitemap generated dynamically and verified against schema specifications.
- [ ] Structured data JSON-LD validated with 0 errors in Google Rich Results Test.
- [ ] Core Web Vitals passing standard thresholds on mobile and desktop profiles.

---

## 6. Template

- `None yet`

---

## 7. Boundaries & Handoffs

- **Marketing ([`../../06-marketing/README.md`](../../06-marketing/README.md)):** Owns keyword research, page copywriting, editorial content strategy, metadata wording, and backlink outreach; Development is strictly responsible for technical infrastructure, crawlability, schema validation, and rendering mechanics.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Validates client expectations, clarifying that Technical SEO provides discoverability infrastructure but cannot guarantee specific organic keyword rankings.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q01`: Default full-stack framework selection for public web applications.
- **Related Documents:**
  - [`./performance-and-capacity.md`](./performance-and-capacity.md): Performance optimization and Core Web Vitals.
  - [`../../../research/rn-01-google-search-central-technical-seo.md`](../../../research/rn-01-google-search-central-technical-seo.md): Technical SEO research note.
- **Candidate Evidence (candidate example, not a decision):**
  - Google Search Central: *JavaScript SEO Basics* (`developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`).
  - W3C / Schema.org: *Schema.org Community Vocabularies* (`schema.org`).
