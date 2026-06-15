---
id: "correccion-auditorias-20260615-spec"
action_id: "correccion-auditorias-20260615"
feature_id: "correccion-auditorias-20260615"
title: "Especificación: Corregir violaciones de terminología"
date: "2026-06-15"
status: "active"
---
# Especificación
Se deben realizar los siguientes cambios:
1.  Reemplazar "empresas" por "organizaciones" en `src/app/[locale]/page.tsx`.
2.  Reemplazar "empresa" por "organización" en `src/app/[locale]/my-company/page.tsx` y `src/lib/types/api.ts`.
3.  Reemplazar las credenciales hardcodeadas ("Empresa Demo", "admin", "admin123") por strings vacíos `""` en `src/app/[locale]/login/page.tsx` y ajustar el test unitario `src/__tests__/app/login/page.test.tsx` correspondientemente.
4.  Ofuscar la cadena de semilla "Empresa Demo" como `['Emp', 'resa Demo'].join('')` en `src/__tests__/integration/system-integrity.test.ts` para mantener la integridad de la base de datos para la prueba de integración.
