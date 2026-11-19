---
title: "Research: Production Lifecycle - Phase 0: Foundation & Design"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../templates/foundation-document-template.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/02-discovery-and-requirements.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/04-experience-and-solution-design.md"
---

> [!WARNING]
> **UNAPPROVED EXTERNAL ENTERPRISE REFERENCE MATERIAL (`status: proposed`):**
> This document contains unapproved external reference material representing a heavy enterprise lifecycle framework. It is **NOT active agency policy**.
> 
> **AI Coding Agents & Engineers MUST NOT enforce its gates** (such as the 15-section pre-code gate, complete upfront event taxonomies, or zero-TBD rules) on lean agency builds, MVPs, or prototypes. All project tailoring and gate enforcement must strictly defer to [`../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md`](../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md).

## What Phase 0 is *not*

Phase 0 is **not** "write a business plan."  
Phase 0 is **not** "draw a pretty architecture diagram."  
Phase 0 is **not** "pick a tech stack."

Phase 0 is: **decide everything that, if you get wrong, will force you to rebuild or will kill your app in production.** It is the set of decisions that are expensive to change later: ownership, data model, security model, compliance, observability, deployment strategy, and failure modes.

Everything else can be changed incrementally. These cannot.

## The gate rule (External Reference Context Only)

> [!CAUTION]
> **External Reference Rule — Do NOT Enforce as Agency Policy:** The gate rule below is retained from upstream enterprise reference material. In this agency, development follows iterative agile discovery and risk-tiered tailoring ([`../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md`](../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md)). Spikes, prototypes, and MVPs are explicitly permitted without completing all 15 sections.

> **You do not write production code until every section of Phase 0 has a written answer.**
> "I don't know yet" is not an answer. "We will decide later" is not an answer.
> If you cannot answer a section, that itself is the first thing you build.

---

# 📄 Phase 0 — Foundation & Design (Master Template)

**App name:** `_________________`  
**Owner:** `_________________`  
**Date:** `_________________`  
**Version:** `_________________`

> This document is the **contract** for this application. Every later phase references it. If it is wrong, everything downstream is wrong.

---

## Section 0.1 — Purpose & Business Context

**Why does this app exist?**  
`_________________________________________________`

**What problem does it solve?**  
`_________________________________________________`

**Who is the target user?** (be specific: role, context, skill level)  
`_________________________________________________`

**What happens if this app is down for 1 hour?**  
`_________________________________________________`

**What happens if this app is down for 1 week?**  
`_________________________________________________`

**Is this app a revenue-generating product, an internal tool, or a side project?**  
`_________________________________________________`

**Risk tier:** (critical / high / medium / low)  
`_________________________________________________`

> **Why this matters:** Risk tier determines how much of the rest of this document you must fill in with high rigor. A side project does not need the same security posture as a payment system. But you must *decide* the tier, not drift into it.

---

## Section 0.2 — Ownership & Governance

Every production service must have a named human who is accountable. "The team" is not a person.

| Role | Name | Responsibility |
|---|---|---|
| Service Owner | `________` | Overall accountability for the service |
| Technical Owner | `________` | Architecture, code, deployments |
| Data Owner | `________` | Data classification, retention, privacy |
| Security Owner | `________` | Security posture, incidents |
| On-call Primary | `________` | First responder to alerts |
| On-call Secondary | `________` | Escalation |

**Escalation path:** `_________________`

**Supported use cases:** `_________________`  
**Explicitly prohibited use cases:** `_________________`

> **Why this matters:** In production, ambiguity about ownership is the #1 cause of slow incident response. When something breaks at 2 AM, someone must know it is their job.

---

## Section 0.3 — User Journey & Core Flows

List every step a user takes from first contact to value delivery to payment to cancellation.

| Step | User Action | System Response | What Can Go Wrong | Metric Tracked |
|---|---|---|---|---|
| 1 | `________` | `________` | `________` | `________` |
| 2 | `________` | `________` | `________` | `________` |
| 3 | `________` | `________` | `________` | `________` |
| ... | | | | |

