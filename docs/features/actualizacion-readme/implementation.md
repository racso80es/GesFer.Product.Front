---
id: implementation-actualizacion-readme
action_id: implementation
feature_id: actualizacion-readme
title: Implementación
status: draft
---
# Implementación (Doc)

## Tareas de Implementación
1. **Actualizar `README.md` (Raíz)**: Se fusionará el contenido principal con los manuales de configuración, troubleshooting, comandos de git, configuración CORS de los ficheros de `src/`.
2. **Migrar `src/README-TESTS.md`**: Será movido a `docs/testing/README-TESTS.md` creando el directorio si no existe.
3. **Limpieza en `src/`**: Eliminar los archivos listados en la Especificación Técnica.

## Riesgos y Mitigaciones
- **Riesgo**: Que se pierda un comando o instrucción vital.
- **Mitigación**: Todo el contenido se ha inspeccionado y consolidado. Los scripts `.ps1` reales se mantienen intactos.
