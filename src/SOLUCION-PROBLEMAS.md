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

