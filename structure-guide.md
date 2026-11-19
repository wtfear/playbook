# Repository Structure and Architecture Guide

This document defines the structural architecture, folder hierarchy, naming conventions, linking rules, and lifecycle management principles for the agency operating knowledge base.

---

## 1. Actual Folder Hierarchy

The knowledge base is structured into a shallow, modular layout separating operational category documentation from shared support and governance repositories:

```text
Playbook/
├── README.md                           # Root navigation, purpose, and operating orientation
├── structure-guide.md                  # This document: architecture, rules, and conventions
├── category-roadmap.md                 # Development progress and status tracking for all 13 areas
├── open-questions.md                   # Central register of unresolved strategic & operational questions
├── ai-contribution-guide.md            # Mandatory rules and boundaries for AI agents and assistants
│
├── categories/                         # The 13 operational responsibility categories
│   ├── README.md                       # Category taxonomy overview and core boundaries
│   ├── 01-development-and-engineering/ # Fully scaffolded engineering responsibility area
│   │   ├── README.md                   # Orientation, boundaries, and navigation
│   │   ├── coverage-matrix.md          # Canonical homes for all engineering subjects
│   │   ├── development-roadmap.md      # Topic-by-topic drafting and validation progress
│   │   ├── open-questions.md           # Engineering architectural open questions
│   │   ├── 01-engineering-governance/  # Roles, risk tailoring, review gates, exceptions, decisions
│   │   ├── 02-service-specialties/     # 8 candidate technical domain specializations
│   │   ├── 03-delivery-lifecycle/      # 12-stage technical progression from intake to retirement
│   │   ├── 04-engineering-standards/   # 16 reusable technical standards (code, CI/CD, data, secrets)
│   │   ├── 05-engagement-patterns/     # 5 commercial engagement delivery patterns
│   │   └── 06-engineering-improvement/ # Continuous improvement, DORA metrics, debt management
│   ├── 02-client-acquisition/
│   │   └── README.md                   # Prospect research, outreach, referrals, pipeline generation
│   ├── 03-business-strategy-and-governance/
│   │   └── README.md                   # Business model, service offerings, founder decision rights
│   ├── 04-people-and-relationship-management/
│   │   └── README.md                   # Hiring, onboarding, contractor management, team feedback
│   ├── 05-sales/
│   │   └── README.md                   # Discovery, estimation, pricing, proposals, closing, handoffs
│   ├── 06-marketing/
│   │   └── README.md                   # Brand communication, case studies, website, thought leadership
│   ├── 07-personal-and-professional-growth/
│   │   └── README.md                   # Individual capability, role-play practice, communication
│   ├── 08-end-to-end-agency-and-startup/
│   │   └── README.md                   # Cross-functional lifecycles (client engagement, agency launch)
│   ├── 09-internal-operations-and-work-management/
│   │   └── README.md                   # Planning rhythms, task tracking, meeting hygiene, async comms
│   ├── 10-finance-and-money-management/
│   │   └── README.md                   # Invoicing, cash flow, reserves, expense limits, bookkeeping
│   ├── 11-project-delivery-and-client-service/
│   │   └── README.md                   # Kickoff, milestones, scope changes, UAT, client handover
│   ├── 12-legal-security-and-risk-management/
│   │   └── README.md                   # Contracts, IP, confidentiality, secrets hygiene, compliance
│   └── 13-knowledge-systems-and-automation/
│       └── README.md                   # Knowledge governance, ODRs, AI usage, internal automation
│
├── templates/                          # Standardized reusable Markdown templates
│   ├── README.md                       # Template directory guide and metadata specifications
│   ├── policy-template.md              # Template for mandatory boundaries and rules
│   ├── playbook-template.md            # Template for situational guidance and human judgment
│   ├── workflow-template.md            # Template for step-by-step repeatable operational flows
│   ├── checklist-template.md           # Template for compact verification lists
│   ├── foundation-document-template.md # Template for system foundation contracts and production gates
│   ├── research-note-template.md       # Template for external citations, evidence, and benchmarks
│   ├── decision-record-template.md     # Template for Operating Decision Records (ODRs)
│   ├── meeting-note-template.md        # Template for internal and strategic meeting notes
│   └── retrospective-template.md       # Template for project retrospectives and lessons learned
│
├── decisions/                          # Formal Operating Decision Records (ODRs)
│   └── README.md                       # ODR index and decision governance
│
├── research/                           # Central repository for external research and candidate findings
│   ├── README.md                       # Research index and guidance on centralized discovery
│   ├── 01-development-and-engineering/ # Engineering evidence register, candidate practices, validation
│   └── production-lifecycle/           # 8-phase application production lifecycle reference framework
│
├── ideas/                              # Strategic ideas, experimentation proposals, and review logs
│   └── README.md                       # Staging ground for concepts prior to research and drafting
│
├── meetings/                           # Records of internal meetings, syncs, and strategy sessions
│   └── README.md                       # Chronological meeting note repository
│
└── archive/                            # Deprecated and superseded documents
    └── README.md                       # Tombstoned files preserved for historical audit trails
```

