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
npm run dev # (Ejecutar el servidor de desarrollo)
```

Por defecto, el servidor de desarrollo queda en **http://localhost:3000**.
Alternativamente, existe un script de automatización `setup.ps1` en `src/`:

```powershell
cd src
.\setup.ps1
```

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

Más detalle operativo en tests se encuentra en `docs/testing/README-TESTS.md`.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### 1. El servidor no responde o hay problemas en puerto 3000

- **Síntoma**: No se abre en el navegador a pesar de ejecutar el servidor de desarrollo.
- **Solución**:
  1. Verifica que en consola dice `✓ Ready in X.Xs`
  2. Prueba `http://127.0.0.1:3000` o `http://[::1]:3000`
  3. Si el puerto 3000 está ocupado: cambia con `$env:PORT=3001` y ejecuta el servidor de desarrollo.
  4. Detén procesos trabados: `Get-Process -Name node | Stop-Process -Force` y borra la caché: `Remove-Item -Recurse -Force .next`

### 2. Error de conexión a la API (CORS / Failed to fetch / ERR_EMPTY_RESPONSE)

- **Síntoma**: Peticiones preflight que fallan o errores CORS.
- **Causa**: La URL en `.env.local` es incorrecta o la API no está corriendo.
- **Solución**:
  1. Verifica que la API backend esté ejecutándose (por ejemplo, en `http://localhost:5020` o `https://localhost:5001`).
  2. Ajusta `NEXT_PUBLIC_API_URL` en `.env.local` apuntando al origen de la API (esquema + host + puerto) sin barra final (`/`).
  3. Reinicia el servidor de Next.js después de modificar `.env.local`.
  4. Comprueba Swagger de la API (`http://localhost:5020/swagger`) en el navegador.

### 3. Problemas de autenticación

1. Credenciales correctas y empresa válida.  
2. Errores en la consola del navegador.  
3. Limpia almacenamiento local/cookies si quedan sesiones corruptas.

### 4. Error "Cannot find module" o "npm no se reconoce"

- Si npm no se reconoce, instala/reinstala Node.js (asegúrate de que esté en el PATH).
- Si faltan módulos, borra `node_modules/` y `package-lock.json`, y vuelve a instalar las dependencias.

## Documentación

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |
| `docs/architecture/` | Guías de arquitectura, incluyendo `I18N-GUIDE.md` |
| `docs/testing/` | Guías y utilidades para pruebas (`README-TESTS.md`) |
| Este archivo | Vista unificada del repo y del paquete en `src/` |

## Scripts y automatización

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Licencia

Este proyecto es parte del sistema GesFer.
