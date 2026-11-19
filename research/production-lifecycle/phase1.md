---
title: "Research: Production Lifecycle - Phase 1: Development & Instrumentation"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/observability-and-operational-readiness.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/07-iterative-implementation.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains external research and candidate reference material. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

# Phase 1: Development & Instrumentation — A Generalized Guide

## What Phase 1 actually is

Phase 0 decided *what* the application must do and *how* it must behave in production. Phase 1 is where you **write the code that fulfills those decisions — and simultaneously build the instrumentation that lets you see what the code is doing once it is live.**

The key mental shift: **Instrumentation is not a feature you add after the app works. It is part of the code, written at the same time as the code.** Every function you write has two jobs: (1) do the work, and (2) emit a signal that the work happened. If you skip the second job, you are building blind.

This guide is generalized. It applies to any application — web, mobile, API, background worker, CLI, or data pipeline. Fill in the placeholders for your specific app.

---

## Section 1.1 — Development Principles for Production

**Why this section exists:** Production code is different from prototype code. Prototype code assumes the happy path. Production code assumes the happy path *will* fail, and must behave predictably when it does.

### 1.1.1 Configuration externalization

Everything that changes between environments must be an environment variable, not a hardcoded value.

| Configuration | Source | Example |
|---|---|---|
| Database URL | `DATABASE_URL` | `postgres://...` |
| API keys | Secrets manager | `sk_live_...` |
| Feature defaults | Config service or env | `FEATURE_NEW_ONBOARDING=false` |
| Log level | `LOG_LEVEL` | `info` in prod, `debug` in dev |
| External service URLs | `PAYMENT_API_BASE` | `https://api.stripe.com` |

**Rule:** If you have to change code to change behavior, you have done it wrong. `_________________`

### 1.1.2 Secrets management

Secrets never go in code. Never in Git. Never in logs. Never in error messages.

- **Tool:** `_________________` (Doppler, AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager)
- **Access policy:** Who can read which secret? `_________________`
- **Rotation policy:** How often are secrets rotated? `_________________`
- **Local development:** How do developers get secrets without committing them? `_________________`

**Rule:** If a secret appears in a stack trace, it is compromised. Treat it as such.

### 1.1.3 Graceful degradation

Every external call must have:
- **Timeout:** What is the maximum wait? `________ms`
- **Retry with backoff:** How many retries? `________`
- **Circuit breaker:** After how many failures do you stop trying? `________`
- **Fallback:** What do you return when the dependency is down? `_________________`

**Example:** If the recommendation service is down, return popular items instead of failing the page.

### 1.1.4 Idempotency

Any operation that can be retried must be safe to retry. This is especially critical for payments, job processing, and webhook handlers.

- **Idempotency key strategy:** `_________________`
- **Where stored:** `_________________`
- **TTL for idempotency records:** `_________________`

### 1.1.5 Stateless application logic

Application servers should not hold session state in memory. Any state that must survive a restart goes in an external store (database, Redis, object storage).

**Why:** Stateless servers can be replaced, scaled horizontally, and recovered without data loss.

**Exception:** `_________________` (if any component must be stateful, document why)

### 1.1.6 Graceful shutdown

When the application receives a termination signal:
1. Stop accepting new requests.
2. Finish in-flight requests (with a timeout).
3. Close database connections.
4. Flush telemetry buffers.
5. Exit cleanly.

**Signal handling:** `_________________`
**Drain timeout:** `________ seconds`

---

## Section 1.2 — Observability Instrumentation (The Three Pillars)

**Why this section exists:** In production, you cannot attach a debugger. You cannot add a `print` statement and redeploy. You must be able to answer "What is happening?" from the telemetry the application emits continuously.

The three pillars are **logs, metrics, and traces**. All three are required. None replaces the others.

### 1.2.1 Logs

**What they are:** Timestamped records of discrete events. The narrative of what happened.

**Format:** Structured JSON in production. Never plain text strings.

**Required fields in every log line:**

| Field | Purpose | Example |
|---|---|---|
| `timestamp` | When | `2026-09-27T10:00:00.123Z` |
| `level` | Severity | `info`, `warn`, `error` |
| `service` | Which service | `habitloop-api` |
| `correlation_id` | Trace a request across services | `abc-123-def` |
| `user_id` | Who (if authenticated) | `u_456` |
| `event` | What happened (machine-readable name) | `habit_created` |
| `message` | Human-readable description | `User created a new habit` |
| Additional context | Fields specific to the event | `habit_id`, `frequency` |

