---
title: "Research: Production Lifecycle - Phase 4: Operate"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/backup-recovery-and-incident-engineering.md"
---

> [!WARNING]
> **UNAPPROVED EXTERNAL ENTERPRISE REFERENCE MATERIAL (`status: proposed`):**
> This document contains unapproved external reference material representing a large-scale enterprise operations model. It is **NOT active agency policy**.
> 
> **AI Coding Agents & Engineers MUST NOT enforce its staffing rules** (such as the 8–9 engineer minimum on-call rotation or strict toil caps) on lean agency operations. Agency support models are subject to commercial founder decisions ([`ENG-Q08`](../../categories/01-development-and-engineering/open-questions.md)) and project risk tailoring ([`../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md`](../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md)).

# Phase 4: Operate — A Generalized Guide

## What Phase 4 actually is

Phase 3 deployed the artifact. Phase 4 answers the question: **Now that it's live and serving real users, how do we keep it running, and how do we know when it's not?**

The critical mental shift: **Production operations is not "maintenance." It is a discipline with its own principles, roles, and feedback loops.** In development, you write code and it works on your machine. In production, the same code must survive hardware failures, operator errors, bad deploys, traffic spikes, and dependency outages — simultaneously, and often at 3 AM. The difference between software that "works" and software that is "operated" is the entire subject of Phase 4.

Phase 4 is where the instrumentation built in Phase 1 (logs, metrics, traces, events) becomes actionable. It is where the SLOs defined in Phase 0 become promises you either keep or break. It is where the deployment safety mechanisms from Phase 3 are validated under real traffic.

---

## Section 4.1 — The Operating Model: Who Runs Production

**Why this section exists:** Production does not operate itself. Someone must be accountable when it breaks, and that accountability must be structured, not accidental.

### 4.1.1 Ownership models

| Model | Description | Best for |
|---|---|---|
| **You build it, you run it** | The team that writes the code is responsible for operating it | Small teams, high-velocity products |
| **SRE model** | A dedicated reliability team provides platform, tooling, and embedded engineers | Larger organizations with multiple services |
| **Hybrid** | Developers own service reliability; a platform team provides shared infrastructure | Most growing teams |

**Placeholder:**
- Ownership model for this app: `_________________`
- Service owner: `_________________`
- On-call owner: `_________________`
- Platform/reliability support: `_________________`

### 4.1.2 Toil and operational work

Toil is manual, repetitive, automatable work that scales linearly with traffic or service count. It includes manual alert acknowledgment, routine restarts, certificate renewal, and capacity adjustments. Google's SRE practice recommends keeping at least 50% of SRE time for project work, with roughly one-third on operational tasks and two-thirds on engineering work as a healthier balance. If an engineer spends more than 30–40% of their on-call bandwidth on incident work, quality drops, mistakes rise, and burnout follows.

**Toil reduction targets:**
- Identify the top 3 toil activities: `_________________`
- Automation plan for each: `_________________`
- Target toil percentage: `________%` of operational time

---

## Section 4.2 — SLOs and Error Budgets in Operation

**Why this section exists:** Phase 0 defined SLOs. Phase 4 is where they are measured, burned, and used to make decisions.

### 4.2.1 The SLO framework in practice

An SLO is a contract between product and operations. The error budget is `1 - SLO` — the amount of unreliability you are allowed before you must slow down and fix things. A 99.9% availability SLO gives you 43.2 minutes of downtime per month. A 99.99% SLO gives you approximately 53 minutes per year.

**The error budget policy:**
- When budget is remaining: normal deployment cadence.
- When budget is 50% consumed: review recent changes; increase monitoring.
- When budget is 25% remaining: freeze non-critical changes.
- When budget is exhausted: all engineering effort shifts to reliability until budget is restored.

**Placeholder:**
- SLI definitions: `_________________`
- SLO targets (availability, latency, error rate): `_________________`
- Error budget for the month: `________ minutes`
- Error budget policy: `_________________`
- Budget tracking dashboard: `_________________`

### 4.2.2 Burn rate alerting

