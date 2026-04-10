---
id: KAIZEN-20260410-001
title: Fix testid in UI Components
status: PENDING
priority: medium
---
# Fix testid in UI Components

## Descripción
En la memoria del proyecto se menciona: "UI components in `src/components/ui/` should explicitly include `'data-testid'?: string` in their props interfaces to standardize testing hooks."

Revisando `src/components/ui/input.tsx` y `src/components/ui/button.tsx`, vemos que no tienen explicitamente definido `'data-testid'?: string` en su interfaz (InputProps solo extiende `React.InputHTMLAttributes<HTMLInputElement>`). Debemos añadir la propiedad `'data-testid'?: string` en las props de los componentes de UI.

## Componentes a revisar
- src/components/ui/input.tsx
- src/components/ui/button.tsx
- src/components/ui/card.tsx
- src/components/ui/alert-dialog.tsx
- src/components/ui/dialog.tsx
- src/components/ui/form.tsx
- src/components/ui/label.tsx
- src/components/ui/select.tsx
- src/components/ui/table.tsx

## Objetivo
Añadir explícitamente `'data-testid'?: string;` a las interfaces de Props de cada componente en `src/components/ui/` si corresponde (sobre todo si definen interfaces personalizadas como InputProps, ButtonProps).
