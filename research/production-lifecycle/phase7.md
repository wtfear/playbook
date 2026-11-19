---
title: "Research: Production Lifecycle - Phase 7: Retire / Decommission"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/12-retirement-and-client-exit.md"
  - "../../categories/01-development-and-engineering/04-engineering-standards/data-databases-and-test-data.md"
---

> [!NOTE]
> **Candidate Practice / Proposed Framework:** This document contains external research and candidate reference material. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

# Phase 7: Retire / Decommission — A Generalized Guide

## What Phase 7 actually is

Phases 1 through 6 built, deployed, operated, and improved the application. Phase 7 answers the final question: **How do we end this service's life safely, without losing data, breaking dependencies, or violating compliance?**

The critical mental shift: **Decommissioning is not "turning it off." It is a security control, a compliance event, and a project with its own lifecycle.** Decommissioning is often treated as an IT tidy-up task. In practice, it is a security control. When a system reaches end of life, the organisation still owns the data risk until that data is removed, sanitised, or destroyed in a way that is appropriate to the medium and the business context . Improper device decommissioning can result in unauthorized access to data and cyberattacks through residual storage data leakage .

Decommissioning is not as easy as just flipping a switch. It involves verifying report accuracy, data cleansing, enhancing functionality in other applications, data retention strategies, adhering to legal requirements, personnel retraining and a host of other issues . Without careful planning and the right methodology, decommissioning projects fail — or never even start because they are so complex .

Phase 7 is where you close the loop. Not every service runs forever. Phase 6 produced the signal that it is time to retire: declining usage, unsustainable unit economics, replacement by a better service, or strategic deprioritization. Phase 7 is where you act on that signal deliberately.

---

## Section 7.1 — Deciding to Retire: When and Why

**Why this section exists:** Decommissioning should be a deliberate decision, not a slow decay. A service that nobody decides to kill will run indefinitely, consuming resources, accumulating security risk, and distracting the team.

### 7.1.1 Retirement triggers

| Trigger | Signal | Typical action |
|---|---|---|
| **Replacement** | A new service fully replicates functionality | Migrate users, archive data, decommission |
| **Declining usage** | Active users fall below threshold for N months | Sunset with user notification |
| **Unsustainable cost** | Unit economics are negative and not fixable | Retire and redirect investment |
| **Security risk** | Unpatchable vulnerability or end-of-support runtime | Emergency decommission or migration |
| **Strategic deprioritization** | Product direction changes | Controlled sunset |
| **Compliance** | Regulatory requirement makes the service untenable | Immediate decommission |

**Placeholder:**
- Retirement trigger for this service: `_________________`
- Who has authority to decide retirement: `_________________`
- Minimum notification period for users: `_________________`

### 7.1.2 The go/no-go decision

Before committing to decommissioning, answer:

| Question | Why it matters |
|---|---|
| **Can another application assume all required functionality?** | If no, migration is not possible  |
| **What happens to the data?** | Conversion, archiving, or destruction — this must be decided before anything else  |
| **How many users are affected?** | Determines communication and migration effort |
| **What are the downstream dependencies?** | Systems that call this service must be updated |
| **What are the compliance obligations?** | Retention periods can run to 25 years for legal archiving  |
| **What is the budget for decommissioning?** | Decommissioning is a project with its own cost |

**Placeholder:**
- Go/no-go decision date: `_________________`
- Decision owner: `_________________`
- Decision rationale documented: `_________________`

---

## Section 7.2 — Dependency Mapping

**Why this section exists:** You cannot safely decommission what you do not understand. Every dependency — internal and external — must be identified before shutdown.

### 7.2.1 Dependency categories

| Category | Examples | Risk if missed |
|---|---|---|
| **Upstream callers** | Other services, cron jobs, scripts that call this service | Their requests fail silently |
| **Downstream dependencies** | Databases, caches, queues, external APIs this service calls | Orphaned resources continue costing money |
| **Data consumers** | Analytics pipelines, reports, data warehouse jobs | Data gaps in reporting |
| **Authentication/identity** | Shared auth providers, SSO integrations | Users of other services may be locked out |
| **Network** | DNS records, load balancers, firewall rules, VPC peering | Security exposure, routing errors |
| **Observability** | Dashboards, alerts, log pipelines referencing this service | Alert noise after shutdown |
| **Documentation** | Runbooks, architecture diagrams, onboarding materials | Outdated references confuse future engineers |

