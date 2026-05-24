---
title: "Actualización de selectores Auth en pruebas E2E (S+)"
id: "kaizen-e2e-auth"
---
# Especificaciones
Modificar los archivos en `src/tests/e2e/` para reemplazar los usos explícitos de `usuario` (especialmente en comentarios, textos rellenados y descripciones de tests si aplican directamente) con `username` o términos análogos donde haya referencias a "usuario". Ya se cambió `usuario-inexistente` por `non-existent-user`, `con usuario Admin` por `con Admin` y arreglados comentarios en el test `admin_logs.spec.ts`.
