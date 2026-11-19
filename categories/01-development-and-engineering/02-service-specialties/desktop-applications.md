---
title: "Specialty: Desktop Applications"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../04-engineering-standards/security-and-privacy-engineering.md"
  - "../../05-sales/README.md"
---

# Specialty: Desktop Applications

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to client projects requiring cross-platform or native desktop software (Windows, macOS, Linux) built using frameworks such as Tauri, Electron, or Flutter Desktop. Activated only upon explicit commercial demand. *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Cryptographic Code Signing & Notarization:** All production binaries must be cryptographically signed using valid commercial certificates (Apple Developer ID for macOS notarization; Microsoft EV / Azure Trusted Signing certificate for Windows SmartScreen trust) to prevent operating system security blocks and scary warnings.
- **Secure Packaging & Installers:** Build deterministic platform installers (`.dmg` / `.pkg` for macOS, `.msi` / NSIS `.exe` for Windows, `.deb` / `.AppImage` for Linux) generated exclusively in clean automated CI runners.
- **Hardened Auto-Update Mechanism:** Desktop update pipelines (e.g., Tauri updater, electron-updater) must enforce HTTPS and verify cryptographic signature digests for every downloaded release manifest before applying updates.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Tauri over Electron for Lightweight Utility:** Default to Tauri (Rust + Webview) for smaller binary footprints, reduced memory consumption, and tighter OS security, reserving Electron for apps requiring deep Chromium legacy engine parity.
- **Client Ownership of Signing Certificates:** Code signing certificates (especially expensive Windows EV and Apple Developer accounts) must be purchased and registered under the client organization's legal name.
- **Crash Reporting & Telemetry:** Integrate privacy-respecting native crash reporting (e.g., Sentry Native) to capture unhandled segfaults and operating system thread panics without collecting sensitive client documents.
- **Small-Team Practicality:** Avoid custom native C++ GUI code; leverage web-technology desktop wrappers to reuse frontend component libraries across web and desktop deliverables.

---

## 4. Common Failure Modes
- **SmartScreen / Gatekeeper Blockades:** Distributing unsigned binaries that trigger Windows Defender SmartScreen blocks or macOS Gatekeeper quarantines, destroying user adoption.
- **Broken Auto-Update Traps:** Pushing a corrupted update or mismatched manifest that leaves user installations permanently broken without a manual website re-download.
- **Leaked Code Signing Certificates:** Committing private signing keys or password-unprotected `.p12` certificates into version control.
- **Resource Hogging:** Building an Electron app that consumes 1.5 GB of RAM for simple text processing, prompting client complaints about performance.

---

## 5. Evidence that it's done (Checklist)
- [ ] Code signing certificates verified and stored securely in CI secrets vault.
- [ ] Automated CI workflow builds and signs macOS, Windows, and Linux installers.
- [ ] macOS build passes Apple `xcrun notarytool` notarization and stapling.
- [ ] In-app auto-update flow verified end-to-end in staging test sandbox.
- [ ] Native crash reporter active and verified with simulated fault test.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Section 0.7 Architecture & Binary Distribution.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Scoping must budget upfront costs for commercial code signing certificates (\$300–\$500/year for Windows EV certificates) into project commercial estimates.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Verifies client corporate legal entity verification required by certificate authorities (DigiCert, Sectigo).
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates multi-platform beta testing across client operating systems.

---

## 8. Open Decisions
- Should Tauri be designated as the agency's primary recommended desktop framework over Electron?
- What cloud signing service (e.g., Azure Trusted Signing vs. AWS CloudHSM) provides the most cost-effective solution for Windows code signing?
