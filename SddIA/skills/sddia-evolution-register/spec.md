---
skill_id: sddia-evolution-register
version: 1.0.0
---

# Skill — sddia-evolution-register

Registro de cambios del protocolo SddIA bajo `./SddIA/` con contrato YAML v1.1.

## Ejecutables (cápsula `paths.skillCapsules.sddia-evolution-register`)

| Binario | Uso |
| :--- | :--- |
| `sddia_evolution_register` | Stdin: JSON con `request` (campos ver abajo). Stdout: JSON `success`, `idCambio`, `hashIntegridad`, `path`. |
| `sddia_evolution_validate` | Args: `--base <ref>` `--head` (default `HEAD`). Exit ≠ 0 si falta trazabilidad y el diff toca `SddIA/`. |
| `sddia_evolution_watch` | Observa `./SddIA/` con debounce; stderr con avisos. |

## Request JSON (register)

Campos principales: `autor`, `descripcion_breve`, `tipo_operacion` (`alta` \| `baja` \| `modificacion`), `proyecto_origen_cambio`, `contexto`, `cambios_realizados` (lista `{ "anterior", "nuevo" }`), `impacto`, `replicacion_instrucciones`, opcional `rutas_eliminadas`, `commit_referencia_previo`.

También se acepta envelope `{ "request": { ... } }`.

## Variable de entorno

- `SDDIA_REPO_ROOT`: raíz del repositorio si el binario no se ejecuta desde el layout estándar.
