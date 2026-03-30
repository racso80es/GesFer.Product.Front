---
id: val-20260330-001
action_id: validate
feature_id: actualizacion-readme
title: Validación de actualizacion-readme
status: DONE
---

# Validación pre-PR de actualizacion-readme

## Criterios de Validación
1.  **Existencia del README Unificado**: El archivo principal de `README.md` incluye ahora todo el contexto esencial de despliegue y resolución de problemas.
2.  **Ausencia de archivos redundantes**: La carpeta `src/` ya no contiene ficheros `.md` operativos (`SETUP`, `CONFIGURACION-API`, etc.), dejándola estrictamente como carpeta del App Router/código.
3.  **Correcto enrutamiento de Guías**: Las guías de i18n están en `docs/architecture/` y la de testing en `docs/testing/testing-guide.md`.
4.  **Tests y Compilación**: Validado mediante pre-commit scripts ejecutando `npm install`, `npm run lint`, `npm run build`, y `npm run test:all`.