### 7.2.2 Dependency mapping process

```
1. Search code repositories for imports, API calls, references to this service
2. Query the service mesh or API gateway for recent traffic from callers
3. Check DNS records and load balancer configurations
4. Review database schemas for foreign keys or shared tables
5. Interview teams that may have undocumented integrations
6. Document every dependency with owner and migration plan
```

**Placeholder:**
- Dependency map location: `_________________`
- Total upstream callers identified: `________`
- Total downstream dependencies identified: `________`
- Dependencies without migration plan: `_________________`

---

## Section 7.3 — Data Migration, Archiving, and Retention

**Why this section exists:** Data is the one thing you cannot recreate. Every decommissioning decision must answer: what happens to the data?

### 7.3.1 The data disposition framework

| Disposition | When to use | How |
|---|---|---|
| **Migrate** | Data is needed by the replacement system | ETL to new schema, validate completeness |
| **Archive** | Data must be retained for compliance or historical reference | Move to long-term storage (cold storage, archive database) |
| **Destroy** | Data has no further business or legal value | Secure erasure, verified destruction |
| **Retain in place** | System is shut down but data remains accessible | Read-only mode, restricted access |

### 7.3.2 Archiving for compliance

For regulated industries, legal archiving obligations can run to 25 years . The safest approach treats decommissioning as a controlled transition. Live and historic records can be ingested into a central evidential archive while preserving original formats and proving lineage .

**Archiving requirements:**

| Requirement | Why |
|---|---|
| **Preserve original format** | Regulatory admissibility depends on integrity |
| **Prove lineage** | Show the data was not altered during migration |
| **Standardise metadata** | Enable search and discovery across years of data |
| **Apply retention policies** | Enforce legal holds and auditable deletion rules  |
| **Continuous validation** | Identify gaps early, not during a regulatory investigation  |

**Placeholder:**
- Data disposition decision: `Migrate / Archive / Destroy / Retain`
- Retention period required: `________ years`
- Archiving tool: `_________________`
- Lineage verification method: `_________________`
- Data migration validation plan: `_________________`

### 7.3.3 Data migration safety

Data migration does not need to be a single, high-risk, big-bang event. A safer approach treats decommissioning as a controlled transition .

| Practice | Why |
|---|---|
| **Run in parallel** | Keep legacy system running while new system is validated |
| **Reconcile continuously** | Compare source and target counts daily |
| **Preserve original formats** | Do not transform unless necessary |
| **Document every transformation** | Audit trail for compliance |
| **Test restore from archive** | Ensure archived data can actually be retrieved |

**Placeholder:**
- Parallel run duration: `________`
- Reconciliation frequency: `_________________`
- Archive restore testing schedule: `_________________`

---

## Section 7.4 — Stakeholder Communication

**Why this section exists:** Decommissioning affects people. Users lose functionality. Support teams need new scripts. Downstream teams need migration time. Communication must be planned, not improvised.

### 7.4.1 Stakeholder map

| Audience | What they need | When | Channel |
|---|---|---|---|
| **End users** | Advance notice, migration path, data export option | 90/60/30 days before | Email, in-app, status page |
| **Internal teams** | Dependency migration timeline, support changes | 60 days before | Team meetings, shared doc |
| **Support team** | Updated scripts, FAQ, escalation path | 30 days before | Training session |
| **Compliance/Legal** | Retention plan, data destruction evidence | Before shutdown | Formal report |
| **Leadership** | Cost savings, risk reduction, timeline | At decision and completion | Executive summary |
| **Regulators** | Data preservation evidence (if required) | As required | Formal submission |

### 7.4.2 The communication cadence

A communications plan defines specific actions for disseminating information regarding project objectives, strategies, problems/issues, and status, and for developing strategies for soliciting input and involvement throughout the deactivation project .

| Timing | Communication |
|---|---|
| **T-90 days** | Announce decommissioning decision, migration timeline |
| **T-60 days** | Detailed migration guide, data export instructions |
| **T-30 days** | Final reminder, support contact information |
| **T-7 days** | Last call for data export |
| **T-0** | Service shutdown notification |
| **T+30 days** | Post-decommission summary, data archive access info |

