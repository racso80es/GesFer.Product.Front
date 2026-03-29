# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## ⚠️ Requisitos Previos

- **Node.js** 18+ (recomendado 20+)
- **npm** (viene incluido con Node.js)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`)

Para verificar que están instalados, ejecuta en tu terminal:
```bash
node --version
npm --version
```

## 🚀 Inicio rápido (Automático)

Si tienes Node.js instalado, ejecuta el script de configuración desde la raíz del repositorio:

```powershell
cd src
.\setup.ps1
```
Este script verificará Node.js, instalará dependencias, y creará `.env.local`. Después, inicia la aplicación:
```powershell
npm run dev
```

## 📦 Inicio rápido (Manual)

Desde la raíz del repositorio:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL apuntando a la API backend
npm run dev
```

Por defecto, el servidor de desarrollo queda en **http://localhost:3000**.

## 🔧 Configuración de la URL de la API

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio, p. ej. `{origen}/swagger/v1/swagger.json`.

`NEXT_PUBLIC_API_URL` debe apuntar al **origen** del servicio.

Edita el archivo `src/.env.local` y cambia la URL:

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```
**⚠️ Importante:** Después de cambiar la URL, debes reiniciar el servidor de desarrollo.

## 🔐 Credenciales de Prueba

Una vez que la aplicación esté ejecutándose, puedes iniciar sesión con:

- **Organización**: Demo Company
- **Usuario**: admin
- **Contraseña**: admin123

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

## Scripts disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |
| `npm run test:all` | Ejecutar todos los tests (Integración, E2E, Unitarios) |

## 🐛 Solución de Problemas

### El servidor no responde en el navegador
- Si `npm run dev` no carga, limpia la caché: `Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue` y reinicia.
- Verifica que el puerto 3000 no esté en uso: `netstat -ano | findstr :3000`. Si lo está, cambia el puerto con `$env:PORT=3001` y ejecuta `npm run dev`.

### Error de conexión a la API (ERR_EMPTY_RESPONSE / CORS)
1. Comprueba que la API esté en ejecución cargando su Swagger en el navegador (ej: `http://localhost:5020/swagger`).
2. Verifica `NEXT_PUBLIC_API_URL` en `src/.env.local` (sin barra final).
3. Asegúrate de reiniciar Next.js tras cambiar variables de entorno.
4. La API debe tener CORS configurado con `AllowAll` (y `UseCors()` antes de `UseHttpsRedirection()`).

### Error: "npm no se reconoce"
- Instala Node.js, reinicia tu terminal y verifica que Node.js esté en tu PATH.

## Documentación

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `docs/architecture/i18n-guide.md` | Guía de Internacionalización |
| `docs/testing/testing-guide.md` | Guía de Testing e Integridad |

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

## Licencia

Este proyecto es parte del sistema GesFer.
