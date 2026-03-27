# Objectives

- Resolver warnings de `jsx-a11y/role-has-required-aria-props` en el componente Select (`src/components/ui/select.tsx`).
- Asegurar que `SelectTrigger` (role="combobox") tenga `aria-controls` definido apuntando al id de `SelectContent`.
- Asegurar que `SelectItem` (role="option") tenga `aria-selected` definido.