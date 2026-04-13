---
id: ui-components-testid-objectives
action_id: objectives
feature_id: ui-components-testid
title: Objetivos para KAIZEN-20260410-001
status: DONE
---

# Objetivos para KAIZEN-20260410-001

## Objetivo
Añadir la propiedad `data-testid` a las interfaces de los componentes UI en `src/components/ui/` para estandarizar los hooks de testing y cumplir con las memorias del proyecto.

## Alcance
- Modificar `src/components/ui/input.tsx` para extender `InputProps` e incluir `'data-testid'?: string;` de manera explícita si no está.
- Modificar `src/components/ui/button.tsx` para extender `ButtonProps` e incluir `'data-testid'?: string;`.
- Revisar y ajustar otros componentes en `src/components/ui/` si es necesario, pero focalizándose en los requeridos.