The most important operational alert is not "the service is down." It is "the service is consuming its error budget at an unsustainable rate." Burn rate alerts fire when the rate of error budget consumption would exhaust the budget faster than planned.

**Typical burn rate windows:**

| Window | Burn rate threshold | Action |
|---|---|---|
| 1 hour | 14× normal consumption | Page immediately |
| 6 hours | 6× normal consumption | Page during business hours |
| 24 hours | 3× normal consumption | Ticket |
| 3 days | 1× normal consumption | Review in next sprint |

**Placeholder:**
- Burn rate alert configuration: `_________________`
- Notification channels by severity: `_________________`

---

## Section 4.3 — Monitoring and Alerting in Operation

**Why this section exists:** Monitoring is not "having dashboards." It is the practice of answering specific operational questions with data, and alerting only when human action is required.

### 4.3.1 The three operational questions

Every dashboard and alert should serve one of these questions:

| Question | Data source | Typical alert |
|---|---|---|
| **Is the service healthy right now?** | SLI metrics (latency, error rate, throughput) | SLO burn rate |
| **What is the user experiencing?** | Synthetic checks, RUM, session replay | Uptime check failure |
| **Is the infrastructure adequate?** | Resource metrics (CPU, memory, disk, connections) | Saturation thresholds |

The goal is not more metrics. The goal is actionable signals. Teams that implement SLO-driven alerting often see alert noise reduced by 80% and MTTR cut by 50%.

### 4.3.2 Alert design principles

| Principle | Rule |
|---|---|
| **Actionable** | Every alert must have a runbook with a clear response. If no action exists, it is not an alert — it is a dashboard. |
| **Urgent** | Distinguish between pages (wake someone up) and tickets (handle during business hours). |
| **Specific** | Alert on symptoms (high error rate) not causes (high CPU). CPU can be high without user impact. |
| **Deduplicated** | Group related alerts to avoid storms. |
| **Owned** | Every alert has a named owner and a documented runbook. |

**Placeholder:**
- Alerting tool: `_________________`
- On-call notification tool: `_________________`
- Alert runbook location: `_________________`
- Alert noise reduction target: `________%`

### 4.3.3 Synthetic monitoring and real user monitoring

**Synthetic monitoring:** Automated scripts that simulate user journeys (sign-in, search, checkout) from multiple geographic locations. It detects outages before users report them.

**Real User Monitoring (RUM):** Measures actual user experience (page load time, time to interactive, error rates) from real browsers and devices. It reveals problems that synthetic tests miss.

**Placeholder:**
- Synthetic check frequency: `________ minutes`
- Synthetic locations: `_________________`
- RUM tool: `_________________`

---

## Section 4.4 — Incident Management

**Why this section exists:** Incidents will happen. The question is whether the response is chaotic or structured. Structured response reduces MTTR, reduces stress, and produces learning.

### 4.4.1 Incident severity levels

Severity levels standardize response. Keep them simple: 3–4 levels is enough.

| Level | Name | Definition | Response time | Communication |
|---|---|---|---|---|
| **SEV-1** | Critical | Complete service outage affecting all users, or data loss/security breach | < 5 minutes | Status page + executive notification |
| **SEV-2** | Major | Significant degradation, core feature broken, or partial outage | < 15 minutes | Status page + on-call page |
| **SEV-3** | Minor | Limited impact, workaround available | < 4 hours | Internal notification |
| **SEV-4** | Low | Cosmetic or non-user-facing issue | Next business day | Ticket only |

**Placeholder:**
- Severity definitions specific to your app: `_________________`
- Examples for each severity: `_________________`
- Severity escalation authority: `_________________`

### 4.4.2 Incident response roles

Every incident needs clear ownership. The roles are:

| Role | Responsibility |
|---|---|
| **Incident Commander (IC)** | Coordinates overall response. Makes decisions on escalation and communication. Does NOT troubleshoot directly. |
| **Technical Lead** | Leads diagnosis and remediation. Coordinates between engineers. |
| **Communications Lead** | Updates status page. Handles customer communications. Notifies stakeholders. |
| **Scribe** | Records all actions taken. Tracks who did what and when. Prepares postmortem timeline. |

