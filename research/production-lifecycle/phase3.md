---
title: "Research: Production Lifecycle - Phase 3: Release & Deploy"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/09-release-readiness-and-deployment.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains external research and candidate reference material. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

# Phase 3: Release & Deploy — A Generalized Guide

## What Phase 3 actually is

Phase 2 produced a verified, immutable artifact. Phase 3 answers the operational question: **How do we move that artifact into production without breaking users, and how do we get back if we do?**

The critical mental shift: **Deployment is not release.** Deployment is moving code to production. Release is exposing that code to users. These are separate operations, and separating them is the single most important safety mechanism in modern release engineering . Feature flags, canary traffic, and blue-green environments all exist to decouple these two events. Traditional "deploy and pray" replaces with "deploy, observe, decide, and expand" .

Phase 3 is the most dangerous thing you do in production. Most outages are not caused by hardware failures — they are caused by change. An unsafe deployment, an untested configuration, or a vulnerable dependency is the root cause of most incidents . Phase 3 is where you make change safe.

---

## Section 3.1 — The Release Strategy Decision Framework

**Why this section exists:** Most teams choose a deployment strategy out of habit. That is not a strategy; it is a risk. The deployment strategy should be chosen based on release risk, rollback needs, and verification capability for the specific release .

### 3.1.1 The four strategies and what they actually provide

| Strategy | Mechanism | Rollback speed | Cost | Best for | Weakness |
|---|---|---|---|---|---|
| **Rolling** | Replace instances incrementally | Slow (rollback is another rolling update) | Low | Stateless services, backward-compatible changes | Mixed-version problem; two versions run simultaneously  |
| **Blue-Green** | Two identical environments; switch traffic | Instant | High (2× infra) | Zero-downtime requirement, fast rollback priority | All-or-nothing cutover; database compatibility complications  |
| **Canary** | Route small % of traffic to new version, gradually increase | Fast (stop traffic shift) | Minimal (small canary fleet) | Genuine uncertainty about new version behavior | Requires traffic splitting and solid monitoring  |
| **Feature Flags** | Ship code disabled; enable via config | Instant (toggle off) | Low (but flag debt) | Decoupling deploy from release; A/B testing; kill switches | Flag management complexity; code path cleanup  |

### 3.1.2 Decision framework

Answer these questions before every release:

| Question | If yes → | If no → |
|---|---|---|
| Does the change have backward-incompatible database schema changes? | Blue-Green (with expand-contract migrations) | Rolling or Canary |
| Do you have genuine uncertainty about behavior under real traffic? | Canary | Rolling or Blue-Green |
| Is fast rollback more important than infrastructure cost? | Blue-Green | Rolling or Canary |
| Do you need to decouple deploy timing from release timing? | Feature Flags | Any strategy |
| Is the service stateless and backward-compatible? | Rolling | Blue-Green or Canary |

**Key insight:** Blue-green and canary both "buy the same thing: a cheap way to be wrong" . The switching is easy. What is hard is noticing that the new version is worse, and the database is the real constraint — code reverts in seconds, but a dropped column does not .

**Placeholder:**
- Default deployment strategy for routine releases: `_________________`
- Strategy for high-risk releases: `_________________`
- Strategy for database migrations: `_________________`
- Decision authority for strategy selection: `_________________`

---

## Section 3.2 — Deployment Strategies in Detail

### 3.2.1 Rolling deployment

**Mechanism:** Replace instances of the old version incrementally with the new version. At any moment during rollout, some instances run old code and some run new .

**When to use:** Routine, backward-compatible service updates where staging confidence is high .

**Critical hidden risk:** A rolling update **already puts two versions of your code in production at the same time**, even though teams often think of this as a canary problem. If the new version writes a field the old version does not understand, rolling updates produce inconsistent behavior for the duration of the rollout . Backward compatibility discipline is not optional — it is required for every rolling deployment.

**Rollback:** Rollback means another rolling update, which takes as long as the deployment did. This is the primary weakness .

