---
title: "Specialty: Web Applications and Websites"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/ux-ui-and-accessibility.md"
  - "../04-engineering-standards/performance-and-capacity.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Specialty: Web Applications and Websites

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to commercial websites, headless CMS implementations, client dashboards, consumer portals, and web application frontends. *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Browser Support Baseline:** All web deliverables must verify functional compatibility across the last two major versions of evergreen browsers: Chrome, Safari (macOS & iOS), Edge, and Firefox.
- **Cookies & Consent Compliance:** Web applications deploying analytics, advertising pixels, or marketing trackers must integrate compliant cookie consent banners that honor user consent choices prior to script execution (satisfying GDPR and ePrivacy directives).
- **Page Speed & Core Web Vitals:** Production pages must achieve Google Core Web Vitals pass thresholds (LCP < 2.5s, INP < 200ms, CLS < 0.1) on standard 4G mobile emulation.
- **Baseline Technical SEO:** Public web properties must implement clean semantic HTML, dynamic OpenGraph/Twitter social cards, valid canonical URLs, auto-generated XML sitemaps, and strict `robots.txt` directives.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Responsive Design & Mobile-First:** Build layout breakpoints with mobile-first CSS media queries, testing UI states on minimum 320px screen widths up to 4K displays.
- **Progressive Hydration & SSR/SSG:** Leverage Server-Side Rendering (SSR) or Static Site Generation (SSG) for public SEO-critical routes, reserving client-side hydration for authenticated application areas.
- **Accessibility Integration:** Target WCAG 2.2 Level AA compliance, ensuring proper focus states, keyboard navigation, and ARIA labels ([`../04-engineering-standards/ux-ui-and-accessibility.md`](../04-engineering-standards/ux-ui-and-accessibility.md)).
- **Small-Team Simplicity:** Favor mature modern web frameworks (e.g., Next.js, Astro) with integrated routing, asset optimization, and edge deployment capabilities over disparate build tooling.

---

## 4. Common Failure Modes
- **Layout Shifts & Janky Page Loads:** Unsized images and late-loading fonts causing high Cumulative Layout Shift (CLS), penalizing search rank and frustrating users.
- **Safari / iOS Rendering Quirks:** Testing only on desktop Chrome, leading to broken mobile Safari layouts (e.g., 100vh viewport bugs, date input inconsistencies).
- **Non-Compliant Tracker Execution:** Executing Meta/Google pixels before user cookie consent is granted, creating severe legal liability under EU/UK privacy regulations.
- **Broken Social Cards & Previews:** Neglecting OpenGraph tags, resulting in empty or broken link previews when shared on LinkedIn, Twitter, or Slack.

---

## 5. Evidence that it's done (Checklist)
- [ ] Cross-browser testing log confirms rendering across Chrome, Safari (iOS/macOS), Edge, and Firefox.
- [ ] Google Lighthouse audit confirms Core Web Vitals pass performance budgets.
- [ ] Cookie consent banner operational, blocking non-essential cookies until accepted.
- [ ] XML sitemap and `robots.txt` verified via Google Search Console or crawler simulator.
- [ ] OpenGraph image and social preview tags validated using card inspection tools.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/checklist-template.md`](../../../templates/checklist-template.md): Web Launch Checklist.

---

## 7. Handoffs & Cross-Category Boundaries
- **Marketing ([`../../06-marketing/README.md`](../../06-marketing/README.md)):** Coordinates tracking pixels, SEO keyword structures, and social meta content requirements.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews cookie policy text, privacy policy links, and regulatory consent mechanics.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Obtains client approval on design fidelity and browser compatibility matrix.

---

## 8. Open Decisions
- What default framework should be standard for marketing sites (e.g., Astro vs. Webflow vs. Next.js)?
- What default cookie consent management platform (e.g., CookieYes vs. custom lightweight banner) should be deployed for client sites?
