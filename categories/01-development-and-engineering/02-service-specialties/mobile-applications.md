---
title: "Specialty: Mobile Applications"
document_type: reference
category: "01-development-and-engineering"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "./README.md"
  - "../03-delivery-lifecycle/README.md"
  - "../04-engineering-standards/ux-ui-and-accessibility.md"
  - "../04-engineering-standards/ci-cd-and-release-engineering.md"
  - "../../05-sales/README.md"
---

# Specialty: Mobile Applications

> [!NOTE]
> **Candidate Practice / Proposed Scaffolding:** This document contains candidate material for research and evaluation. It does not constitute approved agency policy, mandatory instruction, or contractual commitment until formally reviewed and marked with `status: approved`.

---

## 1. When it applies
Applies to iOS and Android applications developed for clients, cross-platform mobile frameworks (e.g., React Native, Flutter), and Progressive Web Apps (PWAs). *(Specialty status: proposed & unconfirmed).*

---

## 2. Must (Mandatory Minimum)
> *Status: [TBD / Pending Approval]*
>
> *(Proposed mandatory baseline requirements subject to founder approval).*

- **Signing Keys & Secrets Custody:** Production signing keystores (`.jks`), Apple Distribution Certificates, and provisioning profiles must be generated within the client's Apple Developer and Google Play Console accounts. Signing secrets must be stored securely in encrypted CI secrets vaults (e.g., Fastlane Match, GitHub Secrets) and never committed to version control.
- **App Store Review Compliance:** Designs and workflows must comply with Apple App Store Review Guidelines and Google Play Developer Policies (e.g., in-app purchase requirements, account deletion workflows, privacy nutrition labels) before submitting release builds.
- **Push Notification Token Hygiene:** Push notification pipelines (APNs, FCM) must handle device token updates, invalidation, and user opt-in permissions gracefully without spamming devices.
- **Offline Behavior & Network Resilience:** Mobile apps must handle intermittent network loss gracefully (e.g., displaying offline status banners, local caching, and queuing mutations locally) without crashing or corrupting client state.

---

## 3. Should (Recommended Practice & Judgment Guidance)
- **Automated CI/CD Delivery Pipeline:** Automate test builds, code signing, and distribution to beta channels (Apple TestFlight, Google Play Internal Testing) using tools like Fastlane or EAS.
- **Cross-Platform vs. Native Selection:** Default to cross-platform frameworks (e.g., React Native / Expo or Flutter) for startup clients to maintain a single codebase, unless deep native hardware integration (low-level Bluetooth, custom AR/metal rendering) dictates native Swift/Kotlin.
- **Deep Linking & Universal Links:** Configure universal links (`apple-app-site-association` and `assetlinks.json`) early to ensure seamless transitions between web and mobile experiences.
- **Small-Team Simplicity:** Avoid maintaining separate native Android and iOS teams for early-stage clients; use managed cross-platform toolchains (e.g., Expo) to maximize developer velocity.

---

## 4. Common Failure Modes
- **App Store Rejection Surprises:** Submitting an app containing account creation without an in-app "Delete Account" button, resulting in immediate Apple rejection and milestone delays.
- **Lost Keystores & Signing Keys:** Storing the Google Play upload key or iOS distribution certificate on a single contractor's laptop; when they leave, updating the app on the store becomes impossible.
- **Cold-Start Network Crashes:** Launching the app while offline or on airplane mode causing unhandled promise rejections that crash the application on startup.
- **Unmanaged Push Token Churn:** Repeatedly sending push notifications to expired or uninstalled tokens, triggering rate limits or blacklisting from Apple APNs / Firebase.

---

## 5. Evidence that it's done (Checklist)
- [ ] Client-owned Apple Developer and Google Play Console accounts confirmed.
- [ ] Automated Fastlane / CI build pipeline producing signed `.ipa` and `.aab` artifacts.
- [ ] Apple Privacy Nutrition Labels and Google Data Safety forms completed.
- [ ] Offline flight-mode tests confirm app displays appropriate error banners without crashing.
- [ ] TestFlight and Google Play Internal tracks verified by client stakeholders.

---

## 6. Template
- [`../../../templates/engineering-topic-template.md`](../../../templates/engineering-topic-template.md): Standard Topic Template.
- [`../../../templates/foundation-document-template.md`](../../../templates/foundation-document-template.md): Mobile Delivery Requirements.

---

## 7. Handoffs & Cross-Category Boundaries
- **Sales ([`../../05-sales/README.md`](../../05-sales/README.md)):** Scoping must budget mandatory client app store review buffers (typically 1–2 weeks) into milestone delivery timelines.
- **Project Delivery ([`../../11-project-delivery-and-client-service/README.md`](../../11-project-delivery-and-client-service/README.md)):** Coordinates client beta testing invites via TestFlight / Google Play Console.
- **Legal, Security & Risk ([`../../12-legal-security-and-risk-management/README.md`](../../12-legal-security-and-risk-management/README.md)):** Reviews app store privacy disclosure forms and in-app terms of service.

---

## 8. Open Decisions
- Should the agency standardize exclusively on React Native / Expo as the default cross-platform mobile offering?
- Who pays the annual \$99 Apple Developer and \$25 Google Play registration fees (firm policy: strictly client-owned)?
