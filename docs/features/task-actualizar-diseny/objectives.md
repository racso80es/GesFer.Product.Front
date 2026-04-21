---
id: "task-actualizar-diseny-objectives"
action_id: objectives
feature_id: task-actualizar-diseny
title: "Objetivos — Actualizar diseño (Fase 1)"
date: "2026-04-21"
status: done
branch: "feat/task-actualizar-diseny-6820873171999042361"
---

# Objetivos — Actualizar diseño (Fase 1)

## Contexto

Se requiere una capa visual consistente y moderna para el frontend, reduciendo variaciones de estilo y acelerando la construcción de pantallas.

## Alcance

- Definir **tokens de diseño** (paleta monocromática, radius, shadows) en `src/app/globals.css` y exponerlos en Tailwind (`src/tailwind.config.ts`).
- Alinear **MUI Theme** a los tokens (`src/theme/theme.ts`) para convivencia estable MUI + Tailwind.
- Introducir componentes UI reutilizables:
  - `SmartInput` (átomo)
  - `AdaptiveDataCard` (componente contenedor reutilizable)
- Aplicar el sistema a pantallas clave: Home pública, Login, My Company.

## Criterio de éxito

- UI consistente en las pantallas adaptadas, sin degradar estados de carga/error.
- `npm run lint` y `npm test` pasan en el repo.
