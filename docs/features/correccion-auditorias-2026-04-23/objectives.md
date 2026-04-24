---
id: "correccion-auditorias-2026-04-23-obj"
action_id: "correccion-auditorias"
feature_id: "correccion-auditorias"
title: "Objetivos: Corrección de Auditorías (TS y Mocks)"
status: "active"
---
# Objetivos de la corrección

1. Analizar reporte de auditoría `AUDITORIA_2026_04_22_01.md`.
2. Corregir asincronía de interfaces en las suites de test (`users-organization-api-integrity.test.ts`). Reemplazar "usuario" por "username" y "contraseña" por "password" cuando el payload de Auth es usado en las peticiones (específicamente en los comentarios de test que causaban confusión).
3. Evitar inferencia a `never` en testing con playwright y types estrictos `admin_logs.spec.ts`.