**Placeholder:**
- Who fills each role: `_________________`
- Escalation path: `_________________`
- Communication channels: `_________________`

### 4.4.3 The incident response process

The process is a rhythm: observe, analyze, act, communicate, review.

```
1. Detect — Alert fires or user reports
2. Triage — Assess severity and impact
3. Declare — Assign severity, open incident channel
4. Assign roles — IC, tech lead, comms, scribe
5. Mitigate — Stop the bleeding. Roll back first.
6. Communicate — Status updates on a cadence (every 15-30 min for SEV-1)
7. Resolve — Confirm service restored
8. Close — Downgrade severity, final update
9. Postmortem — Schedule within 48 hours
```

**Critical rule:** Focus on mitigation, not understanding. Deep understanding can wait. Roll the bad change back first.

### 4.4.4 Blameless postmortems

Every SEV-1 and SEV-2 requires a postmortem. The purpose is learning, not blame. A blameless postmortem finds and fixes underlying problems without finger-pointing.

**Postmortem template:**

| Section | Content |
|---|---|
| **Summary** | What happened, in plain language |
| **Impact** | Who was affected, for how long, and how severely |
| **Timeline** | Chronological log of detection, response, and resolution |
| **Root cause** | The underlying technical and organizational causes |
| **Detection** | How was the incident discovered? Could it have been detected sooner? |
| **Response** | What went well? What went poorly? |
| **Action items** | Specific, assigned, dated tasks to prevent recurrence |
| **Lessons learned** | What will the team do differently? |

**Placeholder:**
- Postmortem template location: `_________________`
- Postmortem review meeting cadence: `_________________`
- Action item tracking: `_________________`

---

## Section 4.5 — Runbooks and Playbooks

**Why this section exists:** At 3 AM, no one wants to figure out what to do from scratch. Runbooks and playbooks are the difference between a 5-minute fix and a 5-hour outage.

### 4.5.1 Runbooks vs. playbooks

A runbook is a step-by-step procedure for one specific technical task — restart this service, rotate this certificate, fail over this database. A playbook is a higher-level guide for navigating an entire class of situations — how to run a SEV-1 response, how to handle a security incident — including roles, decision points, and communication. Runbooks tell you exactly what to type; playbooks tell you how to think and coordinate.

| Dimension | Runbook | Playbook |
|---|---|---|
| Scope | One specific task or failure mode | A whole scenario or incident class |
| Content | Ordered commands, checks, expected outputs | Roles, phases, decision trees, comms plans |
| Judgment required | Minimal — follow the steps | Significant — adapt to the situation |
| Primary user | The engineer at the keyboard | The incident commander and responders |
| Automation potential | High — often fully scriptable | Low — coordination resists automation |

**Placeholder:**
- Runbook repository: `_________________`
- Playbook repository: `_________________`
- Runbooks needed (top 10 failure modes): `_________________`

### 4.5.2 What every runbook must contain

- **Metadata:** Title, version, owner, last updated.
- **Trigger conditions:** What alert or symptom initiates this runbook?
- **Preconditions:** What must be true before starting?
- **Numbered steps:** Exact commands with expected output at each step.
- **Abort path:** What to do if something looks wrong.
- **Verification:** How to confirm the fix worked.
- **Escalation:** Who to contact if the runbook fails.

**Placeholder:**
- Runbook template: `_________________`
- Runbook review cadence: `_________________`

---

## Section 4.6 — On-Call

**Why this section exists:** Production is 24/7. Someone must be available to respond. On-call is a structured commitment, not an informal expectation.

### 4.6.1 The math of sustainable on-call (Enterprise Reference Context)

> [!NOTE]
> **Enterprise Scale Context:** The arithmetic below illustrates why 24/7 dedicated single-site coverage requires large enterprise platform teams (8–9 engineers). For a 1–3 person agency, 24/7 rotations cannot be staffed this way; support models, business-hours coverage, and retainer terms are commercial founder decisions ([`ENG-Q08`](../../categories/01-development-and-engineering/open-questions.md)) tailored per client SOW.

