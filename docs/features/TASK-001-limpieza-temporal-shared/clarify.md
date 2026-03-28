---
title: Clarifications for TASK-001
type: clarify
---
**Clarification:** Based on memory, the project architecture is decoupled from the GesFer monolith. Components reside locally in `src/components/` and `src/lib/`, without using `@shared/` aliases. Thus, we only remove the TemporalShared reference without restoring `@shared/`.
