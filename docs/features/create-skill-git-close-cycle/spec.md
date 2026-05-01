---
id: "create-skill-git-close-cycle-spec"
action_id: spec
feature_id: create-skill-git-close-cycle
title: "Especificación — git-close-cycle y finalize-process"
date: "2026-05-01"
status: in_progress
---

# Especificación

## Hito 1 — Skill `git-close-cycle`

| Aspecto | Detalle |
|--------|---------|
| **Identificador** | `git-close-cycle` |
| **Contrato** | Envelope JSON v2 (`entity_kind`: skill, `entity_id`: git-close-cycle) |
| **Entrada `request`** | `target_branch` (string, requerido): rama local a eliminar tras el cierre. `remote` (string, opcional, default `origin`). |
| **Resolución rama base** | `git symbolic-ref refs/remotes/<remote>/HEAD` si existe; si no, `main` si `rev-parse --verify main` ok; si no, `master`. |
| **Secuencia Git** | 1) `checkout` rama base. 2) `pull <remote> HEAD` (actualiza la rama seguida por HEAD del remoto). 3) `fetch --prune <remote>`. 4) `branch -d <target_branch>`; si falla, `branch -D <target_branch>`. |
| **Seguridad** | Rechazar si `target_branch` coincide con la rama base resuelta o está vacío. |
| **Artefactos** | `SddIA/skills/git-close-cycle/spec.md`, `paths.skillCapsules.git-close-cycle`, bin `git_close_cycle`, entrada en `cumulo.paths.json`, índice `scripts/skills/index.json`. |

## Hito 2 — Acción `finalize-process`

- En la orquestación documentada, tras **`git-create-pr`**, el **paso final** para cierre completo del ciclo local (cuando la fusión en remoto ya está hecha) es invocar **`git-close-cycle`** con `target_branch` igual al **nombre de la rama de trabajo** (`feat/` / `fix/`) capturado al inicio del cierre (p. ej. vía `git-workspace-recon` o registro en `finalize-process.md`).
- Si el PR **aún no** está fusionado, la eliminación con `-d` puede fallar: el ejecutor debe aplicar la skill solo cuando corresponda el post-merge o aceptar el resultado del envelope.
