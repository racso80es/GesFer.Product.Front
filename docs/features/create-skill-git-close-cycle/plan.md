---
id: "create-skill-git-close-cycle-plan"
action_id: planning
feature_id: create-skill-git-close-cycle
title: "Plan — implementación git-close-cycle"
date: "2026-05-01"
status: in_progress
---

# Plan

1. Aislar en rama `feat/create-skill-git-close-cycle` (skill **git-branch-manager**, wrapper `.tekton_request.json` según norma Tekton).
2. Añadir definición `SddIA/skills/git-close-cycle/spec.md` y registrar `git-close-cycle` en `SddIA/agents/cumulo.paths.json` → `skillCapsules`.
3. Implementar `scripts/skills-rs/src/bin/git_close_cycle.rs` (patrón `git_sync_remote`), declarar `[[bin]]` en `Cargo.toml`.
4. Crear cápsula `scripts/skills/git-close-cycle/` (manifest, bat, doc) y entrada en `scripts/skills/index.json`.
5. Actualizar `SddIA/actions/finalize-process/spec.md` (frontmatter + cuerpo): orquestación incluye **git-close-cycle** como paso final condicionado a post-merge.
6. Difundir listado `#Skill`: `SddIA/norms/interaction-triggers.md`, `.cursor/rules/skill-suggestions.mdc`.
7. Registro evolución SddIA (`sddia-evolution-register`) + **git-save-snapshot** adicional; cierre: **git-sync-remote**, **git-create-pr** (invocación solo vía cápsulas / `.tekton_request.json`).
