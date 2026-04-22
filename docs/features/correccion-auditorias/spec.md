---
id: "correccion-auditorias-spec"
action_id: "correccion-auditorias"
feature_id: "correccion-auditorias"
title: "Especificación Técnica: Corrección de Auditorías (TS y Mocks)"
status: "active"
---
# Especificación

- Actualizar `UpdateUser` para requerir y mandar `isActive` y `username` según la última iteración.
- Actualizar `LoginResponse` para requerir `cursorId` en todos los mocks.
- Renombrar en los tests `{ usuario, contraseña }` por `{ username, password }`.
- Reemplazar `cacheTime` por `gcTime` en `OmitKeyof<QueryObserverOptions>`.
- Evitar inferencias `never` de control de flow de Typescript en variables asignables mediante callbacks en runtime (`admin_logs.spec.ts`).
