---
id: "KAIZEN-20260423-001"
title: "Erradicación de Entropía y Estandarización S+"
date: "2026-04-23"
status: "pending"
priority: "high"
---

# Erradicación de Entropía y Estandarización S+

## Propósito
Unificar los payloads de autenticación en la suite de tests, reemplazando `usuario`/`contraseña` por `username`/`password`.

## Contexto
El reporte de auditoría `AUDITORIA_2026_04_22_01.md` señaló un desajuste de tipos y nomenclaturas obsoletas en los mocks y payloads de auth (`usuario`/`contraseña` en vez de `username`/`password`). Una revisión más profunda identificó que el problema persiste en varios archivos de test (e.g. `system-integrity.test.ts`, `users-organization-api-integrity.test.ts`, `id-validation.test.ts`).

## Criterios de Aceptación
1. Todos los payloads de autenticación en tests de integración usan `username` y `password`.
2. Las pruebas unitarias y de integración pasan correctamente sin errores de TypeScript.
3. El compilador `tsc --noEmit` pasa sin errores relacionados.
