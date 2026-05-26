---
id: "correccion-auditorias-2026_05_26_01"
title: "Corrección de Auditoría Frontend 2026_05_26_01"
type: "Kaizen"
status: "active"
created_at: "2026-05-26"
---

# Objetivos de Resolución de Auditoría

1. Reemplazar todos los usos de `console.warn` y `console.error` por el logger centralizado.
2. Corregir importaciones relativas profundas (`../../`) en los tests, sustituyéndolas por rutas absolutas (`@/`).
3. Analizar la situación de uso del tipo `any` en `expect.any()` en `src/__tests__/lib/api/client.test.ts`.
