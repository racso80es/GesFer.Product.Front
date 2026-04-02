---
id: clarify-actualizacion-readme
action_id: clarify
feature_id: actualizacion-readme
title: Clarificaciones
status: draft
---
# Clarificaciones

## Decisiones
- El `README.md` de la raíz del proyecto ya contiene información de Next.js, Tailwind, etc., pero falta la información detallada de resolución de problemas (CORS, Node, npm, y firewall) y los scripts de PowerShell explícitos que estaban en los archivos fragmentados.
- En lugar de mantener una copia literal de los archivos fragmentados en el `README.md`, se consolidarán y organizarán bajo las secciones "Instalación", "Configuración de Variables de Entorno", "Troubleshooting y CORS", etc. para mejorar la legibilidad.
- Se mantendrán las referencias de Material UI y next-intl como parte de la stack del proyecto actual.
- `README-TESTS.md` se mueve a `docs/testing/` y se asume que las herramientas de Testing ya cuentan con su contexto.
