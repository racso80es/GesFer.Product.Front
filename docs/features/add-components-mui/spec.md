---
title: Spec
description: Technical specification for adding MUI components
date: "2024-03-27"
---

# Especificación Técnica

## Tarea: Add Components MUI (TASK-001)

### Dependencias

Instalar vía npm en `src/`:
- `@mui/material`
- `@emotion/react`
- `@emotion/styled`
- `@mui/icons-material`
- `@mui/material-nextjs`

### Archivos

- `src/theme/theme.ts`: Definición de tema base fuertemente tipado mediante `createTheme`.
- `src/app/[locale]/layout.tsx`: Integración de `AppRouterCacheProvider` y `ThemeProvider`. Incorporación de la fuente `Roboto` usando `next/font/google`.
- `src/app/globals.css`: Modificación del archivo para encapsular `.MuiCssBaseline-root` en una capa `@layer mui {}` para resolver problemas de prioridad con Tailwind.
- `src/components/common/CustomButton.tsx`: Nuevo componente base extendiendo `Button` de MUI, utilizando interfaces TypeScript, sin dependencias o estilos conflictivos inline.