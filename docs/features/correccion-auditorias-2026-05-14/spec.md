---
title: "Especificación Técnica: Corrección de Auditoría 2026-05-14"
date: "2026-05-14"
status: "draft"
---
# Especificación

1. Archivos a modificar para rutas relativas:
   - `src/__tests__/components/shared/ModalBase.test.tsx`
   - `src/__tests__/components/ui/table.test.tsx`

2. Archivos a modificar para `console.error` (usar `import logger from '@/lib/logger'`):
   - `src/middleware.ts`
   - `src/contexts/auth-context.tsx`
   - `src/auth.ts`
   - `src/lib/api/auth.ts`
   - `src/lib/utils/client-init.ts`

3. Archivos a modificar para `test.skip()`:
   - `src/tests/e2e/logs.spec.ts`
