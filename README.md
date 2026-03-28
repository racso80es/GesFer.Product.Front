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

Más detalle operativo: `src/SETUP.md`, `src/CONFIGURACION-API.md`, tests en `src/tests/README.md`.

## Imagen Docker (opcional)

Build desde la **raíz del repositorio** (contexto `.`), usando el Dockerfile del paquete:

```powershell
docker build -f src/Dockerfile .
```

En tiempo de ejecución, define `NEXT_PUBLIC_API_URL` (y las variables que requieras) según el backend. Salida **standalone** de Next.js (`src/next.config.js`).

## Solución de problemas

### Error de conexión a la API

1. Comprueba que la API esté en ejecución.  
2. Verifica `NEXT_PUBLIC_API_URL` en `.env.local`.  
3. Revisa CORS en el backend.

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

## Licencia

Este proyecto es parte del sistema GesFer.


<!-- Contenido de SETUP.md -->
# Guía de Configuración - GesFer Cliente

## ⚠️ Requisitos Previos

Antes de continuar, asegúrate de tener instalado:

1. **Node.js 18+** - [Descargar Node.js](https://nodejs.org/)
2. **npm** (viene incluido con Node.js)

Para verificar que están instalados, ejecuta en tu terminal:

```bash
node --version
npm --version
```

## 📦 Instalación de Dependencias

Una vez que tengas Node.js instalado, ejecuta:

```bash
cd Cliente
npm install
```

Este comando instalará todas las dependencias necesarias:
- Next.js 14+
- React 18
- TypeScript
- Tailwind CSS
- TanStack Query
- Lucide React
- Y todas las demás dependencias

## ⚙️ Configuración de Variables de Entorno

El archivo `.env.local` ya ha sido creado con la configuración por defecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```

Si tu API está ejecutándose en un puerto diferente, edita este archivo.

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

```bash
npm run build
npm start
```

## 🔍 Verificar la Instalación

Después de ejecutar `npm install`, deberías ver:

1. Una carpeta `node_modules/` creada
2. Un archivo `package-lock.json` generado
3. Sin errores en la terminal

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"

- Asegúrate de tener Node.js instalado
- Reinicia tu terminal después de instalar Node.js
- Verifica que Node.js esté en tu PATH

### Error: "Cannot find module"

- Ejecuta `npm install` nuevamente
- Elimina `node_modules/` y `package-lock.json` y vuelve a ejecutar `npm install`

### Error de conexión a la API

- Verifica que la API backend esté ejecutándose
- Comprueba la URL en `.env.local`
- Asegúrate de que CORS esté configurado en la API

## 📝 Próximos Pasos

1. ✅ Instalar Node.js (si no lo tienes)
2. ✅ Ejecutar `npm install` en la carpeta Cliente
3. ✅ Verificar que la API backend esté ejecutándose
4. ✅ Ejecutar `npm run dev`
5. ✅ Abrir http://localhost:3000 en el navegador

## 🔐 Credenciales de Prueba

- **Organización**: Emp<!-- -->resa Demo
- **Usuario**: admin
- **Contraseña**: admin123



<!-- Contenido de INSTRUCCIONES.md -->
# 🚀 Instrucciones de Instalación - GesFer Cliente

## ✅ Estado Actual

He creado toda la estructura del proyecto frontend con:
- ✅ Configuración de Next.js 14+ con TypeScript
- ✅ Tailwind CSS con tema Shadcn/UI
- ✅ TanStack Query configurado
- ✅ Componentes UI completos
- ✅ Sistema de autenticación
- ✅ Páginas principales (Login, Dashboard, Usuarios, Clientes)
- ✅ Script de configuración automática

## 📋 Próximos Pasos Manuales

### 1. Instalar Node.js (si no lo tienes)

**Descarga e instala Node.js desde:** https://nodejs.org/

- Recomendado: Versión LTS (Long Term Support)
- Esto también instalará npm automáticamente

**Verificar instalación:**
```powershell
node --version
npm --version
```

### 2. Ejecutar el Script de Configuración

Una vez que tengas Node.js instalado, ejecuta en PowerShell:

```powershell
cd Cliente
.\setup.ps1
```

Este script:
- ✅ Verificará que Node.js y npm estén instalados
- ✅ Instalará todas las dependencias (`npm install`)
- ✅ Creará el archivo `.env.local` con la configuración

### 3. Iniciar la Aplicación

Después de que el script termine exitosamente:

```powershell
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 🔧 Configuración Manual (Alternativa)

Si prefieres hacerlo manualmente:

### Paso 1: Instalar Dependencias
```powershell
cd Cliente
npm install
```

### Paso 2: Crear Archivo de Variables de Entorno

Crea un archivo `.env.local` en la carpeta `Cliente` con el siguiente contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```

**Nota:** Si tu API está en otro puerto, ajusta la URL al origen correcto (referencia actual **5020**).

### Paso 3: Iniciar la Aplicación
```powershell
npm run dev
```

## 🔐 Credenciales de Prueba

Una vez que la aplicación esté ejecutándose, puedes iniciar sesión con:

- **Organización**: `Demo Company`
- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 📁 Estructura del Proyecto

```
Cliente/
├── app/                    # Páginas y rutas
│   ├── dashboard/         # Dashboard principal
│   ├── usuarios/          # Gestión de usuarios
│   ├── clientes/          # Gestión de clientes
│   └── login/             # Página de login
├── components/            # Componentes reutilizables
│   ├── ui/                # Componentes base (Button, Input, Card, etc.)
│   ├── auth/              # Componentes de autenticación
│   └── layout/            # Componentes de layout
├── contexts/              # Contextos de React (Auth)
├── lib/                   # Utilidades y configuraciones
│   ├── api/               # Cliente API y funciones
│   ├── providers/         # Providers (QueryProvider)
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Utilidades generales
└── setup.ps1              # Script de configuración automática
```

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
- **Solución**: Instala Node.js desde https://nodejs.org/
- Reinicia tu terminal después de instalar

### Error: "Cannot find module"
- **Solución**: Ejecuta `npm install` nuevamente
- Si persiste, elimina `node_modules` y `package-lock.json` y vuelve a ejecutar `npm install`

### Error de conexión a la API
- **Verifica**: Que la API backend esté ejecutándose
- **Verifica**: La URL en `.env.local` sea correcta
- **Verifica**: Que CORS esté configurado en la API

### El script de PowerShell no se ejecuta
- **Solución**: Ejecuta PowerShell como administrador o cambia la política de ejecución:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📝 Comandos Útiles

```powershell
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## ✨ Características Implementadas

- ✅ **TypeScript estricto** con interfaces para todas las respuestas de la API
- ✅ **Tailwind CSS** con diseño moderno estilo Shadcn/UI
- ✅ **TanStack Query** para gestión de estado del servidor
- ✅ **Manejo de errores** y estados de carga
- ✅ **Autenticación completa** con protección de rutas
- ✅ **Layout responsive** con sidebar móvil/desktop
- ✅ **Componentes reutilizables** y tipados

## 🎯 Siguiente Paso

**Instala Node.js y ejecuta el script de configuración:**

```powershell
.\setup.ps1
```

¡Listo para comenzar! 🚀



<!-- Contenido de CONFIGURACION-API.md -->
# 🔧 Configuración de la URL de la API

## Fuente de verdad del contrato (REST)

La **realidad** a la que debe adecuarse el front es la del **API backend**. El contrato vigente (rutas, esquemas) se obtiene del **OpenAPI** expuesto por el servicio, p. ej. `{origen}/swagger/v1/swagger.json`. Si el backend cambia de versión o rutas, hay que **revalidar** clientes en `src/lib/api/` y variables de entorno frente a ese documento.

`NEXT_PUBLIC_API_URL` debe apuntar al **origen** del servicio (esquema + host + puerto); los paths relativos en el código deben coincidir con los definidos en el swagger.

## Ubicación de la Configuración

La URL de la API se configura en el archivo `.env.local` en la raíz del proyecto `Cliente`.

## Cambiar la URL de la API

### Opción 1: Editar `.env.local` (Recomendado)

Edita el archivo `.env.local` y cambia la URL:

```env
# URL de la API backend
NEXT_PUBLIC_API_URL=http://localhost:5020
```

**Nota:** Ajusta el puerto si tu API backend usa otro (el contrato vigente está en el OpenAPI del servicio).

### Opción 2: Variable de Entorno del Sistema

También puedes establecer la variable de entorno antes de ejecutar:

**Windows PowerShell:**
```powershell
$env:NEXT_PUBLIC_API_URL="http://localhost:5020"
npm run dev
```

**Windows CMD:**
```cmd
set NEXT_PUBLIC_API_URL=http://localhost:5020
npm run dev
```

**Linux/Mac:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5020 npm run dev
```

## Configuración Actual

La configuración actual está en:
- **Archivo**: `.env.local`
- **Variable**: `NEXT_PUBLIC_API_URL`
- **Valor por defecto en código**: `http://localhost:5020`

## Importante

⚠️ **Después de cambiar la URL, debes reiniciar el servidor de desarrollo:**

1. Detén el servidor (Ctrl+C)
2. Ejecuta nuevamente: `npm run dev`

## Verificar la Configuración

Para verificar qué URL está usando la aplicación, puedes:

1. Abrir la consola del navegador (F12)
2. Ir a la pestaña "Network" (Red)
3. Realizar una petición (por ejemplo, intentar hacer login)
4. Verificar la URL en las peticiones HTTP

## Puertos Comunes

- **Desarrollo local**: `http://localhost:5020` (u otro según `launchSettings` / HTTPS del backend)
- **Producción**: Tu URL de producción (ej: `https://api.tudominio.com`)

## Solución de Problemas

### La aplicación no se conecta a la API

1. Verifica que la API esté ejecutándose
2. Verifica que el puerto en `.env.local` sea correcto
3. Verifica que CORS esté configurado en la API
4. Reinicia el servidor de Next.js después de cambiar `.env.local`

### Error: "Cannot connect to API"

- Verifica que la URL en `.env.local` no tenga una barra final (`/`)
- Verifica que la API esté accesible desde tu navegador
- Revisa la consola del navegador para ver el error exacto



<!-- Contenido de SOLUCION-PROBLEMAS.md -->
# 🔧 Solución de Problemas - Cliente No Levanta

## ✅ Estado Actual Verificado

Según el diagnóstico:
- ✅ Node.js instalado (v24.12.0)
- ✅ npm instalado (v11.6.2)
- ✅ Puerto 3000 está LISTENING (servidor corriendo)
- ✅ Puerto 5020 está LISTENING (API corriendo; u otro según .env.local)
- ✅ Configuración correcta (.env.local)
- ✅ Dependencias instaladas

## 🚨 Problema: El servidor no responde en el navegador

### Soluciones a Intentar:

### 1. **Reiniciar el Servidor Completamente**

```powershell
# Detener todos los procesos de Node.js
Get-Process -Name node | Stop-Process -Force

# Ir a la carpeta del proyecto
cd C:\Proyectos\GesFer\Cliente

# Limpiar cache de Next.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Iniciar el servidor
npm run dev
```

### 2. **Verificar que el Servidor Esté Listo**

Espera a ver este mensaje en la terminal:
```
✓ Ready in X.Xs
```

Solo entonces intenta abrir el navegador.

### 3. **Probar Diferentes URLs**

Intenta estas URLs en tu navegador:
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://[::1]:3000` (IPv6)

### 4. **Verificar Firewall de Windows**

1. Abre "Firewall de Windows Defender"
2. Verifica que Node.js tenga permiso
3. O temporalmente desactiva el firewall para probar

### 5. **Verificar Puerto en Uso**

```powershell
netstat -ano | findstr :3000
```

Si hay múltiples procesos, detén todos y reinicia.

### 6. **Limpiar y Reinstalar**

```powershell
# Detener servidor
Get-Process -Name node | Stop-Process -Force

# Limpiar
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Reinstalar
npm install

# Iniciar
npm run dev
```

### 7. **Verificar Logs del Servidor**

Cuando ejecutes `npm run dev`, deberías ver:
```
✓ Ready in X.Xs
○ Compiling / ...
✓ Compiled / in X.Xs
```

Si ves errores de compilación, esos son los problemas a resolver.

### 8. **Probar con Otro Puerto**

Si el puerto 3000 está bloqueado, prueba con otro:

```powershell
$env:PORT=3001
npm run dev
```

Luego accede a `http://localhost:3001`

### 9. **Verificar Consola del Navegador**

1. Abre el navegador
2. Presiona F12 (DevTools)
3. Ve a la pestaña "Console"
4. Intenta acceder a `http://localhost:3000`
5. Revisa los errores que aparecen

### 10. **Verificar que Next.js Esté Instalado Correctamente**

```powershell
npm list next
```

Debería mostrar la versión instalada.

## 📋 Checklist Rápido

- [ ] Servidor está corriendo (`npm run dev`)
- [ ] Veo "✓ Ready" en la terminal
- [ ] Puerto 3000 está LISTENING
- [ ] No hay errores de compilación
- [ ] Firewall no está bloqueando
- [ ] He probado http://127.0.0.1:3000
- [ ] He limpiado la cache del navegador (Ctrl+Shift+R)
- [ ] He revisado la consola del navegador (F12)

## 🆘 Si Nada Funciona

1. **Ejecuta el diagnóstico:**
   ```powershell
   cd C:\Proyectos\GesFer\Cliente
   .\diagnostico.ps1
   ```

2. **Comparte los resultados** del diagnóstico

3. **Revisa los logs completos** del servidor cuando ejecutas `npm run dev`

## 📝 Notas

- El servidor puede tardar 10-30 segundos en compilar la primera vez
- Si cambias archivos, el servidor se recarga automáticamente
- Los errores de TypeScript pueden impedir que el servidor compile



<!-- Contenido de SOLUCION-CORS.md -->
# 🔧 Solución de Problemas CORS y Conexión API

**Referencia actual GesFer.Product.Front:** origen API local habitual `http://localhost:5020` (ajustar según tu `launchSettings` / OpenAPI). Los puertos 5000/5001 siguen siendo ejemplos de perfiles HTTP/HTTPS genéricos.

## Problema: ERR_EMPTY_RESPONSE en peticiones preflight

Este error indica que la petición OPTIONS (preflight) no está llegando a la API o la API no está respondiendo.

## ✅ Soluciones Aplicadas

### 1. Configuración de URL de la API

La API puede estar ejecutándose en:
- **HTTP**: p. ej. `http://localhost:5020` (referencia actual) u otros puertos
- **HTTPS**: p. ej. `https://localhost:7xxx` según certificado local

**Archivo `.env.local` (ejemplo con origen 5020):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5020
```

### 2. Verificar en qué puerto está tu API

Revisa el archivo `Api/src/Api/Properties/launchSettings.json`:

- Si ejecutas con perfil **"http"**: API en `http://localhost:5000`
- Si ejecutas con perfil **"https"**: API en `https://localhost:5001`

### 3. Configurar según tu caso

#### Si tu API está en HTTP (puerto 5000):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Si tu API está en HTTPS (puerto 5001):
```env
NEXT_PUBLIC_API_URL=https://localhost:5001
```

**⚠️ Importante:** Si usas HTTPS, el navegador puede mostrar una advertencia de certificado. Acepta la excepción para continuar.

### 4. Reiniciar el cliente después de cambiar .env.local

Después de cambiar `.env.local`, **debes reiniciar el servidor de Next.js**:

```powershell
# Detener el servidor (Ctrl+C)
# Luego reiniciar
npm run dev
```

## 🔍 Verificar que la API está funcionando

### Desde el navegador:
1. Abre: `http://localhost:5000/swagger` (o `https://localhost:5001/swagger`)
2. Si Swagger carga, la API está funcionando

### Desde PowerShell:
```powershell
# Para HTTP
Invoke-WebRequest -Uri "http://localhost:5000/swagger" -UseBasicParsing

# Para HTTPS (puede dar error de certificado, es normal)
Invoke-WebRequest -Uri "https://localhost:5001/swagger" -UseBasicParsing
```

## 🐛 Problemas Comunes

### Error: "ERR_EMPTY_RESPONSE"
- **Causa**: La API no está ejecutándose o la URL es incorrecta
- **Solución**: Verifica que la API esté corriendo y que la URL en `.env.local` sea correcta

### Error: "CORS policy"
- **Causa**: La API no está permitiendo peticiones desde el origen del cliente
- **Solución**: La API ya tiene CORS configurado con `AllowAll`, pero verifica que `UseCors()` esté antes de `UseHttpsRedirection()`

### Error: "Failed to fetch"
- **Causa**: No se puede conectar con la API
- **Solución**:
  1. Verifica que la API esté ejecutándose
  2. Verifica la URL en `.env.local`
  3. Verifica que no haya firewall bloqueando

## 📝 Checklist

- [ ] La API está ejecutándose (verifica con Swagger)
- [ ] La URL en `.env.local` coincide con el puerto de la API
- [ ] El servidor de Next.js se reinició después de cambiar `.env.local`
- [ ] No hay errores en la consola del navegador (F12)
- [ ] CORS está configurado en la API (ya está hecho)

## 🔄 Reiniciar Todo

Si nada funciona, reinicia todo:

```powershell
# 1. Detener API y Cliente
# 2. Reiniciar API
cd C:\Proyectos\GesFer\Api\src\Api
dotnet run

# 3. En otra terminal, reiniciar Cliente
cd C:\Proyectos\GesFer\Cliente
Get-Process -Name node | Stop-Process -Force
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```



<!-- Contenido de COMANDOS-GIT.md -->
# Comandos para Commit y Push

Ejecuta los siguientes comandos en la terminal desde el directorio raíz del proyecto:

```bash
cd C:\Proyectos\GesFer

git add Cliente/__tests__/integration/
git add Cliente/package.json

git commit -m "Añadiendo test a cliente" -m "Se han añadido tests de integridad completos para auditar todas las funcionalidades del cliente:

- Tests de integridad (integrity.test.tsx): 26 tests que cubren autenticación, CRUD de usuarios y companies, flujos completos, validaciones, manejo de errores y gestión de caché
- Tests E2E (e2e-flows.test.tsx): 5 tests que verifican flujos completos de operaciones CRUD
- Tests de contratos API (api-contracts.test.ts): 9 tests que validan interfaces y tipos
- Total: 40 tests pasando correctamente
- Scripts añadidos: test:integrity y test:all"

git push origin master
```

## Resumen de cambios

- **3 archivos nuevos de tests de integridad** en `Cliente/__tests__/integration/`
- **Actualización de package.json** con nuevos scripts de test
- **40 tests pasando** que cubren todas las funcionalidades principales
