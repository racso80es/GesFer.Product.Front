---
id: refactor-actions-contract-and-finalize-implementation
action_id: implementation
feature_id: refactor-actions-contract-and-finalize
title: Touchpoints de implementación
date: "2026-05-01"
status: draft
touchpoints:
  - path: SddIA/actions/actions-contract.md
    change: Añadir norma de orquestación; actualizar lista action_id si incluye finalize-process
  - path: SddIA/actions/finalize-process/
    change: Nuevo nombre de carpeta; spec sin scripts OS; triggers de cierre
  - path: SddIA/process/feature/spec.md
    change: related_actions y texto fase 8 → finalize-process
  - path: SddIA/process/**/*.md
    change: Referencias cruzadas a finalize
  - path: SddIA/agents/
    change: JSON/MD que citen finalize
  - path: SddIA/norms/
    change: Tablas y listados de acciones
  - path: .cursor/rules/
    change: action-suggestions, sddia-ssot, etc.
  - path: AGENTS.md
    change: Tabla de acciones / proceso si aplica
items:
  - id: IMP-1
    description: Editar actions-contract.md según R1 (SPEC)
  - id: IMP-2
    description: Mover finalize → finalize-process y reescribir spec (R2)
  - id: IMP-3
    description: grep finalize en SddIA y .cursor; sustituir por finalize-process donde corresponda
  - id: IMP-4
    description: Ejecutar sddia_evolution_register tras mutación SddIA; snapshot; PR
---

# Implementación (documento de touchpoints)

## Archivos principales

| Archivo | Acción |
|---------|--------|
| `SddIA/actions/actions-contract.md` | Extender con sección **Orquestación**; prohibir scripts/OS como vía normativa; enumerar que las acciones referencian entityId de skills/tools del Cúmulo. |
| `SddIA/actions/finalize/spec.md` + `spec.json` | **Mover** a `finalize-process/`; actualizar `action_id`; eliminar `implementation_script_ref` y pasos con `Invoke-Finalize.ps1` / `cargo run`; describir secuencia: recon opcional, `git-save-snapshot`, actualización logs producto, `git-sync-remote`, `git-create-pr`, auditoría vía herramientas definidas. |
| `SddIA/process/feature/spec.md` | Sustituir `finalize` por `finalize-process` en `related_actions` y en narrativa de fase 8. |
| Otros `SddIA/process/*/spec.md` | Misma sustitución si listan la acción. |
| `SddIA/norms/features-documentation-frontmatter.md` | Tabla `finalize` → `finalize-process`; fichero `finalize.md` puede renombrarse conceptualmente a `finalize-process.md` en la tabla de artefactos. |
| `.cursor/rules/action-suggestions.mdc` | Listado `#Action`: `finalize-process` con descripción de cierre. |
| `AGENTS.md` | Sección procesos / acciones: alinear nombres. |

## Scripts legacy

- `scripts/actions/finalize/Invoke-Finalize.ps1`: **no** eliminar en esta fase sin auditoría; la acción canónica dejará de **referenciarlo**. Opcional: nota en carpeta `scripts/actions/finalize/README` de “no SSOT” si existe patrón.

## Validación previa a PR

- Búsqueda: `finalize` en `SddIA/actions` (excepto histórico/changelog si se añade), `SddIA/process`, `SddIA/agents`.
- Comprobar que `interaction-triggers.md` (si lista acciones) esté alineado.

## Orden de aplicación recomendado

1. `actions-contract.md`
2. Carpeta `finalize-process` (contenido migrado)
3. Referencias en procesos y agentes
4. Normas y `.cursor/rules`
5. Registro evolución SddIA + PR
