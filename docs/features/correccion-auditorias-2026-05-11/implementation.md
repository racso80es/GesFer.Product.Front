# Implementación
- Se ha creado un script en bash para reemplazar las sentencias `console.*` por `logger.*` e incluir el respectivo import.
- Se ha actualizado el archivo de test para mockear el modulo `@/lib/logger` y cambiar los asertos de `console.warn` y `console.error` a `logger.warn` y `logger.error` con su context: `ui`.
