# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## ⚠️ Requisitos Previos

- **Node.js** 18+ (recomendado 20+)
- **npm** (viene incluido con Node.js)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

Para verificar que Node y npm están instalados, ejecuta en tu terminal:
```bash
node --version
npm --version
```

## 📦 Instalación y Setup Rápido

Desde la raíz del repositorio, entra a la carpeta `src` e instala dependencias:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
```

### Configuración de la API

La fuente de verdad del contrato (REST) es el API backend (OpenAPI). Edita el archivo `.env.local` en la raíz de `src/` para apuntar a la URL correcta:

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```
> **Nota:** Si tu API está ejecutándose en un puerto diferente (ej. HTTPS `https://localhost:5021`), asegúrate de cambiar esta variable y reiniciar el servidor Next.js.

### Ejecutar la Aplicación

**Modo Desarrollo:**
```bash
npm run dev
```
La aplicación estará disponible en: **http://localhost:3000**

**Modo Producción:**
```bash
npm run build
npm start
```

## ⚙️ Configuración de Entornos (App y Tests)

El sistema soporta configuraciones para diferentes entornos en la carpeta `src/config/`. Respeta las siguientes variables de entorno principales:
- `NODE_ENV`: Determina el entorno (development, production, test)
- `NEXT_PUBLIC_ENV`: Para el navegador (production, development)
- `NEXT_PUBLIC_API_URL`: URL de la API (tiene prioridad)
- `NEXT_PUBLIC_CLIENT_URL`: URL del cliente (tiene prioridad)
- Base de datos / Caché: `DB_SERVER`, `DB_USER`, `CACHE_SERVER`, etc.

Los archivos base de entorno se encuentran mapeados a JSON (ej. `local.json`, `production.json`, `test.json`) y pueden usarse dentro de `src/lib/config.ts`.

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

## Scripts disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |

## 🐛 Solución de problemas

### Error: "npm no se reconoce" o "Cannot find module"
1. Asegúrate de tener Node.js instalado y en el PATH.
2. Elimina la carpeta `node_modules/` y el archivo `package-lock.json`.
3. Vuelve a ejecutar `npm install`.

### Error de conexión a la API
1. Comprueba que la API esté en ejecución.
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local` y que no tenga una barra final (`/`).
3. Revisa los errores de CORS en la consola del backend y del navegador.

### Problemas de autenticación
1. Credenciales correctas y empresa válida.
2. Errores en la consola del navegador.
3. Limpia almacenamiento local/cookies si quedan sesiones corruptas.

## Documentación y Normas SddIA

Toda la documentación arquitectónica, normas, y logs se encuentra consolidada para evitar archivos redundantes en el paquete `src/`.

| Recurso | Contenido |
|--------|-----------|
| `README.md` (Este archivo) | Vista unificada de setup, configuración e inicio |
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `docs/testing/testing-guide.md` | Guía de pruebas unitarias (Jest) |
| `docs/testing/playwright-readme.md` | Guía de configuración E2E (Playwright) |
| `docs/testing/playwright-best-practices.md` | Prácticas óptimas para tests de UI (Playwright) |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |

## Scripts y automatización (IA)

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Licencia

Este proyecto es parte del sistema GesFer.