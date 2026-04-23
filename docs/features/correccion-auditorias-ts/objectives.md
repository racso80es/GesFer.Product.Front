---
id: obj-2026-04-23-01
action_id: correccion-auditorias-ts
feature_id: correccion-auditorias-ts
title: "Objetivos de Resolución de Auditoría TypeScript (Jest DOM)"
status: ACTIVE
---

# Objetivos de Resolución de Auditoría TypeScript (Jest DOM)

## Resumen
Solucionar los problemas de tipado estricto identificados en la auditoría `AUDITORIA_2026_04_23_01.md`, específicamente los relacionados con la falta de inferencia global de los matchers de Jest DOM en los tests, lo cual interfiere con la regla The Wall (`tsc --noEmit`).

## Objetivos
1. Resolver los errores de TypeScript relacionados a los matchers de Testing Library (como `toBeInTheDocument` y `toHaveClass`) en los archivos `.test.tsx` y `.spec.tsx`.
2. Mantener la configuración centralizada, sin alterar archivo por archivo.
3. Asegurar de que la ejecución local de `tsc --noEmit` devuelva 0 errores.
