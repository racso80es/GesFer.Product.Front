# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** (viene incluido con Node.js)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

## Configuración e Instalación

### Inicio rápido (Recomendado con script automático)

Una vez que tengas Node.js instalado, ejecuta en PowerShell desde la raíz:

```powershell
cd src
.\setup.ps1
```

Este script:
- Verificará que Node.js y npm estén instalados.
- Instalará todas las dependencias (`npm install`).
- Creará el archivo `.env.local` con la configuración por defecto.

### Inicio rápido (Manual)

Si prefieres hacerlo manualmente, desde la raíz del repositorio:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL apuntando a la API backend
```

## Configuración de la API

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio, p. ej. `{origen}/swagger/v1/swagger.json`. Si el backend cambia de versión o rutas, hay que **revalidar** clientes en `src/lib/api/` y variables de entorno frente a ese documento.

La URL de la API se configura en el archivo `src/.env.local`. Por defecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```

`NEXT_PUBLIC_API_URL` debe apuntar al **origen** del servicio (esquema + host + puerto). Ajusta el puerto (ej. `5000` para HTTP, `5001` para HTTPS local) si tu API backend usa otro.

⚠️ **Importante:** Después de cambiar la URL en `.env.local`, debes reiniciar el servidor de desarrollo (`npm run dev`).

## Ejecutar la Aplicación

### Modo Desarrollo

Desde la carpeta `src`:
```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

Desde la carpeta `src`:
```powershell
npm run build
npm start
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
| `npm test` | Ejecutar pruebas (Jest/React Testing Library) |

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### El servidor no responde en el navegador (Localhost no carga)

1. **Esperar compilación:** Espera a ver `✓ Ready in X.Xs` en la terminal antes de abrir el navegador.
2. **Probar diferentes URLs:** `http://localhost:3000`, `http://127.0.0.1:3000`, `http://[::1]:3000`.
3. **Verificar puerto en uso:** Ejecuta `netstat -ano | findstr :3000`. Si hay procesos, detenlos (`Get-Process -Name node | Stop-Process -Force`) o usa otro puerto (`$env:PORT=3001; npm run dev`).
4. **Limpiar cache y reinstalar:**
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item package-lock.json -ErrorAction SilentlyContinue
   npm install
   npm run dev
   ```
5. **Diagnóstico automático:** Ejecuta `.\diagnostico.ps1` dentro de `src/` para revisar configuración.

### Error de conexión a la API (ERR_EMPTY_RESPONSE / Failed to fetch)

1. Comprueba que la API esté en ejecución abriendo `http://localhost:5020/swagger` (u origen configurado) en tu navegador.
2. Verifica que `NEXT_PUBLIC_API_URL` en `src/.env.local` sea correcta y corresponda al perfil de la API (`http` vs `https`).
3. Asegúrate de reiniciar el servidor frontend (Ctrl+C y `npm run dev`) si cambiaste `.env.local`.
4. Revisa CORS en el backend (asegurar que `UseCors()` esté antes de `UseHttpsRedirection()`).

### Problemas de autenticación

1. Verifica las credenciales correctas y empresa válida.
2. Revisa errores en la consola del navegador (F12).
3. Limpia el almacenamiento local/cookies en tu navegador si quedan sesiones corruptas.

### Error: "npm no se reconoce"

- Asegúrate de tener Node.js instalado, reinicia tu terminal y verifica que Node.js esté en tu `PATH`.

## Pruebas y Comandos Git

- **Pruebas**: Consulta la guía de testing en `docs/testing/testing-guide.md` para detalles sobre Jest y Playwright.
- **Git para Pruebas**: Al realizar commits con nuevos tests, usa comandos desde la raíz del repositorio y referencia los archivos dentro de `src/`. Ejemplo:
  ```powershell
  git add src/__tests__/integration/
  git commit -m "Añadiendo test a cliente: Se han añadido tests de integridad"
  ```

## Documentación

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |
| `docs/architecture/` | Guías de arquitectura, incluyendo `i18n-guide.md` |
| `docs/testing/` | Guías de testing, incluyendo `testing-guide.md` |

## Scripts y automatización

Herramientas y cápsulas en `scripts/` (índice: `scripts/tools/index.json`). Rutas canónicas en `SddIA/agents/cumulo.paths.json` (agente Cúmulo).

## Licencia

Este proyecto es parte del sistema GesFer.
