---
id: correccion-auditorias-e2e-auth
action_id: correccion-auditorias-e2e-auth
feature_id: correccion-auditorias-e2e-auth
title: Actualización de selectores Auth en pruebas E2E
date: 2026-04-29
status: in_progress
---

# Implementación

Las modificaciones se aplicaron usando `sed` en los siguientes archivos:

```bash
sed -i "s/'usuario-inexistente'/'username-inexistente'/g" src/tests/e2e/logging-persistence.spec.ts
sed -i "s/El usuario admin@gesfer.local probablemente tiene username/El admin@gesfer.local probablemente tiene username/g" src/tests/e2e/admin_logs.spec.ts
sed -i "s/(el usuario admin@gesfer.local tiene este username)/(el admin@gesfer.local tiene este username)/g" src/tests/e2e/admin_logs.spec.ts
sed -i "s/debe purgar logs antiguos con usuario Admin/debe purgar logs antiguos con Admin/g" src/tests/e2e/logs_purge_logic.spec.ts
```
