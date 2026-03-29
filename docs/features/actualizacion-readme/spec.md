---
title: Especificación de Actualización de README
type: spec
feature_id: actualizacion-readme
---
# Especificación

1. **`src/config/README.md`**: Detalla variables de entorno, entornos locales y URLs de API. Este contenido será sintetizado o copiado hacia una sección "Configuración de Entornos" en el `README.md` raíz.
2. **`src/tests/README.md`**: Detalla el uso de Playwright, los comandos `npm run test:e2e`, variables de entorno para los mock, y la estructura de page objects. Este contenido se moverá a un nuevo archivo `docs/testing/testing-guide.md`.
3. **`README.md` principal**: Se integrará la información de configuración. Se actualizará la tabla de Documentación referenciando a `docs/testing/testing-guide.md`.
4. **Borrado**: `src/config/README.md` y `src/tests/README.md` serán eliminados por ser redundantes y violar la norma de evitar archivos markdown dispersos en el directorio `src/`.