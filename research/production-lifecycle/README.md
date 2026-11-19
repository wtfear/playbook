---
title: "Research: Production Lifecycle Reference Framework"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "../../categories/01-development-and-engineering/README.md"
  - "../../categories/01-development-and-engineering/03-delivery-lifecycle/README.md"
  - "../../templates/foundation-document-template.md"
---

# Production Lifecycle Reference Framework

> [!NOTE]
> **External Reference Material:** This folder contains external research and reference material representing an 8-phase application lifecycle framework. It serves as background source evidence and design input. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

## What this folder is

This folder is an external reference system for building, shipping, and running software applications—from early prototypes to production services with active users.

It investigates one central question: **"What needs to be addressed before, during, and after building an application so it survives reliably in production?"**

It serves as candidate research and working reference material. Its patterns inform the agency's canonical delivery lifecycle in [`../../categories/01-development-and-engineering/03-delivery-lifecycle/`](../../categories/01-development-and-engineering/03-delivery-lifecycle/README.md) and reusable templates in [`../../templates/`](../../templates/README.md).

---

## The eight phases (Phases 0 through 7)

The reference lifecycle encompasses 8 distinct phases (Phase 0 through Phase 7):

| Phase | Name | Core Question | Primary Output | Reference Document |
| :---: | :--- | :--- | :--- | :--- |
| **0** | **Foundation & Design** | *What are we building, for whom, and how will it run?* | Foundation Document (contract for production readiness) | [`phase0.md`](./phase0.md) |
| **1** | **Development & Instrumentation** | *Can we build it while measuring everything?* | Working app with events, logs, metrics, traces | [`phase1.md`](./phase1.md) |
| **2** | **Build & Test** | *Is the artifact safe and verified?* | Immutable, tested artifact in staging | [`phase2.md`](./phase2.md) |
| **3** | **Release & Deploy** | *Can we ship without breaking users?* | Safe production release with rollback | [`phase3.md`](./phase3.md) |
| **4** | **Operate** | *Is it running, and do we know when it's not?* | Monitoring, alerts, runbooks, backups | [`phase4.md`](./phase4.md) |
| **5** | **Observe & Analyze** | *What are users actually doing?* | Dashboards, funnels, retention reports | [`phase5.md`](./phase5.md) |
| **6** | **Maintain & Improve** | *How do we make it better and cheaper?* | Postmortems, upgrades, A/B tests, cost reviews | [`phase6.md`](./phase6.md) |
| **7** | **Retire / Decommission** | *How do we shut it down safely?* | Migration plan, data archive, infrastructure removal | [`phase7.md`](./phase7.md) |

---

## External Reference Architecture & Original Folder Schema

> [!NOTE]
> The folder structure below reflects the original upstream reference architecture from which this research was compiled. In this agency operating repository:
> - Centralized templates are housed under [`../../templates/`](../../templates/README.md) (e.g., [`../../templates/foundation-document-template.md`](../../templates/foundation-document-template.md)).
> - Agency delivery lifecycle standards are maintained in [`../../categories/01-development-and-engineering/03-delivery-lifecycle/`](../../categories/01-development-and-engineering/03-delivery-lifecycle/README.md).
> - Production applications are built in dedicated client/project repositories rather than inside this operating playbook.

```text
[Original Reference Schema Note]
/production-lifecycle/
├── README.md                    ← reference overview
├── /templates/                  (Mapped to playbook root templates/)
│   ├── phase-0-foundation.md    ← master template (now in templates/foundation-document-template.md)
│   ├── phase-1-development.md
│   ├── phase-2-build-test.md
│   ├── phase-3-release-deploy.md
│   ├── phase-4-operate.md
│   ├── phase-5-observe-analyze.md
│   ├── phase-6-maintain-improve.md
│   └── phase-7-retire.md
├── /apps/                       (External reference: represents individual project repositories)
│   └── /habitloop/              ← example application project
│       ├── phase-0-foundation.md
│       ├── phase-1-development.md
│       └── ...
└── /reference/                  (External reference notes)
    ├── checklists/              ← extracted checklists
    ├── tools/                   ← tool comparisons
    └── glossary.md              ← reference definitions
```
