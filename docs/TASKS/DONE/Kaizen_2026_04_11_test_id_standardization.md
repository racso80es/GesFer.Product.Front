---
id: TASK-20260411-001
title: Estandarizar data-testid en componentes UI
status: pending
created: 2026-04-11
---

# Kaizen: Estandarizar data-testid en componentes UI

## Criterios
1. Actualizar los componentes en `src/components/ui/` para incluir la propiedad `'data-testid'?: string` en sus interfaces de props.
2. Pasar la propiedad `data-testid` al elemento raíz de cada componente UI.
3. Asegurar que las interfaces extienden correctamente los atributos HTML para admitir `data-testid` cuando sea aplicable (ej: React.HTMLAttributes).
4. El objetivo es cumplir con la memoria del proyecto: "UI components in `src/components/ui/` should explicitly include `'data-testid'?: string` in their props interfaces to standardize testing hooks."

## Contexto
Los componentes base de Shadcn UI no incluyen explícitamente `'data-testid'` en sus interfaces. En este proyecto se definió en memoria que todos los componentes de la carpeta `src/components/ui/` deben tener `data-testid` estandarizado para facilitar el testing, como ya se hizo en `error-message.tsx` y `loading.tsx`.
