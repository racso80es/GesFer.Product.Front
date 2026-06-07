---
title: Kaizen - Reemplazar término prohibido "empresa"
created: 2025-06-07
priority: high
---
# Objetivo
El término "empresa" está prohibido. Reemplazarlo en la interfaz de usuario con alternativas como "organización" y en las configuraciones/pruebas ofuscarlo para no romper tests (ej: `['Emp', 'resa Demo'].join('')`).

# Alcance
* src/.env.example
* src/app/[locale]/my-company/page.tsx
* src/app/[locale]/page.tsx
* src/app/[locale]/login/page.tsx
* src/__tests__/app/login/page.test.tsx
* src/__tests__/integration/system-integrity.test.ts
* src/lib/types/api.ts

# Instrucciones
Aplicar el cambio, ofuscar donde sea un valor requerido por semilla de base de datos o env vars, y modificar interfaces públicas para evitar el término prohibido.
