# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Requisitos y Estado Actual

El proyecto está configurado con Next.js 14+ con TypeScript, Tailwind CSS con tema Shadcn/UI, TanStack Query y componentes de Material UI (MUI). Además cuenta con un sistema robusto de logs integrado con Pino (server-side en `logs/app.log` y endpoint de captura client-side `/api/logs`).

- **Node.js** 18+ (recomendado 20+)
- **npm** (viene incluido con Node.js)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

Para verificar que están instalados:
```bash
node --version
npm --version
```

## Instalación y Configuración Inicial

Desde la raíz del repositorio, sigue estos pasos para configurar el entorno:

```powershell
# Accede al directorio del código fuente
cd src

# Instala todas las dependencias
npm install

# Crea la configuración local basada en el ejemplo
Copy-Item .env.example .env.local
```

### Configuración de la URL de la API (y Solución CORS)

El frontend se acopla a un contrato REST expuesto por el backend, basado en su OpenAPI (Swagger). La URL de la API se configura en el archivo `.env.local` en el directorio `src/`.

Abre `src/.env.local` y ajusta `NEXT_PUBLIC_API_URL` apuntando al origen de tu API (esquema + host + puerto). Por ejemplo:

```env
# URL de la API backend (ajustar si usa otro puerto o si expone en HTTPS)
NEXT_PUBLIC_API_URL=http://localhost:5020
```

> **Nota sobre CORS**: Asegúrate de que tu backend tenga los encabezados CORS configurados para permitir peticiones desde el origen del frontend (por defecto `http://localhost:3000`). Si experimentas el error `ERR_EMPTY_RESPONSE` en peticiones preflight (OPTIONS), revisa las políticas CORS en la API.

## Servidor de Desarrollo

Una vez configurado, inicia el servidor:

```powershell
npm run dev
```

Por defecto, el servidor de desarrollo queda en **http://localhost:3000**. Espera a ver el mensaje `✓ Ready in X.Xs` en la terminal antes de intentar abrir el navegador.

## Tecnologías

- **Next.js 14+** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Material UI (MUI v5)** — Conviviendo con Tailwind mediante `@layer mui` y `@mui/material-nextjs`
- **TanStack Query** — Estado del servidor (staleTime ~1 minuto, refetchOnWindowFocus: false)
- **Lucide React** — Iconos
- **Shadcn/UI** — Componentes base

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

Autenticación basada en sesión/tokens. El contexto de sesión y componentes como `ProtectedRoute` gestionan el acceso a rutas privadas.

### Credenciales de ejemplo (entorno demo)

- **Company**: Empresa Demo  
- **Usuario**: admin  
- **Contraseña**: admin123  

## Scripts disponibles (`src/`)

Desde el directorio `src/`:

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |
| `npm run test:all` | Ejecuta todos los tests |

## Testing

El proyecto utiliza **Jest**, **React Testing Library** y **Playwright** para la suite de pruebas.
Toda la documentación específica sobre las pruebas se encuentra consolidada en `docs/testing/README-TESTS.md`.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

## Solución de Problemas (Troubleshooting)

### El servidor no responde en el navegador

1. **Reiniciar completamente**:
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   cd src
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   npm run dev
   ```
2. **Puerto bloqueado**: Prueba con otro puerto:
   ```powershell
   $env:PORT=3001
   npm run dev
   ```
3. **Verificar que esté Listo**: No accedas a la URL hasta ver `✓ Ready` en la consola.
4. **Verifica firewall y otros procesos** buscando el puerto en uso: `netstat -ano | findstr :3000`.

### Error de conexión a la API
1. Verifica que la API esté en ejecución.
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local`.  
3. Revisa la consola del navegador y los logs del backend para identificar fallos CORS o rutas incorrectas.

## Documentación General

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `docs/architecture/` | Guías de arquitectura (ej. `I18N-GUIDE.md`) |
| `docs/testing/` | Documentación técnica y ejecución de tests |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| Este archivo | Vista unificada del repo y del paquete en `src/` |

## Comandos Git Comunes

Convenciones y comandos frecuentes para subir cambios al repositorio:

```bash
# Formato de ramas: feat/kebab-case, fix/kebab-case
git checkout -b feat/mi-nueva-caracteristica

# Formato de commits (mensaje descriptivo)
git add .
git commit -m "feat: descripción de los cambios aplicados"
git push origin feat/mi-nueva-caracteristica
```

## Licencia

Este proyecto es parte del sistema GesFer.
