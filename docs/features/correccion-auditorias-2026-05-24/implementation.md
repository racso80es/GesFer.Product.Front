---
title: "Implementación: Corrección de Auditoría 2026-05-24"
---

# Implementación

Se utilizó un script en Node.js que recorrió de forma recursiva el directorio `src/tests/` para reemplazar todas las importaciones relativas que apuntaban a las carpetas (ej. `from '../../lib/config'` o `from '../page-objects/...'`) por los alias absolutos correspondientes (ej. `@/lib/...` y `@/tests/...`).

Esto eliminó la fuga de arquitectura identificada en la auditoría y asegura que se cumplan las normativas del proyecto sin afectar el comportamiento esperado.
