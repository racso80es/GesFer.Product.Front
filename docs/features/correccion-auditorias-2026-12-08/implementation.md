---
type: implementation
status: completed
---

# Implementación
- Se modificó `src/__tests__/lib/api/id-validation-api.test.ts`.
- La línea `import { apiClient } from "@/lib/api/client";` se movió justo después de la importación de `usersApi`, solventando el `Import in body of module` error arrojado por ESLint.
