---
id: stabilidad-front-api-back-implementation
action_id: implementation
feature_id: stabilidad-front-api-back
title: "Touchpoints de implementación"
date: "2026-03-26"
status: done
touchpoints:
  - path: "src/lib/api/product-api.ts"
    change: "Fusión de cabeceras en request; get/post/put/delete aceptan RequestInit opcional."
  - path: "src/app/api/my-company/route.ts"
    change: "Reenvío Authorization; respuesta 401 sin log error genérico."
  - path: "src/app/my-company/page.tsx"
    change: "Bearer desde localStorage en fetch al BFF."
  - path: "src/jest.config.js"
    change: "modulePathIgnorePatterns para .next/ (haste-map)."
items:
  - id: STB-FRONT-001
    status: resolved
---

# Implementación (código)

Cambios aplicados para alinear el BFF con el backend autenticado y limpiar ruido en build/tests.