**Placeholder:**
- Max surge (extra instances during rollout): `________`
- Max unavailable (instances allowed to be down): `________`
- Readiness probe grace period: `________ seconds`
- Rollback trigger: `_________________`

### 3.2.2 Blue-green deployment

**Mechanism:** Maintain two identical environments. One serves live traffic ("blue"), the other is idle ("green"). Deploy the new version to green, verify it, then switch traffic over completely. The old environment stays available as an immediate rollback target .

**When to use:** Zero-downtime requirement, database-compatible changes, and when fast rollback is the top priority .

**Strengths:**
- Instant rollback by switching routing back to the previous environment .
- Full testing of the new version before exposing users.
- Zero-downtime for stateless services when readiness and routing are handled correctly.

**Weaknesses:**
- Requires roughly double the resources during deployment .
- Cutover is all-or-nothing: traffic moves 100% at the switch.
- Database migrations are complicated because both versions may need compatibility .

**Implementation note:** The switch is typically a load balancer or DNS change. The old environment must remain running and healthy until the new version is confirmed stable.

**Placeholder:**
- Blue environment identifier: `_________________`
- Green environment identifier: `_________________`
- Traffic switch mechanism: `_________________` (load balancer, DNS, service mesh)
- Verification before switch: `_________________`
- Time before decommissioning old environment: `________`

### 3.2.3 Canary deployment

**Mechanism:** Route a small percentage of traffic (e.g., 1%, 5%) to the new version while the majority continues hitting the old version. Gradually increase the canary percentage as confidence grows .

**Typical canary flow:**
1. Route 5% to canary.
2. Run automated analysis on latency, error rates, and business metrics.
3. If checks pass, promote to larger percentages (25%, 50%, 100%).
4. If any analysis step fails, roll the canary back to 0% .

**When to use:** When you have genuine uncertainty about how the new version will behave under real traffic, and the additional complexity of traffic splitting and monitoring is justified .

**Critical dependency:** Canary requires **solid monitoring and automated health gates** . A canary percentage must be large enough to produce a usable signal — 1% of low traffic tells you almost nothing . If you cannot tell that the new version is worse, canary provides no protection.

**Automated promotion example:**

```
Check Condition: If error rate < 0.1% and latency_p99 < 200ms
    → increase traffic
Auto-Rollback: If metrics exceed thresholds
    → flip traffic back to stable version
```


**Placeholder:**
- Canary traffic steps: `________% → ________% → ________% → 100%`
- Automated analysis window per step: `________ minutes`
- Promotion criteria: `error_rate < ________% AND p95_latency < ________ms`
- Auto-rollback trigger: `_________________`
- Traffic splitting mechanism: `_________________` (service mesh, ingress, load balancer)

### 3.2.4 Feature flags (decoupling deploy from release)

**Mechanism:** Wrap code in conditional logic that can be turned on/off remotely without redeploying. Code ships to production in a disabled state and gets enabled through a configuration change .

**When to use:** When release timing needs to be decoupled from deployment timing. This is the most powerful pattern because it gives you a **kill switch** — if a feature causes problems, you toggle it off instantly without any deployment .

**Three uses:**
- **Dark launching:** Deploy code, keep it off, enable later.
- **A/B testing:** Show different variants to different user segments.
- **Emergency kill switches:** Disable a feature instantly if it causes issues.

**Critical discipline:** Feature flags add operational complexity. Flag states must be managed, old code paths must be cleaned up, and flag logic can accumulate technical debt if not actively maintained . Every release toggle must have an expiration date.

**Placeholder:**
- Feature flag tool: `_________________`
- Flag naming convention: `_________________`
- Kill switch flags (always-on safety toggles): `_________________`
- Flag cleanup process and schedule: `_________________`

---

## Section 3.3 — Progressive Delivery and Automated Rollback

