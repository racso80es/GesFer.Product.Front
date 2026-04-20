---
id: fix-mycompany-rastros-ui-i18n-clarify
action_id: clarify
feature_id: fix-mycompany-rastros-ui-i18n
title: Aclaraciones — My Company
date: "2026-04-20"
status: resolved
branch: fix/mycompany-rastros-ui-i18n
---

# Clarify

## Decisiones del usuario (cerradas)

| Tema | Decisión |
| :--- | :--- |
| **1 — Rutas legadas** | **Sin redirects ni ramas en middleware.** Cualquier path sin página en App Router es inválido como el resto (not-found); el código no nombra casos concretos. |
| **2 — E2E dashboard** | **Sí:** test que usa `DashboardPage.goToMyCompany()` y comprobación de título en `/my-company`. |
| **3 — Integración `/api/company`** | **Corregidos:** comentarios, `describe`/nombres de casos y variables para dejar claro que es **API de producto** (listado/CRUD), distinta de la UI «Mi organización». |

## Referencia técnica

- Cliente: `/my-company` + BFF `/api/my-company` (detalle del usuario autenticado).
- Tests de integración: `GET/POST/PUT/DELETE /api/company` como contrato REST del backend para datos de prueba.

## Hallazgos en ejecución (runtime)

- **P1 — pantalla con `Error 404: Not Found`:** ver tabla y corrección en **`implementation.md`** (cliente debía apuntar al origen de Next para el BFF, no al API de producto).
- **P2 — mensajes de error API:** cuerpos con `error` frente a `message`; resuelto en `lib/api/client.ts`.

