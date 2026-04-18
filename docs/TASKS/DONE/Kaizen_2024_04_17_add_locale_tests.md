---
id: kaizen-add-locale-tests
action_id: action_kaizen
feature_id: kaizen-add-locale-tests
title: Agregar tests para utilidades de locale
status: pendiente
created: 2024-04-17
---
# Acción Kaizen: Agregar tests para utilidades de locale

## Descripción
Se requiere implementar pruebas unitarias para el archivo `src/lib/utils/locale.ts`, específicamente para la función `getLocaleFromUser`, para asegurar que la cobertura de pruebas cumpla con los estándares del proyecto.

## Criterios de Aceptación
- La función `getLocaleFromUser` debe estar testeada cubriendo diferentes combinaciones de `languageId`.
- El archivo de pruebas debe estar ubicado en `src/__tests__/lib/utils/locale.test.ts`.
- Los tests deben pasar exitosamente.