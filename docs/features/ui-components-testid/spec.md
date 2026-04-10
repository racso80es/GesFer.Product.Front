---
id: ui-components-testid-spec
action_id: spec
feature_id: ui-components-testid
title: Especificación para KAIZEN-20260410-001
status: DONE
---

# Especificación Técnica

## Componentes afectados
- `src/components/ui/input.tsx`
- `src/components/ui/button.tsx`

## Modificaciones
Para cada componente, modificar su interfaz de props para incluir:
`'data-testid'?: string;`

Esto puede requerir cambiar `export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}` a:
```typescript
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-testid'?: string;
}
```

Lo mismo para `ButtonProps`.
