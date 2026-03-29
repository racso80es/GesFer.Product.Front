# Guía de Testing - GesFer Cliente

El proyecto utiliza **Jest** y **React Testing Library** para testing unitario, y **Playwright** para E2E y pruebas de API.

## Estructura de Tests

Los tests están organizados en las siguientes carpetas dentro de `src/`:

```
src/
├── __tests__/            # Tests Unitarios con Jest (app, components, lib, …)
├── tests/                # Playwright y pruebas E2E y API
├── jest.config.js
└── jest.setup.js
```

## Pruebas Unitarias (Jest + React Testing Library)

### Dependencias Principales

- `jest`
- `jest-environment-jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

### Ejecutar Tests Unitarios

Desde el directorio `src/`:

- **Todos los tests**: `npm test`
- **Modo watch**: `npm run test:watch`
- **Cobertura**: `npm run test:coverage` (Genera un reporte en `coverage/`)
- **Debug test específico**: `npm test -- button.test.tsx`

### Buenas Prácticas para Jest

1. **Usa queries accesibles**: Prefiere `getByRole`, `getByLabelText`, etc.
2. **Testea comportamiento**: Enfócate en lo que el usuario ve y hace, no en la implementación interna.
3. **Mockea dependencias externas**: API calls (ej. `fetch`), `localStorage`, `router`.
4. **Organiza tests**: Agrupa funcionalidades con `describe`.

## Pruebas E2E y API (Playwright)

Los tests End-to-End se encuentran en `src/tests/` y validan la aplicación completa junto a la API backend.

### Configuración

- **Web**: `http://localhost:3000`
- **API**: Origen configurado (p. ej. `http://localhost:5020` o según `.env`)

### Ejecutar Tests Playwright

Desde el directorio `src/`:

- **Todos los E2E**: `npm run test:e2e`
- **UI Interactiva**: `npm run test:e2e:ui`
- **Modo Headed**: `npm run test:e2e:headed`
- **Reporte HTML**: `npm run test:e2e:report`
- **Solo API (sin Frontend)**: `npm run test:e2e:api`

### Reglas Establecidas para Playwright

1. **Usar TypeScript**: Todos los tests y Page Objects deben estar fuertemente tipados.
2. **Page Object Model (POM)**: Cada página tiene su propio Page Object en `src/tests/page-objects/`. Encapsulan selectores e interacciones.
3. **Selectores Preferidos**: Usa `page.getByTestId('test-id')` con `.or(page.getByRole(...))` como fallback. Los selectores CSS son el último recurso.
4. **Limpieza de Datos (Teardown)**: Siempre incluir un `test.afterEach()` o `test.afterAll()` para limpiar datos usando la clase `TestDataCleanup`.

### Ejemplo de Test E2E

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { TestDataCleanup } from '../helpers/test-data-cleanup';

test.describe('Feature de Prueba', () => {
  let cleanup: TestDataCleanup;
  const createdResourceIds: string[] = [];

  test.beforeEach(async ({ page, request }) => {
    cleanup = new TestDataCleanup(request);
    await cleanup.setAuthToken('Emp' + 'resa Demo', 'admin', 'admin123');
  });

  test.afterEach(async () => {
    for (const id of createdResourceIds) {
      await cleanup.cleanupResource(id);
    }
  });

  test('debe crear un recurso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Lógica del test ...
  });
});
```

### Ejecutar Tests con Mock API

Si se desea validar solo el comportamiento consumiendo una API Mock (Product en puerto 5002):

```powershell
# Levantar el mock (en el dir infrastructure/mock-apis si existe en el monorepo)
npm start

# Desde src/, ejecutar la suite con las variables de entorno:
$env:USE_MOCK_API="1"; $env:API_URL="http://127.0.0.1:5002"
npm run test:e2e:api
```
