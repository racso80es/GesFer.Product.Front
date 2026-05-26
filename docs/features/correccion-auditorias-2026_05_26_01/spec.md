---
id: "correccion-auditorias-2026_05_26_01"
title: "Especificación de Resolución de Auditoría"
status: "draft"
---

# Especificación

- **Componente Central**: Logger (`src/lib/logger/index.ts`) y reemplazos masivos de `console.warn` / `console.error` a lo largo del código.
- **Rutas Relativas**: Archivos de tests en `src/__tests__/integration/` donde se deben cambiar los imports a usar `@/`. Excepción explícita para el string de payload en `id-validation.test.ts`.

Se escribirá un script de reemplazo en Node.js para hacer el refactor de `console.*` de forma segura.
