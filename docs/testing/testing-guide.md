# 🧪 Testing - GesFer Cliente

## Configuración de Tests

El proyecto utiliza **Jest** y **React Testing Library** para testing.

## 📦 Dependencias de Testing

- `jest` - Framework de testing
- `jest-environment-jsdom` - Entorno de testing para componentes React
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/jest-dom` - Matchers adicionales para Jest
- `@testing-library/user-event` - Simulación de interacciones de usuario

## 🚀 Ejecutar Tests

### Ejecutar todos los tests
```powershell
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```powershell
npm run test:watch
```

### Ejecutar tests con cobertura
```powershell
npm run test:coverage
```

## 📁 Estructura de Tests

Los tests están organizados en la carpeta `__tests__` (y otros bajo `src/`, p. ej. `tests/` para E2E):

```
src/
├── __tests__/            # Tests Jest (app, components, lib, …)
├── tests/                # Playwright y pruebas E2E
├── jest.config.js
└── jest.setup.js
```

## ✍️ Escribir Tests

### Ejemplo: Test de Componente

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Ejemplo: Test de Utilidad

```typescript
import { cn } from '@/lib/utils/cn'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })
})
```

### Ejemplo: Test de API

```typescript
import { apiClient } from '@/lib/api/client'

global.fetch = jest.fn()

describe('ApiClient', () => {
  it('should make GET request successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    })

    const result = await apiClient.get('/api/test')
    expect(result).toEqual(mockData)
  })
})
```

## 🎯 Buenas Prácticas

1. **Usa queries accesibles**: Prefiere `getByRole`, `getByLabelText`, etc.
2. **Testea comportamiento, no implementación**: Enfócate en lo que el usuario ve y hace
3. **Mockea dependencias externas**: API calls, localStorage, router, etc.
4. **Usa nombres descriptivos**: Los nombres de los tests deben describir qué están probando
5. **Organiza tests por funcionalidad**: Agrupa tests relacionados con `describe`

## 🔧 Configuración

### Jest Config (`jest.config.js`)

- Configurado para trabajar con Next.js
- Mapeo de rutas `@/*` configurado
- Entorno: `jsdom` para testing de componentes React
- Cobertura configurada para `app/`, `components/`, `lib/`, `contexts/`

### Setup (`jest.setup.js`)

- Configuración de `@testing-library/jest-dom`
- Mocks de Next.js router
- Mocks de `window.matchMedia`
- Mocks de `localStorage`

## 📊 Cobertura de Código

Para ver la cobertura de código:

```powershell
npm run test:coverage
```

Esto generará un reporte en la carpeta `coverage/` con:
- Cobertura por archivo
- Líneas cubiertas/no cubiertas
- Funciones y branches cubiertos

## 🐛 Debugging Tests

### Ejecutar un test específico

```powershell
npm test -- button.test.tsx
```

### Ejecutar tests que coincidan con un patrón

```powershell
npm test -- --testNamePattern="should render"
```

### Ver output detallado

```powershell
npm test -- --verbose
```

## 📝 Tests Incluidos

### Componentes UI
- ✅ `Button` - Renderizado, eventos, variantes, tamaños
- ✅ `Input` - Renderizado, entrada de usuario, estados

### Utilidades
- ✅ `cn` - Merge de clases, condiciones, override de clases

### API Client
- ✅ GET requests
- ✅ POST requests
- ✅ Manejo de errores
- ✅ Autenticación con tokens

### Páginas
- ✅ Login - Formulario, validación, manejo de errores

## 🚧 Próximos Tests a Implementar

