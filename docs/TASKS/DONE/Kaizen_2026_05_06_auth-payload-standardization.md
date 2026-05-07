---
id: KAIZEN-2026-05-06-001
title: Standardization of Auth Payloads
status: open
created_at: 2026-05-06
priority: high
---
# Kaizen: Standardization of Auth Payloads

## Objetivo
Estandarizar la nomenclatura de payloads de autenticación en tests E2E y de API de `{ usuario, contraseña }` a `{ username, password }`.

## Alcance
- `src/tests/api/api-client.ts`
- `src/tests/helpers/test-data-cleanup.ts`
- `src/tests/api/auth-api.spec.ts`
