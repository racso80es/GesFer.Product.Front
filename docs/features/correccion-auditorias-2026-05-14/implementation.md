---
title: "Implementación: Corrección de Auditoría 2026-05-14"
date: "2026-05-14"
status: "completed"
---
# Implementación

Se realizaron los siguientes cambios:
1. Reemplazadas las rutas `../../../` por `@/` en `ModalBase.test.tsx` y `table.test.tsx`.
2. Reemplazados los usos de `console.error` y `console.warn` por `logger.error` y `logger.warn` respectivamente, añadiendo la importación del logger en los archivos:
   - `src/middleware.ts`
   - `src/contexts/auth-context.tsx`
   - `src/auth.ts`
   - `src/lib/api/auth.ts`
   - `src/lib/utils/client-init.ts`
3. Modificado el `test.skip()` en `src/tests/e2e/logs.spec.ts` para documentar la razón del skip: `test.skip(true, 'No logs available to test expansion');`.
