# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## ⚠️ Requisitos Previos

Antes de continuar, asegúrate de tener instalado:

- **Node.js** 18+ (recomendado 20+)
- **npm** (viene incluido con Node.js)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

## 🚀 Inicio Rápido e Instalación

### Configuración Automática (Recomendado)

Si estás en Windows y cumples los requisitos de PowerShell, puedes usar el script automatizado para la instalación:

```powershell
cd src
.\setup.ps1
```

Este script verificará Node.js, instalará dependencias (`npm install`) y creará tu entorno `.env.local`.

Una vez finalizado, puedes iniciar la aplicación:

```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Configuración Manual

Si prefieres o necesitas hacerlo manualmente desde la raíz del repositorio:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL apuntando a la API backend (ej. http://localhost:5020)
npm run dev
```

## 🔐 Autenticación y Credenciales de Prueba

Autenticación basada en sesión/tokens (ej. NextAuth en `app/api/auth/` y `auth.ts`). Las rutas que requieren sesión usan el componente `ProtectedRoute`.

Una vez que la aplicación esté ejecutándose, puedes usar estas credenciales (entorno demo/semillas):

- **Company / Organización**: Empresa Demo
- **Usuario**: admin
- **Contraseña**: admin123

## 🛠 Tecnologías

- **Next.js 14+** — App Router
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query** — estado del servidor
- **Lucide React** — iconos
- **Shadcn/UI** — componentes base (estilo)

## 📁 Estructura del Proyecto (`src/`)

```
src/
├── app/                 # App Router: rutas por locale, grupos (client), API NextAuth, etc.
├── components/          # UI reutilizable (ui/, layout/, auth/, masters/, …)
├── contexts/            # Contextos de React (Auth)
├── lib/                 # api/, providers/, utils/, tipos, configuración
├── public/              # Estáticos
├── messages/            # Cadenas i18n (es, en, ca, …)
├── auth.ts              # Configuración NextAuth
├── middleware.ts        # Enrutado / locale si aplica
└── __tests__/           # Tests Jest (app, components, lib, …)
```

## 🔗 Cliente API y TanStack Query

- **Cliente HTTP**: Ubicado en `lib/api/` (`client-client.ts`, `client-server.ts`). Funciones por dominio en `auth.ts`, `users.ts`, `customers.ts`, etc.
- **TanStack Query**: Configurado con `staleTime` ~1 minuto, `refetchOnWindowFocus: false`, `retry: 1` (ajustado en `QueryProvider`).

## 🧪 Testing

El proyecto utiliza **Jest** y **React Testing Library**. Para detalles sobre Playwright revisar la documentación correspondiente o `src/tests/README.md`.

### Dependencias Principales
- `jest`, `jest-environment-jsdom`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

### Comandos de Testing (desde `src/`)

| Comando | Descripción |
|--------|-------------|
| `npm test` | Ejecutar todos los tests |
| `npm run test:watch` | Ejecutar tests en modo watch (desarrollo) |
| `npm run test:coverage`| Ejecutar tests y generar reporte de cobertura en `coverage/` |

### Estructura de Tests
Los tests unitarios y de componentes están en `src/__tests__/`. Las pruebas de integración/E2E viven en `src/tests/`. Se mockean dependencias como llamadas a la API o `localStorage` en `jest.setup.js`.

## 📦 Scripts Disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Construir para producción (Build de producción) |
| `npm start` | Iniciar servidor de producción |
| `npm run lint` | Ejecutar Linter |
| `npm test` | Ejecutar Tests |

## 🐳 Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y variables necesarias) según el backend. Salida es **standalone** de Next.js (`src/next.config.js`).

## 🐛 Solución de problemas

### Error: "npm no se reconoce" o "Cannot find module"
- Asegúrate de tener Node.js instalado. Reinicia la terminal.
- Si fallan los módulos, elimina `node_modules/` y `package-lock.json` y vuelve a ejecutar `npm install`.

### Error de conexión a la API
- Comprueba que la API esté en ejecución.
- Verifica `NEXT_PUBLIC_API_URL` en `.env.local` y que CORS esté configurado en el backend.

### Problemas de autenticación
- Comprueba las credenciales correctas y empresa válida.
- Limpia almacenamiento local/cookies si hay sesiones corruptas o errores en la consola del navegador.

### El script de PowerShell no se ejecuta
Ejecuta PowerShell como administrador o cambia la política de ejecución:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📚 Documentación

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |
| `src/CONFIGURACION-API.md` | Detalle específico operativo de la API |
| `src/tests/README.md` | Testing avanzado e Integración/E2E |

*(Nota: La documentación general de setup e instrucciones de despliegue han sido unificadas en este mismo archivo).*

## ⚙️ Scripts y automatización

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## 📄 Licencia

Este proyecto es parte del sistema GesFer.