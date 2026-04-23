---
id: valid-2026-04-23-01
action_id: correccion-auditorias-ts
feature_id: correccion-auditorias-ts
title: "Validación de The Wall y Tests"
status: DONE
---

# Validación The Wall y Pruebas Unitarias/E2E

- La validación `cd src && npx tsc --noEmit` se ejecutará exitosamente.
- El comando `npm run test:all` en el proyecto confirmará que no existen regresiones.
Ambos pasos serán ejecutados en la validación The Wall global (step final del proceso) garantizando el cumplimiento del DoD en base a los datos recolectados.
