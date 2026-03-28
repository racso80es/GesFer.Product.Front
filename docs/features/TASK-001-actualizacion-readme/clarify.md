---
id: "TASK-001-clarify"
action_id: clarify
feature_id: TASK-001-actualizacion-readme
decisions:
  - "Todo el contenido valioso de los MD de src/ se inyectará en el README principal."
  - "Los archivos fuente en src/ se eliminarán tras su consolidación."
clarify_pending: false
---

# Clarificaciones

- **Decisión 1:** En lugar de mantener múltiples READMEs fragmentados, adoptaremos un único README.md gigante o mejor estructurado en la raíz, que sirva como punto de entrada único (Single Source of Truth).
- **Decisión 2:** El contenido redundante o desactualizado será descartado a favor del estado actual del repositorio.
- **Decisión 3:** Si un archivo es muy largo, se añadirá como una sub-sección colapsable (usando `<details> <summary>...`) en el README principal para mantener la legibilidad, si fuera estrictamente necesario, o se simplificará.