For 24/7 single-site coverage without burnout, you need a minimum of 8–9 engineers on the rotation. This is not a soft recommendation — it is arithmetic. If you cap on-call load at 25% of an engineer's time, each engineer can take 42 hours per week. Covering 168 hours requires four engineers for primary alone; adding a secondary layer brings it to eight; adding a buffer for vacations and attrition brings it to nine.

| Team size | Realistic model |
|---|---|
| 3–5 engineers | Primary plus backup, weekly swaps, business-hours coverage only |
| 6–8 engineers | Weekly primary with secondary layer, still stretched |
| 9–15 engineers | Weekly primary plus secondary, sustainable single-site |
| 15–25 engineers | Follow-the-sun across two regions, no overnight shifts |
| 25+ engineers | Follow-the-sun across three regions, split shifts optional |

**Placeholder:**
- On-call team size: `________`
- Rotation model: `_________________`
- Rotation cadence: `_________________`
- Primary/secondary structure: `_________________`

### 4.6.2 On-call principles

| Principle | Meaning |
|---|---|
| **Protect the customer** | The ultimate purpose of being on-call. |
| **Always pick up the phone** | If you don't, no one will. |
| **Ensure chain of custody** | Own the problem until it's done. |
| **Focus on mitigation** | Roll back first, understand later. |
| **Don't give up** | Escalate, but stay engaged. |

**Placeholder:**
- On-call expectations document: `_________________`
- Handoff process: `_________________`
- Escalation policy: `_________________`
- Compensation/recognition for on-call: `_________________`

---

## Section 4.7 — Capacity Planning

**Why this section exists:** Auto-scaling reacts to metrics after they've already moved. Capacity planning gets ahead of the curve. A streaming service that planned for 30% growth but experienced 60% hit CPU saturation within hours — auto-scaling couldn't save them because it was already riding the curve down.

### 4.7.1 The capacity planning framework

| Step | Activity |
|---|---|
| **1. Forecast demand** | Combine historical traffic patterns, marketing calendar (releases, campaigns), and leading indicators (signup trends, social buzz) |
| **2. Model headroom** | Target 30–40% headroom above peak. Never run at >80% utilization. |
| **3. Set thresholds** | Define the utilization level at which scaling actions trigger. |
| **4. Conduct what-if analysis** | Model scenarios: "What if traffic doubles? What if a region fails?" |
| **5. Test with load** | Validate the model with load testing at expected and peak traffic. |
| **6. Review weekly** | SRE, product, and infrastructure review demand forecasts for the next quarter. |

**Placeholder:**
- Expected peak traffic (RPS): `________`
- Current capacity: `________`
- Headroom target: `________%`
- Autoscaling thresholds: `_________________`
- Capacity review cadence: `_________________`
- Load testing schedule: `_________________`

---

## Section 4.8 — Backup and Disaster Recovery

**Why this section exists:** Most teams discover gaps in their backups during an actual outage — when a ransomware payload has encrypted production, or a region has gone dark, and someone tries to restore from the "nightly backup" that hasn't succeeded in six weeks.

### 4.8.1 RTO and RPO

Two numbers drive every disaster recovery decision:

- **Recovery Time Objective (RTO):** How long the business can tolerate a system being down.
- **Recovery Point Objective (RPO):** How much data loss (measured in time) is acceptable.

Score every critical service against these:

| System | RTO | RPO | Tier |
|---|---|---|---|
| Payments API | 15 min | 1 min | Tier 0 |
| Customer DB | 1 hour | 5 min | Tier 1 |
| Internal tools | 24 hours | 24 hours | Tier 3 |

Tier 0 and Tier 1 systems justify continuous replication and hot standbys. Tier 3 systems can survive on nightly snapshots.

### 4.8.2 The 3-2-1 rule

- **3 copies** of data
- On **2 different media/storage types**
- With **1 copy off-site** or off-account

At least one copy should be **immutable** — write-once, unable to be altered or deleted by a compromised credential. This is your last line of defense against ransomware that specifically targets backup repositories.

**Placeholder:**
- Backup frequency by data type: `_________________`
- Backup storage locations: `_________________`
- Immutable backup copy: `Yes / No`
- Encryption at rest: `_________________`

