## Resumen

- Contrato de acciones: norma innegociable de orquestación solo vía skills/tools registradas (sin scripts OS como vía canónica).
- Acción `finalize` sustituida por **`finalize-process`** (spec en `SddIA/actions/finalize-process/`); barrido de referencias en SddIA, normas, plantillas y `.cursor/rules`.
- **Profilaxis Tekton:** `scripts/skills/run-capsule-from-tekton-request.ps1` + `.tekton_request.json` en `.gitignore` para invocar cápsulas sin payloads JSON pesados por consola.

## Validación

Ver `docs/features/refactor-actions-contract-and-finalize/validacion.md` (global: pass).

## Objetivos

Ver `docs/features/refactor-actions-contract-and-finalize/objectives.md`.
