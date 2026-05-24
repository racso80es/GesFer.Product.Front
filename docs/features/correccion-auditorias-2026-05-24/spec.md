---
title: "Especificación Técnica: Corrección de Auditoría 2026-05-24"
---

# Especificación Técnica

## Archivos a modificar
Todos los archivos en `src/tests/` (y subcarpetas) que usen `import ... from '../../lib/...'` o similar.

## Plan de acción
Se usará un script en Node.js que buscará de forma recursiva todos los archivos en `src/tests/` y reemplazará las rutas relativas (`../../lib/`, `../../components/`, etc.) por sus correspondientes alias absolutos (`@/lib/`, `@/components/`, etc.). Dado que el `tsconfig.json` mapea `@/*` a `./*` (relativo a la carpeta `src`), esto corregirá la violación de arquitectura.

Específicamente:
- `../../lib/config` -> `@/lib/config`
- `../../lib/legacy-constants` -> `@/lib/legacy-constants`
- `../../lib/types/api` -> `@/lib/types/api`

## Definition of Done (DoD)
- No hay imports con `../../` en el directorio `src/tests/`.
- `npm run build`, `npm run lint` y `npm run test:all` pasan exitosamente.
