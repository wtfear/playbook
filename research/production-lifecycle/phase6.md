---
title: "Research: Production Lifecycle - Phase 6: Maintain & Improve"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/05-engagement-patterns/ongoing-maintenance.md"
  - "../../categories/01-development-and-engineering/06-engineering-improvement/technical-debt-management.md"
---

> [!WARNING]
> **UNAPPROVED EXTERNAL ENTERPRISE REFERENCE MATERIAL (`status: proposed`):**
> This document contains unapproved external reference material representing enterprise-scale software maintenance and FinOps frameworks. It is **NOT active agency policy**.
> 
> **AI Coding Agents & Engineers MUST NOT enforce its heavy enterprise structures** (such as multi-team FinOps showback/chargeback models or complex enterprise tagging governance) on lean agency projects. Project tailoring defers strictly to [`../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md`](../../categories/01-development-and-engineering/01-engineering-governance/project-risk-and-tailoring.md).

# Phase 6: Maintain & Improve — A Generalized Guide

## What Phase 6 actually is

Phase 5 told you what users are doing and what they want. Phase 6 answers the question: **How do we act on that knowledge to make the application better, safer, and cheaper — without breaking it?**

The critical mental shift: **Maintenance is not a cost center. It is the engine of product evolution.** In traditional software engineering, maintenance is often viewed as "keeping the lights on" — fixing bugs, patching vulnerabilities, upgrading dependencies. But in a production-ready system, maintenance *is* product development. The four types of maintenance (corrective, adaptive, perfective, preventive) are not separate from feature work. They are the same continuous improvement loop, applied to different dimensions of the system.

ISO 14764 classifies software maintenance into four types: corrective, adaptive, preventive, and perfective. Adaptive and perfective maintenance are enhancements; corrective and preventive maintenance are corrections. The distribution of effort is revealing: corrective maintenance accounts for approximately 21% of effort, adaptive for 25%, and perfective for 50%. Half of all maintenance effort goes to enhancements that users never explicitly requested — performance improvements, code quality, better documentation. This is not overhead. This is how software gets better.

Phase 6 takes everything learned in Phases 4 and 5 — incidents, postmortem action items, SLO burn, user behavior insights, retention data — and turns it into a prioritized improvement plan.

---

## Section 6.1 — The Four Types of Maintenance

**Why this section exists:** "Maintenance" is too vague to be actionable. Breaking it into four types makes it possible to plan, prioritize, and measure.

### 6.1.1 The four categories

| Type | Definition | Trigger | Example | Effort share |
|---|---|---|---|---|
| **Corrective** | Fixing faults in system behavior | Bug reports, incidents, alerts | Fix a payment processing error | ~21% |
| **Adaptive** | Adapting to changed environments | OS upgrades, API changes, new platforms | Upgrade to Node.js 22 LTS | ~25% |
| **Perfective** | Enhancing performance, maintainability, or attributes | User feedback, performance data, code reviews | Optimize database queries, refactor onboarding flow | ~50% |
| **Preventive** | Preventing future malfunctions | Risk assessment, security scans, capacity forecasts | Patch a vulnerability before exploit, add rate limiting | Small but critical |

**Corrective maintenance** includes emergency debugging (12.4% of effort) and routine debugging (9.3%). It is reactive: something broke, fix it.

**Adaptive maintenance** includes data environment adaptation (17.3%) and hardware/OS changes (6.2%). It is driven by external change: the platform moved, adapt to it.

**Perfective maintenance** is dominated by user enhancements (41.8%), with smaller shares for documentation and other improvements. It is proactive: users want something better, build it.

**Preventive maintenance** is the smallest category by effort but often the highest leverage. It includes security patching, dependency updates, capacity headroom, and refactoring to reduce future risk. A preventive fix costs a fraction of the corrective fix it prevents.

**Placeholder:**
- Time allocation by maintenance type: `Corrective: ____% | Adaptive: ____% | Perfective: ____% | Preventive: ____%`
- Owner for each type: `_________________`
- Review cadence: `_________________`

### 6.1.2 The maintenance backlog

