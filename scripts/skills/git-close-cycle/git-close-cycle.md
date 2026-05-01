# Cápsula: git-close-cycle

## Rol

Actualizar la rama base local respecto a `origin`, podar referencias remotas y eliminar la rama de trabajo tras integración en remoto.

## Request (JSON)

- `target_branch` (string, requerido)
- `remote` (string, opcional, default `origin`)

## Lanzador

`Git-Close-Cycle.bat` — ejecuta `bin/git_close_cycle.exe` si existe; si no, indicar compilación vía `scripts/skills-rs/install.ps1`.

## Tekton

Invocar con `.tekton_request.json` en la raíz del repo y `scripts/skills/run-capsule-from-tekton-request.ps1` cuando aplique el flujo del proyecto.