**Placeholder:**
- Communication plan owner: `_________________`
- User notification method: `_________________`
- Support escalation path: `_________________`
- Status page update: `_________________`

---

## Section 7.5 — Controlled Shutdown

**Why this section exists:** Shutdown is not "kill the process." It is a sequence: stop accepting new work, drain in-flight requests, verify data is safe, then stop.

### 7.5.1 The shutdown sequence

```
1. Set service to read-only mode (no new writes)
2. Notify users of imminent shutdown
3. Drain in-flight requests (wait for timeout)
4. Stop accepting new connections
5. Verify all data is migrated or archived
6. Take final backup/snapshot
7. Shut down application processes
8. Shut down supporting infrastructure
9. Verify no unexpected traffic remains
```

### 7.5.2 Shutdown verification checklist

| Check | How |
|---|---|
| **No new writes** | Monitor write endpoint metrics for 24 hours |
| **All data migrated** | Run reconciliation report |
| **All data archived** | Verify archive integrity |
| **No upstream callers** | Check API gateway logs for 7 days |
| **DNS no longer routes** | Verify DNS records removed |
| **Alerts silenced** | Disable alerts for this service |
| **On-call removed** | Remove from rotation |
| **Documentation updated** | Mark service as decommissioned |

**Placeholder:**
- Shutdown window: `_________________`
- Shutdown owner: `_________________`
- Final backup location: `_________________`
- Verification period: `________ days`

---

## Section 7.6 — Infrastructure Teardown

**Why this section exists:** After the application stops, the infrastructure it used must be dismantled. Orphaned cloud resources are a silent cost and a security risk.

### 7.6.1 Infrastructure inventory

| Resource | Action | Verification |
|---|---|---|
| **Compute instances** | Terminate | No running instances in console |
| **Databases** | Delete after final backup | Backup verified restorable |
| **Storage buckets** | Delete after data archived | No objects remaining |
| **Load balancers** | Delete | No traffic |
| **DNS records** | Remove | Propagation verified |
| **CDN distributions** | Disable and delete | No cached content |
| **Queues** | Delete after draining | Queue depth = 0 |
| **Secrets** | Revoke and delete | No services using them |
| **IAM roles** | Delete | No attached policies |
| **Network resources** | Delete VPC, subnets, security groups | No dependencies |
| **Monitoring** | Delete dashboards, alerts | No orphaned alerts |

### 7.6.2 Automated decommissioning

Design workloads so that they handle termination of resources smoothly when you identify and retire non-critical, unneeded, or low-utilisation resources. Use automation to reduce or remove the costs associated with decommissioning . With auto-scaling, when demand drops, the system automatically removes excess resource capacity so that no unnecessary costs are incurred .

**Placeholder:**
- Infrastructure inventory location: `_________________`
- Teardown owner: `_________________`
- Cost savings realised: `$________/month`
- Orphaned resources discovered: `_________________`

---

## Section 7.7 — Security and Data Destruction

**Why this section exists:** The most dangerous moment in a service's life is when it is shut down but its data still exists. Equipment containing storage media with PII must be securely wiped or have sensitive data removed before disposal or reuse . Without verified data destruction, organisations risk significant data breaches every time they dispose of, sell, donate, or reassign hardware .

### 7.7.1 Data sanitisation methods

| Method | When to use | Verification |
|---|---|---|
| **Cryptographic erasure** | Cloud volumes, encrypted storage | Destroy encryption keys |
| **Overwriting** | Physical disks that will be reused | Multi-pass overwrite |
| **Degaussing** | Magnetic media | Magnetic field verification |
| **Physical destruction** | Media that cannot be wiped | Certificate of destruction |
| **Cloud provider deletion** | Cloud resources | Provider confirmation |

### 7.7.2 The precautionary principle

The standard recommends treating all equipment with storage media as if it contains PII . This avoids the error-prone process of determining whether each piece of equipment actually contains PII.

**Placeholder:**
- Data destruction method: `_________________`
- Destruction verification: `_________________`
- Certificate of destruction: `_________________`
- Compliance sign-off: `_________________`

### 7.7.3 Credential revocation