Every maintenance activity must live in the same backlog as feature work. Debt and maintenance items that are invisible to product planning will never be prioritized.

| Principle | Implementation |
|---|---|
| **Visibility first** | Debt must be explicitly logged, tagged, and visible in the same tooling used for feature work |
| **Dedicated swimlane** | All maintenance items live in a dedicated backlog column or swimlane that mirrors the product backlog workflow (Ready → In Progress → Review → Done) |
| **Consistent taxonomy** | Label tickets by risk and domain: `debt/refactor`, `debt/perf`, `debt/tooling`, `debt/docs` |
| **Sizing and acceptance** | Apply the same estimation units as feature work and require clear acceptance criteria |
| **Quarterly review** | Once per quarter, audit the backlog, close stale tickets, and revalidate priority |

**Placeholder:**
- Maintenance backlog location: `_________________`
- Tagging taxonomy: `_________________`
- Quarterly review owner: `_________________`

---

## Section 6.2 — Technical Debt Management

**Why this section exists:** Technical debt is not a metaphor. It is a quantifiable drag on velocity. Every shortcut taken to ship faster creates interest payments in the form of slower development, more bugs, and harder onboarding. Managing it deliberately is the difference between a system that improves over time and one that decays.

### 6.2.1 The technical debt registry

A debt registry is a living document that tracks every known debt item, its impact, and its planned resolution.

| Field | Purpose | Example |
|---|---|---|
| **ID** | Unique identifier | `DEBT-042` |
| **Description** | What is the debt? | "User service uses synchronous HTTP call to recommendation service; should use async queue" |
| **Impact** | What does it cost us? | "Adds 200ms to p95 latency; causes cascading failures when recommendation service is slow" |
| **Risk** | How likely is it to cause an incident? | High / Medium / Low |
| **Effort** | How much work to fix? | Story points or days |
| **Owner** | Who is accountable? | Named engineer |
| **Target sprint** | When will it be addressed? | Sprint 42 |
| **Closure criteria** | How do we know it's fixed? | "Latency p95 < 100ms; no cascading failures in load test" |

**Placeholder:**
- Debt registry location: `_________________`
- Debt registry owner: `_________________`
- How new debt is logged: `_________________`

### 6.2.2 Sprint capacity allocation

Reserve a predictable slice of every sprint for debt retirement. The specific percentage matters less than the commitment to spending it deliberately.

| Allocation | When to use |
|---|---|
| **20% baseline** | Reserve 20% of each sprint capacity for debt retirement (e.g., 10 points in a 50-point sprint) |
| **Dynamic adjustment** | Increase allocation when: SLO burn rate is high, incident frequency is rising, or a critical dependency needs upgrading |
| **WIP limits** | Each squad may have at most ⌈N / 3⌉ concurrent debt stories in progress, where N is the number of engineers available |

**Placeholder:**
- Baseline debt allocation: `________%` of sprint capacity
- Dynamic adjustment triggers: `_________________`
- WIP limit for debt work: `_________________`

### 6.2.3 The debt paydown decision framework

Not all debt should be paid down immediately. Some debt is acceptable — it was a deliberate trade-off to ship faster. The question is: which debt is causing enough pain to justify the cost of fixing it?

| Signal | Action |
|---|---|
| **Debt causes incidents** | Fix immediately (corrective) |
| **Debt slows feature delivery** | Schedule in next sprint (perfective) |
| **Debt blocks a platform upgrade** | Fix before the upgrade deadline (adaptive) |
| **Debt is isolated and low-impact** | Document, monitor, revisit quarterly |
| **Debt is in code that will be deleted** | Do not fix; delete it instead |

---

## Section 6.3 — Dependency Management

**Why this section exists:** Modern applications are 90% third-party code. A production application with 100 direct dependencies may have 1,000+ transitive dependencies. Each one is a potential vulnerability, a potential breaking change, and a potential supply-chain attack vector.

### 6.3.1 The dependency update strategy

