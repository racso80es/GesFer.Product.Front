---
id: kaizen-audit-norms-git-spec
action_id: spec
feature_id: kaizen-audit-norms-git
title: Audit Norms - Add YAML Frontmatter to Git Norm
date: 2026-04-16
status: in_progress
scope: SddIA/norms
acceptance_criteria: SddIA/norms/git-via-skills-or-process.md contains a valid YAML Frontmatter block. Operational text is unmodified.
---
# Especificación

1.  Modificar `SddIA/norms/git-via-skills-or-process.md`.
2.  Añadir el siguiente bloque al inicio del fichero:
    ```yaml
    ---
    id: "norm-git-via-skills-or-process"
    name: "Git solo vía skill, herramienta, acción o proceso"
    type: "norm"
    status: "active"
    ---
    ```
