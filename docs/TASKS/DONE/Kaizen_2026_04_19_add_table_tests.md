---
id: Kaizen_2026_04_19_add_table_tests
title: Add unit tests for Table UI component
type: kaizen
status: PENDING
created: 2026-04-19
---

# Kaizen: Add unit tests for Table UI component

El componente de interfaz de usuario `src/components/ui/table.tsx` tiene un 0% de cobertura de código según los resultados de Jest.
Se requiere agregar tests unitarios para `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead` y `TableCell` usando Jest y React Testing Library, y asegurar que manejan correctamente las props como `className` y `data-testid` entre otras funcionalidades básicas, elevando la cobertura a un valor aceptable.