| Update type | Cadence | Risk | Process |
|---|---|---|---|
| **Critical security** | Same day when exploitable in production | High | Isolate, patch, test, deploy |
| **High security** | Within SLA (e.g., 7 days) | High | Patch, test, deploy |
| **Patch versions** | Monthly | Low | `npm update`, test, deploy |
| **Minor versions** | Quarterly, in batches | Medium | Review changelog, test in staging, deploy gradually |
| **Major versions** | Intentional, one at a time | High | Full regression testing, staged rollout |
| **Node.js / runtime** | Follow LTS schedule | Medium | Upgrade runtime first, then dependencies gradually |

**The dependency decision tree:**

```
Adding a new dependency?
├─ Do I really need this? (Can I implement in <100 LOC?)
├─ Is it well-maintained? (Last commit <6 months, >10k downloads/week)
├─ Bundle size impact? (Use Bundlephobia for JS)
├─ Security risks? (npm audit, Snyk)
└─ If all checks pass → Add with lockfile committed
```


**Updating dependencies:**
```
Security vulnerability?
├─ Critical → npm audit fix → Test → Deploy immediately
├─ High → Patch within SLA
└─ Routine update?
    ├─ Patch versions → npm update → Safe, do frequently
    ├─ Minor/major → Check CHANGELOG → Test in staging → Update gradually
    └─ All at once → [FAIL] RISKY → Update in batches instead
```


**Placeholder:**
- Dependency scanning tool: `_________________` (Dependabot, Renovate, Snyk)
- Update cadence by type: `_________________`
- Major version upgrade process: `_________________`
- Lockfile strategy: `_________________` (`npm ci` in CI, never `npm install` in production)

### 6.3.2 Supply chain security

| Practice | Why |
|---|---|
| **Commit lockfiles** | Reproducible builds; prevents "works on my machine" |
| **Use `npm ci` in CI** | Byte-for-byte reproducible install from lockfile |
| **Minimize direct dependencies** | Smaller attack surface, less to audit |
| **Audit `replace` directives** | No invisible code substitution |
| **Generate SBOM** | Software Bill of Materials for every release |
| **Sign artifacts** | Sigstore / Cosign for provenance |

**Placeholder:**
- SBOM generation tool: `_________________`
- Artifact signing tool: `_________________`
- Supply chain security policy: `_________________`

---

## Section 6.4 — Performance Optimization

**Why this section exists:** Performance is a feature. Slow applications lose users. But performance optimization must be driven by data, not intuition. Phase 5 identified where users drop off. Phase 6 identifies *why* — and fixes it.

### 6.4.1 The performance optimization workflow

```
1. Measure — Identify the slowest endpoints, queries, or interactions
2. Profile — Find where time is actually spent
3. Hypothesize — What change would improve it?
4. Implement — Make the change
5. Verify — Did the metric improve?
6. Monitor — Did it stay improved?
```

**Placeholder:**
- APM tool: `_________________` (New Relic, Datadog, Grafana, OpenTelemetry)
- Profiling tool: `_________________`
- Performance budget: `_________________` (e.g., "API p95 < 200ms, page load < 2s")
- Performance review cadence: `_________________`

### 6.4.2 The four performance levers

| Lever | What it does | When to use |
|---|---|---|
| **Caching** | Store computed results closer to the user | Repeated queries, expensive computations, static content |
| **Indexing** | Make database queries faster | Slow queries on large tables |
| **Async processing** | Move work out of the request path | Long-running operations, batch jobs, notifications |
| **Code optimization** | Reduce CPU, memory, or I/O | Hot paths identified by profiling |

**Placeholder:**
- Caching strategy: `_________________` (Redis, CDN, in-memory)
- Database indexing strategy: `_________________`
- Async queue tool: `_________________` (SQS, RabbitMQ, Kafka)
- Code optimization targets: `_________________`

### 6.4.3 Performance regression prevention

| Practice | Why |
|---|---|
| **Performance budgets in CI** | Fail the build if a change exceeds the budget |
| **Load testing before major releases** | Catch regressions before they reach users |
| **Canary deployments with latency gates** | Auto-rollback if latency degrades |
| **Continuous profiling in production** | Catch slow leaks and regressions in real time |

