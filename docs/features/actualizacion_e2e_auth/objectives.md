---
id: actualizacion_e2e_auth_objectives
title: Objetivos para Actualización de selectores Auth en E2E
status: completed
created: 2026-05-11
---

## Objetivo Principal
Eliminar la nomenclatura desfasada 'usuario' y 'contraseña' de las pruebas E2E (Playwright) y actualizar los identificadores y page objects de acuerdo a la estandarización ('username' y 'password').

## Problema
En auditorías S+ anteriores, se corrigieron los contratos API, pero el código de pruebas e2e y Page Objects aún mantiene referencias al español, violando la regla de no-Spanglish en payloads de autenticación.
