# Norma: sincronismo y trazabilidad SddIA (evolution)

## Ámbito

- Aplica a todo cambio de contenido bajo **`./SddIA/`** (normas, procesos, agentes, skills, tokens, etc.), salvo acuerdos explícitos de mantenimiento masivo documentados en otra norma.
- **No** sustituye la evolución de producto en `paths.evolutionPath` / `paths.evolutionLogFile` (cierres de features). Conviven propósitos distintos.

## Obligación

1. Toda **alta**, **baja** o **modificación** relevante bajo `./SddIA/` debe quedar registrada en el protocolo evolution:
   - Un fichero de detalle `{id_cambio}.md` con frontmatter según **`paths.sddiaEvolutionPath`** + `evolution_contract.md` (versión **1.1**).
   - **`id_cambio`** = **UUID v4**; nombre de fichero = `{id_cambio}.md`.
   - Actualización del índice `paths.sddiaEvolutionLogFile` en la misma intervención o en el mismo PR.
2. La implementación del registrador y del validador es **solo** mediante binarios **Rust** en `paths.skillsRustPath` y cápsulas en `paths.skillCapsules` (sin scripts `.ps1` como entrega principal de registro).

## Herramientas

| Binario | Función |
| :--- | :--- |
| `sddia_evolution_register` | Genera GUID, escribe detalle, actualiza índice, calcula `hash_integridad`. |
| `sddia_evolution_validate` | Valida trazabilidad respecto a un rango git (uso en local y CI). |
| `sddia_evolution_watch` | Observa `./SddIA/` y avisa para ejecutar registro (debounce; v1 no exige metadatos automáticos). |

## Validación en CI

Los PR que modifiquen `./SddIA/` deben cumplir la validación configurada en `.github/workflows` y no contradecir esta norma.

## Difusión IDE

La regla `.cursor/rules/sddia-evolution-sync.mdc` refuerza el cumplimiento en editores compatibles; **no** sustituye CI ni esta norma.

## Referencias

- `SddIA/agents/cumulo.paths.json` — claves `sddiaEvolutionPath`, `sddiaEvolutionLogFile`, `sddiaEvolutionContractFile`.
- `SddIA/norms/paths-via-cumulo.md`
- `SddIA/evolution/evolution_contract.md`
