---
id: "correccion-auditorias-obj"
action_id: "correccion-auditorias"
feature_id: "correccion-auditorias"
title: "Objetivos: Corrección de Auditorías (TS y Mocks)"
status: "active"
---
# Objetivos de la corrección

1. Analizar reporte de auditoría `AUDITORIA_2026_04_22_01.md`.
2. Corregir asincronía de interfaces entre `src/lib/types/api.ts` y las suites de test (`e2e-flows`, `integrity`, `api-contracts`).
3. Corregir tipos `cacheTime` (obsoletos en v5, a `gcTime`).
4. Evitar inferencia a `never` en testing con playwright y types estrictos.
5. Lograr compilación sin errores usando `tsc --noEmit`.
