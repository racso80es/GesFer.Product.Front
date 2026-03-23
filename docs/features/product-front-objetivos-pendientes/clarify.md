---
id: "product-front-objetivos-pendientes-clarify"
action_id: clarify
feature_id: product-front-objetivos-pendientes
title: "Clarificación — Objetivos pendientes (con participación del usuario)"
date: "2026-03-23"
status: done
spec_ref: "docs/features/product-front-objetivos-pendientes/spec.md"
plan_ref: "docs/features/product-front-objetivos-pendientes/plan.md"
decisions:
  - id: D-01
    tema: "Nombre de la solución"
    resolucion: "La solución canónica del repositorio es GesFer.Product.Front; la documentación SddIA y la raíz ya están alineadas a ese nombre."
    fuente: "Conversación con el usuario / Objetivos.md"
  - id: D-02
    tema: "API backend local (referencia de equipo)"
    resolucion: "Referencia http://localhost:5020/ (Swagger en /swagger/v1/swagger.json). Si cambia puerto o esquema, actualizar decisión y documentación."
    fuente: "Usuario (auditoría previa)"
  - id: D-03
    tema: "TemporalShared"
    resolucion: "src/TemporalShared es temporal; migrar a estructura definitiva y eliminar la carpeta."
    fuente: "Usuario"
  - id: D-04
    tema: "Variables canónicas de URL (modelo mental)"
    resolucion: "NEXT_PUBLIC_API_URL (cliente); API_URL (servidor/tests) según src/lib/config.ts. Alineación de rutas y contrato según D-09."
    fuente: "Código existente + spec O-API-02"
  - id: D-05
    tema: "Q-01 — Esquemas HTTP y HTTPS en local"
    resolucion: "Soportar y documentar ambos perfiles: HTTP y HTTPS según cómo se levante la API."
    fuente: "Usuario (ambas)"
  - id: D-06
    tema: "Q-03 — Tests E2E/API"
    resolucion: "Dos escenarios explícitos: API real y mock (USE_MOCK_API / puerto mock), sin abandonar uno."
    fuente: "Usuario (ambos)"
  - id: D-07
    tema: "Q-05 — Evolution log"
    resolucion: "EVOLUTION_LOG.md en la raíz es obligatorio (paths.evolutionLogFile)."
    fuente: "Usuario (sí, siempre)"
  - id: D-09
    tema: "Q-02 — Contrato API vs convención de URL en el front"
    resolucion: "La realidad a la que debe adecuarse el Front es la marcada por el **API backend**. El contrato vigente se obtiene del **OpenAPI expuesto** (p. ej. swagger v1 JSON actualizado). Los paths y el modelo de datos del front deben seguir ese contrato; la base URL (`NEXT_PUBLIC_API_URL`) apunta al origen del servicio y las rutas relativas deben coincidir con los `paths` del swagger."
    fuente: "Usuario (swagger.json actualizado; API back = realidad)"
  - id: D-10
    tema: "Q-04 — Ubicación de material Propuesta"
    resolucion: "El material permanece en **scripts/Propuesta/**. Añadir README de aviso para que no se confunda con configuración vigente del Product (O-DOC-01)."
    fuente: "Usuario (en propuesta)"
  - id: D-11
    tema: "Q-06 — Orden de trabajo (aislamiento por capas)"
    resolucion: "Orden de planificación y ejecución: **1) SddIA** (normas, documentación de dominio IA), **2) skills** (cápsulas y herramientas bajo scripts/skills y scripts/tools), **3) src** (aplicación Next.js). Reflejado en plan.md."
    fuente: "Usuario (estructura de aislamiento: SddIA, skills, src)"
clarify_pending: []
---

# Clarificación: objetivos pendientes

**Estado:** `done` (todas las preguntas cerradas). Planificación: **`plan.md`**.

## Resumen de decisiones finales

| ID | Cierre |
|----|--------|
| Q-01 | HTTP y HTTPS documentados. |
| Q-02 | **D-09:** contrato = **swagger/OpenAPI del backend**; el front se adecúa a esa realidad. |
| Q-03 | API real + mock. |
| Q-04 | **D-10:** contenido en **`scripts/Propuesta/`** + README de aviso. |
| Q-05 | `EVOLUTION_LOG.md` obligatorio. |
| Q-06 | **D-11:** orden **SddIA → skills → src**. |

## Notas operativas (Q-02)

- Ante cambios de versión del backend, **revalidar** `swagger.json` y ajustar clientes en `src/lib/api/`, tipos y tests.
- `NEXT_PUBLIC_API_URL` = origen del servicio; prefijos de ruta según `paths` del OpenAPI.

## Referencias

- Especificación: `spec.md`
- Plan: `plan.md`