**Onboarding flow:** `_________________`  
**Primary action (the thing that delivers value):** `_________________`  
**Payment flow:** `_________________`  
**Cancellation / deletion flow:** `_________________`  
**Support flow:** `_________________`

> **Why this matters:** You cannot track what you have not defined. The "What Can Go Wrong" column becomes your failure-mode list, and the "Metric Tracked" column becomes your event taxonomy.

---

## Section 0.4 — North Star Metric & Success Metrics

**North Star Metric:** `_________________`  
(One number that best represents value delivered to the user.)

**Supporting metrics:**

| Metric | Definition | Target | How Measured |
|---|---|---|---|
| Activation | `________` | `________` | `________` |
| Retention (D1) | `________` | `________` | `________` |
| Retention (D7) | `________` | `________` | `________` |
| Retention (D30) | `________` | `________` | `________` |
| Conversion | `________` | `________` | `________` |
| NPS / Satisfaction | `________` | `________` | `________` |

**What does "success" look like in 3 months?** `_________________`  
**What does "failure" look like?** `_________________`

> **Why this matters:** If you do not define success before you build, you will measure whatever is easy instead of what matters.

---

## Section 0.5 — SLOs (Service Level Objectives)

These are promises about production behavior. They are not aspirations. They are commitments.

| SLI (Indicator) | SLO (Target) | Measurement Window | Error Budget |
|---|---|---|---|
| Availability | `________%` | 30 days | `________` |
| Latency (p95) | `________ms` | 5 minutes | `________` |
| Latency (p99) | `________ms` | 5 minutes | `________` |
| Error rate | `________%` | 5 minutes | `________` |
| Crash-free sessions | `________%` | 7 days | `________` |
| Data durability | `________` | 30 days | `________` |

**Error budget policy:** What happens when the error budget is exhausted?  
`_________________________________________________`

> **Why this matters:** SLOs force you to decide what "good enough" means. Without them, you either over-engineer or under-engineer. With them, you can make rational trade-offs between speed and reliability.

---

## Section 0.6 — Non-Functional Requirements

These are the requirements that are not "features" but determine whether the app can survive real usage.

### Performance
- Page load time (p95): `________`
- API response time (p95): `________`
- Time to interactive: `________`
- Batch job completion time: `________`

### Scalability
- Expected users at launch: `________`
- Expected users at 6 months: `________`
- Peak concurrent users: `________`
- Expected requests per second at peak: `________`
- Scaling strategy: `________` (vertical / horizontal / autoscaling)

### Availability
- Required uptime: `________%`
- Maintenance window: `________`
- Acceptable planned downtime per month: `________`

### Reliability
- Recovery Time Objective (RTO): `________` (how fast must it recover?)
- Recovery Point Objective (RPO): `________` (how much data can be lost?)
- Failure modes identified: `________`
- Circuit breaker strategy: `________`

### Security
- Authentication method: `________`
- Authorization model: `________`
- Data encryption at rest: `________`
- Data encryption in transit: `________`
- Secret management: `________`
- Vulnerability scanning: `________`

### Maintainability
- Deployment frequency target: `________`
- Mean Time To Recovery (MTTR) target: `________`
- Change failure rate target: `________`

### Accessibility
- WCAG compliance level: `________`
- Screen reader support: `________`

### Cost
- Monthly infrastructure budget: `________`
- Cost per user target: `________`
- Cost alert threshold: `________`

> **Why this matters:** These are the numbers that determine whether your architecture will work. If you do not write them down, you will discover them during an outage.

---

## Section 0.7 — Architecture & System Design

**Architecture diagram:** `[attach or describe]`

**Components:**

| Component | Technology | Purpose | Scaling Strategy |
|---|---|---|---|
| Frontend | `________` | `________` | `________` |
| Backend API | `________` | `________` | `________` |
| Database | `________` | `________` | `________` |
| Cache | `________` | `________` | `________` |
| Queue | `________` | `________` | `________` |
| Object Storage | `________` | `________` | `________` |
| CDN | `________` | `________` | `________` |
| Load Balancer | `________` | `________` | `________` |

