---
title: "Research: Production Lifecycle - Phase 5: Observe & Analyze"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/observability-and-operational-readiness.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/11-operation-maintenance-and-technical-closure.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains external research and candidate reference material. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

# Phase 5: Observe & Analyze — A Generalized Guide

## What Phase 5 actually is

Phase 4 kept the service running. Phase 5 answers a completely different question: **Now that we have real users and real data, what are they actually doing, and what should we build next?**

The critical mental shift: **Observability and product analytics are not the same thing.** Observability (Phase 4) tells you "is my server healthy?" — it measures system health, latency, error rates, and resource utilization. Product analytics (Phase 5) tells you "are people getting value from my product?" — it measures what users do, where they drop off, what drives retention, and which features actually matter. Observability is for on-call engineers. Product analytics is for product decisions.

A product analytics tool can show that task completion fell 8% last month. An observability platform can show that a server's CPU spiked. Neither can connect the two — and that connection is the only thing that turns a technical observation into a product decision.

Phase 5 is where the event taxonomy defined in Phase 0 and implemented in Phase 1 becomes actionable intelligence. It is where you stop guessing what users want and start measuring.

---

## Section 5.1 — The Analytics Foundation: Tracking Plan and Event Taxonomy

**Why this section exists:** Most analytics problems are not technical. They are the result of no one deciding what to measure before the feature was built. When a feature ships without verified tracking in place, the cost shows up later — empty dashboards, re-opened tickets, and roadmap decisions made without reliable numbers.

### 5.1.1 The tracking plan as a contract

A tracking plan is a structured list of the events and properties you intend to fire for a feature: what triggers them, what properties they carry, and what naming conventions apply. It is the contract between product, engineering, and data — and it belongs in the feature spec, not in a separate document that gets out of sync.

Before any feature moves to development, answer three questions in the design phase:

| Question | Why it matters |
|---|---|
| **What user actions prove adoption?** | Defines the events that must be tracked |
| **What does success look like at 30, 60, and 90 days?** | Defines the metrics that measure value |
| **What signal would tell you to double down or cut the feature?** | Defines the kill criteria |

**Placeholder:**
- Tracking plan location: `_________________`
- Tracking plan template: `_________________`
- Who owns the tracking plan: `_________________`
- Review cadence: `_________________`

### 5.1.2 Event taxonomy design rules

An event taxonomy is how you choose, name, and organize your data with events and their associated properties. Its purpose is to accurately capture the actions users take. When your taxonomy is clear, consistent, and relevant, the data feels intuitive. When it's confusing or bloated, it becomes a blocker for insights.

**Three rules for event design**:

| Rule | Example (good) | Example (bad) |
|---|---|---|
| **Past tense, action-oriented** | `checkout_completed` | `checkout_complete`, `completing_checkout` |
| **Object-action format** | `habit_created` | `create` |
| **Granular but not redundant** | Track distinct user actions | `button_clicked` (too generic) |

Some teams use a **noun+verb format** with title case and spaces: "File export completed" instead of `export_file`, "Registration completed" instead of `sign_up`. Use properties instead of unique event names for variations to keep the catalog manageable.

**Universal events most products need** (from the event taxonomy template):

| Category | Events |
|---|---|
| **Lifecycle** | `user_signed_up`, `user_logged_in`, `user_logged_out`, `user_deleted_account` |
| **Feature engagement** | `feature_used`, `setting_changed`, `notification_clicked` |
| **Errors** | `error_occurred`, `form_validation_failed` |
| **Communication** | `email_opened`, `email_clicked`, `email_unsubscribed` |

**Properties to capture across all events**:

| Property | Purpose |
|---|---|
| `user_id` | Persistent across sessions |
| `session_id` | New per session |
| `account_id` | For multi-user accounts |
| `plan` | Current plan tier |
| `days_since_signup` | User lifecycle stage |
| `device_type` | Platform context |
| `utm_source` / `utm_medium` / `utm_campaign` | Acquisition channel |

**Placeholder:**
- Event naming convention: `_________________`
- Universal properties list: `_________________`
- Event catalog location: `_________________`
- Schema registry tool: `_________________` (Lexicon, custom)

### 5.1.3 Governance: preventing taxonomy drift

When a product grows from simple to complex, analytics can quickly become a tangled mess. Events multiply, naming becomes inconsistent, and tribal knowledge is undocumented. Governance prevents this.

**Governance mechanisms:**

| Mechanism | Purpose |
|---|---|
| **Schema registry** | Central catalog of all approved events and properties |
| **Event approval** | New events require review before ingestion |
| **Naming convention enforcement** | CI checks that event names follow the convention |
| **Regular taxonomy audits** | Review and clean up unused or redundant events |
| **Data views** | Segment data by product area without duplicating events |

