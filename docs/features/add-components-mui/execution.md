---
title: Execution
description: Record of items implemented during execution phase
date: "2024-03-27"
---

# Ejecución

- Se instalaron las dependencias base de Material UI y Emotion junto con la compatibilidad para Next.js App Router.
- Se ha creado y configurado el tema en `src/theme/theme.ts`.
- Se ha incluido `AppRouterCacheProvider`, `ThemeProvider` y `CssBaseline` en `src/app/[locale]/layout.tsx`.
- Se configuró la fuente `Roboto` en `src/app/[locale]/layout.tsx` a través de `next/font/google`.
- Se configuró el aislamiento de la línea base CSS de MUI a través de la capa `@layer mui` en `src/app/globals.css`.
- Se creó el componente `CustomButton` en `src/components/common/CustomButton.tsx` para demostrar extensibilidad y tipado fuerte.