| Credential | Action |
|---|---|
| **API keys** | Revoke immediately |
| **Service accounts** | Delete |
| **OAuth clients** | Deactivate |
| **Database users** | Drop |
| **SSH keys** | Remove from authorized_keys |
| **TLS certificates** | Revoke and let expire |

---

## Section 7.8 — Post-Decommission Review

**Why this section exists:** Decommissioning is a project. Like any project, it produces lessons. The post-decommission review captures what went well, what went wrong, and what to do differently next time.

### 7.8.1 The post-decommission review agenda

| Topic | Questions |
|---|---|
| **Timeline** | Did we hit the planned dates? What caused delays? |
| **Data** | Was all data migrated or archived successfully? Any gaps? |
| **Dependencies** | Did we miss any? How did they surface? |
| **Communication** | Did users feel informed? Any complaints? |
| **Cost** | Did we achieve the expected savings? |
| **Security** | Were all credentials revoked? Any exposure? |
| **Process** | What would we do differently next time? |

### 7.8.2 Lessons learned capture

Lessons learned from decommissioning should be documented and shared. Understanding the history of the facility (maps, records, maintenance and incidents) is essential for decommissioning, and a comparison between the records and physical state should be undertaken as soon as possible . The transition from operations to decommissioning requires a major change in culture .

**Placeholder:**
- Post-decommission review date: `_________________`
- Attendees: `_________________`
- Lessons learned document: `_________________`
- Process improvements identified: `_________________`

---

## Section 7.9 — Phase 7 Completion Gate

Before considering the service fully decommissioned, confirm:

- [ ] Retirement decision documented with rationale
- [ ] Go/no-go decision made and recorded
- [ ] Dependency map completed (upstream and downstream)
- [ ] All dependencies migrated or confirmed obsolete
- [ ] Data disposition decided (migrate/archive/destroy/retain)
- [ ] Data migration completed and validated
- [ ] Data archive verified and restorable
- [ ] Retention policies applied and documented
- [ ] Stakeholder communication plan executed
- [ ] Users notified at 90/60/30/7 days
- [ ] Support team trained on migration path
- [ ] Controlled shutdown sequence executed
- [ ] Service set to read-only before shutdown
- [ ] In-flight requests drained
- [ ] Final backup/snapshot taken and verified
- [ ] Service stopped
- [ ] Infrastructure teardown completed
- [ ] Compute, databases, storage, network resources deleted
- [ ] DNS records removed
- [ ] Load balancers deleted
- [ ] CDN distributions disabled
- [ ] Secrets and credentials revoked
- [ ] IAM roles and service accounts deleted
- [ ] Data destruction verified (if applicable)
- [ ] Certificate of destruction obtained
- [ ] Monitoring dashboards and alerts removed
- [ ] On-call rotation updated
- [ ] Documentation updated (marked decommissioned)
- [ ] Asset inventory updated
- [ ] Cost savings verified
- [ ] Post-decommission review completed
- [ ] Lessons learned documented
- [ ] Process improvements identified

**If any box is unchecked, the service is not fully decommissioned. Residual risk remains.**

---

## How Phase 7 connects to the rest of the lifecycle

Phase 7 is the exit from the lifecycle. It takes the retirement signal from Phase 6 and executes a controlled, secure, compliant decommissioning. It produces:

1. **A decommissioned service** — no longer running, no longer costing money, no longer a security risk.
2. **Migrated or archived data** — preserved for compliance and historical reference.
3. **Dismantled infrastructure** — no orphaned resources.
4. **Verified data destruction** — no residual data exposure.
5. **Lessons learned** — process improvements for the next decommissioning.

The lifecycle is now complete: **Phase 0 (Foundation) → Phase 1 (Development) → Phase 2 (Build & Test) → Phase 3 (Release & Deploy) → Phase 4 (Operate) → Phase 5 (Observe & Analyze) → Phase 6 (Maintain & Improve) → Phase 7 (Retire)** .

Then it begins again for the next application.

**The core principle of Phase 7:** You do not "shut down" a service. You **retire** it with the same discipline you used to build it. Every dependency is mapped. Every byte of data is accounted for. Every credential is revoked. Every stakeholder is informed. Every lesson is captured. Decommissioning is not the end of the lifecycle — it is the final phase of a well-run one.
