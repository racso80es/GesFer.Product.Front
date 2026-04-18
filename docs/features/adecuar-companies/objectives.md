---
id: T-20240418-001
action_id: action-planning
feature_id: adecuar-companies
title: Adecuar Companies a MyCompany
status: PLANIFICADO
---

# Objectives

Refactorizar y modernizar la pantalla actual ubicada en el endpoint `/companies` de nuestro aplicativo para que utilice exclusivamente el endpoint `/api/MyCompany`.

## Objetivos Específicos
1. Convertir la vista de una lista de compañías a una vista de "Mi Compañía" (Read-Only inicial).
2. Proporcionar un mecanismo de edición para actualizar los datos de la compañía.
3. Consolidar el guardado con un PUT a `/api/MyCompany`.
4. Seguir principios de Clean Architecture implementando un servicio de API y un custom hook de React.
