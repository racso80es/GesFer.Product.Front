Objetivo Home Publica

[2026-03-28] [fix/fix-select-a11y] [Resolución de advertencias de accesibilidad (A11y) en el componente Select. Añadidos aria-controls y aria-selected. Tarea Kaizen completada.] [DONE].
[2026-03-25] [feat/limpieza-temporal-shared] [Migrado TemporalShared a src/components/ y src/lib/. Actualizados imports a alias locales. Cierre de Tarea T-20260325-001.] [DONE].
[2026-03-26] [feat/add-mui-components] [Integración de MUI para Next.js App Router, ThemeRegistry y CustomButton. Cierre de Tarea TASK-001.] [DONE].
[2026-03-27] [feat/add-logs] [Implementación de sistema de logging persistente con Pino, endpoint API para capturas de cliente, y manejador global de errores. Cierre de Tarea TASK-20260327-001.] [DONE].
[2026-03-27] [feat/kaizen-enforce-import-rule] [Configuración de eslint-plugin-import y regla import/first para garantizar la integridad de imports en Next.js. Tarea automática. Cierre de Tarea Kaizen_2026_03_27_Enforce_Import_Rule.] [DONE].
[2026-03-27] [feat/add-components-mui] [Instalación de dependencias de MUI y Emotion. Configuración de Next.js App Router con ThemeProvider y AppRouterCacheProvider. Integración de tipados fuertes y prevención de conflictos con Tailwind CSS. Cierre de Tarea TASK-001-Add_Components_MUI.] [DONE].

## feature: kaizen-enforce-import-rule
Resumen: Se ha integrado `eslint-plugin-import` y configurado la regla `import/first` en el archivo `.eslintrc.json`. Esta mejora fue realizada de forma autónoma siguiendo el proceso `automatic_task` como parte de una iniciativa de Mejora Continua (Kaizen).
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_03_27_Enforce_Import_Rule.md](./TASKS/DONE/Kaizen_2026_03_27_Enforce_Import_Rule.md)

## feature: add-logs
Resumen: Se ha integrado `pino` para generar logs persistentes en el servidor (`logs/app.log`) diferenciando niveles por entorno (DEV/PROD). Se creó el endpoint `/api/logs` para centralizar la telemetría del cliente, y el componente `global-error.tsx` para atrapar excepciones críticas del App Router. Se resolvió la incompatibilidad de `pino` con el build de Next.js mediante `serverComponentsExternalPackages`.
Referencia archivada: [docs/TASKS/DONE/TASK-20260327-001-AddLogs.md](./TASKS/DONE/TASK-20260327-001-AddLogs.md)

## feature: add-components-mui
Resumen: Se ha integrado Material UI en el proyecto con tipado fuerte y convivencia con Tailwind CSS mediante `@layer`. Se configuró la fuente Roboto (next/font) y el componente `CustomButton` con el sistema `sx` de MUI.
Referencia archivada: [docs/TASKS/DONE/TASK-001-Add_Components_MUI.md](./TASKS/DONE/TASK-001-Add_Components_MUI.md)

## feature: mui-integration
Resumen: Se instalaron las dependencias de Material UI (MUI) y @mui/material-nextjs para compatibilidad con el App Router de Next.js. Se configuró un tema fuertemente tipado en src/theme/theme.ts y un ThemeRegistry como Client Component. Se añadió el componente CustomButton demostrando el uso robusto de interfaces de TypeScript para props, y se configuró la fuente Roboto usando next/font/google.
Referencia a la tarea: [docs/features/mui-integration/README.md](./features/mui-integration/README.md)

[2026-03-26] [kaizen-adaptacion-monorepo] [Dockerfile, gitignore, skill frontend-build, README-TESTS, normas SddIA/Cursor; cierre spec product-front-objetivos-pendientes.] [DONE].

[2026-03-25] [feat/limpieza-temporal-shared] [Migrado código provisional del monolito a src/components/ y src/lib/. Actualizados imports a alias locales. Cierre de Tarea T-20260325-001.] [DONE].

## feature: fix-select-a11y
Resumen: Se resolvieron problemas de accesibilidad (A11y) detectados por el linter en el componente Select (`src/components/ui/select.tsx`). Se añadió un ID único al contexto para vincular `aria-controls` en el combobox y el contenido, y se agregó `aria-selected` a las opciones.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_03_28_fix_select_a11y.md](./TASKS/DONE/Kaizen_2026_03_28_fix_select_a11y.md)

## feature: limpieza-temporal-shared (histórico)
Resumen: Se completó la migración del directorio temporal de componentes compartidos del monorepo a la arquitectura nativa del proyecto, abandonando el enfoque de paquete "Shared" externo por incompatibilidad de contexto. Se reescribieron alias, tsconfig y tailwind.
Referencia archivada: [docs/TASKS/DONE/T-20260325-001-limpieza-temporal-shared.md](./TASKS/DONE/T-20260325-001-limpieza-temporal-shared.md)
