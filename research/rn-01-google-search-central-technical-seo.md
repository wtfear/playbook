---
title: "Research Note: Google Search Central Technical SEO Architecture"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../categories/01-development-and-engineering/README.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/technical-seo-and-web-discoverability.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/performance-and-capacity.md"
  - "../categories/06-marketing/README.md"
---

# Research Note: Google Search Central Technical SEO Architecture

> [!NOTE]
> A Research Note records external evidence, observations, benchmark sources, and candidate practices. **Informs a decision; not policy.** It does NOT represent approved agency policy or binding operational instructions.

## 1. Objective and Research Questions

When building public-facing web applications, e-commerce storefronts, or marketing websites, what technical architectural decisions govern crawlability and search indexing, and where is the line between Engineering and Marketing?
- Question 1: How does Googlebot's Web Rendering Service (WRS) process JavaScript SPAs versus Server-Side Rendered (SSR) architectures?
- Question 2: What are the concrete technical deliverables that Development must own versus Marketing?

## 2. External Sources and Evidence Examined

- **Source 1:** Google Search Central — *JavaScript SEO Basics and Search Pipeline* (Published by Google; URL: `developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`, accessed Nov 2026).
  - *Summary of findings:* Google processes pages through a multi-stage pipeline: **Crawling** (fetching URLs), **Rendering** (executing JavaScript via a headless Chromium service, which may be queued and delayed behind initial crawl), and **Indexing** (extracting text, canonical tags, and structured data from the rendered DOM).
- **Source 2:** Google Chrome / Web.dev — *Core Web Vitals Metric Definitions* (URL: `web.dev/explore/learn-core-web-vitals`, accessed Nov 2026).
  - *Summary of findings:* Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) serve as direct search experience signals.

## 3. Analysis of External Practices

- **The Rendering Trade-Off:**
  - *Client-Side Rendering (CSR):* Simplest to deploy, but risks crawl delays and unindexed content due to deferred WRS execution queues.
  - *Server-Side Rendering (SSR) & Static Site Generation (SSG):* Delivers complete HTML on the initial byte, ensuring immediate, reliable crawlability and optimal Core Web Vitals.
- **Strict Scope Boundary:**
  - *Development Owns (Technical SEO):* Rendering architecture (SSR/SSG), HTTP status codes (200, 301, 404, 410), robots.txt, XML sitemaps, canonical tags, and Schema.org JSON-LD structured data.
  - *Marketing Owns (Content SEO):* Keyword selection, copywriting, metadata wording, backlinks, and search intent targeting.

## 4. Evaluation for Our Agency Context

- **Relevance to a 1–3 Person Agency:**
  - Essential: Prevents shipping client websites that fail to appear on Google because they were built as unrendered client-side SPAs.
- **Trade-offs & Heavyweight Pitfalls:**
  - Engineering must never promise guaranteed organic search ranking positions in client SOWs (ranking depends on marketing and competition).

## 5. Candidate Practices Proposed for Consideration

1. **Architecture Default for Public Pages:** Default to SSR or SSG (e.g., Next.js, Astro) for all public discovery pages.
2. **Automated Structured Data Validation:** Verify JSON-LD schemas via the Google Rich Results Test API before production releases.

## 6. Uncertainties, Risks, and Open Questions

- Clarifying in client proposals that Technical SEO provides indexing infrastructure, not guaranteed top rankings.

## 7. Recommended Next Steps

- Informs a decision; not policy.
- [x] Reference Google Search Central standards in `04-engineering-standards/technical-seo-and-web-discoverability.md`.