**Why this section exists:** Progressive delivery is the engineering discipline that makes canary and blue-green safe. It is not enough to shift traffic — you must **automatically decide** whether to continue shifting based on real metrics.

### 3.3.1 The progressive delivery model

Traditional deployment is binary: on or off. Progressive delivery moves to a spectrum of availability . The workflow becomes:

```
Deploy → Observe → Decide → Expand (or Rollback)
```

**Two pillars:**
- **Release observation:** Monitoring the health of a deployment in real time.
- **Release control:** Using technical levers to shift traffic or toggle features without redeploying .

### 3.3.2 Automated rollback triggers

The system should automatically roll back when metrics exceed thresholds. Define these before deployment:

| Metric | Threshold | Action |
|---|---|---|
| Error rate | `> ________%` for `________ min` | Auto-rollback |
| p95 latency | `> ________ms` for `________ min` | Auto-rollback |
| p99 latency | `> ________ms` for `________ min` | Auto-rollback |
| Saturation (CPU/memory) | `> ________%` for `________ min` | Auto-rollback |
| Business metric drop | `> ________%` for `________ min` | Auto-rollback |

**Tools:** Argo Rollouts, Flagger, and service meshes (Istio, Linkerd) provide production-ready primitives for weighted routing, automated rollback, and progressive delivery .

**Placeholder:**
- Progressive delivery tool: `_________________`
- Automated rollback enabled? `Yes / No`
- Rollback notification channel: `_________________`

### 3.3.3 The "blast radius" concept

The blast radius is the percentage of users affected by a bad deployment. Standard Kubernetes rolling updates expose all users at once — a 100% blast radius . Progressive delivery reduces this by exposing a smaller fraction of traffic first, validating behavior with metrics, and automating safe rollbacks .

**Goal:** Never deploy something that can affect 100% of users until it has survived exposure to a small, measurable subset.

---

## Section 3.4 — Database Migration Strategy During Deployment

**Why this section exists:** Code reverts in seconds. A dropped column does not . Database migrations are the single biggest constraint on deployment safety. If you get this wrong, rollback becomes impossible.

### 3.4.1 The expand-contract pattern (default for all schema changes)

Never make a breaking schema change in a single step. Split every schema change into multiple backward-compatible steps:

| Phase | Action | App version | Rollback safety |
|---|---|---|---|
| **Expand** | Add new column/table (nullable, no constraints) | Old + new coexist | Safe |
| **Migrate** | Write to both old and new columns; read from old | Old + new coexist | Safe |
| **Switch** | Read from new column | New only | Safe (old column still exists) |
| **Contract** | Remove old column (next release) | New only | Safe (old column no longer needed) |

This pattern ensures both old and new application versions can coexist during the rollout without data corruption .

### 3.4.2 Migration safety rules

| Rule | Why |
|---|---|
| **All migrations must be backward-compatible** | Two versions run simultaneously during rolling and canary deployments |
| **Never drop a column in the same release that removes its code** | Old instances may still be writing to it |
| **Never rename a column in a single step** | Add new → migrate → switch reads → drop old (next release) |
| **Test migrations against production-like data volume** | Small datasets hide performance issues |
| **Every migration must have a tested rollback procedure** | If the migration fails, you must be able to revert |
| **Long-running migrations must use online tools** | Table locks cause downtime (pt-online-schema-change, gh-ost) |

### 3.4.3 Migration execution order

For blue-green and canary deployments, the order is:

1. Run the expand migration (add new columns, no code changes yet).
2. Deploy the application code that writes to both old and new columns.
3. Verify data consistency between old and new columns.
4. Switch reads to the new column.
5. (Next release) Run the contract migration to drop old columns.

**Placeholder:**
- Migration tool: `_________________`
- Expand-contract pattern used? `Yes / No`
- Migration rollback tested in staging? `Yes / No`
- Online migration tool (if needed): `_________________`
- Migration monitoring: `_________________`

---

## Section 3.5 — Pre-Deployment Gates

