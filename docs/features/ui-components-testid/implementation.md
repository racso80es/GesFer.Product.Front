---
id: ui-components-testid-implementation
action_id: implementation
feature_id: ui-components-testid
title: Implementación para KAIZEN-20260410-001
status: DONE
---

# Implementación

- Fichero `src/components/ui/input.tsx`:
  Sustituir `export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}` por:
  ```typescript
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    'data-testid'?: string;
  }
  ```

- Fichero `src/components/ui/button.tsx`:
  Añadir `'data-testid'?: string;` a `ButtonProps`:
  ```typescript
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    'data-testid'?: string;
  }
  ```
