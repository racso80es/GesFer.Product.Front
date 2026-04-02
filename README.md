# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript, Tailwind CSS, y Material UI (MUI v5) para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Tecnologías Principales

- **Next.js 14+** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Material UI (MUI v5)** — con `@mui/material-nextjs` y `ThemeRegistry`
- **TanStack Query** — Gestión de estado del servidor
- **Next-Intl** — Internacionalización estricta bajo `src/app/[locale]/`
- **Lucide React** y **Shadcn/UI** — Iconos y componentes base estilizados
- **Pino** — Telemetría y Logging (servidor y cliente)

## ⚠️ Requisitos Previos

1. **Node.js 18+** (recomendado 20+) y **npm**
2. **Windows con PowerShell 7+** (para uso opcional de los scripts de inicialización, aunque `npm` es multiplataforma)
3. API backend disponible (desarrollo típico: `http://localhost:5020` o `http://localhost:5000` / `https://localhost:5001`)

Verificar instalación de Node:
```bash
node --version
npm --version
```

## 🚀 Inicio Rápido y Configuración

Desde la raíz del repositorio, entra en `src/` e instala las dependencias:

```bash
cd src
npm install
```

Copia el archivo de ejemplo para las variables de entorno:
```bash
# Windows
Copy-Item .env.example .env.local
# Linux/Mac
cp .env.example .env.local
```

### Configuración de Variables de Entorno (`.env.local`)
Ajusta la URL a la que corresponda tu backend API (revisa el `launchSettings.json` de la API):
```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```

*Nota: si la API está en HTTP, usa puerto 5000 (o 5020). Si usas HTTPS (5001), el navegador podría advertir sobre el certificado local, lo cual es normal.*

### Ejecutar la Aplicación
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Linting y Tests
npm run lint
npm run test:all
```

La aplicación estará disponible por defecto en: **http://localhost:3000**

### Ejecución Automática (Opcional - PowerShell)
Si prefieres el setup automático desde Windows:
```powershell
cd src
.\setup.ps1
```

## 🔐 Credenciales de Prueba

- **Organización / Company**: Empresa Demo
- **Usuario**: admin  
- **Contraseña**: admin123  

## 📂 Estructura del Paquete (`src/`)

```
src/
├── app/[locale]/        # App Router: rutas por locale (es, en, ca), API NextAuth, logs, etc.
├── components/          # UI reutilizable (ui/, layout/, auth/, etc.)
├── lib/                 # api/, providers/, utils/, tipos
├── public/              # Archivos estáticos
├── messages/            # Cadenas i18n
├── theme/               # Tema Material UI y ThemeRegistry
└── config/              # Configuraciones adicionales
```

## 🐛 Solución de Problemas y Troubleshooting

### Error: "npm no se reconoce"
Instala Node.js, reinicia tu terminal, y asegúrate de que esté en las variables de entorno PATH.

### Error: "Cannot find module"
Borra la carpeta `node_modules/` y el archivo `package-lock.json`, y ejecuta de nuevo `npm install`.

### El Cliente No Levanta o se queda "Pensando"
1. Asegúrate de que no haya otro proceso ocupando el puerto 3000: `netstat -ano | findstr :3000`.
2. Borra la caché de Next.js: `Remove-Item -Recurse -Force .next` y reinicia `npm run dev`.
3. Prueba acceder a `http://127.0.0.1:3000` si `localhost` falla.

### Problemas de CORS y "ERR_EMPTY_RESPONSE"
Si el navegador arroja errores de CORS en peticiones preflight (OPTIONS):
1. Asegúrate de que la API backend esté en ejecución y funcionando (prueba `http://localhost:5020/swagger` en tu navegador).
2. Verifica que `NEXT_PUBLIC_API_URL` en `.env.local` coincide **exactamente** con la URL del Swagger de la API.
3. Si cambias el `.env.local`, debes **reiniciar el servidor de Next.js** (`npm run dev`).
4. La API en backend ya tiene `AllowAll` para CORS, pero asegúrate de que en su código `UseCors()` ocurre **antes** de `UseHttpsRedirection()`.

## 📚 Documentación Adicional

La documentación especializada y arquitectónica se encuentra en:
- `AGENTS.md` - Protocolo multi-agente, IA, y Leyes del Repositorio.
- `docs/architecture/` - Decisiones arquitectónicas, incluyendo `i18n-guide.md`.
- `docs/testing/` - Documentación específica de pruebas y E2E Playwright.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```bash
docker build -f src/Dockerfile .
```

La imagen genera una salida **standalone** de Next.js. Define `NEXT_PUBLIC_API_URL` en tiempo de ejecución.
