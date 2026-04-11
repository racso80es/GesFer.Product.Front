---
id: kaizen-2026-04-11-test-id-standardization
action_id: feature-spec
feature_id: kaizen-2026-04-11-test-id-standardization
title: Spec para Estandarizar data-testid en componentes UI
status: active
---

# Especificación

## Alcance
Modificar los siguientes archivos en `src/components/ui/` que aún no tienen explícitamente `'data-testid'?: string` en sus props (o no lo usan explícitamente en destructuring si no usan interfaces base que lo incluyan y el proyecto prefiere la explicitud marcada en memoria):

- `alert-dialog.tsx`
- `button.tsx`
- `card.tsx`
- `dialog.tsx`
- `form.tsx`
- `input.tsx`
- `label.tsx`
- `overlay-fix.tsx`
- `select.tsx`
- `table.tsx`

## Implementación
Para los componentes que usan `forwardRef`, si ya extienden `React.HTMLAttributes<T>` (u otros que lo permiten como `React.ButtonHTMLAttributes`), técnica y tipadamente ya admiten `data-testid`, y al usar `{...props}` lo estarían propagando.

Sin embargo, el requerimiento de memoria dice:
"UI components in `src/components/ui/` should explicitly include `'data-testid'?: string` in their props interfaces to standardize testing hooks."

Por tanto:
Para cada interfaz / tipo de Props (ej. `ButtonProps`, `InputProps`), nos aseguraremos de que incluya explícitamente `'data-testid'?: string`.
Y si no tienen una interfaz definida (ej. solo usan genéricos en `forwardRef`), les crearemos una o extenderemos su tipo para incluir explícitamente `'data-testid'?: string;` si es posible, o al menos lo añadiremos en los tipos de los props.

**Nota:** Muchos componentes de Shadcn / Radix no definen una interfaz explícita local para cada subcomponente, sino que usan `React.ComponentPropsWithoutRef<typeof RadixPrimitive.XYZ>`. En esos casos, podemos definir una interfaz o tipo cruzado para agregar explícitamente la propiedad, por ejemplo:
`React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { 'data-testid'?: string }`.
