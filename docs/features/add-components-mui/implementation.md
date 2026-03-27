---
title: Implementation
description: The list of touchpoints and items to implement
date: "2024-03-27"
---

# Implementación

### Ítems a Ejecutar

1. **Instalación:** Paquetes npm (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `@mui/material-nextjs`).
2. **Creación de Archivos:**
   - `src/theme/theme.ts`
   - `src/components/common/CustomButton.tsx`
3. **Modificación de Archivos:**
   - `src/app/globals.css` (Añadir regla `@layer mui`)
   - `src/app/[locale]/layout.tsx` (Wrappers `AppRouterCacheProvider`, `ThemeProvider`, `CssBaseline` y configuración de `next/font/google` Roboto).
4. **Verificación:** Ejecutar `npm run build` o `npm run test:all`.