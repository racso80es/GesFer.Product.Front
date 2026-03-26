# Tarea T-20260325-001 — migración de componentes compartidos (histórico)

> **Archivo histórico (marzo 2026).** El texto siguiente conserva el **enunciado original** de la tarea. La **ejecución aplicada** reubicó el código en `src/components/` y `src/lib/` con alias `@/`, sin depender del paquete `Shared` del monorepo; detalle en `docs/EVOLUTION_LOG.md`.

## Descripción (estado en el momento del borrador)

El proyecto actualmente utiliza una copia local de los componentes compartidos dentro del directorio `src/TemporalShared/Front`. Esto se debió a un error de configuración temporal donde el alias `@shared/` no podía resolver los componentes ubicados en el paquete `Shared` del monorepo, lo que causaba fallos en el proceso de compilación (`npm run build`).

## Pasos para la limpieza

1. **Restaurar el alias `@shared/`**:
   - Asegurarse de que el directorio `Shared/Front` original esté disponible y correctamente vinculado en la estructura del monorepo.
   - Revertir cualquier cambio temporal en `src/tsconfig.json` y/o `src/tailwind.config.ts` que apunte a `TemporalShared`.
   - Modificar todos los imports en los componentes y páginas que actualmente apuntan a `@/TemporalShared/Front/` para que vuelvan a utilizar el alias `@shared/`.
   - Se recomienda usar una herramienta de búsqueda y reemplazo global (por ejemplo: `sed` o el editor de código) para buscar `import ... from "@/TemporalShared/Front/...";` y reemplazarlo por `import ... from "@shared/...";`.

2. **Eliminar el directorio temporal**:
   - Una vez comprobado que el build se ejecuta sin problemas apuntando a `@shared/`, eliminar de forma segura el directorio `src/TemporalShared/Front`.

3. **Verificación final**:
   - Ejecutar `npm run build` y correr las pruebas (`npm run dev`) para asegurar que todo el proyecto sigue funcionando correctamente sin dependencias a `TemporalShared`.

## Notas
- Esta tarea debe ser realizada antes de finalizar la integración o de fusionar estos cambios a la rama principal (main), a fin de preservar la arquitectura del monorepo.