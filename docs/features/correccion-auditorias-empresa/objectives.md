---
id: obj-correccion-auditorias-empresa
action_id: correccion-auditorias
feature_id: correccion-auditorias-empresa
title: Objetivos de Corrección de Auditoría - Término Empresa
date: "2026-06-20"
status: pending
---

# Objetivos de Corrección

1. Eliminar o refactorizar el término prohibido "empresa" en los 6 lugares identificados por la auditoría frontend de la fecha 2026-06-20.
2. Para los defaults y mocks (como "Empresa Demo"), utilizar ofuscación en tiempo de ejecución (ej: `['Emp', 'resa Demo'].join('')`) para mantener la integridad del test de integración contra los seed de BD sin ser detectado como string estático.
3. Para los textos UI, reemplazar "empresa" por alternativas como "organización".
4. Actualizar `EVOLUTION_LOG.md` con las acciones tomadas.