**Log levels (use consistently):**

- **ERROR:** Something failed and requires attention. A database query threw an exception. An API returned a 500. Alerting watches this level.
- **WARN:** Something unexpected happened but the system handled it. A retry succeeded. A cache miss triggered a fallback. A deprecated endpoint received traffic.
- **INFO:** Normal business events that matter for operations. A user signed up. An order shipped. A deployment completed.
- **DEBUG:** Internal state useful during development. Off in production by default.

**Critical rules:**
- **Never log secrets, tokens, passwords, or PII.** Mask or omit.
- **Include correlation IDs in every log line.** This is how you reconstruct a request's journey across services. 
- **Log events, not sentences.** Instead of `"User 123 placed order 456"`, log `event: order_placed, user_id: 123, order_id: 456`. The event name is searchable. The sentence is not. 
- **Drop low-value logs.** Health check hits, static asset requests, and high-frequency INFO logs are noise. They inflate cost and obscure signal. 

**Implementation placeholder:**
- Logging library: `_________________` (structlog, winston, serilog, zap, etc.)
- Log destination: `_________________` (stdout, Fluent Bit, Vector, cloud logging)
- Retention: `_________________` (e.g., 30 days hot, 1 year cold)
- PII masking strategy: `_________________`

### 1.2.2 Metrics

**What they are:** Numeric values that describe a system at a moment in time. Aggregated, cheap to store, ideal for alerting.

**The RED method for request-driven services:**

| Metric | What it measures | Why it matters |
|---|---|---|
| **R**ate | Requests per second | Is traffic normal, spiking, or dropping? |
| **E**rrors | Failed requests per second | Are users experiencing failures? |
| **D**uration | Request latency distribution (p50, p95, p99) | Are requests fast enough? |

The RED method tells you how happy your users are. 

**The USE method for resources:**

| Metric | What it measures |
|---|---|
| **U**tilization | How busy is the resource (CPU, memory, disk)? |
| **S**aturation | How much work is queued waiting for the resource? |
| **E**rrors | Resource-level errors (disk errors, network drops) |

**Application-level metrics to track:**

| Metric | Type | Why |
|---|---|---|
| `http_requests_total` | Counter | Total request volume by endpoint, status |
| `http_request_duration_seconds` | Histogram | Latency distribution |
| `active_connections` | Gauge | Current concurrent connections |
| `queue_depth` | Gauge | Pending jobs in queue |
| `job_processing_duration_seconds` | Histogram | Background job performance |
| `database_query_duration_seconds` | Histogram | Query performance |
| `cache_hit_ratio` | Gauge | Cache effectiveness |
| `business_events_total` | Counter | Signups, check-ins, payments (with labels) |

**Implementation placeholder:**
- Metrics library: `_________________` (Prometheus client, OpenTelemetry Meter, StatsD)
- Metrics backend: `_________________` (Prometheus, Datadog, CloudWatch)
- Dashboards: `_________________` (Grafana, Datadog dashboards)
- Key SLO metrics: `_________________`

### 1.2.3 Traces

**What they are:** A record of a single request as it flows through multiple services and components. Each step is a "span." The full request is a "trace."

**When to use traces:** Any request that touches more than one service, database, queue, or external API. Traces show you *where* time is spent and *which* component failed.

**Best practices:**

- **Use OpenTelemetry** as the instrumentation standard. It is vendor-neutral and supported across languages. 
- **Prefer automatic instrumentation** for frameworks (HTTP servers, database clients, message queues). It captures 80% of what you need with minimal code. Add manual instrumentation only for business-critical operations. 
- **Propagate trace context** across service boundaries. If Service A calls Service B, Service B must receive the trace ID so the spans connect. 
- **Sample intelligently.** At high traffic, trace 1–10% of requests. Always trace errors and slow requests (tail-based sampling). 
- **Correlate traces with logs.** The trace ID in a log line lets you jump from a log entry to the full trace. 

**Implementation placeholder:**
- Tracing library: `_________________` (OpenTelemetry SDK)
- Trace backend: `_________________` (Jaeger, Zipkin, Honeycomb, Datadog APM)
- Sampling rate: `________%` (normal traffic), `________%` (errors/slow requests)
- Services instrumented: `_________________`

### 1.2.4 Health checks