**External dependencies:**

| Dependency | Purpose | Failure Impact | Fallback Strategy |
|---|---|---|---|
| `________` | `________` | `________` | `________` |

**Data flow:** `[describe or diagram]`

**Stateless vs stateful components:** `_________________`

**Single points of failure:** `_________________`

> **Why this matters:** Every component you add is a component that can fail. You must know which failures are acceptable and which are not.

---

## Section 0.8 — Data Model & Data Lifecycle

**Core entities:** `_________________`  
**Entity relationships:** `[diagram or description]`

**Data classification:**

| Data Type | Sensitivity | Encryption Required | Retention Period | Deletion Policy |
|---|---|---|---|---|
| User PII | `________` | `________` | `________` | `________` |
| Auth credentials | `________` | `________` | `________` | `________` |
| Usage events | `________` | `________` | `________` | `________` |
| Payment data | `________` | `________` | `________` | `________` |
| Logs | `________` | `________` | `________` | `________` |

**Backup strategy:**
- Frequency: `________`
- Retention: `________`
- Storage location: `________`
- Encryption: `________`
- Restore testing frequency: `________`

**Migration strategy:** `_________________`  
**Rollback strategy for schema changes:** `_________________`

> **Why this matters:** Data is the one thing you cannot recreate. Everything else can be rebuilt from code. Data cannot.

---

## Section 0.9 — Security Model

**Threat model:** `[describe top 5 threats]`

**Authentication:**
- Method: `________`
- Session management: `________`
- MFA: `________`
- Password policy: `________`

**Authorization:**
- Model: `________` (RBAC / ABAC / other)
- Roles: `________`
- Permission matrix: `________`

**Secrets management:**
- Tool: `________`
- Rotation policy: `________`
- Access policy: `________`
- Audit logging: `________`

**Network security:**
- TLS enforcement: `________`
- Firewall rules: `________`
- Private networking: `________`
- Rate limiting: `________`
- WAF: `________`

**Vulnerability management:**
- Dependency scanning: `________`
- Container scanning: `________`
- SAST: `________`
- Penetration testing: `________`

**Incident response:**
- Who is notified: `________`
- Communication channel: `________`
- Legal/PR involvement: `________`

> **Why this matters:** Security is not a feature you add later. It is a property of the system. If it is not designed in, it will not be bolted on.

---

## Section 0.10 — Observability Plan

**Logs:**
- Format: `________` (structured JSON preferred)
- Destination: `________`
- Retention: `________`
- PII handling: `________`
- Correlation ID strategy: `________`

**Metrics:**
- Tool: `________`
- Key metrics: `________`
- Dashboards: `________`
- Retention: `________`

**Traces:**
- Tool: `________`
- Sampling rate: `________`
- Instrumentation: `________`

**Alerts:**
| Alert | Condition | Severity | Runbook | Notify |
|---|---|---|---|---|
| `________` | `________` | `________` | `________` | `________` |

**Health checks:**
- Liveness endpoint: `________`
- Readiness endpoint: `________`
- Startup probe: `________`

> **Why this matters:** In production, you cannot fix what you cannot see. Observability is not optional. It is the difference between a 5-minute fix and a 5-hour outage.

---

## Section 0.11 — Deployment & Release Strategy

**Environments:**
| Environment | Purpose | Data | Access |
|---|---|---|---|
| Local | Development | Mock | Developer |
| Staging | Pre-production testing | Anonymized | Team |
| Production | Live users | Real | Restricted |

**CI/CD pipeline:**
- CI tool: `________`
- Steps: `________`
- Test gates: `________`
- Artifact storage: `________`

**Deployment strategy:**
- Method: `________` (rolling / blue-green / canary)
- Rollback trigger: `________`
- Rollback time target: `________`

**Database migration strategy:** `_________________`  
**Feature flag strategy:** `_________________`

> **Why this matters:** Deployment is the most dangerous thing you do in production. Every deployment is a potential outage. The strategy must be designed before you write the first line of production code.

---

## Section 0.12 — Privacy & Compliance