**Why this section exists:** Deployment should not begin until specific conditions are met. These are blocking gates, not advisory checks.

### 3.5.1 Pre-deployment checklist (blocking)

| Gate | Question | Verified by |
|---|---|---|
| **Artifact ready** | Is the immutable artifact from Phase 2 available and signed? | CI pipeline |
| **Migrations ready** | Are database migrations tested and rollback-verified? | Staging validation |
| **Monitoring configured** | Are dashboards and alerts live for the new version? | Observability team |
| **Runbooks updated** | Do runbooks cover new failure modes? | On-call team |
| **Rollback plan ready** | Is the rollback procedure documented and rehearsed? | Release engineer |
| **Feature flags set** | Are all new features defaulted to off (or safe)? | Developer |
| **On-call briefed** | Does the on-call engineer know what is being deployed? | Release manager |
| **Communication sent** | Has the team been notified of the deployment window? | Release manager |

A failing pre-build check aborts the deployment cleanly before any build resources are spent .

**Placeholder:**
- Pre-deployment gate checklist location: `_________________`
- Who verifies each gate: `_________________`
- Go/No-Go decision owner: `_________________`

---

## Section 3.6 — The Deployment Execution

### 3.6.1 Deployment sequence (generalized)

```
1. Pre-deployment gates passed
2. Notify team of deployment start
3. Run expand database migration (if applicable)
4. Deploy artifact to canary / green environment
5. Run post-deploy smoke tests against canary/green
6. Monitor canary metrics for N minutes
7. If healthy → increase traffic (canary) or switch traffic (blue-green)
8. If unhealthy → rollback immediately
9. Continue traffic shift until 100%
10. Run full post-deployment verification
11. Monitor for extended period (30+ minutes)
12. Declare deployment successful
13. (Later) Run contract database migration
```

### 3.6.2 Post-deployment verification

A deployment is not successful when the deploy command completes. It is successful when the system is proven healthy.

**Immediate checks (within 2 minutes):**
- Health endpoint returns 200.
- Error rate is within baseline.
- Response time is within baseline.
- Critical user flows work (sign-in, purchase, core action).

**Extended checks (within 10–30 minutes):**
- Error rate remains below baseline.
- Response times remain stable.
- Memory usage is stable (no leak).
- Database connections are healthy.
- Queue depth is normal .

**Post-deploy smoke test:** A failing post-deploy check marks the deployment failed and fires failure notifications . The smoke test should verify core user workflows end-to-end, not just an HTTP 200 .

**Placeholder:**
- Smoke test script location: `_________________`
- Health endpoint(s): `_________________`
- Critical user flows to verify: `_________________`
- Monitoring window before declaring success: `________ minutes`

---

## Section 3.7 — Rollback Strategy

**Why this section exists:** The ability to roll back quickly is what makes deployment safe. If rollback takes hours, you will avoid deploying. If rollback takes seconds, you will deploy frequently and learn faster.

### 3.7.1 Rollback types

| Type | Mechanism | Speed | When |
|---|---|---|---|
| **Instant switch** | Blue-green traffic switch back | Seconds | Blue-green deployments |
| **Canary abort** | Stop traffic shift, revert to 0% canary | Seconds | Canary deployments |
| **Feature flag off** | Toggle feature off remotely | Seconds | Any deployment with feature flags |
| **Artifact rollback** | Redeploy previous artifact | Minutes | Rolling deployments |
| **Database rollback** | Run reverse migration | Minutes to hours | Schema changes (use expand-contract to avoid) |

### 3.7.2 Rollback decision framework

| Situation | Action |
|---|---|
| Error rate elevated but feature is isolated | Turn off feature flag |
| Canary metrics degraded | Abort canary, shift traffic back |
| Blue-green new version unhealthy | Switch traffic back to blue |
| Rolling deployment causing issues | Redeploy previous artifact |
| Database migration caused issue | Run reverse migration (if safe) or restore from backup |

