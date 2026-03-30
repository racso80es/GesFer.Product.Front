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

Más detalle operativo: `src/SETUP.md`, `src/CONFIGURACION-API.md`, tests en `src/tests/README.md`.

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

## Configuración de Entornos

Este directorio contiene los archivos de configuración para diferentes entornos de la aplicación GesFer.

### Archivos de Configuración

- **local.json**: Configuración para desarrollo local (127.0.0.1)
- **development.json**: Configuración para entorno de desarrollo (localhost)
- **production.json**: Configuración para producción
- **test.json**: Configuración para tests (mismo que local)

### Estructura

Cada archivo de configuración tiene la siguiente estructura:

```json
{
  "api": {
    "url": "http://127.0.0.1:5020"
  },
  "client": {
    "url": "http://localhost:3000"
  },
  "database": {
    "server": "localhost",
    "port": 3306,
    "database": "ScrapDb",
    "user": "scrapuser",
    "password": "scrappassword",
    "connectionString": "Server=localhost;Port=3306;Database=ScrapDb;User=scrapuser;Password=scrappassword;CharSet=utf8mb4;AllowUserVariables=True;AllowLoadLocalInfile=True;"
  },
  "cache": {
    "server": "localhost",
    "port": 11211,
    "enabled": true
  },
  "environment": "local"
}
```

### Uso

#### En el código de la aplicación

```typescript
import { API_URL, CLIENT_URL, DATABASE_CONFIG, DATABASE_CONNECTION_STRING, CACHE_CONFIG, CACHE_URL, appConfig } from '@/lib/config';

// Usar directamente las URLs
const response = await fetch(`${API_URL}/api/users`);

// Acceder a la configuración completa
const env = appConfig.environment;

// Acceder a la configuración de base de datos
const dbServer = DATABASE_CONFIG.server;
const dbPort = DATABASE_CONFIG.port;
const dbConnectionString = DATABASE_CONNECTION_STRING;

// Acceder a la configuración de caché
const cacheServer = CACHE_CONFIG.server;
const cachePort = CACHE_CONFIG.port;
const cacheEnabled = CACHE_CONFIG.enabled;
const cacheUrl = CACHE_URL;
```

#### En tests

```typescript
import { TEST_API_URL, TEST_CLIENT_URL, TEST_DATABASE_CONFIG, TEST_DATABASE_CONNECTION_STRING, TEST_CACHE_CONFIG, TEST_CACHE_URL } from '@/lib/config.test';

const apiClient = new ApiClient(request, TEST_API_URL);
const testDbServer = TEST_DATABASE_CONFIG.server;
const testDbConnectionString = TEST_DATABASE_CONNECTION_STRING;
const testCacheServer = TEST_CACHE_CONFIG.server;
const testCacheUrl = TEST_CACHE_URL;
```

### Variables de Entorno

El sistema de configuración respeta las siguientes variables de entorno:

#### API y Cliente
- `NODE_ENV`: Determina el entorno (development, production, test)
- `NEXT_PUBLIC_ENV`: Para el navegador (production, development)
- `NEXT_PUBLIC_API_URL`: URL de la API (tiene prioridad sobre la configuración)
- `NEXT_PUBLIC_CLIENT_URL`: URL del cliente (tiene prioridad sobre la configuración)
- `API_URL`: URL de la API para tests
- `CLIENT_URL`: URL del cliente para tests

#### Base de Datos
- `DB_SERVER`: Servidor de base de datos (por defecto: localhost)
- `DB_PORT`: Puerto de base de datos (por defecto: 3306)
- `DB_DATABASE`: Nombre de la base de datos (por defecto: ScrapDb)
- `DB_USER`: Usuario de base de datos (por defecto: scrapuser)
- `DB_PASSWORD`: Contraseña de base de datos (por defecto: scrappassword)
- `DB_CONNECTION_STRING`: Cadena de conexión completa (se genera automáticamente si no se proporciona)

#### Caché (Memcached)
- `CACHE_SERVER`: Servidor de caché (por defecto: localhost)
- `CACHE_PORT`: Puerto de caché (por defecto: 11211)
- `CACHE_ENABLED`: Habilitar/deshabilitar caché (por defecto: true, usar 'false' para deshabilitar)

### Detección Automática del Entorno

El sistema detecta automáticamente el entorno:

1. **Node.js (servidor/tests)**:
   - `NODE_ENV=test` o `TEST_ENV=true` → `test`
   - `NODE_ENV=production` → `production`
   - `NODE_ENV=development` → `development`
   - Por defecto → `local`

2. **Navegador (cliente)**:
   - `NEXT_PUBLIC_ENV=production` → `production`
   - `NEXT_PUBLIC_ENV=development` → `development`
   - Por defecto → `development`

### Personalización

Para cambiar las URLs en un entorno específico, edita el archivo correspondiente en `config/` o establece las variables de entorno apropiadas.

## Tests de Playwright

Este directorio contiene los tests de automatización E2E y API usando Playwright.

### Estructura de Carpetas

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

### Configuración de Tests

- **Web**: http://localhost:3000
- **API**: `API_URL` / origen configurado (p. ej. http://localhost:5020)

La configuración se encuentra en `playwright.config.ts` en la raíz del proyecto.

### Comandos Disponibles

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

### Page Objects

Los Page Objects encapsulan la lógica de interacción con las páginas:

- `BasePage`: Clase base con funcionalidad común
- `LoginPage`: Manejo de la página de login
- `DashboardPage`: Manejo del dashboard
- `UsuariosPage`: Manejo de la página de usuarios

### Fixtures

Los fixtures proporcionan datos y configuraciones reutilizables:

- `authenticatedPage`: Página ya autenticada con token
- `apiClient`: Cliente API configurado

### Ejecutar Tests Específicos

```bash
# Solo tests de login
npx playwright test tests/e2e/login.spec.ts

# Solo tests de API
npx playwright test tests/api/

# Tests en un navegador específico
npx playwright test --project=chromium
```

### Requisitos Previos

**E2E (navegador + API):**
1. La aplicación web debe estar ejecutándose en `http://localhost:3000` (o la levanta Playwright con webServer)
2. La API **real** debe estar en el origen configurado (p. ej. `http://localhost:5020`) **o** usar mock: `USE_MOCK_API=1` y `API_URL=http://localhost:5002` (tras levantar `infrastructure/mock-apis`)

**Solo tests de API (sin frontend):** `npm run test:e2e:api`. API real en el origen configurado (p. ej. 5020), o mock en 5002 con `USE_MOCK_API=1` y `API_URL=http://localhost:5002`.

#### E2E API (Product Back) con mock

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

### Reporte HTML (localhost:9323)

Tras ejecutar `npm run test:e2e`, puedes abrir el reporte con:

```bash
npm run test:e2e:report
```

Playwright abre el reporte en un puerto disponible (por ejemplo **http://localhost:9323**). Ahí ves qué tests pasaron o fallaron, traces y capturas. Si todos los tests salen "malos", suele ser porque **la API no estaba en ejecución** al correr los tests: el `globalSetup` comprueba que la API (health en el origen configurado) responda antes de empezar; si no, falla con un mensaje claro.

### Notas de Tests

- Los tests se ejecutan en paralelo por defecto
- **Antes de ejecutar E2E:** la API Product debe estar levantada en el origen configurado (p. ej. puerto **5020** o el definido en `API_URL`/`.env`)
- Los screenshots y videos se guardan solo cuando fallan
- Los traces se guardan solo en reintentos
- El reporte HTML se genera automáticamente después de cada ejecución

## Licencia

Este proyecto es parte del sistema GesFer.
