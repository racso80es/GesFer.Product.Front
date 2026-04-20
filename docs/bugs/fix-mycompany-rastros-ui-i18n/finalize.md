---
id: fix-mycompany-rastros-ui-i18n-finalize
action_id: finalize
feature_id: fix-mycompany-rastros-ui-i18n
title: Cierre — fix My Company
date: "2026-04-20"
status: done
branch: fix/mycompany-rastros-ui-i18n
---

# Finalize

## Resumen ejecutivo

Se unificó la experiencia **Mi organización** en `/my-company`, se retiró la pantalla legada `companies` y se corrigieron defectos de **contrato HTTP BFF**, **hidratación React (SSR/cliente)**, **PUT de actualización** (cuerpo con Guids vacíos) y **observabilidad de errores** del API de producto. Quedó documentada la norma **`SddIA/norms/nextjs-hydration-client-state.md`** y el agente **Tekton** incluye restricciones explícitas sobre paridad de hidratación.

## Commits relevantes (rama `fix/mycompany-rastros-ui-i18n`)

- Entrega principal: Mi organización, i18n, BFF `/api/my-company`, E2E, tests de integración renombrados.
- Hidratación: `useHasMounted`, norma SddIA, política Jest, `user-form` con `useLocale`.
- PUT / 500: `sanitizeCompanyMutationBody`, reenvío de errores en BFF y `getProductApi`, E2E que aserta respuesta `PUT`.

## Artefactos

| Documento | Contenido |
| :--- | :--- |
| `objectives.md` | Alcance y criterios iniciales |
| `spec.md` | Contrato técnico (rutas, BFF) |
| `clarify.md` | Decisiones de producto |
| `implementation.md` | Problemas P1/P2, PUT 500, hidratación, referencias |
| `technical-note-hydration.md` | Nota técnica hidratación |
| `validacion.md` | Estado de pruebas |
| `finalize.md` | Este cierre |

## Criterios de cierre (checklist)

- [x] Documentación de implementación y notas técnicas alineadas con el código.
- [x] Norma de hidratación y test de política asociado.
- [x] Corrección PUT documentada (`company-payload`, BFF, E2E).
- [x] Rama con historial de commits listo para merge / PR.

## Riesgos residuales

- E2E Playwright depende de API y datos seed; ejecutar en CI o manualmente con `start-frontend` + API en `:5020`.
- Route Handlers solo en Next: seguir usando `effectiveBaseUrl` / origen correcto para rutas BFF.
- Otros formularios o pantallas con `window.location` en el primer render: revisar contra la norma de hidratación.

## Siguiente paso recomendado

Abrir **pull request** contra la rama base acordada, ejecutar pipeline (lint, Jest, E2E según política) y merge tras revisión.