**Critical rule:** Never attempt to fix a bad deployment in production by making another change. Roll back first, then diagnose .

### 3.7.3 Rollback rehearsal

Rollback must be rehearsed before it is needed. Document and practice:

- Who initiates rollback?
- What triggers automatic rollback?
- How is rollback communicated?
- How long does rollback take?
- What is the expected state after rollback?

**Placeholder:**
- Rollback procedure document: `_________________`
- Automatic rollback triggers: `_________________`
- Manual rollback authority: `_________________`
- Rollback rehearsal frequency: `_________________`
- Rollback time target: `________ minutes`

---

## Section 3.8 — Release Communication & Change Management

**Why this section exists:** A deployment affects more than the software. It affects the team, support, and users. Communication is part of the release, not an afterthought.

### 3.8.1 Release communication plan

| Audience | What they need | When | Channel |
|---|---|---|---|
| **Engineering team** | What is being deployed, when, risks | Before deploy | Team chat |
| **On-call engineer** | Deployment details, rollback plan, monitoring links | Before deploy | Handoff |
| **Support team** | What changed, known issues, user impact | Before deploy | Email/chat |
| **Users** | New features, breaking changes, migration steps | After deploy | Release notes |
| **Stakeholders** | Release status, incidents | During and after | Status page |

### 3.8.2 Change management

Modern software companies achieve greater stability by allowing small, isolated teams to self-manage their own release processes, rather than relying on traditional change advisory boards that cause deployment delays .

**Change management requirements:**
- Every production change is traceable to a ticket or PR.
- Risk assessment is done before deployment.
- Rollback plan is documented for every change.
- Post-deployment verification confirms the change worked.
- Incidents trigger a review.

**Placeholder:**
- Change management tool: `_________________`
- Release ticket template: `_________________`
- Communication channels: `_________________`
- Status page: `_________________`

---

## Section 3.9 — Phase 3 Completion Gate

Before moving to Phase 4 (Operate), confirm:

- [ ] Deployment strategy selected for this release with documented rationale
- [ ] Pre-deployment gates all passed
- [ ] Database migrations tested with expand-contract pattern
- [ ] Migration rollback procedure documented and rehearsed
- [ ] Artifact is immutable, signed, and traceable
- [ ] Canary or blue-green environment configured
- [ ] Traffic splitting mechanism verified
- [ ] Automated rollback triggers configured with thresholds
- [ ] Feature flags set to safe defaults (off)
- [ ] Post-deployment smoke tests ready
- [ ] Monitoring dashboards live for new version
- [ ] Alerts configured for new failure modes
- [ ] Runbooks updated
- [ ] Rollback procedure documented and rehearsed
- [ ] On-call team briefed
- [ ] Communication plan executed
- [ ] Deployment executed with traffic shift completed
- [ ] Post-deployment verification passed (immediate + extended)
- [ ] Extended monitoring window (30+ min) passed without degradation
- [ ] Deployment declared successful
- [ ] Contract migration scheduled (if applicable)
- [ ] Release notes published

**If any box is unchecked, the deployment is not complete. Do not proceed to Phase 4 until the service is confirmed healthy.**

---

## How Phase 3 connects to the rest of the lifecycle

Phase 3 takes the verified artifact from Phase 2 and moves it into production using the strategy chosen in Phase 0, the telemetry built in Phase 1, and the validation performed in Phase 2. It produces:

1. **A live service** running the new version in production.
2. **Evidence of successful deployment** — smoke test results, metric snapshots, traffic shift logs.
3. **A known-good state** that Phase 4 (Operate) can monitor and Phase 5 (Observe & Analyze) can measure.

**The core principle of Phase 3:** You do not "deploy and pray." You **deploy, observe, decide, and expand**. Every deployment is reversible. Every change is measurable. Every rollback is rehearsed. The goal is not to avoid mistakes — it is to make mistakes cheap. Blue-green and canary both "buy the same thing: a cheap way to be wrong" .
