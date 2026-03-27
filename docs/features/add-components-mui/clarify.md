---
title: Clarify
description: Clarifications and decisions (e.g. Next.js App router specifics)
date: "2024-03-27"
---

# Clarification

## Decisiones Técnicas

- **Next.js App Router (v14):** Se empleará el wrapper de `@mui/material-nextjs` (v14 o v15) mediante el `AppRouterCacheProvider` para renderizado en servidor y cliente sin flicker de CSS.
- **Tipado Fuerte:** Evitar `any`. Se extenderán los `ButtonProps` de MUI explícitamente y se utilizarán interfaces para las props del `CustomButton`.
- **Carga de Fuente:** Para rendimiento y validación de Next, se utilizará el módulo `next/font/google` importando y configurando explícitamente la fuente Roboto dentro de `layout.tsx`.
- **Conflictos CSS Tailwind y MUI:** Tailwind CSS Baseline interfiere con MUI CssBaseline. Se encapsulará el CssBaseline de MUI en una capa CSS custom `@layer mui` al final de `globals.css` (o al inicio según aplique para prioridades correctas). En este caso el plan de ejecución y memorias determinan que debe aislarse el baseline de MUI en un `@layer mui { .MuiCssBaseline-root {} }` en `globals.css`.