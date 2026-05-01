---
id: "hotfix-git-sync-remote-upstream-safety-spec"
action_id: spec
feature_id: hotfix-git-sync-remote-upstream-safety
title: "Especificación hotfix git-sync-remote"
date: "2026-05-01"
status: done
scope: "scripts/skills-rs git_sync_remote, norma git-operations, cápsula, evolution"
acceptance_criteria:
  - "Detección de upstream vía git rev-parse --abbrev-ref @{u}"
  - "Si no hay upstream: git push -u <remote> HEAD antes de pull"
  - "Cualquier fallo devuelve envelope con success false y mensaje explícito"
  - "Norma git-operations.md contiene la Ley de Hierro textual solicitada"
  - "Registro en SddIA/evolution + Evolution_log.md"
---

# Especificación

Comportamiento alineado con proceso **feature** v2.1.0 (hotfix acotado): implementación en `git_sync_remote.rs`, documentación de cápsula, norma nueva bajo `SddIA/norms/`, evolución con impacto Alto por trazabilidad del arsenal Git.
