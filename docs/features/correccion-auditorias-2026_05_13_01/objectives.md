---
title: "Objetivos: Corrección de Auditoría 2026-05-13"
date: "2026-05-13"
status: "in-progress"
---

# Objetivos del Kaizen

* **Reemplazar console.* por logger centralizado:** Para asegurar que los logs de utilidades y proveedores sean capturados por el sistema de telemetría, se actualizarán las llamadas a `console.warn`, `console.error` y `console.info` a `logger.warn`, `logger.error` y `logger.info` con el formato esperado por Pino, donde el primer parámetro es un objeto de contexto si hay variables y el segundo es el mensaje (`logger.error({ error }, "Mensaje")`).
* **Eliminar deuda técnica (`test.skip()`):** Eliminar la omisión incondicional de una prueba e2e si no hay logs en `src/tests/e2e/logs.spec.ts`. La prueba debe ejecutarse y fallar legítimamente si el entorno no está preparado o las aserciones no se cumplen.
