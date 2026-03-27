---
id: stabilidad-front-api-back-objectives
action_id: objectives
feature_id: stabilidad-front-api-back
title: "Estabilidad front validada con GesFer.Product.Back"
date: "2026-03-26"
status: in_progress
branch: feat/stabilidad-front-api-back
scope: "Verificación API, herramienta start-frontend, coherencia contrato, tests"
ley_aplicada: "Soberanía documental (Cúmulo paths.featurePath); comandos vía skills donde aplique"
---

# Objetivos

Garantizar la estabilidad del frontend frente a la API **GesFer.Product.Back** (en ejecución), usando la herramienta **start-frontend** (o equivalente documentado) y dejando trazabilidad en esta carpeta de tarea.

## Entregables esperados

1. Confirmación de salud de la API (`/health` y/o `/api/health` según contrato).
2. Resultado de análisis (build, tipos, herramienta) en `analisis-temporal.md`.
3. Incoherencias API ↔ front documentadas con prefijo `TODO: [STB-FRONT]`.
4. Correcciones aplicadas priorizando alineación con el backend.
5. Evidencia de tests (Jest / E2E) y estado en `validacion.md`.
6. Informe orientado a usuario sobre alcance de **start-frontend**, login y dependencias del Back: `informe-situacion-actual.md` (actualizado con binarios Rust y condiciones de uso).