Every production application must expose health endpoints that orchestrators (Kubernetes, load balancers, cloud platforms) use to make routing and restart decisions.

| Endpoint | Purpose | Behavior |
|---|---|---|
| `/health/live` | Liveness | Returns 200 if the process is running. Failing this causes a restart. |
| `/health/ready` | Readiness | Returns 200 if the app is ready to accept traffic. Failing this removes the instance from the load balancer. |

**Liveness** answers: "Is the process alive, or is it stuck?" If liveness fails repeatedly, the orchestrator restarts the container.

**Readiness** answers: "Can this instance handle requests right now?" If readiness fails, traffic is routed elsewhere. This is useful during startup (before the database connection is ready) and during graceful shutdown (stop sending traffic while finishing in-flight requests). 

**Placeholder:**
- Liveness endpoint: `_________________`
- Readiness endpoint: `_________________`
- Startup probe endpoint (if slow start): `_________________`

---

## Section 1.3 — User Interaction Tracking (Event Taxonomy in Code)

**Why this section exists:** Phase 0 defined the event taxonomy. Phase 1 implements it. The interface collects the data; the backend validates and enriches it.

### 1.3.1 Client-side vs. server-side tracking

| | Client-side | Server-side |
|---|---|---|
| **Where** | Browser / mobile app | Backend server |
| **Pros** | Easy to track UI interactions, anonymous users | Reliable, not blocked by ad-blockers, consistent across platforms |
| **Cons** | Unreliable (30–50% event loss from ad-blockers), hard to keep consistent across web/iOS/Android | Harder to track pure UI interactions, requires custom code for anonymous users |
| **Best for** | Screen views, button clicks, form interactions, UI errors | Business events (signup, payment, subscription), API errors, job completions |

**Recommendation:** Track everything you possibly can on the server. Supplement with client-side tracking only for interactions that cannot be observed on the backend. 

**Hybrid approach:**

```
User taps "Create Habit" (client event: habit_create_tapped)
    ↓
Client sends request to POST /habits
    ↓
Server creates habit, emits server event: habit_created
    ↓
Client receives response, emits client event: habit_created_confirmed
```

The server event is the source of truth. The client events provide context about the user's experience.

### 1.3.2 Event naming convention

**Format:** `object_action` — all lowercase, underscores.

| Bad | Good | Why |
|---|---|---|
| `click` | `signup_button_clicked` | Specific, searchable |
| `userCreatedHabit` | `habit_created` | Consistent casing |
| `page_view` | `screen_viewed` | Consistent tense |

**Placeholder:** Event naming convention for your app: `_________________`

### 1.3.3 Required event properties

Every event must include:

| Property | Purpose | Example |
|---|---|---|
| `user_id` | Identify the user (or `anonymous_id` if not logged in) | `u_123` |
| `timestamp` | When the event occurred (ISO 8601) | `2026-09-27T10:00:00Z` |
| `app_version` | Which version of the app | `1.2.0` |
| `platform` | Which platform | `iOS`, `Android`, `web` |
| `session_id` | Which session the event belongs to | `sess_abc` |
| `correlation_id` | Tie to backend traces/logs | `trace_xyz` |

**Event-specific properties** (from Phase 0 taxonomy):

| Event | Properties |
|---|---|
| `habit_created` | `habit_id`, `habit_name`, `frequency` |
| `check_in_completed` | `habit_id`, `streak_count`, `method` |
| `subscription_started` | `plan`, `price`, `currency` |

### 1.3.4 Privacy rules in event tracking

- **Never send PII** in event properties. No email, phone, full name, address, or payment details. 
- **Hash identifiers** if you need to join events to users. Send `user_id`, not email.
- **Consent before tracking.** Show a consent banner. Do not fire events until consent is given (or until you have a lawful basis).
- **Opt-out mechanism.** Users must be able to disable tracking. `_________________`
- **Data retention.** Define how long events are kept. `_________________`

### 1.3.5 Implementation example (generalized)

```javascript
// Initialize analytics SDK after consent
analytics.init({
  apiKey: process.env.ANALYTICS_KEY,
  trackPageViews: true,
  persistence: 'localStorage',
});

// Identify user after login
analytics.identify(user.id, {
  plan: user.plan,
  signup_date: user.signupDate,
});

// Track a business event
analytics.track('habit_created', {
  habit_id: habit.id,
  habit_name: habit.name,
  frequency: habit.frequency,
  app_version: APP_VERSION,
  platform: PLATFORM,
  correlation_id: getCorrelationId(),
});
```

