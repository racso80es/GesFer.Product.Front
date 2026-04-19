# start-frontend

**toolId:** start-frontend
**Cápsula:** paths.toolCapsules.start-frontend (Cúmulo)

## Objetivo

Levanta el dev server del proyecto GesFer.Product.Front (Next.js). Ejecuta `npm run dev` en `src/`, comprueba el puerto configurado y considera **éxito** si la URL de salud responde (HTTP 200). La política ante **puerto ocupado** puede fijarse por CLI o por configuración (ver abajo).

## Configuración (`start-frontend-config.json`)

Fichero en esta misma carpeta. Campos relevantes:

| Campo | Descripción |
|-------|-------------|
| `frontendWorkingDir` | Directorio del frontend (p. ej. `src`). |
| `defaultPort` | Puerto por defecto del dev server. |
| `portBlocked` | `false` (booleano) o `"kill"` (cadena): si el puerto está ocupado, fallar sin intentar liberar (`false`) o intentar terminar el proceso del dev server cuando la implementación lo identifique (`"kill"`). |
| `healthCheckTimeoutSeconds` | Timeout del healthcheck. |

**Precedencia:** si en la línea de comandos se pasa `--port-blocked`, ese valor **gana** sobre `portBlocked` del JSON. Si no se pasa el flag, se usa el valor del fichero; si la clave no existe, se asume `false`. Detalle: `SddIA/tools/start-frontend/spec.md` (v1.2.0), decisión D-06 en `clarify.md`.

## Uso

Desde la raíz del repositorio:

```powershell
.\scripts\tools\start-frontend\Start-Frontend.bat
```

Con política explícita en CLI (prevalece sobre `portBlocked` del JSON):

```powershell
.\scripts\tools\start-frontend\Start-Frontend.bat --port-blocked kill
.\scripts\tools\start-frontend\Start-Frontend.bat --port-blocked false
```

## Salida

JSON según `SddIA/tools/tools-contract.json`: toolId, exitCode, success, timestamp, message, feedback[], data (url_base, port, pid), duration_ms.

## Implementación

Ejecutable Rust `start_frontend.exe` en la ruta de la tool. Launcher `.bat` invoca el .exe. El binario lee **`start-frontend-config.json`**, aplica flags CLI con la precedencia indicada, ejecuta `npm run dev`, comprueba puerto y realiza healthcheck.

**Salida:** JSON por stdout solo con `--output-json` (por defecto no). `Start-Frontend.bat` añade `--output-json` cuando hace falta para conservar JSON en consola. Use `--quiet` para suprimir stdout; `--output-path` para escribir a fichero. Especificación detallada: `SddIA/tools/start-frontend/output-salida-json.md`.

**Compilación:** Ejecutar `install.ps1` en `scripts/tools-rs/` para compilar y copiar el .exe a la cápsula.
