---
id: clarify-20260330-001
action_id: clarify
feature_id: actualizacion-readme
title: Clarificación de actualizacion-readme
status: DONE
---

# Clarificaciones y Decisiones de actualizacion-readme

## Decisiones
1.  **Redundancia de Contenido**: El `README.md` de la raíz actual ya tiene enlaces o menciona estas guías adicionales que ahora serán consolidadas. Reemplazaremos estos enlaces e insertaremos las secciones pertinentes directamente.
2.  **Rutas de Documentación Especializadas**: Mover `README-TESTS.md` a `docs/testing/README-TESTS.md` y guías `I18N` a `docs/architecture/` mantiene el repositorio `src/` limpio, exclusivamente para el código fuente de Next.js.
3.  **Proceso SDDIA**: Se seguirán todas las normas SDDIA de documentación (`objectives`, `spec`, `clarify`, `plan`, `implementation`, `execution`, `validacion`, `finalize`) con frontmatter para cerrar adecuadamente la tarea.
4.  **Eliminación Segura**: Los archivos del directorio `src/` que se consolidan en `README.md` serán borrados permanentemente después de asegurar la transferencia del contenido.