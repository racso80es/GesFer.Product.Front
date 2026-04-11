---
id: kaizen-2026-04-11-test-id-standardization
action_id: feature-implementation
feature_id: kaizen-2026-04-11-test-id-standardization
title: Implementación para Estandarizar data-testid en componentes UI
status: done
---

# Implementación

- Se han actualizado los archivos de Shadcn UI dentro de `src/components/ui/`:
  - `button.tsx`: Se añadió `'data-testid'?: string` a `ButtonProps`.
  - `input.tsx`: Se añadió `'data-testid'?: string` a `InputProps`.
  - `label.tsx`: Se añadió `'data-testid'?: string` a `LabelProps`.
  - `card.tsx`: Se extendieron los tipos genéricos de `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, y `CardFooter`.
  - `dialog.tsx`: Se incluyó en las interfaces principales (`DialogProps`, `DialogContentProps`, etc.) y se propagó el atributo al elemento `<div role="dialog">` raíz.
  - `alert-dialog.tsx`: Se actualizaron los tipos cruzados para soportarlo en `AlertDialogContent`, `AlertDialogAction` y `AlertDialogCancel`.
  - `form.tsx`: Se añadió a las aserciones de tipos genéricos de `FormItem`, `FormLabel`, `FormControl` y `FormMessage`.
  - `select.tsx`: Se extendió `SelectProps` y se propagó al `<div className="relative">` raíz.
  - `table.tsx`: Se incorporó en los tipos genéricos para todas las partes de la tabla.
- Los tests verifican correctamente la validez y no hay roturas.
