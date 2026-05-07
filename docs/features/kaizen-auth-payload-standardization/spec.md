---
id: kaizen-auth-payload-standardization-spec
action_id: spec
feature_id: kaizen-auth-payload-standardization
title: Specification for Kaizen Auth Payload Standardization
status: completed
---
# Specification
- **Files to Modify:**
  - `src/tests/api/api-client.ts`
  - `src/tests/helpers/test-data-cleanup.ts`
  - `src/tests/api/auth-api.spec.ts`
- **Changes:** Change `{ usuario, contraseña }` to `{ username, password }` matching backend interfaces.