---

## Section 6.5 — Cost Optimization (FinOps Reference)

**Why this section exists:** Cloud costs grow silently. A service that costs $500/month at 1,000 users may cost $5,000/month at 10,000 users — or it may cost $50,000/month if no one is watching.

> [!NOTE]
> **Enterprise vs. Small Agency Scope:** Full FinOps frameworks (showback/chargeback to internal business units) are designed for large multi-department corporations. In a small agency context, cost optimization focuses directly on avoiding runaway billing: right-sizing compute instances, setting hard provider budget alerts, eliminating orphaned test disks/snapshots, and ensuring client hosting costs remain within agreed budgets.

### 6.5.1 The FinOps framework

FinOps transforms cloud cost management from a reactive exercise into a continuous, governed practice. The core activities are:

| Activity | Purpose |
|---|---|
| **Tagging** | Allocate costs to teams, services, and environments |
| **Budgeting** | Set spend targets and alerts |
| **Cost allocation** | Showback/chargeback to business units |
| **Rightsizing** | Match instance size to actual utilization |
| **Commitment discounts** | Reserved instances, savings plans for predictable workloads |
| **Automated shutdowns** | Turn off non-production resources during idle periods |

**Placeholder:**
- Cloud provider: `_________________`
- Cost management tool: `_________________` (AWS Cost Explorer, Azure Cost Management, GCP Cost Management)
- Budget alerts: `_________________`
- Tagging strategy: `_________________`

### 6.5.2 The cost optimization checklist

| Opportunity | Typical savings | How |
|---|---|---|
| **Eliminate unused resources** | 10–30% | Identify and delete idle instances, unattached volumes, old snapshots |
| **Rightsize instances** | 20–40% | Match instance type to actual CPU/memory utilization |
| **Reserved instances / savings plans** | 30–50% | Commit to 1- or 3-year terms for predictable workloads |
| **Autoscaling** | 20–40% | Scale down during low-traffic periods |
| **Storage tiering** | 40–70% | Move infrequently accessed data to cold storage |
| **Egress optimization** | 10–20% | Use CDN, compress data, reduce cross-region traffic |

**Placeholder:**
- Monthly cloud spend: `$________`
- Cost per user: `$________`
- Optimization opportunities identified: `_________________`
- Cost review cadence: `_________________`

### 6.5.3 Unit economics

The most important cost metric is not total spend. It is **unit economics**: cost per user, cost per transaction, cost per API call.

| Metric | Formula | Target |
|---|---|---|
| **Cost per active user** | Monthly infrastructure cost / MAU | Decreasing over time |
| **Cost per transaction** | Monthly infrastructure cost / transactions | Stable or decreasing |
| **Gross margin** | (Revenue - infrastructure cost) / Revenue | > 70% for SaaS |

**Placeholder:**
- Unit economics metrics: `_________________`
- Target unit economics: `_________________`
- How unit economics informs pricing: `_________________`

---

## Section 6.6 — User Feedback Loop

**Why this section exists:** Phase 5 measured behavior. Phase 6 collects explicit feedback: what users say they want, why they leave, and what would make them stay.

### 6.6.1 The feedback loop: Collect → Acknowledge → Analyze → Act → Close

A customer feedback loop is a repeatable workflow that captures input, turns it into insight, ships improvements, then tells customers what changed.

| Step | Activity | Tools |
|---|---|---|
| **Collect** | Gather feedback from multiple channels | In-app surveys, NPS, support tickets, churn surveys, community |
| **Acknowledge** | Let users know their feedback was received | Automated response, follow-up email |
| **Analyze** | Categorize, prioritize, identify patterns | Feedback management tool, tagging |
| **Act** | Ship improvements based on feedback | Product roadmap, sprint planning |
| **Close** | Tell users what changed and why | Release notes, email, in-app notification |

**The most important step is "Close."** Every open loop — every request that disappears into silence — is a small erosion of trust. Users who see their feedback result in action become loyal advocates. Users who see their feedback ignored become churn risks.

