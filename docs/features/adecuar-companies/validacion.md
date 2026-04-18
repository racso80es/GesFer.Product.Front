---
id: T-20240418-001
action_id: action-validacion
feature_id: adecuar-companies
title: Adecuar Companies a MyCompany
status: VALIDATED
---

# Validation

## Criterios de aceptación
- [x] Vista de consulta hace GET a `/api/MyCompany` (Manejado vía el hook `useMyCompany` y `myCompanyApi`).
- [x] Vista de Edición (Modal y formulario implementado que carga pre-poblado).
- [x] Al guardar se envía la actualización PUT a `/api/MyCompany`.
- [x] Clean Architecture y UI Limpia.
- [x] Eliminado rastro del endpoint antiguo `/companies`.

Los pasos para correr la validación completa técnica se harán en el paso de pre-commit (`npm run build`, `npm run lint`, etc.).
