---
id: clarify-2026-04-23-01
action_id: correccion-auditorias-ts
feature_id: correccion-auditorias-ts
title: "Clarificación de la Resolución de TS"
status: DONE
---

# Clarificación

Se confirmó mediante pruebas manuales y lectura de `tsconfig.json` que el compilador captura los archivos con extensión `.ts`. Crear un archivo global con la importación `@testing-library/jest-dom` inyecta las definiciones de tipos globales de Jest de forma eficiente, permitiendo que la verificación estricta los reconozca en todas las pruebas.