**Placeholder:**
- Feedback collection channels: `_________________`
- Feedback management tool: `_________________`
- Feedback review cadence: `_________________`
- Close-the-loop process: `_________________`

### 6.6.2 NPS and churn surveys

| Survey | When to send | What it measures |
|---|---|---|
| **NPS** | 10 days after signup, then quarterly | Overall satisfaction and loyalty |
| **Post-churn** | After cancellation | Why users leave |
| **Feature-specific** | After using a new feature | Whether the feature delivered value |
| **Onboarding** | After completing (or abandoning) onboarding | Where friction exists |

**Placeholder:**
- NPS tool: `_________________`
- NPS target: `________`
- Churn survey questions: `_________________`
- Response rate target: `________%`

### 6.6.3 In-app feedback

The highest-context feedback is collected inside the product, at the moment of friction.

| Pattern | When | Example |
|---|---|---|
| **Micro-survey** | After a key action | "How easy was it to create your first habit? 😞 😐 😊" |
| **Feature request** | After using a feature repeatedly | "Would you like to see a weekly summary?" |
| **Bug report** | After an error | "Something went wrong. Can you tell us what happened?" |
| **Exit intent** | Before cancellation | "What could we have done better?" |

**Placeholder:**
- In-app feedback tool: `_________________` (Pendo, Intercom, custom)
- Micro-survey triggers: `_________________`
- Response analysis process: `_________________`

---

## Section 6.7 — Continuous Improvement Cycle

**Why this section exists:** Improvement is not a one-time project. It is a cycle that repeats indefinitely. The PDCA cycle (Plan → Do → Check → Act) provides the structure.

### 6.7.1 The PDCA cycle applied to production

| Phase | Activity | Production example |
|---|---|---|
| **Plan** | Identify problem, analyze root cause, plan change | "D7 retention is 25%, below 35% target. Hypothesis: onboarding is too complex." |
| **Do** | Implement the change on a small scale | A/B test a simplified onboarding flow for 10% of users |
| **Check** | Measure results, compare to baseline | New onboarding improves D7 retention to 38% |
| **Act** | Standardize the change or iterate | Roll out to 100%; document what worked |

The PDCA cycle integrates structured, data-driven problem-solving tools with continuous improvement. It is not a one-time process. After "Act," the cycle begins again with a new "Plan."

**Placeholder:**
- PDCA cycle cadence: `_________________`
- Improvement tracking tool: `_________________`
- Who owns the cycle: `_________________`

### 6.7.2 Kaizen: Small, continuous improvements

Kaizen is the Japanese practice of continuous, incremental improvement. It is the opposite of "big bang" transformation. Small changes, applied consistently, compound into large gains.

| Principle | Application |
|---|---|
| **Small changes** | One improvement per sprint, not a massive refactor |
| **Everyone participates** | Every engineer can propose and implement improvements |
| **Measure everything** | If you cannot measure it, you cannot improve it |
| **Standardize improvements** | Once something works, make it the default |

**Placeholder:**
- Kaizen proposals per sprint: `________`
- Kaizen review process: `_________________`
- Improvement metrics tracked: `_________________`

### 6.7.3 The improvement backlog

Every insight from Phase 5, every postmortem action item from Phase 4, every piece of user feedback from Section 6.6, and every debt item from Section 6.2 feeds into a single improvement backlog.

| Source | Example item | Priority signal |
|---|---|---|
| **Postmortem** | "Add replication lag alert" | Incident frequency |
| **User feedback** | "Simplify onboarding" | Retention impact |
| **Technical debt** | "Refactor payment service" | Development velocity |
| **Performance** | "Optimize database queries" | Latency SLO burn |
| **Cost** | "Rightsize production instances" | Budget variance |
| **Dependency** | "Upgrade to Node.js 22 LTS" | Security / support deadline |

**Placeholder:**
- Improvement backlog location: `_________________`
- Prioritization framework: `_________________` (RICE, WSJF, ICE)
- Review cadence: `_________________`

---

## Section 6.8 — Postmortem Action Item Closure

**Why this section exists:** Phase 4 defined the postmortem process. Phase 6 closes the loop. A postmortem without action item closure is a document, not an improvement.

