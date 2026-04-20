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

Se unificó la experiencia «Mi organización» en `/my-company`, se limpiaron textos/namespaces `companies` y se corrigió un **defecto de entorno/contrato HTTP**: el cliente llamaba al BFF en el **origen equivocado** (API de producto en lugar de Next), provocando **404** y el mensaje genérico en pantalla.

## Artefactos

| Documento | Contenido |
| :--- | :--- |
| `objectives.md` | Alcance y criterios iniciales |
| `spec.md` | Contrato técnico actualizado (incl. §6 BFF) |
| `clarify.md` | Decisiones de producto (rutas, E2E, integración) |
| `implementation.md` | **Registro de problemas P1/P2 y correcciones** |
| `validacion.md` | Estado de pruebas automatizadas |
| `finalize.md` | Este cierre |

## Riesgos residuales

- E2E Playwright depende de API y datos; conviene ejecutarlos en pipeline o manualmente tras despliegue.
- Nuevos Route Handlers solo en Next podrían repetir el antipatrón si se usan con `apiClient` y origen del backend; reutilizar el mismo criterio que `/api/my-company` o extraer lista de prefijos BFF.
