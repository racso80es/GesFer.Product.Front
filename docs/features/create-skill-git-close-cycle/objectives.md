---
id: "create-skill-git-close-cycle-objectives"
action_id: objectives
feature_id: create-skill-git-close-cycle
branch: "feat/create-skill-git-close-cycle"
title: "Skill git-close-cycle y enlace en finalize-process"
date: "2026-05-01"
status: in_progress
---

# Objetivos

- Forjar la skill ejecutable **git-close-cycle** (Rust + cápsula + Cúmulo) para cerrar el ciclo local tras fusión en remoto: actualizar rama base (`main` o `master`), sincronizar con `origin` y eliminar la rama de trabajo indicada (`-d` con fallback `-D`).
- Enlazar la acción **finalize-process** para que, ante **tarea finalizada**, el protocolo de orquestación incorpore formalmente **git-close-cycle** pasando la rama de trabajo como `target_branch` (precondición: fusión ya integrada en remoto cuando aplique la eliminación segura).
