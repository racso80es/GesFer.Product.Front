---
title: Implementación Limpieza TemporalShared
type: implementation
---
# Detalles de Implementación

**Item 1:** Editar `src/tailwind.config.ts`.
**A realizar:** Quitar `"./TemporalShared/Front/components/**/*.{js,ts,jsx,tsx,mdx}",` del arreglo `content`.
**Validación:** El build debe pasar correctamente de forma de que los componentes estandarizados no se vean afectados.