# Spec

La tarea resolverá dos problemas de a11y:
1. En `Select` base, se generará un ID único (ej: con `React.useId()`) y se proveerá en el `SelectContext`.
2. En `SelectTrigger`, se agregará `aria-controls={ctx.id}`.
3. En `SelectContent`, se agregará `id={ctx.id}`.
4. En `SelectItem`, se agregará `aria-selected={ctx.value === value}`.