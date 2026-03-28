# Plan

1. Actualizar `SelectContextValue` para incluir `id: string`.
2. Actualizar el componente `Select` para usar `React.useId()` y proveer el ID en el contexto.
3. Actualizar `SelectTrigger` para agregar `aria-controls={ctx.id}`.
4. Actualizar `SelectContent` para agregar `id={ctx.id}`.
5. Actualizar `SelectItem` para agregar `aria-selected={ctx.value === value}`.
6. Ejecutar el linter para comprobar la corrección de errores.