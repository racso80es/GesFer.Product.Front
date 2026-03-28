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
```

### Configuración de la URL de la API

Edita el archivo `.env.local` y cambia la URL si es necesario:

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

Para aplicar cambios en variables de entorno, es necesario **reiniciar** el servidor de desarrollo (`npm run dev`).

### Ejecutar la Aplicación

```powershell
# Iniciar servidor de desarrollo
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

*(Ajustar según tu backend y seeds.)*

## Componentes UI & Cliente API

- **Componentes UI:** Al estilo Shadcn en `src/components/ui/` (Button, Input, Card, Label, Loading, ErrorMessage, etc.).
- **Cliente API:** Cliente HTTP en `src/lib/api/` (p. ej. `client-client.ts`, `client-server.ts`). Funciones por dominio: `auth.ts`, `users.ts`, `customers.ts`, empresas, maestros, etc.
- **TanStack Query:** Configuración habitual: `staleTime` ~1 minuto, `refetchOnWindowFocus`: false, `retry`: 1.

## Rutas protegidas

Las rutas que requieren sesión usan el patrón de componente/layout que verifica autenticación antes de renderizar (p. ej. `ProtectedRoute`).

## Scripts disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |
| `npm test` | Testing (Jest + React Testing Library) |
| `npm run test:e2e` | End-to-End Testing (Playwright) |

## Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### Error: "npm no se reconoce"
Asegúrate de tener Node.js instalado y reinicia la terminal para actualizar el `PATH`.

### Error: "Cannot find module"
Elimina `node_modules` y `package-lock.json` en `src/`, y ejecuta `npm install` nuevamente.

### El servidor no responde en el navegador (Puerto ocupado/No levanta)
- Verifica que no haya procesos zombis de Node.js en el puerto 3000:
  ```powershell
  # Detener procesos Node.js en Windows
  Get-Process -Name node | Stop-Process -Force
  ```
- Limpia la cache de Next.js:
  ```powershell
  Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
  ```
- Inicia el servidor de nuevo.

### Error de conexión a la API
1. Comprueba que la API esté en ejecución.
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local` (el puerto debe coincidir).
3. Asegúrate de que no haya una barra final (`/`) en la URL de `.env.local`.
4. Revisa CORS en el backend si las peticiones fallan en el cliente (Network en DevTools).

## Documentación y Guías

| Recurso | Contenido |
|--------|-----------|
| `docs/testing/testing-guide.md` | Guía de Testing Unitario, Integración y E2E |
| `docs/architecture/i18n-guide.md` | Guía de Arquitectura para Internacionalización |
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |

## Scripts y automatización (SddIA)

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Licencia

Este proyecto es parte del sistema GesFer.