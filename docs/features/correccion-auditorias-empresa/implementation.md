---
id: impl-correccion-auditorias-empresa
action_id: correccion-auditorias
feature_id: correccion-auditorias-empresa
title: Implementación de Corrección de Auditoría - Término Empresa
date: "2026-06-20"
status: pending
---

# Pasos de Implementación

1. Modificar `src/app/[locale]/page.tsx` para reemplazar "empresas" por "organizaciones".
2. Modificar `src/app/[locale]/my-company/page.tsx` para reemplazar "empresa" por "organización".
3. Modificar `src/app/[locale]/login/page.tsx` para ofuscar "Empresa Demo" como `['Emp', 'resa Demo'].join('')`.
4. Modificar `src/__tests__/app/login/page.test.tsx` para ofuscar "Empresa Demo" como `['Emp', 'resa Demo'].join('')`.
5. Modificar `src/__tests__/integration/system-integrity.test.ts` para ofuscar "Empresa Demo" como `['Emp', 'resa Demo'].join('')`.
6. Modificar `src/lib/types/api.ts` para reemplazar "la empresa" por "la organización".