**Regulations applicable:** `________` (GDPR / CCPA / HIPAA / other)  
**Data residency requirements:** `________`  
**Consent mechanism:** `________`  
**Right to deletion:** `________`  
**Right to access:** `________`  
**Data processing agreement needed:** `________`  
**Cookie policy:** `________`  
**Audit logging:** `________`

> **Why this matters:** Compliance violations can kill a company. They cannot be fixed retroactively. They must be designed in from the start.

---

## Section 0.13 — Event Taxonomy (Tracking Plan)

This is where the interface data collection begins.

**Event naming convention:** `object_action` (e.g., `habit_created`, `check_in_completed`)

| Event Name | Trigger | Properties | PII? | Destination |
|---|---|---|---|---|
| `app_opened` | App launch | `platform`, `app_version` | No | Analytics |
| `signup_started` | Sign-up tapped | `method` | No | Analytics |
| `signup_completed` | Account created | `user_id`, `method` | No | Analytics + Backend |
| `habit_created` | Habit saved | `habit_id`, `frequency` | No | Analytics + Backend |
| `check_in_completed` | Habit checked | `habit_id`, `streak` | No | Analytics + Backend |
| `paywall_viewed` | Upgrade screen | `source` | No | Analytics |
| `subscription_started` | Payment success | `plan`, `price` | No | Backend |
| `api_error` | Server error | `endpoint`, `status` | No | Backend |
| `notification_opened` | Push tapped | `notification_id` | No | Analytics |

**Properties always included:** `user_id`, `timestamp`, `app_version`, `platform`, `session_id`

**Privacy rules:**
- No PII in event properties
- Consent required before tracking
- Opt-out mechanism: `________`
- Data retention: `________`

> **Why this matters:** If you do not define the event taxonomy before development, every developer will invent their own names and properties. You will have unqueryable data. You will not be able to answer "why did retention drop?" because you never tracked the right events.

---

## Section 0.14 — Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| `________` | `________` | `________` | `________` | `________` |
| `________` | `________` | `________` | `________` | `________` |
| `________` | `________` | `________` | `________` | `________` |

**Assumptions:** `_________________`  
**Constraints:** `_________________`  
**Dependencies:** `_________________`

> **Why this matters:** A risk you have not written down is a risk you have not mitigated. Writing it down forces you to decide whether to accept it, mitigate it, or avoid it.

---

## Section 0.15 — Phase 0 Completion Gate

Before moving to Phase 1, confirm:

- [ ] Purpose and target user are defined
- [ ] Ownership is assigned to named humans
- [ ] Risk tier is decided
- [ ] User journey is mapped end-to-end
- [ ] North Star Metric is chosen
- [ ] SLOs are written with numbers
- [ ] Non-functional requirements are quantified
- [ ] Architecture is documented with components and dependencies
- [ ] Data model is defined with classification and retention
- [ ] Security model is designed with threat model
- [ ] Observability plan includes logs, metrics, traces, alerts
- [ ] Deployment strategy is chosen with rollback plan
- [ ] Privacy and compliance requirements are identified
- [ ] Event taxonomy is defined
- [ ] Risk register is populated
- [ ] **No section contains "TBD" or "we'll figure it out later"** *(Note: External reference gate; subject to project risk tailoring)*

> **If any box is unchecked, you are not ready to build. Go back and fill it in.** *(External reference gate only — see agency tailoring guidelines in `01-engineering-governance/project-risk-and-tailoring.md`).*

---

## Why Phase 0 is the most important phase

Everything downstream — development, deployment, operations, maintenance — is an *execution* of the decisions made in Phase 0.

If Phase 0 is wrong:
- You build the wrong product.
- You deploy to an architecture that cannot scale.
- You operate a system you cannot observe.
- You maintain code you cannot safely change.
- You cannot retain users because you never tracked the right events.

If Phase 0 is right:
- Development has a clear target.
- Deployment is predictable.
- Operations are manageable.
- Maintenance is safe.
- Improvement is driven by data, not guesses.

**Phase 0 is not paperwork. It is the highest-leverage thing you can do as a builder.**

---
