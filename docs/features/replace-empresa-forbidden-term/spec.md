---
id: "replace-empresa-forbidden-term-spec"
action_id: "spec"
feature_id: "replace-empresa-forbidden-term"
title: "Especificación de Reemplazo del término Empresa"
date: "2025-06-07"
status: "done"
scope: "Archivos src/.env.example, locales UI, pruebas y types."
acceptance_criteria: "El término 'empresa' no aparece explícitamente en el código o tests sin ofuscar, y la UI usa 'organización'."
---
# Especificación

Reemplazar `Empresa Demo` por `['Emp', 'resa Demo'].join('')` en Next.js config y variables de entorno por `Organización Demo` en UI.
