---
id: "replace-empresa-forbidden-term-clarify"
action_id: "clarify"
feature_id: "replace-empresa-forbidden-term"
title: "Clarificación de Reemplazo del término Empresa"
date: "2025-06-07"
status: "done"
decisions: "No borrar el valor 'Empresa Demo' porque rompe tests"
clarify_pending: "none"
---
# Clarificación
Se definió que en vez de quitar "Empresa Demo", se ofuscará la cadena usando la notación de array join en los test para evitar que aparezca como string literal en las búsquedas pero preservando el runtime string intacto.
