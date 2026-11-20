---
title: "Standard: Client Constraints and Enterprise Access"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/01-technical-intake-and-handoff.md"
  - "../03-delivery-lifecycle/12-retirement-and-client-exit.md"
  - "./security-and-privacy-engineering.md"
  - "../../11-project-delivery-and-client-service/README.md"
  - "../../12-legal-security-and-risk-management/README.md"
---

# Standard: Client Constraints and Enterprise Access

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When It Applies

- **Applies to:** Projects where engineering development must occur inside client-controlled infrastructure, client enterprise cloud tenants, corporate VPN networks, client-managed version control, or client-issued virtual desktops.
- **What Does NOT Apply:** Projects hosted entirely on agency-provisioned and managed cloud infrastructure (governed by `cloud-and-platform-engineering.md`).

---

## 2. Must (Mandatory Minimum)

> *Status: [Pending Founder Decision]*
> 
> *The following subtopics represent candidate technical areas to research and evaluate. They do not constitute approved mandatory rules.*

- [ ] **Enterprise Access Protocols:** Accessing client environments via corporate VPNs, Zero Trust Network Access (ZTNA), bastion jump hosts, or Virtual Desktop Infrastructure (VDI; candidate examples: AWS WorkSpaces, Citrix, Microsoft Dev Box).
- [ ] **Package Registry & Proxy Constraints:** Configuring package managers (npm, pip, cargo) to resolve dependencies through client corporate artifact proxies (candidate examples: Artifactory, Nexus) and handling corporate SSL inspection certificate authorities.
- [ ] **Client-Managed Source Repositories:** Integrating with client-hosted enterprise Git servers (GitHub Enterprise Server, GitLab Self-Managed, Azure DevOps Server) with enforced MFA, branch protections, and commit signing.
- [ ] **Enterprise Secret Management:** Retrieving development and runtime credentials strictly from client-approved enterprise vaults (candidate tools: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) without storing static secrets in agency local environments.
- [ ] **Least Privilege & Role-Based Access (RBAC):** Requesting scoped IAM roles and temporary credentials rather than persistent administrator privileges within client cloud tenancies.
- [ ] **Clean Offboarding & Access Revocation:** Formally inventorying all client access tokens, accounts, SSH keys, and enterprise logins to verify complete surrender and revocation upon contract completion.

---

## 3. Should (Recommended Practice & Judgment)

- How much onboarding delay typically occurs when enterprise clients require background checks and hardware provisioning, and how should this be factored into project milestones?
- What is the agency policy if a client mandates installing invasive monitoring agent software (bossware/MDM) on personal or agency-owned laptops?
- How should code reviews and CI/CD pipelines be handled when client network firewalls prevent agency automated tools from reaching their repositories?

---

## 4. Common Failure Modes

- **Silent Deployment Blockers:** Assuming public npm or Docker Hub registries will be accessible, only to discover enterprise firewall blocks on the first deployment day.
- **Forgotten Agency Credentials:** Leaving agency developer SSH keys or personal personal access tokens (PATs) active in client GitHub organizations after project completion.
- **Unverified Root IAM Usage:** Accepting client-provided root or global administrator cloud credentials rather than demanding scoped IAM roles.

---

## 5. Evidence That It's Done

- [ ] Client environment access checklist completed during project intake.
- [ ] Dependency installation verified through client proxy without SSL verification bypass flags.
- [ ] Complete IAM credential revocation checklist signed off by both client and agency upon project handover.

---

## 6. Template

- `None yet`

---

## 7. Boundaries & Handoffs

- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Accounts for client access provisioning lead times (often 2–4 weeks in enterprise organizations) in sprint planning and kickoff schedules.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews enterprise master services agreements (MSAs), security addenda, data processing agreements (DPAs), and device policy requirements.
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Vets enterprise IT requirements during pre-sales discovery to price administrative overhead accordingly.
- **Development & Engineering:** Follows enterprise security rules, configures proxy-aware dev tools, and safely operates inside client environments.

---

## 8. Open Decisions & Candidate Evidence

- **Open Decision IDs:**
  - `ENG-Q05`: Legacy liability baseline and client access governance.
- **Related Documents:**
  - [`../03-delivery-lifecycle/01-technical-intake-and-handoff.md`](../03-delivery-lifecycle/01-technical-intake-and-handoff.md): Intake requirements and environmental constraints.
  - [`../03-delivery-lifecycle/12-retirement-and-client-exit.md`](../03-delivery-lifecycle/12-retirement-and-client-exit.md): Safe offboarding and credential revocation.
- **Candidate Evidence (candidate example, not a decision):**
  - NIST: *SP 800-207 Zero Trust Architecture* (`csrc.nist.gov/pubs/sp/800/207/final`).
  - ISO/IEC: *ISO/IEC 27001:2022 Control 8.2 Privileged access rights*.