### 6.8.1 Why postmortem action items fail

Postmortem action items die for four predictable reasons: no named owner, wrong tracking tool, vague wording, and zero follow-up cadence.

| Failure mode | Fix |
|---|---|
| **No named owner** | Every action item has a single, named individual owner |
| **Wrong tracking tool** | Action items live in the real task tracker (Jira, Linear, Asana), not in a document |
| **Vague wording** | "Improve monitoring" is a wish. "Sam, add an alert for replication lag exceeding 30 seconds by end of sprint" is an action |
| **Zero follow-up cadence** | Review action item completion at every sprint retrospective |

### 6.8.2 The action item lifecycle

```
1. Created — During postmortem review
2. Assigned — Named owner, due date
3. Tracked — In task tracker, linked to incident
4. Reviewed — At sprint retrospective
5. Verified — Owner demonstrates the fix works
6. Closed — Marked complete, incident record updated
```

**Placeholder:**
- Action item tracking tool: `_________________`
- Action item review cadence: `_________________`
- Completion rate target: `________%`
- Escalation for overdue items: `_________________`

### 6.8.3 Measuring the loop

| Metric | What it measures |
|---|---|
| **Action item completion rate** | Are we closing the loop? |
| **Time to closure** | How long from postmortem to fix? |
| **Recurrence rate** | Do the same incidents happen again? |
| **MTTR trend** | Is incident response improving? |

**Placeholder:**
- Metrics tracked: `_________________`
- Reporting cadence: `_________________`
- Owner for metrics: `_________________`

---

## Section 6.9 — Phase 6 Completion Gate

Before moving to Phase 7 (Retire / Decommission), confirm:

- [ ] Maintenance backlog exists with all four types represented
- [ ] Technical debt registry is populated and prioritized
- [ ] Sprint capacity allocation for debt is defined and honored
- [ ] Dependency scanning is automated (Dependabot/Renovate)
- [ ] Dependency update cadence is defined by risk level
- [ ] SBOM is generated for every release
- [ ] Performance budgets are defined and monitored
- [ ] APM tooling is operational
- [ ] Cost tagging is implemented
- [ ] Budget alerts are configured
- [ ] Unit economics are tracked
- [ ] User feedback collection is operational (NPS, churn, in-app)
- [ ] Feedback loop follows Collect → Acknowledge → Analyze → Act → Close
- [ ] PDCA cycle is documented with cadence
- [ ] Improvement backlog is populated from all sources
- [ ] Postmortem action items have named owners and deadlines
- [ ] Action item completion rate is measured
- [ ] Recurrence rate is monitored
- [ ] Improvement metrics are reviewed regularly

**If any box is unchecked, the improvement engine is not running. The application will stagnate.**

---

## How Phase 6 connects to the rest of the lifecycle

Phase 6 takes the operational data from Phase 4 (incidents, SLO burn, capacity findings) and the product intelligence from Phase 5 (funnels, retention, experiments) and turns them into a **prioritized improvement plan**. It produces:

1. **A maintenance backlog** — corrective, adaptive, perfective, and preventive work items.
2. **A technical debt registry** — visibility into what is slowing the team down.
3. **A cost optimization practice** — FinOps discipline that keeps unit economics healthy.
4. **A user feedback loop** — structured collection, analysis, and closure.
5. **A continuous improvement cycle** — PDCA and Kaizen embedded in sprint workflow.
6. **Closed postmortem loops** — action items tracked to completion, not forgotten.

Phase 7 (Retire / Decommission) is the exit. Not every service runs forever. Phase 6 produces the signal that it is time to retire: declining usage, unsustainable unit economics, replacement by a better service, or strategic deprioritization. Phase 6 is where you decide to **invest** in a service. Phase 7 is where you decide to **end** it.

**The core principle of Phase 6:** You do not "maintain" software. You **evolve** it. Every incident is a lesson. Every user complaint is a signal. Every dollar of cloud spend is a decision. Every line of technical debt is a choice. Phase 6 is where you make those choices deliberately, continuously, and with data.
