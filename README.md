# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Tecnologías

- **Next.js 14+** — App Router
- **TypeScript** — Tipado estricto con interfaces para todas las respuestas de la API
- **Tailwind CSS** — Diseño moderno estilo Shadcn/UI
- **TanStack Query** — Estado del servidor
- **Lucide React** — Iconos
- **Shadcn/UI** — Componentes base (estilo)

## Requisitos y Setup Completo

### 1. Instalar Node.js
- **Node.js** 18+ (recomendado 24+)
- **npm** (recomendado v11+)
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)

Descarga e instala desde [nodejs.org](https://nodejs.org/).

### 2. Instalación de Dependencias

Desde la raíz del repositorio, entra a `src/` e instala:

```powershell
cd src
npm install
```

### 3. Configuración del Entorno y API

Crea el archivo `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente se obtiene del **OpenAPI** expuesto por el servicio. Edita `.env.local` apuntando al backend (habitualmente el puerto 5020):

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

*Si tu API está en HTTP (puerto 5000), usa `http://localhost:5000`. Si usas HTTPS (puerto 5001), usa `https://localhost:5001` y acepta la excepción de certificado en tu navegador.*

### 4. Iniciar la Aplicación

```powershell
npm run dev
```

La aplicación estará disponible por defecto en: **http://localhost:3000**

*(Opcional) Puedes ejecutar el script automático de Setup en PowerShell: `cd src; .\setup.ps1`*

## Credenciales de Prueba

Una vez que la aplicación esté ejecutándose, y si tu backend tiene los seeds configurados, puedes probar con:
- **Organización**: `Demo Company`
- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Scripts disponibles (`src/`)

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |
| `npm test` | Ejecutar tests unitarios (Jest/RTL) |
| `npm run test:all` | Ejecutar todos los tests e integraciones |

## Solución de Problemas Frecuentes

### 1. El servidor no responde en el navegador
- **Verificar Puerto en Uso**: `netstat -ano | findstr :3000`. Si hay múltiples, detén los procesos `node`.
- **Reinicio Limpio**:
  ```powershell
  Get-Process -Name node | Stop-Process -Force
  Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
  npm run dev
  ```
- **Espera**: Asegúrate de ver `✓ Ready in X.Xs` en la consola antes de abrir el navegador.
- **Alternativas**: Prueba `http://127.0.0.1:3000` o asigna otro puerto: `$env:PORT=3001; npm run dev`.

### 2. Error CORS o de Conexión a la API ("ERR_EMPTY_RESPONSE" / "Failed to fetch")
- **¿API Corriendo?**: Verifica abriendo `http://localhost:5020/swagger` en tu navegador.
- **Variable de Entorno**: Comprueba que `NEXT_PUBLIC_API_URL` coincide con el puerto real de tu API en `launchSettings.json`.
- **Reinicio**: Si cambias `.env.local`, debes **detener y reiniciar** Next.js (`npm run dev`).

### 3. Error de instalación (npm)
- Si ves errores de dependencias perdidas, elimina la caché y reinstala:
  ```powershell
  Remove-Item -Recurse -Force node_modules
  Remove-Item package-lock.json
  npm install
  ```

## Estructura del Paquete (`src/`)

```
src/
├── app/                 # App Router: rutas por locale, API NextAuth
├── components/          # UI reutilizable (ui/, layout/, auth/)
├── contexts/            # Contextos de React
├── lib/                 # api/, providers/, utils/, tipos
├── public/              # Estáticos
├── messages/            # Cadenas i18n
├── auth.ts              # Configuración NextAuth
└── middleware.ts        # Enrutado / locale
```

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

## Documentación del Proyecto

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `docs/architecture/` | Guías de arquitectura (ej: i18n-guide.md) |
| `docs/testing/` | Guías de testing y QA (ej: testing-guide.md) |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |

## Comandos Git para Colaboración (Ejemplo)

```bash
git add .
git commit -m "feat/test: Añadiendo cobertura a cliente" -m "Tests de integridad y e2e añadidos"
git push origin <tu-rama>
```