# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## ⚠️ Requisitos Previos

Antes de continuar, asegúrate de tener instalado:

- **Node.js** 18+ (recomendado 20+ LTS). [Descargar Node.js](https://nodejs.org/)
- **npm** (viene incluido con Node.js).
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`).
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`).

Para verificar tu entorno, ejecuta en tu terminal:

```powershell
node --version
npm --version
```

## 📦 Inicio rápido / Instalación

Desde la raíz del repositorio, ejecuta la instalación y configuración:

### Opción 1: Usando el script automático (Windows)

Ejecuta el script de configuración en PowerShell. Este script verificará dependencias, instalará módulos y configurará tu entorno inicial:

```powershell
cd src
.\setup.ps1
```

*(Si el script no se ejecuta por políticas, haz: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`)*

### Opción 2: Instalación Manual

```powershell
cd src
npm install
Copy-Item .env.example .env.local
```

### ⚙️ Configuración de Variables de Entorno y API

El archivo `.env.local` debe existir con la URL de la API backend. La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio. Si el backend cambia de versión o rutas, hay que revalidar clientes en `src/lib/api/` y variables de entorno frente a ese documento.

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

*Nota:* Ajusta el puerto si tu API backend usa otro. Después de cambiar la URL en el archivo `.env.local`, debes **reiniciar el servidor de desarrollo**.

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

```powershell
cd src
npm run dev
```

La aplicación estará disponible por defecto en: **http://localhost:3000**.

### Modo Producción

```powershell
cd src
npm run build
npm start
```

## 🛠️ Tecnologías y Estructura

- **Next.js 14+** — App Router
- **TypeScript** — Tipado estricto con interfaces para la API
- **Tailwind CSS** — Diseño moderno, convivencia con MUI (en su caso)
- **TanStack Query** — Gestión de estado del servidor
- **Lucide React** — Iconos
- **Shadcn/UI** — Componentes base UI reutilizables y tipados

### Estructura del paquete (`src/`)

```
src/
├── __tests__/           # Tests Jest y de integración
├── app/                 # App Router: rutas por locale, grupos (client), API, etc.
├── components/          # UI reutilizable (ui/, layout/, auth/, masters/, …)
├── lib/                 # api/, providers/, utils/, tipos, configuración
├── public/              # Estáticos
├── messages/            # Cadenas i18n (es, en, ca, …)
├── auth.ts              # Configuración NextAuth / Sesión
└── middleware.ts        # Enrutado / locale si aplica
```

## 🔐 Autenticación

Autenticación basada en sesión/tokens. El contexto de sesión y componentes como `ProtectedRoute` gestionan el acceso a rutas privadas.

### Credenciales de ejemplo (entorno demo)

- **Organización**: Demo Company (o Empresa Demo)
- **Usuario**: admin
- **Contraseña**: admin123

## 🧪 Testing

El proyecto utiliza **Jest** y **React Testing Library** para testing unitario y de integración. Los tests están organizados en `src/__tests__/` y `src/tests/` (E2E).

### Comandos de Testing

Ejecutar desde el directorio `src/`:

- **Ejecutar todos los tests:** `npm test` o `npm run test:all`
- **Tests de integridad:** `npm run test:integrity`
- **Modo watch (desarrollo):** `npm run test:watch`
- **Reporte de cobertura:** `npm run test:coverage`

*Existen configuraciones en `jest.config.js` y `jest.setup.js` que mockean entorno de Next.js, fetch, etc.*

## 🐛 Solución de Problemas Comunes

Si el cliente no levanta o no compila, verifica:

1. **Error: "npm no se reconoce"**
   - Instala Node.js, reinicia tu terminal y asegúrate de que esté en tu PATH.
2. **Error: "Cannot find module"**
   - Elimina la carpeta `node_modules` y `package-lock.json`, luego ejecuta `npm install` de nuevo.
3. **El servidor no responde en el navegador (Puerto 3000)**
   - Reinicia el servidor completamente. Detén procesos de Node (`Get-Process -Name node | Stop-Process -Force` en Windows).
   - Limpia el caché de Next.js (`Remove-Item -Recurse -Force .next` en PowerShell).
   - Verifica si el puerto está en uso (`netstat -ano | findstr :3000`) o arranca en otro puerto: `$env:PORT=3001; npm run dev`.
   - Espera a que aparezca "✓ Ready in X.Xs" en la consola antes de abrir el navegador.
4. **Error de conexión a la API**
   - Verifica que la API backend esté ejecutándose en el puerto asignado (por defecto `5020`).
   - Comprueba la URL en `.env.local` y que no tenga una barra final (`/`).
   - Revisa la pestaña "Network" (Red) o "Console" (Consola) en las DevTools de tu navegador.

*Si nada funciona, ejecuta el script de diagnóstico (`cd src; .\diagnostico.ps1`) para obtener un reporte del estado local.*

## 📚 Documentación Adicional y Scripts

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio (Cúmulo, Tekton, etc.) |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |

### Scripts y automatización
Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Licencia

Este proyecto es parte del sistema GesFer.
