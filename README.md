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

Más detalle operativo incluido a continuación o en las correspondientes guías de arquitectura y pruebas.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Configuración de URL de la API (Contracto REST)

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio, p. ej. `{origen}/swagger/v1/swagger.json`.

La URL de la API se configura en el archivo `.env.local` en la raíz del proyecto `src/`:

```env
# URL de la API backend (ajustar puerto si es necesario)
NEXT_PUBLIC_API_URL=http://localhost:5020
```

Si el backend cambia de versión o rutas, revalida clientes en `src/lib/api/` y variables de entorno. Después de cambiar la URL, **debes reiniciar el servidor de desarrollo** (`npm run dev`).

## Solución de Problemas Generales

### La aplicación no se conecta a la API o da error de CORS (ERR_EMPTY_RESPONSE)
1. Verifica que la API esté ejecutándose accediendo a su interfaz de Swagger (ej. `http://localhost:5020/swagger`).
2. Verifica que el puerto en `.env.local` coincida con el backend (`launchSettings.json` del backend para perfiles HTTP o HTTPS).
3. Asegúrate de que CORS esté configurado en el backend y que `UseCors()` esté antes de `UseHttpsRedirection()`.
4. Reinicia el servidor de Next.js después de cambiar `.env.local`.

### El servidor no responde en el navegador (Localhost)
Si `npm run dev` está corriendo pero no carga la web:
1. Asegúrate de que el terminal muestre el mensaje `✓ Ready in X.Xs` indicando que compiló.
2. Si el puerto 3000 está en uso, verifica con `netstat -ano | findstr :3000` o levántalo en otro puerto asignando la variable de entorno `$env:PORT=3001` antes de correr el script.
3. Intenta acceder con `http://127.0.0.1:3000` o limpia la caché de Next.js (`Remove-Item -Recurse -Force .next`).

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

## Comandos Git Frecuentes

Ejemplos para realizar subidas y registrar test de integridad:

```bash
# Navegar a la carpeta raíz del proyecto y preparar los commits
git add src/__tests__/
git add src/package.json
git commit -m "Añadiendo test a cliente" -m "Se han añadido tests de integridad completos"
git push origin <rama_actual>
```

## Licencia

Este proyecto es parte del sistema GesFer.
