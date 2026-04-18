---
id: T-20240418-001
action_id: action-spec
feature_id: adecuar-companies
title: Adecuar Companies a MyCompany
status: SPEC
---

# Specification

## Requisitos Funcionales
1. **Vista de Consulta (Read-Only):** Al cargar, la pantalla debe hacer un GET a `/api/MyCompany` para obtener y mostrar la información actual de la empresa.
2. **Vista de Edición:** Debe existir un mecanismo (botón "Editar" o formulario directo) para modificar los campos de la empresa.
3. **Persistencia:** Al guardar, se debe enviar la actualización (PUT) al mismo endpoint `/api/MyCompany`.

## Requisitos Técnicos
- **Clean Architecture:** Separar estrictamente la capa de red de la UI usando un servicio (ya existe parcialmente en `src/lib/api/my-company.ts`).
- **Gestión de Estado y Ciclo de Vida:** Implementar un custom hook `useMyCompany` (usando react-query) para gestionar la data, estado de carga (loading) y errores.
- **Prevención de Errores:** Incluir manejo de excepciones.
- **UI Limpia:** Refactorizar el componente en `src/app/[locale]/companies/page.tsx` para consumir el hook, quitando la lógica de negocio anidada de listados de múltiples compañías.
