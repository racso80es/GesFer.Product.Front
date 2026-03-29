---
title: Implementación de Actualización de README
type: implementation
feature_id: actualizacion-readme
---
# Implementación

1.  **Migración de Tests:**
    - Se ejecutó el comando `mkdir -p docs/testing/ && mv src/tests/README.md docs/testing/testing-guide.md` para migrar la documentación de tests.
2.  **Unificación de Configuración:**
    - Se integró una síntesis de la configuración de entornos (que residía en `src/config/README.md`) al `README.md` principal, exponiendo la ubicación de los JSON y las variables de entorno disponibles.
3.  **Actualización de Referencias:**
    - En el `README.md` principal se actualizó la mención en la sección de "Scripts disponibles" y en la tabla de "Documentación" para que enlacen al nuevo `docs/testing/testing-guide.md`.
4.  **Eliminación de Redundancias:**
    - Se eliminó `src/config/README.md` y `src/tests/README.md`.