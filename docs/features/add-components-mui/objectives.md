---
title: Objectives
description: Objective, scope, applied laws for adding MUI components
date: "2024-03-27"
---

# Objectives

## Objetivo

Instalar y configurar el sistema de diseño Material UI (MUI) v5 en el proyecto Next.js (App Router), incluyendo las dependencias base, configuración del tema en TypeScript, y resolución de conflictos CSS.

## Alcance

- Instalación de `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `@mui/material-nextjs`.
- Creación de un tema estrictamente tipado en `src/theme/theme.ts`.
- Configuración de `ThemeProvider` y `AppRouterCacheProvider` en el layout principal.
- Configuración de la fuente Roboto mediante `next/font/google`.
- Aislamiento de estilos base de MUI (`CssBaseline`) usando `@layer` en Tailwind CSS para evitar conflictos.
- Creación de un componente reutilizable `CustomButton` en `src/components/common` que extienda el `Button` de MUI demostrando un tipado estricto.

## Leyes Aplicadas

- **Soberanía Documental:** La documentación se almacena en la ruta de feature.
- **Validación:** El código debe compilar sin errores de tipo, priorizando el tipado estricto (no `any`).
- **Atomicidad y Limpieza:** Se debe priorizar componentes `styled` de Emotion o `sx` limitados; evitar estilos inline pesados.