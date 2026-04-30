---
id: plan-correccion-auditorias-2026-04-30
title: "Plan de corrección de auditorías del 2026-04-30"
status: active
---

# Plan

1. Modificar `src/lib/logger/server.ts` para eliminar la aserción de tipo `as any` en la configuración de la opción de transporte de Pino.
2. Reemplazarla con `as Record<string, unknown>`.
3. Ejecutar las comprobaciones para verificar que no haya regresiones y se mantenga la integridad.
