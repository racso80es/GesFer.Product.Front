---
title: "Especificación Técnica: Corrección de Auditoría 2026-05-13"
date: "2026-05-13"
status: "in-progress"
---

# Implementación de Acciones Kaizen

1. **Reemplazo de `console.*`**:
   Archivos afectados:
   - `src/lib/api/auth.ts`: Reemplazar `console.error` por `logger.error`.
   - `src/lib/utils/client-init.ts`: Reemplazar `console.error`, `console.warn` y `console.info` por sus equivalentes en `logger`. Importar `logger` desde `@/lib/logger`.
   - `src/lib/config.ts`: Reemplazar `console.warn` por `logger.warn`. Importar `logger` desde `@/lib/logger`.
   - `src/lib/providers/query-provider.tsx`: Reemplazar `console.warn` por `logger.warn`. Importar `logger` desde `@/lib/logger`.

2. **Eliminar `test.skip()`**:
   - `src/tests/e2e/logs.spec.ts`: En la prueba `debe expandir y mostrar detalles de un log`, eliminar el bloque condicional que llama a `test.skip()` cuando `logsCount === 0`.