### 4.8.3 Disaster recovery testing

Backups that have never been restored are not backups. They are hopes. Test recovery regularly:

| Test type | Frequency | What it validates |
|---|---|---|
| **Restore single record** | Weekly | Backup integrity, tooling works |
| **Restore full database** | Monthly | RTO/RPO achievable |
| **Regional failover** | Quarterly | Cross-region replication, DNS failover |
| **Full DR drill** | Annually | End-to-end recovery, team readiness |

**Placeholder:**
- DR test schedule: `_________________`
- Last successful restore: `_________________`
- DR runbook location: `_________________`
- RTO/RPO validation results: `_________________`

---

## Section 4.9 — Operational Dashboards

**Why this section exists:** Dashboards are the operational picture. They must answer the questions on-call needs, not display every metric available.

### 4.9.1 The four operational dashboards

| Dashboard | Audience | What it shows |
|---|---|---|
| **Service health** | On-call engineer | SLI metrics, SLO burn rate, error rate, latency, throughput |
| **Infrastructure** | Platform team | CPU, memory, disk, network, database connections, queue depth |
| **Business metrics** | Product and leadership | Signups, active users, revenue, conversion, retention |
| **Deployment** | Release engineer | Deploy frequency, error rate by version, rollback status, canary health |

**Placeholder:**
- Dashboard tool: `_________________`
- Service health dashboard: `_________________`
- Infrastructure dashboard: `_________________`
- Business metrics dashboard: `_________________`
- Deployment dashboard: `_________________`

---

## Section 4.10 — Phase 4 Completion Gate

Before moving to Phase 5 (Observe & Analyze), confirm:

- [ ] Ownership model is defined with named owners
- [ ] Toil is identified and reduction plan is in place
- [ ] SLOs are measured in real time with error budget tracking
- [ ] Burn rate alerts are configured and firing correctly
- [ ] Alerting is actionable (every alert has a runbook)
- [ ] Alert noise is below target
- [ ] Synthetic monitoring is running from multiple locations
- [ ] RUM is capturing real user experience
- [ ] Incident severity levels are defined with examples
- [ ] Incident response roles are assigned
- [ ] Incident response process is documented and rehearsed
- [ ] Postmortem template exists and is used
- [ ] Runbooks exist for top 10 failure modes
- [ ] Playbooks exist for SEV-1 and SEV-2 response
- [ ] On-call rotation is staffed and sustainable
- [ ] On-call handoff process is documented
- [ ] Capacity planning framework is in place
- [ ] Headroom target is defined and monitored
- [ ] Load testing validates capacity model
- [ ] RTO/RPO defined for every critical system
- [ ] Backups follow the 3-2-1 rule
- [ ] At least one immutable backup copy exists
- [ ] Disaster recovery is tested on a schedule
- [ ] Operational dashboards exist for on-call, platform, product, and deployment
- [ ] On-call team is briefed on dashboards and runbooks

**If any box is unchecked, the service is not operationally ready. Do not proceed to Phase 5 until operations is stable.**

---

## How Phase 4 connects to the rest of the lifecycle

Phase 4 takes the deployed service from Phase 3 and the telemetry from Phase 1, and turns them into a **living operational system**. It produces:

1. **A stable service** that is monitored, alerted, and recoverable.
2. **Operational knowledge** — runbooks, playbooks, postmortems, and incident history.
3. **A feedback loop** — error budgets tell you when to slow down, capacity plans tell you when to scale, incidents tell you what to fix.

Phase 5 (Observe & Analyze) uses the operational data from Phase 4 — along with the user event tracking from Phase 1 — to understand what users are actually doing and why. Phase 6 (Maintain & Improve) takes the postmortem action items, capacity findings, and user behavior insights to make the next version better.

**The core principle of Phase 4:** You do not "hope" production stays up. You **operate** it with defined SLOs, structured incident response, rehearsed runbooks, sustainable on-call, and tested disaster recovery. Operations is not the absence of incidents — it is the presence of a system that detects, responds, and learns from them.
