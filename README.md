# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

---

## ⚠️ Requisitos Previos

- **Node.js** 18+ (recomendado 20+). Comprobar versión con `node --version`.
- **npm** (incluido en Node.js). Comprobar versión con `npm --version`.
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`).
- API backend disponible (desarrollo típico: `http://localhost:5020`).

---

## 🚀 Inicio Rápido (Automático)

En la carpeta `src/`, existe un script `.ps1` para automatizar la configuración.
Desde la raíz del repositorio, en **PowerShell** (posiblemente como administrador si hay problemas de ejecución):

```powershell
cd src
# Para ejecutar si te da problemas de permisos:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

El script verificará dependencias, instalará paquetes y creará un archivo `.env.local`. Después, puedes iniciar la aplicación con:

```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 🔧 Inicio Rápido (Manual)

Si prefieres hacerlo manualmente, desde la raíz del repositorio:

### Paso 1: Instalar dependencias
```powershell
cd src
npm install
```

### Paso 2: Crear archivo de Variables de Entorno
Crea o copia el archivo `.env.local` en la carpeta `src`:
```powershell
Copy-Item .env.example .env.local
```

### Paso 3: Configurar API Backend (y CORS)
Edita `.env.local` y asegúrate de que apunte al puerto correcto de la API de GesFer.
Por ejemplo, si la API está en HTTP puerto 5020 (referencia actual):
```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```
- Si tu API está en **HTTP (puerto 5000)**: `NEXT_PUBLIC_API_URL=http://localhost:5000`
- Si tu API está en **HTTPS (puerto 5001)**: `NEXT_PUBLIC_API_URL=https://localhost:5001` (ignora las advertencias locales de certificados).

*Nota sobre CORS:* La API en `AllowAll` responde, pero para problemas `ERR_EMPTY_RESPONSE` al hacer preflight OPTIONS, asegúrate de que tu `NEXT_PUBLIC_API_URL` concuerde con tu perfil de `launchSettings.json` y reinicia el cliente (Next.js) tras cambiar el `.env.local`.

### Paso 4: Ejecutar el servidor
```powershell
npm run dev
```

---

## 🔐 Autenticación y Pruebas

Autenticación basada en sesión/tokens (`app/api/auth/` y `auth.ts`).

### Credenciales de prueba (entorno demo)
- **Organización / Company**: Empresa Demo o Demo Company
- **Usuario**: admin
- **Contraseña**: admin123

---

## 📁 Estructura Principal del Proyecto (`src/`)

- **app/**: App Router (rutas, grupos client, API NextAuth, etc.)
- **components/**: UI reutilizable (UI base tipo Shadcn, layout, auth, etc.)
- **contexts/**: Contextos de React (Auth)
- **lib/**: Utilidades, tipos, proveedores (QueryProvider) y cliente HTTP (api/)
- **public/**: Estáticos
- **messages/**: Cadenas i18n (es, en, ca, …)
- **tests/** / **__tests__/**: Pruebas unitarias

### Tecnologías Destacadas
- **Next.js 14+** (App Router)
- **TypeScript estricto**
- **Tailwind CSS** (estilo Shadcn/UI)
- **TanStack Query** (estado del servidor)
- **Lucide React** (iconos)
- **Jest / React Testing Library**

---

## 🐛 Solución de Problemas Frecuentes

### 1. El servidor de desarrollo (Next.js) no carga o se bloquea
- Detén todos los procesos de Node.js `Get-Process -Name node | Stop-Process -Force`.
- Limpia la caché: `Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue`.
- Vuelve a iniciar con `npm run dev`.

### 2. "npm no se reconoce"
- Instala Node.js desde https://nodejs.org/ y reinicia la terminal/PowerShell.

### 3. "Cannot find module" o errores extraños de dependencias
- Borra dependencias e instala de nuevo:
  ```powershell
  Remove-Item -Recurse -Force node_modules
  Remove-Item package-lock.json
  npm install
  ```

### 4. Error de conexión a la API / CORS ("ERR_EMPTY_RESPONSE")
- Comprueba que la API esté corriendo (intenta acceder a `http://localhost:5020/swagger` o la URL configurada).
- Verifica la URL en `.env.local`.
- Recuerda reiniciar el frontend Next.js tras cualquier cambio a `.env.local`.

---

## 📝 Scripts Disponibles en `src/`

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm start` | Iniciar el servidor compilado (producción) |
| `npm run lint` | Ejecutar Linter |
| `npm run test:all` | Ejecutar todas las pruebas (ver `src/README-TESTS.md`) |

---

## 🐋 Imagen Docker (Opcional)

Puedes hacer build desde la **raíz del repositorio**:
```powershell
docker build -f src/Dockerfile .
```
En ejecución, recuerda proveer la variable `NEXT_PUBLIC_API_URL`.

---

## 📚 Documentación Adicional

- `AGENTS.md` - Protocolo multi-agente, automatización y leyes del repositorio.
- `Objetivos.md` - Contexto y alcance general del ecosistema.
- `SddIA/` - Documentación formal, protocolos SDDIA, y normas arquitectónicas (SSOT).
- `SddIA/norms/openapi-contract-rest-frontend.md` - Contrato REST y Backend (OpenAPI).
- `src/README-TESTS.md` - Guía para ejecución y creación de pruebas con Jest.

## Licencia

Este proyecto es parte del sistema GesFer.