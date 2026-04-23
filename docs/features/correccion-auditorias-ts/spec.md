---
id: spec-2026-04-23-01
action_id: correccion-auditorias-ts
feature_id: correccion-auditorias-ts
title: "Especificación Técnica de Resolución TypeScript (Jest DOM)"
status: ACTIVE
---

# Especificación Técnica

## Contexto Técnico
Durante la ejecución de validaciones estrictas (`tsc --noEmit`), TypeScript falla al validar propiedades del entorno Jest (`JestMatchers<HTMLElement>`) extendidas por `@testing-library/jest-dom`.

## Enfoque de Solución (Spec)
Dado que el archivo de configuración actual `tsconfig.json` incluye globalmente `"**/*.ts"`, la solución de menor impacto y mayor mantenibilidad es crear un archivo global de declaración (`src/global.d.ts`) que incluya el import:
```typescript
import '@testing-library/jest-dom';
```
Esta acción permite que el compilador TypeScript absorba las declaraciones de `jest-dom` en todo el proyecto, solventando los errores sin recurrir a `@types` redundantes ni modificar tests.

## Criterios de Aceptación (DoD)
- Creación de `src/global.d.ts` con el import de jest-dom.
- Compilación de TypeScript exitosa sin errores (`tsc --noEmit`).
- Los tests deben seguir funcionando normalmente (`npm run test:all`).
