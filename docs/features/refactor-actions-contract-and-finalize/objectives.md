---
id: refactor-actions-contract-and-finalize-objectives
action_id: objectives
feature_id: refactor-actions-contract-and-finalize
title: Refactor contrato de acciones y finalize-process
branch: feat/refactor-actions-contract-and-finalize
date: "2026-05-01"
status: in_progress
ley_aplicada: L1_SSOT (SddIA/docs) — Ley COMANDOS (skills/tools) — proceso feature v2.1.0
scope: SddIA/actions, SddIA/process, agentes y normas que referencien finalize
---

# Objetivos

## Objetivo

Alinear el ecosistema SddIA con un **contrato de acciones** donde las acciones **solo orquestan** skills o tools registradas (Cúmulo), **sin** ejecutar comandos del sistema operativo ni scripts (`.ps1`, `.bat`) como mecanismo de entrega principal. En paralelo, **renombrar** la acción `finalize` a **`finalize-process`**, recortar su alcance a conceptos de cierre de proceso/tarea y **delegar** publicación y PR en la suite Git táctica vía skills, eliminando orquestadores script-based de la definición canónica.

## Alcance

- Actualizar `SddIA/actions/actions-contract.md` con la norma innegociable de orquestación (skills/tools únicamente).
- Renombrar carpeta y artefactos de acción `finalize` → `finalize-process`; ajustar triggers y flujo en `spec.md` (frontmatter + cuerpo).
- Rastrear `paths.processPath`, definiciones en `SddIA/agents`, `SddIA/norms`, `.cursor/rules` y demás consumidores que citen `finalize` y apuntarlos a `finalize-process`.
- Mantener coherencia con documentación de tarea (frontmatter) y con el proceso **feature** (`related_actions`, fase 8).

## No objetivos (fase actual)

- Rediseñar la suite Git táctica ni el binario `sddia_evolution_register` (solo referencias documentales y contrato de acción).
- Cambiar el comportamiento runtime de scripts legacy hasta que el plan de migración en `implementation.md` lo marque explícito.

## Criterio de éxito

- Ninguna acción canónica describe como paso obligatorio la invocación directa de `.ps1`/`.bat` del SO; las macro-operaciones Git se expresan como invocación de **skills** registradas.
- No queden referencias obsoletas a `paths.actionsPath/finalize` o al `action_id` `finalize` en procesos y agentes, salvo notas históricas acotadas si el plan las autoriza.
