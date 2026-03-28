# GesFer.Product.Front

Frontend **cliente** del ecosistema GesFer: aplicación Next.js 14 (App Router), TypeScript y Tailwind CSS para la gestión de compra/venta de chatarra. El código de aplicación vive en **`src/`**. Este repositorio es **independiente** del monorepo GesFer original.

---

## 📋 Índice

- [Requisitos](#requisitos)
- [Inicio Rápido](#inicio-rápido)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración de la API](#configuración-de-la-api)
- [Autenticación](#autenticación)
- [Testing](#testing)
- [Solución de Problemas](#solución-de-problemas)
- [Comandos Útiles de Git](#comandos-útiles-de-git)
- [Documentación Adicional](#documentación-adicional)

---

## ⚙️ Requisitos

Antes de continuar, asegúrate de tener instalado:

- **Node.js** 18+ (recomendado 20+). Puedes [descargarlo aquí](https://nodejs.org/).
- **npm** (viene incluido con Node.js).
- **Windows** con **PowerShell 7+** (convención del proyecto; ver `AGENTS.md`).
- API backend disponible (desarrollo típico: `http://localhost:5020`; alinear con tu despliegue y con `NEXT_PUBLIC_API_URL`).

Para verificar que están instalados:
```bash
node --version
npm --version
```

## 🚀 Inicio Rápido

Desde la raíz del repositorio, ejecuta los siguientes comandos para preparar el entorno:

```powershell
cd src
npm install
Copy-Item .env.example .env.local
# Editar .env.local: NEXT_PUBLIC_API_URL apuntando a la API backend
# Iniciar servidor de desarrollo
npm run dev
```

Por defecto, el servidor de desarrollo queda en **http://localhost:3000**.

### Credenciales de ejemplo (entorno demo)

- **Company**: Empresa Demo
- **Usuario**: admin
- **Contraseña**: admin123

## 🛠️ Tecnologías

- **Next.js 14+** — App Router
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query** — estado del servidor (`staleTime` ~1 minuto, `refetchOnWindowFocus`: false, `retry`: 1)
- **Lucide React** — iconos
- **Shadcn/UI** — componentes base (estilo)
- **Jest & React Testing Library** — testing

## 📁 Estructura del Proyecto (`src/`)

```
src/
├── app/                 # App Router: rutas por locale, grupos (client), API NextAuth, etc.
├── components/          # UI reutilizable (ui/, layout/, auth/, masters/, …)
├── lib/                 # api/, providers/, utils/, tipos, configuración
├── public/              # Estáticos
├── messages/            # Cadenas i18n (es, en, ca, …)
├── auth.ts              # Configuración NextAuth (según versión del proyecto)
├── middleware.ts        # Enrutado / locale si aplica
├── __tests__/           # Tests Jest (app, components, lib, …)
└── tests/               # Playwright y pruebas E2E
```

## 🔌 Configuración de la API

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio, p. ej. `{origen}/swagger/v1/swagger.json`.

La URL de la API se configura en el archivo `.env.local` en la carpeta `src`.

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

> ⚠️ **Después de cambiar la URL, debes reiniciar el servidor de desarrollo.**

## 🔐 Autenticación

Autenticación basada en sesión/tokens según la configuración actual (p. ej. NextAuth en `app/api/auth/` y `auth.ts`). El contexto de sesión y componentes como `ProtectedRoute` gestionan el acceso a rutas privadas.

## 🧪 Testing

El proyecto utiliza **Jest** y **React Testing Library**.

### Ejecutar pruebas (desde `src/`)

- **Todos los tests:** `npm test` o `npm run test:all`
- **Modo watch (desarrollo):** `npm run test:watch`
- **Cobertura:** `npm run test:coverage`

Los tests están organizados en `src/__tests__/` para pruebas unitarias/integración y `src/tests/` para pruebas E2E. Para detalles completos y ejemplos de testing, consulta la [Guía de Testing](docs/testing/testing-guide.md).

## 🌍 Internacionalización (i18n)

Todas las rutas y páginas de este proyecto requieren el uso de la carpeta dinámica `[locale]`.

*   **Páginas nuevas:** Asegúrate de crearlas **siempre** dentro de `src/app/[locale]/`. No crees páginas directamente en `src/app/` porque el middleware de idiomas no las atrapará.
*   **Textos:** Todo texto estático debe utilizar las funciones de traducción como `useTranslations` (provenientes de `next-intl`) y los diccionarios almacenados en `src/messages/`.
*   Para más detalles, consulta la [Guía de Arquitectura de i18n](docs/architecture/i18n-guide.md).

## 🐛 Solución de Problemas

### El servidor no responde en el navegador (Puerto 3000)

1. **Reiniciar completamente:**
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   # Volver a iniciar el servidor
   npm run dev
   ```
2. **Verificar que el puerto no esté en uso:**
   ```powershell
   netstat -ano | findstr :3000
   ```
3. Si el puerto 3000 está bloqueado, intenta iniciar con otro:
   ```powershell
   $env:PORT=3001
   # Iniciar en puerto alternativo
   npm run dev
   ```

### Error de conexión a la API
1. Verifica que la API esté en ejecución.
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local`.  
3. Revisa CORS en el backend.

### Error: "npm no se reconoce" o "Cannot find module"
- Asegúrate de tener Node.js instalado.
- Elimina `node_modules/` y `package-lock.json` y vuelve a ejecutar `npm install`.

## 📌 Comandos Útiles de Git

Si necesitas añadir pruebas o cambios frecuentemente, un ejemplo típico:

```bash
git add src/__tests__/
git add src/package.json
git commit -m "chore: actualizacion de pruebas"
```
*(Nota: no incluyas el push en scripts automáticos, maneja ramas adecuadamente).*

## 📚 Documentación Adicional

| Recurso | Contenido |
|--------|-----------|
| `AGENTS.md` | Protocolo multi-agente y leyes del repositorio |
| `Objetivos.md` | Alcance, objetivos y contexto del proyecto |
| `SddIA/` | Normas, procesos, acciones y skills/tools (SSOT para IA) |
| `SddIA/norms/openapi-contract-rest-frontend.md` | Contrato REST: OpenAPI del backend como fuente de verdad |
| `docs/EVOLUTION_LOG.md` | Registro de evolución arquitectónica y de features |

## 🐳 Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

---
*Licencia: Este proyecto es parte del sistema GesFer.*
