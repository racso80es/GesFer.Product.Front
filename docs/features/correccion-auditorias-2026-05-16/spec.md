---
type: spec
status: active
date: 2026-05-16
---

# Especificaciones

- Reemplazar todas las ocurrencias de `console.error` y `console.warn` en el directorio `src`.
- Utilizar `import logger from '@/lib/logger';`.
- Pasar correctamente el objeto de error al logger: `logger.error({ error }, "Mensaje")`.
