# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm**
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

## Inicio rápido

Desde la raíz del repositorio:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL apuntando a la API backend
npm run dev
```

Por defecto, el servidor de desarrollo queda en **http://localhost:3000**.

## Tecnologías

- **Next.js 14+** — App Router
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query** — estado del servidor
- **Lucide React** — iconos
- **Shadcn/UI** — componentes base (estilo)

## Estructura del paquete (`src/`)

```
src/
├── app/                 # App Router: rutas por locale, grupos (client), API NextAuth, etc.
├── components/          # UI reutilizable (ui/, layout/, auth/, masters/, …)
├── lib/                 # api/, providers/, utils/, tipos, configuración
├── public/              # Estáticos
├── messages/            # Cadenas i18n (es, en, ca, …)
├── auth.ts              # Configuración NextAuth (según versión del proyecto)
└── middleware.ts        # Enrutado / locale si aplica
```

## Autenticación

Autenticación basada en sesión/tokens según la configuración actual (p. ej. NextAuth en `app/api/auth/` y `auth.ts`). El contexto de sesión y componentes como `ProtectedRoute` gestionan el acceso a rutas privadas.

### Credenciales de ejemplo (entorno demo)

- **Company**: Empresa Demo  
- **Usuario**: admin  
- **Contraseña**: admin123  

(Ajustar según tu backend y seeds.)

## Componentes UI

Componentes al estilo Shadcn en `components/ui/` (Button, Input, Card, Label, Loading, ErrorMessage, etc.).

## Cliente API

Cliente HTTP en `lib/api/` (p. ej. `client-client.ts`, `client-server.ts` según el proyecto). Funciones por dominio: `auth.ts`, `users.ts`, `customers.ts`, empresas, maestros, etc.

## TanStack Query

Configuración habitual: `staleTime` ~1 minuto, `refetchOnWindowFocus`: false, `retry`: 1 (revisar en el provider de la app).

## Rutas protegidas

Las rutas que requieren sesión usan el patrón de componente/layout que verifica autenticación antes de renderizar (p. ej. `ProtectedRoute`).

## Scripts disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |

Más detalle operativo: `src/SETUP.md`, `src/CONFIGURACION-API.md`. Para más detalles sobre testing, consulta la sección [Testing](#-testing---gesfer-cliente) más abajo.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### Error de conexión a la API

1. Comprueba que la API esté en ejecución.  
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local`.  
3. Revisa CORS en el backend.

### Problemas de autenticación

1. Credenciales correctas y empresa válida.  
2. Errores en la consola del navegador.  
3. Limpia almacenamiento local/cookies si quedan sesiones corruptas.

## Documentación

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |
| Este archivo | Vista unificada del repo y del paquete en `src/` |

## Scripts y automatización

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Licencia

Este proyecto es parte del sistema GesFer.
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
