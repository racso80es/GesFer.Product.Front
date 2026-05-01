---
id: refactor-actions-contract-and-finalize-plan
action_id: planning
feature_id: refactor-actions-contract-and-finalize
title: Plan de implementación
date: "2026-05-01"
status: draft
phases:
  - id: P0
    name: Documentación de tarea (fases 0-5)
    tasks:
      - Recon + rama feat/refactor-actions-contract-and-finalize
      - objectives, spec, plan, implementation en paths.featurePath
  - id: P1
    name: Contrato y rename
    tasks:
      - Editar actions-contract.md (orquestación skills/tools)
      - Renombrar finalize → finalize-process (carpeta, spec.md, spec.json si aplica)
  - id: P2
    name: Referencias
    tasks:
      - Actualizar process/*, agents, norms, .cursor/rules, AGENTS.md
  - id: P3
    name: Validación y cierre S+
    tasks:
      - validacion.md, sddia_evolution_register, snapshots, sync-remote, create-pr
tasks:
  - id: T1
    description: Consolidar contrato actions-contract.md
    phase: P1
  - id: T2
    description: Migrar spec finalize-process y limpiar scripts del contrato normativo
    phase: P1
  - id: T3
    description: Búsqueda global finalize → finalize-process en SddIA y difusión
    phase: P2
---

# Plan

## Orden de trabajo

1. **P0 (hecho en esta entrega):** rama + documentos de tarea en `docs/features/refactor-actions-contract-and-finalize/`.
2. **P1:** Modificar `SddIA/actions/actions-contract.md`. Renombrar `SddIA/actions/finalize` a `finalize-process`; reescribir `spec.md` (y `spec.json` si existe) según SPEC.
3. **P2:** Pasada de referencias en procesos, agentes, normas y reglas Cursor; ajustar tabla de disparadores `#Action` si lista canónica incluye `finalize`.
4. **P3:** Tras cambios en `SddIA/`, ejecutar **sddia_evolution_register**, **git-save-snapshot** adicional, **git-sync-remote**, **git-create-pr** con resumen de validación en el cuerpo del PR.

## Commits sugeridos (atómicos)

- `docs(feature): objetivos y spec/plan/implementation refactor-actions-contract-and-finalize`
- `refactor(sddia): actions-contract orquestación skills/tools`
- `refactor(sddia): finalize → finalize-process`
- `chore(sddia): referencias finalize-process en procesos y agentes`
- `chore(sddia): evolution register + cierre PR` (post validación)

## Rollback

Revertir rama `feat/refactor-actions-contract-and-finalize` antes de merge si el PR no se aprueba; no tocar `main` sin PR.
