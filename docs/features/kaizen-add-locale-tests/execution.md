---
id: kaizen-add-locale-tests
action_id: action_kaizen
feature_id: kaizen-add-locale-tests
title: Ejecución
status: pendiente
---
# Ejecución
Se ha implementado el archivo `src/__tests__/lib/utils/locale.test.ts` probando la función `getLocaleFromUser`. Además, se actualizó la configuración de Jest (`src/jest.setup.js` y `src/jest.config.js`) para mockear y transformar adecuadamente `next-intl` (necesario por dependencias indirectas). Los tests se ejecutan correctamente sin errores de sintaxis.