**Placeholder:**
- Analytics SDK: `_________________` (PostHog, Amplitude, Mixpanel, Segment)
- Consent mechanism: `_________________`
- Event validation (testing): `_________________`

---

## Section 1.4 — Feature Flags

**Why this section exists:** Feature flags decouple deployment from release. You can deploy code to production without exposing it to users. This is how you release safely.

### 1.4.1 Types of feature flags

| Type | Purpose | Lifetime | Example |
|---|---|---|---|
| **Release toggle** | Hide unfinished feature | Temporary (remove after rollout) | `new_onboarding_flow` |
| **Experiment toggle** | A/B test | Duration of experiment | `pricing_page_variant_b` |
| **Ops toggle** | Circuit breaker, kill switch | Permanent | `disable_recommendations` |
| **Permission toggle** | Entitlements, tiers | Permanent | `premium_analytics_enabled` |

**Release toggles are temporary.** They must be removed after the feature is fully rolled out. Leaving them creates technical debt. 

### 1.4.2 Rules for feature flags

- **Externalize flag state.** Flags must be changeable without redeploying. Use a config service, database, or flag management tool. 
- **Default to safe.** If the flag service is unreachable, the feature must be off.
- **Set expiration dates.** Every release toggle gets an expiration date. Track flags that are past expiration.
- **Start small.** Roll out to 1% of traffic, watch metrics, then increase. 
- **Remove flags when done.** A flag at 100% rollout is no longer a flag. It is dead code.

**Placeholder:**
- Flag management tool: `_________________` (LaunchDarkly, Unleash, PostHog, custom)
- Flag naming convention: `_________________`
- Flag cleanup process: `_________________`

---

## Section 1.5 — Testing Strategy

**Why this section exists:** Testing is not a phase; it is a continuous activity. But the types of tests you write and when you run them must be planned.

### 1.5.1 Shift-left and shift-right

**Shift-left:** Move testing earlier in the development cycle. Catch defects before they reach production.
- Test-Driven Development (TDD) and Behavior-Driven Development (BDD)
- Static analysis and linting
- Unit, integration, and API testing
- Automated tests in CI

**Shift-right:** Test in production or production-like environments. Validate real-world behavior.
- Real User Monitoring (RUM) and synthetic monitoring
- Canary deployments and A/B testing
- Chaos engineering
- Continuous feedback from production to development

Together, they form a continuous quality loop. 

### 1.5.2 Test types and when to run them

| Test type | What it validates | When | Coverage target |
|---|---|---|---|
| **Unit** | Business logic in isolation | Every commit (local + CI) | High (critical paths) |
| **Integration** | Components working together (DB, cache, queue) | Every commit (CI) | Medium |
| **Contract** | API agreements between services | Every commit (CI) | All APIs |
| **End-to-end** | Full user flow | Pre-deploy (staging) | Critical flows |
| **Load** | System under expected and peak traffic | Pre-release | ≥3× peak |
| **Chaos** | System resilience to failures | Periodically (staging/prod) | Critical dependencies |
| **Security** | Vulnerabilities | Every commit (SAST), pre-release (DAST) | All code |

**Placeholder:**
- Test framework: `_________________`
- CI test command: `_________________`
- Load testing tool: `_________________` (k6, Locust, Gatling)
- Load test target: `________ RPS` at `________ p95 latency`

### 1.5.3 Testing instrumentation

Instrumentation must be tested too. You must verify that events, logs, metrics, and traces are emitted correctly.

- **Event testing:** Assert that `analytics.track('habit_created', ...)` is called with the correct properties.
- **Log testing:** Assert that error conditions produce ERROR-level logs with correlation IDs.
- **Health check testing:** Assert that `/health/ready` returns 503 when the database is unreachable.
- **Trace testing:** Assert that spans are created and propagated across service boundaries. 

---

## Section 1.6 — CI/CD Pipeline (Development Side)

**Why this section exists:** The CI/CD pipeline is the mechanical process that turns your code into a deployable artifact. In Phase 1, you build the pipeline. In Phase 3, you use it.

### 1.6.1 Continuous Integration (CI)

**Triggers:** Every push to main, every pull request.

**Stages:**

