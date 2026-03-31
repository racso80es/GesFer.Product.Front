---
id: "task-actualizacion-readme-clarify"
action_id: clarify
feature_id: task-actualizacion-readme
title: "Clarificación de actualización del README"
date: "2026-03-31"
status: done
decisions:
  - Consolidar I18N-GUIDE e I18N-STATUS en i18n-guide.md
  - Integrar COMANDOS-GIT, SETUP, CONFIGURACION-API, INSTRUCCIONES, SOLUCION-CORS y SOLUCION-PROBLEMAS en README.md general
clarify_pending: []
---
# Clarificación

## Decisiones Tomadas
- Se mantendrán las guías de arquitectura (i18n) fuera de `README.md` principal, según memoria de agente.
- Los tests irán a `docs/testing/`.
- Todos los instructivos de arranque, problemas de CORS y configuración de la API formarán parte del `README.md` principal en la raíz.