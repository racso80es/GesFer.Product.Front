# Implementation

- **`src/components/ui/select.tsx`**:
  - Modificado el tipo `SelectContextValue` agregando `id: string`.
  - Agregado `const id = React.useId();` al componente `Select` y agregado al contexto de proveedor.
  - Agregado `aria-controls={ctx.id}` en `SelectTrigger` (`role="combobox"`).
  - Agregado `id={ctx.id}` en `SelectContent`.
  - Agregado `aria-selected={ctx.value === value}` en `SelectItem` (`role="option"`).