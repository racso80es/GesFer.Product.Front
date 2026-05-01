---
id: "hotfix-git-sync-remote-upstream-safety-objectives"
feature_id: hotfix-git-sync-remote-upstream-safety
branch: "feat/hotfix-git-sync-remote-upstream-safety"
scope: "Integridad S+ en git-sync-remote y norma operativa Git"
ley_aplicada: "GIT / COMANDOS vía skills; prohibición bypass (Ley de Hierro git-operations)"
title: "Hotfix upstream safety — git-sync-remote"
date: "2026-05-01"
status: in_progress
---

# Objetivos

- Eliminar workarounds con ejecutores primitivos que rompan trazabilidad.
- Asegurar que ramas sin upstream reciban `git push -u <remote> HEAD` desde la skill Rust antes del pull.
- Fallos explícitos en envelope JSON (`success: false`, `message`, `result.phase`).
- Formalizar Ley de Hierro en `SddIA/norms/git-operations.md` y registrar evolución SddIA.
