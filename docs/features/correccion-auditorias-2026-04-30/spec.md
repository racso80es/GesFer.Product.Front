---
id: spec-correccion-auditorias-2026-04-30
title: "Especificación de corrección de auditorías del 2026-04-30"
status: active
---

# Especificación

- Modificar la línea 33 de `src/lib/logger/server.ts` de `} as any,` a `} as Record<string, unknown>,` o un tipo más específico proporcionado por `pino` (como `pino.TransportTargetOptions`).