**Placeholder:**
- Governance owner: `_________________`
- Approval process for new events: `_________________`
- Taxonomy audit frequency: `_________________`
- Tool for schema registry: `_________________`

---

## Section 5.2 — The Four Analysis Frameworks

**Why this section exists:** Raw event data is useless without a framework for interpreting it. These four frameworks answer the four most important product questions.

### 5.2.1 Funnel analysis: Where do users drop off?

A funnel measures the steps a user takes from an initial action to a goal, and shows the conversion rate at each step.

**Typical funnel for a habit-tracking app:**

| Step | Event | Users | Conversion |
|---|---|---|---|
| 1. App opened | `app_opened` | 10,000 | 100% |
| 2. Signup started | `signup_started` | 6,000 | 60% |
| 3. Signup completed | `signup_completed` | 4,500 | 75% |
| 4. First habit created | `habit_created` | 3,200 | 71% |
| 5. First check-in | `check_in_completed` | 2,100 | 66% |
| 6. Returned next day | `check_in_completed` (D1) | 1,400 | 67% |

**What to look for:**
- **Largest drop-off:** The step with the biggest percentage loss is the biggest opportunity.
- **Comparison over time:** Is conversion improving or degrading?
- **Segment comparison:** Do mobile users drop off differently than web users?
- **Cohort comparison:** Did the new onboarding flow improve conversion?

**Placeholder:**
- Primary funnel: `_________________`
- Key drop-off points: `_________________`
- Conversion target per step: `_________________`
- Funnel tool: `_________________`

### 5.2.2 Retention analysis: Do users come back?

Retention measures whether users return to your product over time. It is one of the most important indicators of product health and product-market fit. If users don't come back, nothing else matters.

**How retention works:** A retention report measures the percentage of users who perform an action (the "return event") after first performing another action (the "first event").

| Parameter | Definition | Example |
|---|---|---|
| **First event** | The action that starts the clock | `signup_completed` |
| **Return event** | The action that indicates return | `check_in_completed` |
| **Time window** | Daily, weekly, or monthly intervals | Day 1, Day 7, Day 30 |

**Reading a retention report:**

| Cohort (signup week) | Day 0 | Day 1 | Day 7 | Day 30 |
|---|---|---|---|---|
| Week 1 | 100% | 45% | 25% | 12% |
| Week 2 | 100% | 48% | 27% | — |
| Week 3 | 100% | 52% | — | — |

**What to look for:**
- **Sharp drops:** Large decreases between adjacent periods indicate friction.
- **Flattening curve:** When the curve levels off, you've found your retained user base.
- **Cohort comparison:** Do newer cohorts retain better than older ones?.
- **D1 vs. D7 vs. D30:** Day 1 retention is the strongest predictor of long-term retention.

**Rolling vs. calendar windows**:
- **Rolling:** Day 1 = 24-48 hours after first event. Use for precise intervals.
- **Calendar:** Week 1 = the calendar week following signup. Use for business-aligned reporting.

**Placeholder:**
- First event for retention: `_________________`
- Return event for retention: `_________________`
- Retention targets (D1, D7, D30): `_________________`
- Retention report tool: `_________________`

### 5.2.3 Cohort analysis: Are different user groups behaving differently?

A cohort is a group of users who share a common characteristic — typically the week or month they signed up, but also acquisition channel, plan type, or behavior.

**Cohort dimensions:**

| Cohort type | Example | What it reveals |
|---|---|---|
| **Acquisition cohort** | Users who signed up in Week 1 | Baseline retention |
| **Channel cohort** | Users from Google Ads vs. organic | Which channels bring better users |
| **Plan cohort** | Free vs. paid users | Whether paying users behave differently |
| **Behavioral cohort** | Users who completed onboarding vs. skipped | Whether onboarding drives retention |

**Placeholder:**
- Key cohort dimensions: `_________________`
- Cohort analysis tool: `_________________`
- Cohort comparison insights: `_________________`

### 5.2.4 The aha moment: What action predicts retention?

The "aha moment" is the action that, when a user completes it, predicts long-term retention. Google calls this "habit testing" — identifying, codifying, and modifying the behavior that habituated users exhibit.

**How to find the aha moment:**

1. Define a "habituated user" (e.g., a user who returns on Day 30).
2. Compare the behaviors of habituated users vs. churned users.
3. Find the action that most strongly correlates with retention.
4. Optimize the onboarding flow to drive users toward that action.

