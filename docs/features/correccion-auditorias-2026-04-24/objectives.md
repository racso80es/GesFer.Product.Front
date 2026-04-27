---
id: obj-correccion-auditorias
action_id: action-correccion-auditorias
feature_id: correccion-auditorias-2026-04-24
title: Corrección según Auditoría 2026-04-24
status: completado
---
# Objetivos: Corrección de hallazgos S+ (2026-04-24)

1. **Resolver conflicto en EVOLUTION LOG:**
   - Remover las cabeceras de merge (`<<<<<<<`, `=======`, `>>>>>>>`) en `docs/evolution/EVOLUTION_LOG.md` preservando ambas entradas históricas.
2. **Refactorizar Mocks de API:**
   - Añadir `userLanguageId`, `companyLanguageId`, `countryLanguageId`, y `effectiveLanguageId` en el objeto de contrato en `src/__tests__/integration/api-contracts.test.ts`.
3. **Bypass Estricto de TypeScript en E2E:**
   - Reemplazar el cast peligroso `as unknown as number` por envoltorios directos con `Number()` en `src/tests/e2e/admin_logs.spec.ts`.
