---
id: TASK-20260414-001
title: Fix duplicate html tags in layout
status: pending
created: 2026-04-14
---
# Kaizen: Fix duplicate html tags in layout

## Criterios
1. Refactorizar `src/app/[locale]/layout.tsx` para eliminar las etiquetas `<html>` y `<body>`.
2. Remover providers redundantes en `src/app/[locale]/layout.tsx` que ya están en `src/app/layout.tsx`.
3. Mantener `NextIntlClientProvider` en el root layout o el locale layout según corresponda.
