# Especificaciones

- Eliminar todas las instancias de la palabra "empresa" del código y reemplazarlas por "organización" (o equivalentemente seguro según el contexto).
- Modificar `src/app/[locale]/login/page.tsx` para que no contenga el respaldo hardcodeado en la función `getDefaultLoginCredentials`.
- Modificar `src/__tests__/app/login/page.test.tsx` y `src/__tests__/integration/system-integrity.test.ts` para usar "Organización Demo".
- Modificar comentarios y textos visuales relacionados en `src/app/[locale]/page.tsx`, `src/app/[locale]/my-company/page.tsx`, y `src/lib/types/api.ts`.