---

## 2. Purpose of Top-Level Folders

| Directory | Core Purpose | Content Types Permitted |
| :--- | :--- | :--- |
| `categories/` | Houses the 13 foundational operating categories. Each category represents an operational responsibility area. | Policies, playbooks, workflows, checklists, references specific to that category. |
| `templates/` | Single source of truth for all documentation structures, system contracts, and frontmatter formats. | Standard `.md` templates only. |
| `decisions/` | Immutable historical log of approved Operating Decision Records (ODRs). | ODR files (`odr-XXX-[title].md`). |
| `research/` | Centralized repository of external research notes, market analyses, benchmark findings, and lifecycle frameworks. | Research notes and reference frameworks (`rn-[category]-[topic].md` or topic folders). |
| `ideas/` | Staging ground for rough concepts, potential service offerings, and founder brainstorms. | Idea backlog files and review logs. |
| `meetings/` | Formal records of team meetings, category deep dives, and strategic retreats. | Meeting notes (`YYYY-MM-DD-[topic].md`). |
| `archive/` | Retired documents kept for audit history. | Superseded files with deprecation headers. |

---

## 3. Where Different Document Types Belong

To maintain a clean and predictable structure, every document type has a strictly defined home:

1. **Policies, Playbooks, Workflows, Checklists, and Category References:**
   - Belong inside the relevant functional category folder (e.g., `categories/01-development-and-engineering/code-review-workflow.md`).
   - If an operational document is genuinely cross-cutting (e.g., Complete Client Engagement Lifecycle), it belongs in `categories/08-end-to-end-agency-and-startup/`.
2. **Research Notes:**
   - Belong centrally in `research/` (e.g., `research/rn-01-testing-frameworks.md`).
3. **Decision Records:**
   - Belong centrally in `decisions/` (e.g., `decisions/odr-001-markdown-repo-architecture.md`).
4. **Meeting Notes:**
   - Belong centrally in `meetings/` (e.g., `meetings/2026-11-20-pricing-discussion.md`).
5. **Raw Strategic Ideas & Review Logs:**
   - Belong in `ideas/`.
6. **Superseded or Deprecated Documents:**
   - Belong in `archive/`.

---

## 4. The Research Location Convention: Why Centralized?

A primary design decision in this knowledge base is that **all research notes live centrally in `research/` rather than fragmented across individual category subfolders**.

### Key Justifications:
- **Single Discovery Point:** Founders, contributors, and AI assistants know exactly where to find external evidence, benchmark comparisons, and source material without searching 13 different directories.
- **Cross-Category Scope:** Real-world research frequently spans multiple categories. A study on "Retainer Pricing for Automation Agencies" affects Category 03 (Strategy), Category 05 (Sales), Category 10 (Finance), and Category 11 (Delivery). A central directory avoids arbitrary placement or duplicate files.
- **Strict Separation of Status:** Functional folders in `categories/` represent *how the agency operates* (or proposed operating plans). Centralizing external notes in `research/` prevents unvalidated outside ideas from being mistaken for internal operating procedure.
- **Prevents Directory Sprawl:** Keeps category folders shallow and clean, avoiding dozens of empty `research/` subdirectories.

