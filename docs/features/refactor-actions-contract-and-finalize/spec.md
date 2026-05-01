---
id: refactor-actions-contract-and-finalize-spec
action_id: spec
feature_id: refactor-actions-contract-and-finalize
title: Especificación — contrato de acciones y finalize-process
date: "2026-05-01"
status: draft
scope: SddIA/actions; procesos; agentes; difusión Cursor
acceptance_criteria:
  - actions-contract.md proscribe ejecución directa OS/scripts en acciones; impone orquestación vía skills/tools Cúmulo
  - Acción finalize-process sustituye finalize en índices y referencias; sin implementation_script_ref a Invoke-Finalize.ps1 como vía canónica
  - Proceso feature y demás procesos listan finalize-process en related_actions / fase 8
---

# Especificación técnica

## Contexto

Hoy `actions-contract.md` define la estructura de carpetas pero no fija la **jurisdicción** de las acciones respecto a la Ley COMANDOS. La acción `finalize` mezcla en su spec referencias a `Invoke-Finalize.ps1` y a `cargo run`, lo que contradice el principio de que el agente no ejecuta el SO directamente y de que la orquestación debe ser explícitamente skill/tool.

## Requisitos funcionales

### R1 — Contrato de acciones (norma innegociable)

En `SddIA/actions/actions-contract.md`:

1. Añadir sección **Orquestación (Ley COMANDOS)** estableciendo que:
   - Una acción **no** invoca binarios del SO, shells ni scripts (`.ps1`, `.bat`, `.cmd`, etc.) como **mecanismo normativo** de cumplimiento.
   - La acción **solo** describe **qué** skills o tools del Cúmulo (`paths.skillCapsules`, `paths.toolCapsules`, definiciones en `paths.skillsDefinitionPath` / `paths.toolsDefinitionPath`) deben invocarse y en **qué orden**.
   - Cualquier script en `scripts/` queda como **implementación auxiliar no canónica** o se elimina de la spec de la acción (según plan de saneamiento).

2. Mantener la tabla de artefactos; alinear con norma de frontmatter (un `.md` por acción en documentación de tarea; `spec.json` en acciones puede coexistir hasta otra migración — no expandir alcance).

### R2 — Metamorfosis finalize → finalize-process

1. **Identificador:** `action_id` pasará de `finalize` a `finalize-process` (kebab-case permitido por lista en contrato; si el contrato restringe lista cerrada, actualizar la lista en el mismo cambio).
2. **Carpeta:** `SddIA/actions/finalize/` → `SddIA/actions/finalize-process/` (mover/renombrar contenido).
3. **Triggers semánticos:** documentar disparadores en términos de *proceso finalizado*, *tarea finalizada*, *cierre de ciclo* (no “commit” como trigger primario).
4. **Eliminar ejecución directa:** retirar del spec canónico:
   - `implementation_script_ref` apuntando a `Invoke-Finalize.ps1`.
   - Pasos que ordenen `cargo run` o comandos literales; sustituir por “invocar skill X según cápsula” (p. ej. `git-sync-remote`, `git-create-pr`).
5. **PR destino:** donde hoy diga `master`, alinear con rama por defecto del repo (`main`) o redactar en términos de “rama base configurada” para no desalinear con el remoto.

### R3 — Saneamiento de referencias

Inventariar y actualizar:

- `SddIA/process/**` (feature, bug-fix, refactorization, etc.): `related_actions`, tablas de fases, menciones en texto.
- `SddIA/agents/*.json` y subcarpetas: referencias a `finalize`.
- `SddIA/norms/**` (p. ej. `features-documentation-frontmatter.md`, `interaction-triggers.md`, `commands-via-skills-or-tools.md` si aplica).
- `.cursor/rules/**` (action-suggestions, process-suggestions, sddia-ssot).
- `AGENTS.md` / `AGENTS.norms.md` si listan acciones.
- Cualquier `paths.actionsPath/finalize` en docs de features históricas: **no** reescribir historia salvo enlaces rotos críticos; priorizar SSOT y procesos activos.

## Criterios de aceptación (verificación)

| ID | Verificación |
|----|----------------|
| A1 | `grep`/búsqueda en `SddIA/process` y `SddIA/agents`: cero referencias a `action_id: finalize` o carpeta `actions/finalize` como activa |
| A2 | `finalize-process/spec.md` no contiene `Invoke-Finalize.ps1` ni `implementation_script_ref` a scripts |
| A3 | `actions-contract.md` incluye la norma de orquestación skills/tools explícita |

## Riesgos

- **Enlaces externos** a documentación antigua con ancla `finalize`: mitigar con nota de redirección en README de actions si existe.
- **Herramientas CI** que validen lista de acciones: actualizar contrato/lista si hay validación automática.

## Dependencias

- Cúmulo `paths.actionsPath`, `paths.skillCapsules`.
- Proceso feature v2.1.0 (`SddIA/process/feature/spec.md`) para alinear `related_actions`.
