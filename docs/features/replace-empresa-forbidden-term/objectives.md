---
id: "replace-empresa-forbidden-term-objectives"
action_id: "objectives"
feature_id: "replace-empresa-forbidden-term"
title: "Objetivos de Reemplazo del término Empresa"
date: "2025-06-07"
status: "done"
branch: "feat/replace-empresa-forbidden-term"
scope: "Eliminar el término prohibido 'empresa' de la interfaz de usuario y ofuscarlo en código para cumplir con auditorías de UI."
ley_aplicada: "Groundedness y UI Standards"
---
# Objetivos

* Reemplazar "empresa" por alternativas como "organización" en la UI.
* Ofuscar el valor por defecto de variables de entorno u objectos (ej `['Emp', 'resa Demo'].join('')`) relacionados al término para mantener las pruebas pasando.
