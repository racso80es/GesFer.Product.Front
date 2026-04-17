---
id: kaizen-add-locale-tests
action_id: action_kaizen
feature_id: kaizen-add-locale-tests
title: Spec para tests de locale
status: pendiente
---
# Especificaciones

- Archivo a crear: `src/__tests__/lib/utils/locale.test.ts`.
- Función a probar: `getLocaleFromUser(user: LoginResponse | null): Locale`.
- Casos de prueba:
  - Debería retornar `defaultLocale` (es) cuando `user` es `null`.
  - Debería mapear correctamente desde `userLanguageId`.
  - Debería mapear correctamente desde `companyLanguageId`.
  - Debería respetar la jerarquía de prioridad (`user` > `company` > `country` > `effective`).
  - Debería retornar `defaultLocale` si no hay configuración de idioma o es inválida.
- Ejecución: `npm run test -- __tests__/lib/utils/locale.test.ts`.