- [ ] Tests para componentes `Card`, `Label`, `Loading`, `ErrorMessage`
- [ ] Tests para contexto de autenticación
- [ ] Tests para páginas `Dashboard`, `Usuarios`, `Clientes`
- [ ] Tests de integración para flujos completos
- [ ] Tests E2E con Playwright o Cypress

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)
- [Next.js Testing](https://nextjs.org/docs/testing)

# Tests de Playwright - GesFer

Este directorio contiene los tests de automatización E2E y API usando Playwright.

## Estructura de Carpetas

```
tests/
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
    ├── BasePage.ts
    ├── LoginPage.ts
    ├── DashboardPage.ts
    └── UsuariosPage.ts
```

## Configuración

- **Web**: http://localhost:3000
- **API**: `API_URL` / origen configurado (p. ej. http://localhost:5020)

La configuración se encuentra en `playwright.config.ts` en la raíz del proyecto.

## Comandos Disponibles

```bash
# Ejecutar todos los tests
npm run test:e2e

# Ejecutar tests con UI interactiva
npm run test:e2e:ui

# Ejecutar tests en modo debug
npm run test:e2e:debug

# Ejecutar tests con navegador visible
npm run test:e2e:headed

# Ver reporte HTML
npm run test:e2e:report
```

## Page Objects

Los Page Objects encapsulan la lógica de interacción con las páginas:

- `BasePage`: Clase base con funcionalidad común
- `LoginPage`: Manejo de la página de login
- `DashboardPage`: Manejo del dashboard
- `UsuariosPage`: Manejo de la página de usuarios

## Fixtures

Los fixtures proporcionan datos y configuraciones reutilizables:

- `authenticatedPage`: Página ya autenticada con token
- `apiClient`: Cliente API configurado

## Ejecutar Tests Específicos

```bash
# Solo tests de login
npx playwright test tests/e2e/login.spec.ts

# Solo tests de API
npx playwright test tests/api/

# Tests en un navegador específico
npx playwright test --project=chromium
```

## Requisitos Previos

**E2E (navegador + API):**
1. La aplicación web debe estar ejecutándose en `http://localhost:3000` (o la levanta Playwright con webServer)
2. La API **real** debe estar en el origen configurado (p. ej. `http://localhost:5020`) **o** usar mock: `USE_MOCK_API=1` y `API_URL=http://localhost:5002` (tras levantar `infrastructure/mock-apis`)

**Solo tests de API (sin frontend):** `npm run test:e2e:api`. API real en el origen configurado (p. ej. 5020), o mock en 5002 con `USE_MOCK_API=1` y `API_URL=http://localhost:5002`.

### E2E API (Product Back) con mock

Tests E2E que validan **solo el backend (API) de Product**, con dependencias mockeadas (sin API real ni BD):

1. **Levantar el mock** (Product en 5002):
   ```powershell
   cd infrastructure\mock-apis
   npm install
   npm start
   ```
2. **Ejecutar la suite de API** desde Product Front:
   ```powershell
   cd src\Product\Front
   $env:USE_MOCK_API="1"; $env:API_URL="http://127.0.0.1:5002"
   npm run test:e2e:api
   ```
   Ver también: `docs/infrastructure/MOCK_APIS_AND_TEST_MODES.md`.

Credenciales de prueba (API real o mock):
- Company: "Emp" + "resa Demo"
- Usuario: "admin"
- Contraseña: "admin123"

## Reporte HTML (localhost:9323)

Tras ejecutar `npm run test:e2e`, puedes abrir el reporte con:

```bash
npm run test:e2e:report
```

Playwright abre el reporte en un puerto disponible (por ejemplo **http://localhost:9323**). Ahí ves qué tests pasaron o fallaron, traces y capturas. Si todos los tests salen "malos", suele ser porque **la API no estaba en ejecución** al correr los tests: el `globalSetup` comprueba que la API (health en el origen configurado) responda antes de empezar; si no, falla con un mensaje claro.

## Notas

- Los tests se ejecutan en paralelo por defecto
- **Antes de ejecutar E2E:** la API Product debe estar levantada en el origen configurado (p. ej. puerto **5020** o el definido en `API_URL`/`.env`)
- Los screenshots y videos se guardan solo cuando fallan
- Los traces se guardan solo en reintentos
- El reporte HTML se genera automáticamente después de cada ejecución
