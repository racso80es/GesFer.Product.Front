# 🧪 Guía de Testing - GesFer Cliente

Este documento unifica las instrucciones para ejecutar y crear tests en el proyecto GesFer.Product.Front.

## 1. Unit & Integration Testing (Jest + React Testing Library)

El proyecto utiliza **Jest** y **React Testing Library** para testing de componentes, utilidades y hooks.

### 📦 Dependencias Principales

- `jest` - Framework de testing
- `jest-environment-jsdom` - Entorno de testing para componentes React
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/jest-dom` - Matchers adicionales para Jest
- `@testing-library/user-event` - Simulación de interacciones de usuario

### 🚀 Comandos Disponibles

Desde el directorio `src/`:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (desarrollo)
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### 📁 Estructura de Tests

```
src/
├── __tests__/            # Tests Jest (app, components, lib, …)
├── jest.config.js
└── jest.setup.js
```

### 🎯 Buenas Prácticas

1. **Usa queries accesibles**: Prefiere `getByRole`, `getByLabelText`, etc.
2. **Testea comportamiento, no implementación**: Enfócate en lo que el usuario ve y hace
3. **Mockea dependencias externas**: API calls, localStorage, router, etc.
4. **Usa nombres descriptivos**: Los nombres de los tests deben describir qué están probando
5. **Organiza tests por funcionalidad**: Agrupa tests relacionados con `describe`

---

## 2. End-to-End (E2E) y API Testing (Playwright)

Los tests de automatización E2E y de API utilizan **Playwright**.

### 📁 Estructura E2E

```
src/tests/
├── api/                    # Tests de API (origen API, p. ej. localhost:5020)
│   ├── api-client.ts        # Cliente API reutilizable
│   ├── auth-api.spec.ts
│   └── usuarios-api.spec.ts
├── e2e/                    # Tests End-to-End (localhost:3000)
│   ├── login.spec.ts
│   └── usuarios.spec.ts
├── fixtures/               # Fixtures reutilizables
│   └── auth.fixture.ts
└── page-objects/          # Page Object Model
```

### 🚀 Comandos Disponibles

Desde el directorio `src/`:

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar tests con UI interactiva
npm run test:e2e:ui

# Ejecutar tests en modo debug
npm run test:e2e:debug

# Ejecutar tests con navegador visible
npm run test:e2e:headed

# Ver reporte HTML (abre en localhost:9323)
npm run test:e2e:report
```

### ⚠️ Requisitos Previos (E2E)

1. **Web:** La aplicación web debe estar ejecutándose en `http://localhost:3000` (o Playwright la levantará mediante `webServer`).
2. **API:** La API debe estar disponible en la URL configurada en `API_URL` (por defecto el frontend asume `http://localhost:5020`). Para usar el mock, levantar el servicio mock (en `infrastructure/mock-apis`) y configurar:
   ```bash
   USE_MOCK_API=1 API_URL=http://localhost:5002 npm run test:e2e:api
   ```
