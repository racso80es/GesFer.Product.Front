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

Más detalle arquitectónico en `docs/architecture/` (ej. Guía i18n). Para tests, ver `docs/testing/README-TESTS.md`.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### La aplicación no se conecta a la API o CORS error (ERR_EMPTY_RESPONSE)

1. Verifica que la API backend esté ejecutándose.
2. Verifica el valor de `NEXT_PUBLIC_API_URL` en `.env.local` y comprueba que coincide con el origen del backend (ej. `http://localhost:5020` o `https://localhost:5001`). Reinicia el servidor de Next.js (`npm run dev`) si cambias este valor.
3. Asegúrate de que los CORS en el backend están configurados para permitir peticiones desde tu origen (`http://localhost:3000`).

### El servidor no responde en el navegador

1. Asegúrate de tener Node.js instalado (`node --version`).
2. Detén cualquier proceso previo (ej. `Get-Process -Name node | Stop-Process -Force` en Windows).
3. Limpia el caché de Next.js (`rm -rf .next`).
4. Ejecuta `npm run dev` y espera el mensaje `Ready in X.Xs` antes de abrir el navegador.

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
