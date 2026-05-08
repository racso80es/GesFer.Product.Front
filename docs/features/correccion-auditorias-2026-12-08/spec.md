---
type: specification
status: completed
---

# Especificaciones
- **Alcance**: Archivo `src/__tests__/lib/api/id-validation-api.test.ts`.
- **Acción**: Mover la importación de `apiClient` arriba, al inicio del módulo, antes de la llamada a `jest.mock`.
- **Efecto esperado**: Cumplimiento de la regla de eslint sin alterar el funcionamiento del test.
