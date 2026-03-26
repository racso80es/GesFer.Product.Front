---
id: "product-front-objetivos-pendientes-spec"
action_id: spec
feature_id: product-front-objetivos-pendientes
title: "Especificación — Objetivos pendientes tras adaptación GesFer.Product.Front"
date: "2026-03-26"
status: done
planning_ref: "docs/features/product-front-objetivos-pendientes/plan.md"
clarify_ref: "docs/features/product-front-objetivos-pendientes/clarify.md"
branch_sugerida: "feat/product-front-objetivos-pendientes"
scope: |
  Definir y acotar el trabajo restante para cerrar la desacoplación del monolito:
  alineación de API y entorno, higiene documental
  y validación técnica. Depende de la adaptación ya aplicada (README, Objetivos,
  SddIA, scripts, README de raíz y next-build-fallback).
acceptance_criteria:
  - "Existen criterios de aceptación medibles por cada bloque de trabajo (API, docs, calidad)."
  - "Las variables de entorno canónicas están nombradas y referenciadas de forma coherente con src/lib/config.ts."
related_paths:
  - "src/lib/config.ts"
  - "src/.env.example"
  - "src/CONFIGURACION-API.md"
  - "Objetivos.md"
---

# Especificación: objetivos pendientes (GesFer.Product.Front)

## 1. Contexto

**Solución actual:** GesFer.Product.Front (`src/`, paquete `gesfer-cliente`). La infraestructura SddIA y la documentación de raíz ya fueron **adecuadas** al nombre y alcance Product; permanecen **huecos operativos** entre la documentación, los valores por defecto de código y el despliegue local real de la API (p. ej. puerto **5020** indicado por el equipo).

El código de interfaz reutilizable y la lógica compartida residen en **`src/components/`** y **`src/lib/`** (alias `@/`), sin carpetas provisionales fuera de esa convención.

## 2. Objetivos por bloque

### 2.1 API backend y variables de entorno (prioridad alta)

| ID | Objetivo | Descripción | Criterios de aceptación |
|----|----------|-------------|-------------------------|
| O-API-01 | URL única de verdad | Documentar y usar **una** convención para desarrollo local respecto al backend (p. ej. `http://localhost:5020` según despliegue actual). | `src/.env.example` y fragmentos relevantes de `README.md` (raíz), `src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md` muestran la **misma** URL base de ejemplo o explican que debe coincidir con la API levantada. |
| O-API-02 | Coherencia con `config.ts` | Los fallbacks de `src/lib/config.ts`, `src/lib/config.test.ts`, `src/lib/logger/index.ts` y `src/next.config.js` no deben contradecir la guía de `.env` sin motivo documentado. | Tabla breve en `CONFIGURACION-API.md` o README: **cliente** → `NEXT_PUBLIC_API_URL`; **tests/servidor** → `API_URL`; cuándo usar cada una. |
| O-API-03 | Tests E2E/API | Reducir dispersión de puertos en `src/tests/**`, `playwright*.ts` y `global-setup.ts` (5000, 5001, 5002, etc.). | Documento o comentario de convención: API real vs mock; variables mínimas para `npm run test:e2e` y `npm run test:e2e:api`. |

### 2.2 Documentación e historial (prioridad media)

| ID | Objetivo | Descripción | Criterios de aceptación |
|----|----------|-------------|-------------------------|
| O-DOC-01 | Propuestas históricas | `scripts/Propuesta/` mezcla escenarios Admin/mock; evitar que se lean como SSOT del Product actual. | Añadir `scripts/Propuesta/README.md` con aviso: *material de propuesta, no configuración vigente*; o mover a `docs/archive/`. |
| O-DOC-02 | Evolution log | Si el proceso del repo exige trazabilidad de evolución, crear o poblar `EVOLUTION_LOG.md` (ruta según Cúmulo: `paths.evolutionLogFile`) con entrada de la adaptación Product.Front. | Un entrada fechada que referencie README + SddIA + scripts; o decisión explícita de no usar evolution log en este repo. |

### 2.3 Calidad y cierre (prioridad alta al cerrar sprint)

| ID | Objetivo | Descripción | Criterios de aceptación |
|----|----------|-------------|-------------------------|
| O-QA-01 | Verificación local | Lint, build y tests desde `src/` tras cambios de API o documentación. | `npm run lint`, `npm run build`, `npm run test` sin errores; E2E según alcance acordado. |
| O-QA-02 | Skill verify-pr-protocol | Ya alineada a npm en `src/`; validar en máquina de desarrollo. | Ejecución exitosa de `cargo run --manifest-path scripts/skills-rs/Cargo.toml --bin verify_pr_protocol` con rama con nombre válido. |

## 3. Fuera de alcance (esta especificación)

- Cambios de negocio o nuevas pantallas no derivados de desacoplamiento.
- Renombrar el paquete npm `gesfer-cliente` salvo decisión explícita de producto.
- Commits o ramas: describir solo criterios; la ejecución git sigue skills/proceso.

## 4. Riesgos y dependencias

- **R-01:** La API real (puerto/path) puede cambiar; la especificación O-API-* debe actualizarse sin romper tests que dependan de mocks.
- **R-02:** Cambios en contratos HTTP o en capa de cliente pueden exigir ajustes coordinados en `src/lib/api/` y pruebas.

## 5. Próximas acciones del ciclo (SddIA)

| Orden | Acción | Entregable |
|-------|--------|------------|
| 1 | clarify | `clarify.md` — decisiones sobre puerto API definitivo local y política de mocks. |
| 2 | planning | `plan.md` — fases y orden (API → docs → validate). |
| 3 | implementation | `implementation.md` — touchpoints de código (solo doc de diseño si no se ejecuta aún). |
| 4 | execution | Aplicar cambios en repo según plan. |
| 5 | validate | `validacion.md` — checks y evidencias. |

---

*Especificación viva: actualizar `status` y frontmatter cuando se cierre el alcance o se repriorice.*
