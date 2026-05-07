---
id: kaizen-auth-payload-standardization
action_id: objectives
feature_id: kaizen-auth-payload-standardization
title: Objectives for Kaizen Auth Payload Standardization
status: completed
---
# Objectives
- Eliminate `usuario` and `contraseña` from the E2E/API test payloads in `api-client.ts`, `test-data-cleanup.ts` and `auth-api.spec.ts`.
- Replace them with the standardized `username` and `password`.
- Ensure E2E and API tests still pass.
