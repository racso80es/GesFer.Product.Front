---
id: "create-skill-git-close-cycle-implementation"
action_id: implementation
feature_id: create-skill-git-close-cycle
title: "Touchpoints — git-close-cycle"
date: "2026-05-01"
status: in_progress
---

# Implementación (touchpoints)

| Ruta | Cambio |
|------|--------|
| `SddIA/skills/git-close-cycle/spec.md` | Nueva definición YAML + cuerpo |
| `SddIA/agents/cumulo.paths.json` | `skillCapsules.git-close-cycle` |
| `scripts/skills-rs/Cargo.toml` | `[[bin]] git_close_cycle` |
| `scripts/skills-rs/src/bin/git_close_cycle.rs` | Lógica envelope v2 + Git |
| `scripts/skills/git-close-cycle/*` | Cápsula (manifest, bat, md) |
| `scripts/skills/index.json` | Entrada skill |
| `SddIA/actions/finalize-process/spec.md` | Paso **git-close-cycle** |
| `SddIA/norms/interaction-triggers.md` | Fila tabla #Skill |
| `.cursor/rules/skill-suggestions.mdc` | Fila tabla |
| `SddIA/evolution/<uuid>.md` + `Evolution_log.md` | Registro alta/modificación catálogo |

**Compilación:** desde entorno autorizado, desplegar `git_close_cycle.exe` en `scripts/skills/git-close-cycle/bin/` vía `scripts/skills-rs/install.ps1` o pipeline del proyecto.
