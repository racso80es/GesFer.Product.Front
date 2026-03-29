# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

## Instrucciones de Instalación

### ⚠️ Requisitos Previos

1. **Node.js 18+** (recomendado 20+) - [Descargar Node.js](https://nodejs.org/)
2. **npm** (viene incluido con Node.js)
3. **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`)

Para verificar que están instalados, ejecuta en tu terminal:

```bash
node --version
npm --version
```

### 📦 Instalación de Dependencias

Ejecuta el script de configuración automática o instálalo manualmente.

**Opción Automática:**
```powershell
cd src
.\setup.ps1
```

**Opción Manual:**
```powershell
cd src
npm install
Copy-Item .env.example .env.local
```

### 🚀 Ejecutar la Aplicación

Modo desarrollo:
```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

Modo producción:
```powershell
npm run build
npm start
```

## Configuración de Entornos

El sistema detecta automáticamente el entorno a partir de `NODE_ENV` o `NEXT_PUBLIC_ENV` (production, development, test).

Los archivos de configuración bajo `src/config/` (local.json, development.json, production.json, test.json) definen las URLs base y otras variables por entorno:

```json
{
  "api": {
    "url": "http://127.0.0.1:5020"
  },
  "client": {
    "url": "http://localhost:3000"
  }
}
```

## Configuración de API

La URL de la API se configura en el archivo `.env.local` en la raíz del paquete `src/`.

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

También puedes establecer la variable de entorno antes de ejecutar:

**Windows PowerShell:**
```powershell
$env:NEXT_PUBLIC_API_URL="http://localhost:5020"
npm run dev
```

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio.

## Solución de Problemas y CORS

### El servidor no responde en el navegador

Si tu puerto 3000 está en uso:
```powershell
netstat -ano | findstr :3000
# Detén el proceso correspondiente o inicia en otro puerto:
$env:PORT=3001
npm run dev
```

Intenta borrar caché si el servidor no levanta correctamente:
```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install
npm run dev
```

### Problemas de CORS o Conexión API (ERR_EMPTY_RESPONSE)

Si al hacer una petición (OPTIONS preflight o directa) obtienes un error:

1. Verifica el `launchSettings.json` de tu backend para confirmar en qué puerto está levantando.
2. Si la API está en HTTPS (`https://localhost:5001`), asegúrate de aceptar la excepción del certificado en tu navegador visitando directamente `https://localhost:5001/swagger`.
3. Verifica que la variable `NEXT_PUBLIC_API_URL` apunte a la misma URL de origen (esquema + puerto).
4. La API ya tiene CORS configurado con `AllowAll`, pero verifica que la API esté realmente corriendo respondiendo a tu petición local.

⚠️ **Después de cambiar la URL en `.env.local`, debes reiniciar el servidor de desarrollo.**

## Comandos Útiles de Git

```bash
# Desarrollo
npm run dev

# Tests
npm run test:all
npm run test:e2e
```

## Documentación Adicional

- [Guía de Arquitectura i18n](docs/architecture/i18n-guide.md)
- [Estado de la Internacionalización (i18n)](docs/architecture/i18n-status.md)
- [Guía de Testing (Jest / Playwright)](docs/testing/testing-guide.md)
- `AGENTS.md` - Protocolo multi-agente y leyes del repositorio
- `Objetivos.md` - Alcance, objetivos y contexto del proyecto
- `SddIA/` - Normas, procesos, acciones y skills/tools (SSOT para IA)