**Example:** For a habit tracker, the aha moment might be "created 3 habits and completed 7 consecutive check-ins." Users who hit this milestone retain at 3× the rate of those who don't.

**Placeholder:**
- Habituated user definition: `_________________`
- Aha moment hypothesis: `_________________`
- Validation method: `_________________`
- Onboarding optimization to drive aha moment: `_________________`

---

## Section 5.3 — Experimentation: A/B Testing and Feature Flags

**Why this section exists:** Analysis tells you what happened. Experimentation tells you what would happen if you changed something. It is the only way to establish causality.

### 5.3.1 When to run an experiment

Not every change needs an experiment. Run experiments when:

| Condition | Why |
|---|---|
| You have a hypothesis about user behavior | Experiment tests the hypothesis |
| You have enough traffic to reach statistical significance | Without power, results are noise |
| The change is reversible | You can roll back if it fails |
| The metric you're measuring is well-defined | You know what success looks like |
| The cost of being wrong is high | Experiment reduces risk |

**Placeholder:**
- Experimentation tool: `_________________` (LaunchDarkly, Statsig, Optimizely, custom)
- Statistical significance threshold: `________%`
- Minimum sample size: `________`
- Experiment review process: `_________________`

### 5.3.2 The experiment lifecycle

```
1. Hypothesis — "We believe [change] will cause [outcome] because [reason]"
2. Design — Define variants, metrics, sample size, duration
3. Implement — Use feature flags to split traffic
4. Run — Let data accumulate for the planned duration
5. Analyze — Compare metrics between variants
6. Decide — Ship, iterate, or kill
7. Document — Record result for future reference
```

**Placeholder:**
- Hypothesis template: `_________________`
- Experiment tracking tool: `_________________`
- Experiment duration guidelines: `_________________`
- Experiment decision log: `_________________`

### 5.3.3 Common experiment pitfalls

| Pitfall | Why it's wrong |
|---|---|
| **Peeking early** | Looking at results before the planned duration invalidates statistical significance |
| **Too many metrics** | If you test 20 metrics, one will be "significant" by chance |
| **No control for novelty effect** | New things get attention; let the effect settle |
| **Segment fishing** | Finding a segment where the result is significant after the fact |
| **Stopping when you get a good result** | This is cherry-picking |

**Placeholder:**
- Experiment review checklist: `_________________`
- Statistical analysis tool: `_________________`

### 5.3.4 Multi-armed bandits (advanced)

Traditional A/B testing is slow and expensive because you must wait for statistical significance. A "multi-armed bandit" approach uses algorithms to dynamically allocate more traffic to the better-performing variant while the experiment runs. DoorDash engineers adopted this approach to optimize their experiments, reducing the time and cost of experimentation.

**When to use:** High-traffic experiments where you want to minimize opportunity cost, and you're willing to accept slightly less statistical rigor.

---

## Section 5.4 — Building the Analytics Stack

**Why this section exists:** The tools you choose determine what questions you can answer. A poorly designed stack produces incomplete or untrustworthy data.

### 5.4.1 Packaged vs. composable analytics

| Dimension | Packaged (Amplitude, Mixpanel) | Composable (Snowplow + warehouse) |
|---|---|---|
| **Setup speed** | Fast (hours) | Slow (weeks) |
| **Flexibility** | Limited by platform schema | Fully customizable |
| **Data ownership** | Vendor holds raw data | You own raw data |
| **Cost at scale** | High (event-based pricing) | Lower (warehouse-based) |
| **Custom metrics** | Limited to platform definitions | SQL/dbt — any metric |
| **Downstream use** | Hard to extract raw events | Native (data in your warehouse) |

Packaged platforms promise ease of use, featuring dashboards out of the box and prebuilt event taxonomies. But that convenience comes with trade-offs: rigid event schemas, opaque metric logic, data sampling at scale, and data extraction friction. If you need to join product metrics with support data or push granular events into an ML model, packaged tools become a constraint.

A composable stack lets you define how events are tracked, how data is structured, how metrics are calculated, and how data is used downstream. You don't inherit someone else's assumptions — you create a system that reflects your product and business logic.

**Placeholder:**
- Analytics approach: `Packaged / Composable / Hybrid`
- Primary analytics tool: `_________________`
- Warehouse (if composable): `_________________`
- ETL/event pipeline: `_________________`
- Metric modeling tool: `_________________` (dbt, Mitzu, custom SQL)

### 5.4.2 The four analytics layers

