---
id: correccion-auditorias-e2e-auth-obj
action_id: Kaizen_2026_04_29_actualizacion_e2e_auth
feature_id: correccion-auditorias-e2e-auth
title: "Objetivos de corrección de auditorías - Nomenclatura Auth E2E"
date: "2026-04-29"
status: "active"
---

# Objetivos

- Eliminar la nomenclatura 'usuario' y 'contraseña' de las pruebas E2E (y de sus localizadores en TEST-IDS.md) para estandarizarlas a `username` y `password` respectivamente.
- Asegurar que todas las pruebas Playwright apunten correctamente a los selectores `login-username-input` en lugar del obsoleto `login-usuario-input`, y ajustar las referencias en descripciones y nombres de variables si es necesario.
