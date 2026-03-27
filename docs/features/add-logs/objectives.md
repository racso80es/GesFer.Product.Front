---
objectives_id: add-logs-objectives
feature_name: add-logs
description: Implementar un sistema de logging persistente y estructurado en el frontend.
---

# Objetivos: add-logs

## Objetivo Principal
Implementar un sistema de logging persistente y estructurado en el frontend de la aplicación `GesFer.Product.Front`, diferenciando el nivel de detalle según el entorno para optimizar el rendimiento y la seguridad en Producción.

## Alcance
- Integrar/Configurar la librería de logging `pino`.
- Configurar escritura de logs en ficheros asegurando rutas compatibles con despliegue.
- Implementar un LoggingHandler (o `global-error.tsx`) para capturar excepciones globales.
- Definir y aplicar reglas de negocio por entorno:
  - Entorno DEV: Nivel Verbose / Information (Todos los eventos).
  - Entorno PROD: Nivel Error / Fatal únicamente.

## Leyes Aplicadas
- **Leyes de Cúmulo/SddIA**: Persistir toda la documentación en `docs/features/add-logs/` usando frontmatter YAML según normas de `SddIA`.
- **Estructura de Next.js**: Las APIs en `src/app/api/...` para captura de logs del cliente y renderizado de Server Components para escritura de ficheros.
