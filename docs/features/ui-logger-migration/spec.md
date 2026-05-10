---
name: ui-logger-migration
type: feature
status: planning
---
# Especificaciones: ui-logger-migration

## Modificaciones de Código
- src/components/auth/protected-route.tsx
- src/components/layout/admin-layout.tsx
- src/components/layout/main-layout.tsx
- src/components/shared/DestructiveActionConfirm.tsx
- src/components/ui/dialog.tsx
- src/components/ui/overlay-fix.tsx

En todos estos archivos, importar `logger` desde `@/lib/logger` e invocar `logger.warn` y `logger.error` en lugar de `console.warn` y `console.error`.