---

## 5. Naming Conventions

All folders and files must adhere to strict, machine-readable, cross-platform naming rules:

- **Lowercase Kebab-Case:** Use lowercase alphanumeric characters separated by hyphens (e.g., `client-onboarding-workflow.md`, `expense-approval-policy.md`). No uppercase characters in file or folder names, except for `README.md` which serves as the universal index file.
- **Stable Numeric Prefixes for Categories:** The 13 operational categories must always maintain their two-digit prefixes (`01-` through `13-`).
- **Date-Prefixed Meeting Notes:** Meeting files must use ISO 8601 dates: `YYYY-MM-DD-[short-topic].md`.
- **Numbered Decision Records:** ODR files must use sequential three-digit numbering: `odr-[001-999]-[short-slug].md`.
- **Prefixed Research Notes:** Research notes must identify their primary category or cross-functional nature: `rn-[category-number]-[short-slug].md` or `rn-cross-[short-slug].md`.

---

## 6. Linking Conventions

- **Relative Markdown Links Only:** Always use relative links (e.g., to link to Sales from categories overview, use `05-sales/README.md`). Never use absolute filesystem paths (`c:\...` or `/Users/...`).
- **Target Existing Files:** Never link to a non-existent or placeholder file. If a candidate playbook is proposed but not yet drafted, mention its name in plain bold text without a broken markdown link.
- **Case-Sensitive Accuracy:** Always match exact casing in relative link paths (`README.md`, not `readme.md`) to guarantee cross-platform compatibility across Windows, macOS, and Linux.

---

## 7. Rules for Avoiding Duplication

Duplication causes divergence, confusion, and maintenance overhead. The following rules are non-negotiable:

1. **Single Source of Truth:** Every business rule, financial limit, or technical standard is defined in exactly one place.
   - *Example:* Financial approval limits are defined **only** in `categories/10-finance-and-money-management/`. The Sales and Engineering playbooks link to Finance rather than restating dollar thresholds.
2. **Link and Explain Handoffs:** When two categories interact (e.g., Sales passing a project to Delivery), document the *handoff trigger, input package, and output expectations* in both READMEs, with links connecting them. Do not duplicate the internal procedure of the other area.
3. **End-to-End Orchestrates, Never Duplicates:** `08-end-to-end-agency-and-startup` provides high-level maps connecting existing workflows. It links to functional workflows rather than embedding full procedures.
4. **Templates Stay Central:** Category documents do not embed redundant structural templates; they use the standardized templates in `templates/`.

---

## 8. How to Archive or Supersede Documents

When a policy, playbook, or workflow is updated or replaced:

1. **Update Frontmatter:** Change `status: approved` to `status: superseded`.
2. **Add Deprecation Banner:** Insert a prominent warning banner at the top of the file pointing directly to the replacement document.
3. **Move to `archive/`:** Move the deprecated file to `archive/[YYYY]-[original-filename].md`.
4. **Update Inbound Links:** Search the repository for references to the archived document and update them to point to the active standard.

---

## 9. How the Structure Can Evolve Without Breaking Navigation

- **Preserve Category Prefixes:** Keep categories `01-` through `13-` stable. If sub-disciplines emerge (e.g., DevOps within Engineering), they should be created as individual documents within `01-development-and-engineering/` rather than creating a new top-level category folder.
- **Index Updates:** Whenever a new document is added to a category, it must be added to that category's `README.md` index table immediately.
- **Central Roadmap Tracking:** Track the progress of new candidate documents in [`category-roadmap.md`](./category-roadmap.md) to maintain total visibility across the founding team.
