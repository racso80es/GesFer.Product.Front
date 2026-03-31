# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## ⚠️ Requisitos Previos

Antes de continuar, asegúrate de tener instalado:

1. **Node.js** 18+ (recomendado 20+) - [Descargar Node.js](https://nodejs.org/)
2. **npm** (viene incluido con Node.js)
3. **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
4. API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

Para verificar que están instalados, ejecuta en tu terminal:

```bash
node --version
npm --version
```

## 📦 Inicio rápido e Instalación

Desde la raíz del repositorio, entra a la carpeta de la aplicación cliente:

```powershell
cd src
npm install
```

Este comando instalará todas las dependencias necesarias:
- Next.js 14+
- React 18
- TypeScript
- Tailwind CSS
- TanStack Query
- Lucide React
- Material UI (MUI v5)
- next-intl (i18n)

### Configuración de Variables de Entorno

Copia el archivo de ejemplo para configurar tu entorno local:

```powershell
Copy-Item .env.example .env.local
```

O crea manualmente el archivo `.env.local` en `src/` con la configuración por defecto:

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

> **Nota:** La URL de la API debe apuntar al origen del servicio (esquema + host + puerto). El contrato vigente se obtiene del OpenAPI expuesto por el servicio (`swagger.json`).

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

```powershell
npm run build
npm start
```

## 🔐 Autenticación y Credenciales de Prueba

Autenticación basada en sesión/tokens gestionada en `auth.ts`. Las rutas privadas utilizan `ProtectedRoute` para verificar autenticación.

Puedes iniciar sesión en el entorno demo con:
- **Organización**: `Demo Company` / `Empresa Demo`
- **Usuario**: `admin`
- **Contraseña**: `admin123`

*(Ajustar según tu backend y seeds de la API).*

## 📁 Estructura del Proyecto (`src/`)

```
src/
├── app/                 # App Router: rutas por locale, grupos (client), API NextAuth, etc.
│   └── [locale]/        # Estructura i18n (páginas dentro de locales: es, en, ca)
├── components/          # UI reutilizable (ui/, layout/, auth/, masters/, …)
├── lib/                 # api/, providers/, utils/, tipos, configuración
├── public/              # Estáticos
├── messages/            # Cadenas i18n (es.json, en.json, ca.json, …)
├── theme/               # Tema personalizado MUI v5
├── auth.ts              # Configuración de Sesión/Tokens
└── middleware.ts        # Enrutado, locale y detección de idioma
```

## 🛠 Tecnologías Principales

- **Next.js 14+** (App Router)
- **TypeScript** (Tipado estricto e interfaces)
- **Tailwind CSS** (Diseño y espaciado base)
- **Material UI (MUI v5)** (Tipado fuerte e integración `@mui/material-nextjs`)
- **TanStack Query** (Gestión de estado del servidor)
- **next-intl** (Internacionalización)
- **Pino** (Logging persistente de cliente y servidor)
- **Playwright y Jest** (Testing E2E, Unitario, APIs)

## 🐛 Solución de Problemas

### Error: "npm no se reconoce" o "Cannot find module"
- Asegúrate de tener Node.js instalado.
- Ejecuta `npm install` nuevamente.
- Si persiste, elimina `node_modules/` y `package-lock.json` y vuelve a ejecutar `npm install`.

### El servidor no responde en el navegador (Puerto ocupado/Problema de Next.js)
1. Detén el servidor (Ctrl+C).
2. Limpia la caché: `Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue`
3. Detén procesos zombies: `Get-Process -Name node | Stop-Process -Force`
4. Inicia nuevamente: `npm run dev`

### Error de conexión a la API o "CORS Error"
- Comprueba que la API esté en ejecución.
- Verifica `NEXT_PUBLIC_API_URL` en `src/.env.local`. **Nota**: no incluyas una barra final `/`.
- Asegúrate de que las políticas de CORS estén configuradas correctamente en el backend API.

## 📚 Documentación Adicional

La documentación especializada se encuentra en la carpeta `docs/`:

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio (Raíz) |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto (Raíz) |
| `SddIA/` | Normas, procesos, acciones y skills/tools para la IA |
| `docs/architecture/i18n-guide.md` | Guía completa de internacionalización (Estructura, idiomas, configuraciones) |
| `docs/testing/README-TESTS.md` | Instrucciones de testing (Jest, Playwright) y scripts (`test:all`) |
| `docs/EVOLUTION_LOG.md` | Registro de tareas y evolución del producto |

## 🐋 Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

## 📝 Comandos GIT útiles (Para desarrollo manual)

Si realizas pruebas o subidas, el repositorio valida ramas (`feat/`, `fix/`).
Ejemplo de flujo estándar con pruebas de integridad:

```bash
git add .
git commit -m "Descripción de los cambios realizados"
git push origin feat/nombre-de-tu-rama
```

## Licencia

Este proyecto es parte del sistema GesFer.