| Layer | Purpose | Tools |
|---|---|---|
| **Collection** | Capture events from client and server | SDKs, API, Segment, RudderStack |
| **Storage** | Store raw events and processed data | Warehouse (BigQuery, Snowflake, PostgreSQL) |
| **Modeling** | Transform raw events into metrics | dbt, SQL, Mitzu |
| **Presentation** | Dashboards, reports, exploration | Metabase, Grafana, Amplitude, Mixpanel |

**Placeholder:**
- Collection tool: `_________________`
- Storage: `_________________`
- Modeling: `_________________`
- Presentation: `_________________`

### 5.4.3 Data quality checks

Analytics is only as good as the data. Implement automated quality checks:

| Check | What it validates |
|---|---|
| **Event volume** | Events are flowing at expected rates |
| **Schema conformance** | Events match the defined taxonomy |
| **Null checks** | Required properties are present |
| **Freshness** | Data is arriving within expected time windows |
| **Anomaly detection** | Sudden drops or spikes in event volume |

**Placeholder:**
- Data quality tool: `_________________`
- Alerting for data quality issues: `_________________`
- Data quality dashboard: `_________________`

---

## Section 5.5 — From Analysis to Action

**Why this section exists:** Analysis without action is just entertainment. The purpose of Phase 5 is to make better product decisions.

### 5.5.1 The insight-to-action loop

```
Measure → Analyze → Hypothesize → Experiment → Decide → Measure (repeat)
```

**Example:**

| Step | Action |
|---|---|
| **Measure** | Retention is 25% at Day 7, below the 35% target |
| **Analyze** | Users who complete onboarding retain at 50%. Users who skip onboarding retain at 10%. |
| **Hypothesize** | Forcing onboarding before first habit creation will improve retention |
| **Experiment** | A/B test: onboarding required vs. skippable |
| **Decide** | Onboarding required wins: D7 retention improves to 38% |
| **Measure** | Monitor retention for new cohorts |

**Placeholder:**
- Insight review cadence: `_________________`
- Action item tracking: `_________________`
- Owner for product improvements: `_________________`

### 5.5.2 Building a metrics-driven culture

| Practice | Why |
|---|---|
| **Define metrics before features** | Prevents retrofitting measurement |
| **Share dashboards widely** | Democratizes data access |
| **Review metrics weekly** | Catches problems early |
| **Celebrate data-driven decisions** | Reinforces the behavior |
| **Document experiment results** | Builds institutional knowledge |

**Placeholder:**
- Metrics review meeting: `_________________`
- Dashboard access policy: `_________________`
- Experiment result repository: `_________________`

---

## Section 5.6 — Phase 5 Completion Gate

Before moving to Phase 6 (Maintain & Improve), confirm:

- [ ] Tracking plan exists for every feature
- [ ] Event taxonomy follows naming conventions consistently
- [ ] Schema registry is in place with governance
- [ ] Event approval process is enforced
- [ ] Funnel analysis is configured for primary user journeys
- [ ] Retention analysis is configured with defined first and return events
- [ ] Cohort analysis is available for key segments
- [ ] Aha moment is identified and validated
- [ ] Experimentation tool is configured
- [ ] Experiment lifecycle is documented
- [ ] Statistical significance methodology is defined
- [ ] Analytics stack is operational (collection, storage, modeling, presentation)
- [ ] Data quality checks are automated
- [ ] Dashboards are live for product, retention, and experimentation
- [ ] Insight-to-action loop is documented
- [ ] Metrics review cadence is established
- [ ] Experiment result repository exists

**If any box is unchecked, you are flying blind. Do not proceed to Phase 6 until analytics is operational.**

---

## How Phase 5 connects to the rest of the lifecycle

Phase 5 takes the event data collected in Phase 1, the operational stability from Phase 4, and the deployed service from Phase 3, and turns them into **product intelligence**. It produces:

1. **A tracking plan** — the contract for what to measure.
2. **Analysis frameworks** — funnels, retention, cohorts, and aha moments.
3. **An experimentation practice** — A/B testing with statistical rigor.
4. **An analytics stack** — the tools and pipelines that make data accessible.
5. **An insight-to-action loop** — the process for turning data into decisions.

Phase 6 (Maintain & Improve) uses the insights from Phase 5 to prioritize what to build next. It takes the biggest funnel drop-off, the weakest retention cohort, and the winning experiment variant and turns them into the next release. Phase 5 is where you learn what to build. Phase 6 is where you build it.

**The core principle of Phase 5:** You do not guess what users want. You **measure** what they do, **analyze** why they do it, **experiment** with changes, and **decide** based on evidence. The event taxonomy you built in Phase 0 and instrumented in Phase 1 is the foundation. The analysis frameworks are the lens. The experimentation practice is the engine. Together, they turn a running service into a learning system.
