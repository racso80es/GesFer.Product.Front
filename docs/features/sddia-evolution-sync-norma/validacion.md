---
feature_name: sddia-evolution-sync-norma
created: 2026-03-27
action: validate
status: completado
---

# Validación — sddia-evolution-sync-norma

## Checks realizados

- [x] `cumulo.paths.json` expone `paths.sddiaEvolutionPath`, `paths.sddiaEvolutionLogFile`, `paths.sddiaEvolutionContractFile`; `paths-via-cumulo.md` documenta las claves `sddia*`.
- [x] Existen `SddIA/evolution/evolution_contract.md`, `Evolution_log.md` y al menos un detalle `{uuid}.md` generado con `sddia_evolution_register`.
- [x] Norma `SddIA/norms/sddia-evolution-sync.md` y alineación con `SddIA/CONSTITUTION.md` / `constitution.json` (L8).
- [x] Cápsula `scripts/skills/sddia-evolution/` con binarios copiados vía `install.ps1`; definición en `SddIA/skills/sddia-evolution-register/spec.md`.
- [x] `sddia_evolution_validate --base origin/main --head HEAD` pasa en local con los cambios de la rama.
- [x] Workflow `.github/workflows/pr-validation.yml` incluye build Rust y ejecución de validate.
- [x] `.cursor/rules/sddia-evolution-sync.mdc` presente con globs `SddIA/**/*`.

## Notas

- Build frontend (`verify_pr_protocol`) debe seguir ejecutándose en la misma máquina de desarrollo antes de PR.
