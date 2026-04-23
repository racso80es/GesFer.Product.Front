---
id: impl-2026-04-23-01
action_id: correccion-auditorias-ts
feature_id: correccion-auditorias-ts
title: "Implementación"
status: DONE
---

# Implementación

La implementación consistió puramente en crear el archivo de definición de tipos globales:
- `src/global.d.ts`: se añadió el contenido `import '@testing-library/jest-dom';`. Esto extiende implícitamente los matchers de Jest y resuelve los errores de compilación (`Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'`).
