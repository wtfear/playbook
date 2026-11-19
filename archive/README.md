---
title: "Archive and Deprecated Documents Overview"
document_type: reference
category: "13-knowledge-systems-and-automation"
status: proposed
owner: null
last_reviewed: null
related_documents:
  - "../README.md"
  - "../structure-guide.md"
---

# Archive and Deprecated Documents

This directory houses superseded, retired, or obsolete documents across the agency knowledge base.

## Purpose

As the agency grows, policies, workflows, tools, and technical architectures will evolve. We preserve older versions of documentation rather than silently deleting them to maintain organizational memory, provide audit history, and explain why past approaches were modified.

## Archival Rules

1. **Explicit Deprecation:** Any document moved to this directory must have its frontmatter updated to:
   ```yaml
   status: superseded
   ```
2. **Tombstone Banner:** A clear note must be added at the top of the archived document:
   > **SUPERSEDED:** This document was retired on YYYY-MM-DD. It is retained for historical reference only. For the current active standard, see `[path/to/active-document.md]`.
3. **Cross-Link Integrity:** Before moving a file into `archive/`, check all referencing documents to update links to the replacement document or to note that the link points to an archived reference.
4. **Naming Pattern:** Retain the original filename, optionally prepending the retirement year if filename conflicts arise (e.g., `archive/2026-old-deploy-workflow.md`).
