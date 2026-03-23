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

