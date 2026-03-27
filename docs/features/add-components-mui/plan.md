---
title: Plan
description: The implementation plan for adding MUI components
date: "2024-03-27"
---

# Planificación de Implementación

1. **Dependencias:** Ejecutar `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/material-nextjs` en la raíz de `src/`.
2. **Tema Base:** Crear `src/theme/theme.ts` con una exportación `theme` básica y con sus tipos configurados.
3. **Manejo de CSS Global:** Editar `src/app/globals.css` para añadir `@layer mui` con las reglas de reseteo base si aplican o encapsular la prioridad del CssBaseline de MUI.
4. **Layout y Fuente:** Modificar `src/app/[locale]/layout.tsx`:
   - Importar `Roboto` desde `next/font/google`.
   - Importar `AppRouterCacheProvider` de `@mui/material-nextjs/v14-appRouter`.
   - Importar `ThemeProvider` y `CssBaseline` de `@mui/material`.
   - Modificar la estructura JSX para envolver en `<AppRouterCacheProvider>` y `<ThemeProvider theme={theme}>`.
   - Agregar el `<CssBaseline />`.
5. **Componente Común:** Crear `src/components/common/CustomButton.tsx`:
   - Declarar una interfaz que extienda `ButtonProps` de `@mui/material`.
   - Exportar por defecto o como exportación nombrada el componente funcional React.
6. **Ejecución y Test:** Ejecutar scripts de testing y build y generar la documentación en `.md` correspondiente (execution, validacion, finalize).