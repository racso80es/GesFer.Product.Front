---
id: fix-mycompany-rastros-ui-i18n-objectives
action_id: objectives
feature_id: fix-mycompany-rastros-ui-i18n
title: Objetivos del fix — limpieza My Company
date: "2026-04-20"
status: done
branch: fix/mycompany-rastros-ui-i18n
---

# Objetivos

Eliminar **rastros de la pantalla y copys orientados a listado de “companies”** en el dominio cliente, alineando textos, claves i18n y estructura de componentes con el contrato **una sola organización del usuario autenticado** vía `/my-company` y BFF `/api/my-company`.

## Criterios

- Sin ruta en App Router para el path legado de listado; la vista canónica es solo `/my-company` (sin lógica dedicada a otros paths).
- Namespace de mensajes único `myCompany` (sin bloque `companies` en `es` / `en` / `ca`).
- Navegación y tests E2E/page objects sin nomenclatura “Companies” donde corresponda al flujo actual.
- Documentación del proceso bug-fix en esta carpeta (`objectives`, `spec`, `clarify`).
