---
id: Kaizen_2026_03_28_fix_select_a11y
title: "Fix A11y Warnings in Select Component"
created: "2026-03-28"
status: "pending"
priority: "high"
type: "kaizen"
---

# Kaizen: Fix A11y Warnings in Select Component

## Descripción
Se han detectado advertencias de accesibilidad (A11y) en el componente `src/components/ui/select.tsx` al ejecutar el linter (`npm run lint` en `src/`).

### Advertencias Detectadas
```
./components/ui/select.tsx
79:7  Warning: Elements with the ARIA role "combobox" must have the following attributes defined: aria-controls,aria-expanded  jsx-a11y/role-has-required-aria-props
141:7  Warning: Elements with the ARIA role "option" must have the following attributes defined: aria-selected  jsx-a11y/role-has-required-aria-props
```

## Objetivos
1. Resolver los warnings de `jsx-a11y/role-has-required-aria-props`.
2. Añadir el atributo `aria-controls` en el `SelectTrigger` (role="combobox") vinculándolo al `SelectContent`.
3. Añadir el atributo `aria-selected` en cada `SelectItem` (role="option").
4. Asegurar que las pruebas pasen y que no queden errores ni warnings de linting.

## Criterios de Aceptación
- La ejecución de `npm run lint` en `src/` no arroja warnings relacionados con `jsx-a11y/role-has-required-aria-props` en `select.tsx`.
- El componente `Select` provee un ID único mediante su contexto, que es consumido por el trigger y el content para el enlace `aria-controls`.
- El componente `SelectItem` utiliza `aria-selected={ctx.value === value}`.