| Stage | What it does | Failure action |
|---|---|---|
| **Lint** | Code style, static analysis | Block merge |
| **Type check** | Type safety (if applicable) | Block merge |
| **Unit tests** | Fast, isolated logic tests | Block merge |
| **Integration tests** | Component interaction tests | Block merge |
| **Security scan** | Dependency vulnerabilities, secret detection | Block merge on critical |
| **Build** | Compile / bundle / containerize | Block merge |
| **Artifact** | Produce immutable, versioned artifact | Store for deployment |

**Artifact rules:**
- **Immutable.** Once built, never modified. If you need a change, build a new artifact.
- **Versioned.** Tag with Git SHA or semantic version.
- **Traceable.** The artifact must map back to the exact commit that produced it.
- **Signed.** Cryptographically signed to verify integrity.

**Placeholder:**
- CI tool: `_________________` (GitHub Actions, GitLab CI, Jenkins)
- Build command: `_________________`
- Artifact registry: `_________________` (container registry, artifact store)

### 1.6.2 Pre-deployment validation (CI gate)

Before any artifact is allowed to reach staging or production, the following must pass:

- ✅ CI green (all tests pass)
- ✅ Coverage threshold met
- ✅ Security scan passed (no critical vulnerabilities)
- ✅ No secrets in code
- ✅ Docker image scanned (if containerized)
- ✅ Database migrations tested and reversible
- ✅ Feature flags configured with safe defaults
- ✅ Monitoring hooks confirmed (metrics, logs, traces emitted)

This is the "deploy gate." It is automated. If any check fails, deployment is blocked. 

**Placeholder:**
- Deploy gate criteria: `_________________`
- Manual approval required? `Yes / No`
- Who approves? `_________________`

---

## Section 1.7 — Error Tracking

**Why this section exists:** Logs and metrics tell you *that* something failed. Error tracking tells you *why*.

**What it captures:**
- Stack traces with source maps (for frontend)
- Breadcrumbs (user actions leading to the error)
- User context (ID, plan, platform)
- Release version
- Frequency and trend

**Placeholder:**
- Error tracking tool: `_________________` (Sentry, Bugsnag, Rollbar)
- Source map upload in CI: `Yes / No`
- Alerting rules: `_________________` (e.g., alert if error rate > 1% for 5 minutes)

---

## Section 1.8 — Phase 1 Completion Gate

Before moving to Phase 2, confirm:

- [ ] Configuration is externalized (no hardcoded environment values)
- [ ] Secrets are managed in a secret store, not in code
- [ ] Every external call has timeout, retry, circuit breaker, and fallback
- [ ] Idempotency is implemented for retryable operations
- [ ] Application is stateless (or stateful components are documented)
- [ ] Graceful shutdown is implemented
- [ ] Structured JSON logging is implemented with correlation IDs
- [ ] PII masking is applied to logs
- [ ] RED metrics are emitted for all endpoints
- [ ] USE metrics are emitted for critical resources
- [ ] Distributed tracing is instrumented with context propagation
- [ ] Health check endpoints (`/health/live`, `/health/ready`) exist
- [ ] Event taxonomy from Phase 0 is implemented in code
- [ ] Client-side and server-side tracking are both configured
- [ ] Privacy rules for event tracking are enforced
- [ ] Feature flags are externalized with safe defaults
- [ ] Unit, integration, and contract tests are written and passing
- [ ] Instrumentation is tested (events, logs, metrics, traces)
- [ ] CI pipeline runs on every commit with deploy gate
- [ ] Artifact is immutable, versioned, and traceable
- [ ] Error tracking is configured with release version

**If any box is unchecked, you are not ready to move to Phase 2. The instrument is not built.**

---

## How Phase 1 connects to the rest of the lifecycle

Phase 1 produces two things:

1. **A working application** that fulfills the Phase 0 requirements.
2. **An instrumented application** that emits logs, metrics, traces, and events.

Phase 2 (Build & Test) takes the CI pipeline from Phase 1 and validates the artifact more rigorously. Phase 3 (Release & Deploy) uses the artifact and feature flags to ship safely. Phase 4 (Operate) consumes the telemetry emitted by the instrumentation built in Phase 1. Phase 5 (Observe & Analyze) queries the event data to understand user behavior. Phase 6 (Maintain & Improve) uses the traces and metrics to find bottlenecks and the events to measure feature impact.

**Without Phase 1 instrumentation, Phases 4, 5, and 6 are impossible.** You cannot operate, observe, or improve what you cannot see.
