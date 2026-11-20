---
title: "Research Note: ISO/IEC 25010:2023 Software Quality Model"
document_type: research-note
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../categories/01-development-and-engineering/README.md"
  - "../categories/01-development-and-engineering/03-delivery-lifecycle/01-technical-intake-and-handoff.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/testing-and-quality-engineering.md"
  - "../categories/01-development-and-engineering/04-engineering-standards/validation-across-lifecycle.md"
---

# Research Note: ISO/IEC 25010:2023 Software Quality Model

> [!NOTE]
> A Research Note records external evidence, observations, benchmark sources, and candidate practices. **Informs a decision; not policy.** It does NOT represent approved agency policy or binding operational instructions.

## 1. Objective and Research Questions

How should the agency objectively categorize non-functional requirements (NFRs) and software quality attributes across client proposals and acceptance criteria?
- Question 1: What is the recognized international standard for software product quality characteristics?
- Question 2: How does the updated ISO/IEC 25010:2023 standard refine classical quality models for modern cloud-native systems?

## 2. External Sources and Evidence Examined

- **Source 1:** International Organization for Standardization (ISO) / International Electrotechnical Commission (IEC) — *ISO/IEC 25010:2023 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model* (Second Edition, Published November 2023; URL: `iso.org/standard/78176.html`, accessed Nov 2026).
  - *Summary of findings:* Replaces the 2011 standard. Refines the software product quality taxonomy into 9 characteristics: Functional Suitability, Performance Efficiency, Compatibility, Interaction Capability, Reliability, Security, Maintainability, Flexibility, and Safety.

## 3. Analysis of External Practices

- **The 9 ISO/IEC 25010:2023 Quality Characteristics:**
  1. *Functional Suitability:* Feature completeness, correctness, and appropriateness.
  2. *Performance Efficiency:* Latency, throughput, and resource utilization.
  3. *Compatibility:* Interoperability and co-existence.
  4. *Interaction Capability (Usability):* Learnability, aesthetics, and accessibility.
  5. *Reliability:* Fault tolerance and recoverability (RTO/RPO).
  6. *Security:* Confidentiality, integrity, non-repudiation, and authenticity.
  7. *Maintainability:* Modularity, analyzability, testability, and modifiability.
  8. *Flexibility (Portability):* Scalability, installability, and replaceability.
  9. *Safety:* Risk identification, fail-safe operation, and hazard prevention.

## 4. Evaluation for Our Agency Context

- **Relevance to a 1–3 Person Agency:**
  - Provides a complete, professional checklist during intake so engineers do not overlook critical non-functional requirements (e.g., error recovery, accessibility, data backup) during scoping.
- **Trade-offs & Heavyweight Pitfalls:**
  - Avoid formal mathematical scoring or full ISO audits on simple client MVPs. Use the 9 characteristics purely as a scoping taxonomy.

## 5. Candidate Practices Proposed for Consideration

1. **Intake NFR Checklist:** Align the Non-Functional Requirements section of client project plans with the ISO 25010 taxonomy.
2. **Definition of Done:** Ensure that at least Performance, Security, and Interaction Capability are verified prior to client handoff.

## 6. Uncertainties, Risks, and Open Questions

- Educating non-technical clients on the cost trade-offs of demanding high scores across all 9 quality characteristics simultaneously.

## 7. Recommended Next Steps

- Informs a decision; not policy.
- [x] Reference ISO/IEC 25010:2023 in `03-delivery-lifecycle/01-technical-intake-and-handoff.md` and `04-engineering-standards/validation-across-lifecycle.md`.
