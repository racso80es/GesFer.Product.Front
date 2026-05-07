---
id: kaizen-auth-payload-standardization-plan
action_id: planning
feature_id: kaizen-auth-payload-standardization
title: Plan for Kaizen Auth Payload Standardization
status: completed
---
# Plan
1. Use `sed` to replace occurrences of `usuario` and `contraseña` with `username` and `password` in `src/tests/api/api-client.ts`.
2. Use `sed` to replace occurrences of `usuario` and `contraseña` with `username` and `password` in `src/tests/helpers/test-data-cleanup.ts`.
3. Use `sed` to replace occurrences of `usuario` and `contraseña` with `username` and `password` in `src/tests/api/auth-api.spec.ts`.
4. Run verification and tests (`npm run test:all`).
