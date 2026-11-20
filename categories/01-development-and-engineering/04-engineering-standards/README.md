---
title: "Engineering Standards Overview"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "../01-engineering-governance/project-risk-and-tailoring.md"
  - "../03-delivery-lifecycle/README.md"
---

# 04. Engineering Standards

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.


This directory defines the agency's proposed technical standards, architectural practices, and engineering quality guidelines that apply across all software, application, and automation deliverables.

## Purpose

To establish shared, reusable engineering practices that guarantee consistent technical quality, maintainability, reliability, and security across all agency deliverables, regardless of specific project archetypes or technology choices.

## Key Principles

- **Reusable Across Project Types:** Standards defined here apply universally (tailored according to [`../01-engineering-governance/project-risk-and-tailoring.md`](../01-engineering-governance/project-risk-and-tailoring.md)), preventing duplicate procedures across individual service specialties or engagement patterns.
- **Outcome-Oriented, Not Dogmatic:** Standards specify *what* technical outcomes and quality gates must be achieved (inspired by NIST SSDF and DORA capabilities) rather than locking the agency into a single programming language or cloud vendor.
- **Proposed Practices:** Documents here outline candidate standards undergoing evaluation; they become binding policies only when formally approved.

## Standards Navigation Index

| Document | Core Technical Focus | Primary External Reference |
| :--- | :--- | :--- |
| [`architecture-and-technical-decisions.md`](./architecture-and-technical-decisions.md) | System design, modularity, ADRs, trade-offs | C4 Model, Agile Architecture |
| [`ux-ui-and-accessibility.md`](./ux-ui-and-accessibility.md) | User interface standards and accessibility | W3C WCAG 2.2 Level AA |
| [`code-quality-and-review.md`](./code-quality-and-review.md) | Linting, formatting, peer code review gates | DORA CI, Google Style Guides |
| [`source-control-and-change-integration.md`](./source-control-and-change-integration.md) | Git conventions, branching, PR workflows | DORA Version Control |
| [`environments-configuration-and-secrets.md`](./environments-configuration-and-secrets.md) | 12-factor config, secrets management, zero leaks | NIST SSDF (PS.1), OWASP Secrets |
| [`dependencies-and-software-supply-chain.md`](./dependencies-and-software-supply-chain.md) | Package management, CVE scanning, licenses | NIST SSDF (PW.4), OpenSSF |
| [`api-and-integration-engineering.md`](./api-and-integration-engineering.md) | REST, GraphQL, webhooks, error handling | OpenAPI 3.1, RFC 7807 |
| [`data-databases-and-test-data.md`](./data-databases-and-test-data.md) | Migrations, indexing, test data masking | Evolutionary Database Design |
| [`security-and-privacy-engineering.md`](./security-and-privacy-engineering.md) | Threat modeling, OWASP Top 10, sanitization | OWASP ASVS, NIST SP 800-218 |
| [`validation-across-lifecycle.md`](./validation-across-lifecycle.md) | Requirements, server inputs, and client acceptance | NIST SSDF, OWASP Input Validation |
| [`testing-and-quality-engineering.md`](./testing-and-quality-engineering.md) | Unit, integration, E2E testing pyramid | DORA Automated Testing |
| [`reliability-and-resilience.md`](./reliability-and-resilience.md) | Timeouts, retries with jitter, idempotency, circuit breakers | SRE Resilience Patterns |
| [`performance-and-capacity.md`](./performance-and-capacity.md) | Latency, profiling, Core Web Vitals, sizing | Google Core Web Vitals |
| [`ci-cd-and-release-engineering.md`](./ci-cd-and-release-engineering.md) | Automated build pipelines, deployments | DORA Continuous Delivery |
| [`observability-and-operational-readiness.md`](./observability-and-operational-readiness.md) | Telemetry, logging, APM, alerting runbooks | OpenTelemetry, SRE Principles |
| [`backup-recovery-and-incident-engineering.md`](./backup-recovery-and-incident-engineering.md) | RTO/RPO, backup drills, incident response | NIST SP 800-61 |
| [`technical-documentation.md`](./technical-documentation.md) | Docs-as-code, READMEs, runbooks, schemas | Diátaxis Framework |
| [`ai-assisted-development.md`](./ai-assisted-development.md) | Coding assistants, prompt hygiene, review gates | OWASP Top 10 for LLMs |
| [`system-architecture-styles-and-patterns.md`](./system-architecture-styles-and-patterns.md) | Architectural styles, monolith vs modular, CQRS/event-driven | Martin Fowler, SWEBOK v4 |
| [`technical-seo-and-web-discoverability.md`](./technical-seo-and-web-discoverability.md) | Web crawlability, rendering, indexing, structured data | Google Search Central, Schema.org |
| [`rag-and-retrieval-systems.md`](./rag-and-retrieval-systems.md) | Chunking, embedding models, vector search, reranking, RAG evaluation | RAG Triad, OWASP LLM08 |
| [`llmops-and-model-governance.md`](./llmops-and-model-governance.md) | Prompt versioning, model gateways, token spend tracking, guardrails | NIST AI RMF, OWASP LLM Top 10 |
| [`client-constraints-and-enterprise-access.md`](./client-constraints-and-enterprise-access.md) | Enterprise VPN, ZTNA, package proxies, least-privilege IAM | NIST SP 800-207, ISO 27001 |

## Open Questions

- What minimum toolchain (linters, formatters, secret scanners) should be pre-packaged into the agency's default repository starter kits?
- How should code review requirements be adjusted for solo-engineer project engagements?
