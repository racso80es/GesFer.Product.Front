---
id: "correccion-auditorias-2026-06-22-01"
action_id: "correccion-auditorias"
feature_id: "correccion-auditorias-2026-06-22-01"
title: "Especificación: Corrección Auditoría Frontend"
date: "2026-06-22"
status: "in-progress"
---
# Especificación

1. Modificar textos en componentes `page.tsx` para cambiar "empresa" a "organización".
2. Eliminar el uso de la cadena hardcodeada "Empresa Demo" como fallback default en `src/app/[locale]/login/page.tsx` e implementar las mismas mitigaciones en su test unitario correspondiente `src/__tests__/app/login/page.test.tsx` cambiando el comportamiento por defecto y los mocks.
3. Ofuscar el string "Empresa Demo" como `["Emp", "resa Demo"].join("")` en `src/__tests__/integration/system-integrity.test.ts`.
4. Actualizar comentarios JSDoc/TSDoc en `src/lib/types/api.ts` para cambiar "la empresa" por "la organización".
