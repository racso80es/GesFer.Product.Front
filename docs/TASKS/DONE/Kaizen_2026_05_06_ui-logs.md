---
title: "Sustitución de console.warn/error por logger en componentes UI"
status: "pending"
created: "2026-05-06"
---
# Sustitución de console.warn/error por logger en componentes UI

## Objetivo
Cumplir con la norma de arquitectura frontend: "En componentes UI, evitar el uso de console.warn o console.error nativos. Utilizar el logger centralizado de @/lib/logger para asegurar que todos los warnings y errores de la UI sean capturados adecuadamente por el sistema de telemetría y el sistema de logging por lotes."

## Archivos a modificar:
- src/components/auth/protected-route.tsx
- src/components/layout/admin-layout.tsx
- src/components/layout/main-layout.tsx
- src/components/shared/DestructiveActionConfirm.tsx
- src/components/ui/dialog.tsx
- src/components/ui/overlay-fix.tsx

## Acciones:
1. Importar logger desde '@/lib/logger'.
2. Sustituir `console.warn(...)` por `logger.warn(...)`.
3. Sustituir `console.error(...)` por `logger.error(...)`.
