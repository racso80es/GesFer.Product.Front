Objetivo Home Publica

[2024-04-18] [feat/adecuar-companies-a-mycompany] [Adecuar modulo Companies a endpoint MyCompany usando Clean Architecture y hooks] [DONE].

## feature: adecuar-companies-a-mycompany
Resumen: Refactorizada la vista de /companies para consumir un hook de react-query `useMyCompany` y un servicio de `myCompanyApi`, eliminando la logica de listar/borrar multi-companies y transformandola en una vista "My Company" con formulario de edicion.
Referencia archivada: [docs/TASKS/DONE/T-20240418-001.md](../../docs/TASKS/DONE/T-20240418-001.md)

[2026-04-16] [feat/kaizen-audit-norms-git] [Auditoría Kaizen: Se añadió YAML Frontmatter al archivo de norma SddIA/norms/git-via-skills-or-process.md para estandarizar su metadata.] [DONE].

## feature: kaizen-audit-norms-git
Resumen: Como parte de la iniciativa de Mejora Continua (Kaizen) iniciada tras identificar una falta de metadatos, se insertó YAML Frontmatter en `SddIA/norms/git-via-skills-or-process.md`. Esta modificación estandariza las normas SddIA con el patrón prescrito de metadatos estructurados sin alterar sus contenidos operativos.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_16_audit_norms_frontmatter_git.md](./TASKS/DONE/Kaizen_2026_04_16_audit_norms_frontmatter_git.md)

[2026-04-15] [feat/kaizen-audit-norms] [Auditoría Kaizen: Se añadió YAML Frontmatter al archivo de norma SddIA/norms/commands-via-skills-or-tools.md para estandarizar las entidades del SDDIA.] [DONE].

## feature: kaizen-audit-norms
Resumen: Como parte de la iniciativa de Mejora Continua (Kaizen) identificada durante una evaluación de rutina bajo el proceso automatic_task, se insertó YAML Frontmatter en `SddIA/norms/commands-via-skills-or-tools.md`. Esta modificación estandariza las normas SddIA con el patrón prescrito de metadatos estructurados sin alterar sus contenidos operativos.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_15_audit_norms_frontmatter.md](./TASKS/DONE/Kaizen_2026_04_15_audit_norms_frontmatter.md)

[2026-04-08] [feat/kaizen-typing-improvements] [Adición de tipados explícitos para data-testid en el componente Loading para estandarizar testing. Tarea automática Kaizen completada.] [DONE].
[2026-04-06] [feat/unificacion-ramas] [Consolidación de ramas huérfanas sobre la actualización del readme general y la limpieza de temporal-shared para preparar el PR final. Resolución de conflictos y unificación de logs. Tarea manual completada.] [DONE].
[2026-03-30] [feat/limpieza-temporal-shared] [Limpieza de referencias huérfanas a TemporalShared en tailwind.config.ts. Cierre de Tarea TASK-001.] [DONE].
[2026-03-28] [fix/fix-select-a11y] [Resolución de advertencias de accesibilidad (A11y) en el componente Select. Añadidos aria-controls y aria-selected. Tarea Kaizen completada.] [DONE].
[2026-03-25] [feat/limpieza-temporal-shared] [Migrado TemporalShared a src/components/ y src/lib/. Actualizados imports a alias locales. Cierre de Tarea T-20260325-001.] [DONE].
[2026-03-26] [feat/add-mui-components] [Integración de MUI para Next.js App Router, ThemeRegistry y CustomButton. Cierre de Tarea TASK-001.] [DONE].
[2026-03-27] [feat/add-logs] [Implementación de sistema de logging persistente con Pino, endpoint API para capturas de cliente, y manejador global de errores. Cierre de Tarea TASK-20260327-001.] [DONE].
[2026-03-27] [feat/kaizen-enforce-import-rule] [Configuración de eslint-plugin-import y regla import/first para garantizar la integridad de imports en Next.js. Tarea automática. Cierre de Tarea Kaizen_2026_03_27_Enforce_Import_Rule.] [DONE].
[2026-03-27] [feat/add-components-mui] [Instalación de dependencias de MUI y Emotion. Configuración de Next.js App Router con ThemeProvider y AppRouterCacheProvider. Integración de tipados fuertes y prevención de conflictos con Tailwind CSS. Cierre de Tarea TASK-001-Add_Components_MUI.] [DONE].

## feature: kaizen-typing-improvements
Resumen: Se han añadido tipados explícitos para el atributo `data-testid` en el interfaz de propiedades del componente `src/components/ui/loading.tsx`. Esta mejora estandariza la escritura de hooks de prueba a través de los componentes UI y previene errores de validación de TypeScript en modos estrictos.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_08_typing_improvements.md](./TASKS/DONE/Kaizen_2026_04_08_typing_improvements.md)

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
[2026-04-06] [feat/task-20260406-001-actualizacion-readme] [Unificación de READMEs y reorganización de la documentación en docs/architecture y docs/testing. Eliminación de redundancias en src/. Tarea automática.] [DONE].

## feature: task-20260406-001-actualizacion-readme
Resumen: Se ha reorganizado la documentación del repositorio. Documentos de testing e i18n se movieron de `src/` a `docs/testing/` y `docs/architecture/`. Documentación redundante en `src/` como comandos, setups y configuraciones ya cubiertas por el README principal ha sido eliminada.
Referencia archivada: [docs/TASKS/DONE/TASK-20260406-001-Actualizacion_Readme.md](./TASKS/DONE/TASK-20260406-001-Actualizacion_Readme.md)

## feature: limpieza-temporal-shared
Resumen: Se eliminaron las referencias huérfanas a `TemporalShared` en `src/tailwind.config.ts` como parte del backlog de limpieza técnica.
Referencia archivada: [docs/TASKS/DONE/TASK-001-limpieza-temporal-shared.md](./TASKS/DONE/TASK-001-limpieza-temporal-shared.md)

## feature: unificacion-ramas
Resumen: Se realizó una unificación manual de ramas pendientes de revisión. El PR incluye la consolidación de la limpieza técnica de Tailwind (TemporalShared) y la re-organización y actualización de la documentación de `src/` al directorio raíz y las carpetas `docs/`. Los conflictos en `EVOLUTION_LOG.md` han sido resueltos.
Referencia archivada: [docs/features/unificacion-ramas/README.md](./features/unificacion-ramas/README.md)

[2024-04-07] [feat/actualizacion-readme] [Unificación de READMEs y reorganización de la documentación en docs/architecture y docs/testing. Eliminación de redundancias en src/. Tarea automática.] [DONE].

## feature: actualizacion-readme
Resumen: Se ha reorganizado la documentación del repositorio. Documentos de testing e i18n se movieron de `src/` a `docs/testing/` y `docs/architecture/`. Documentación redundante en `src/` como comandos, setups y configuraciones ya cubiertas por el README principal ha sido eliminada y el contenido útil se consolidó en el README.md de la raíz.
Referencia archivada: [docs/TASKS/DONE/Actualizacion_Readme.md](./TASKS/DONE/Actualizacion_Readme.md)

[2026-04-10] [fix/bug-log-sddia] [Alineación de rutas de Evolution Logs de producto (docs/evolution/) e incorporación de cambios de Cúmulo al registro oficial SddIA.] [DONE].

## bug-fix: bug-log-sddia
Resumen: Se ha alineado la ruta física del archivo `EVOLUTION_LOG.md` genérico moviéndolo a `docs/evolution/EVOLUTION_LOG.md` para cumplir con lo establecido por la configuración `evolutionPath` de Cúmulo. Se ha actualizado `SddIA/actions/finalize/spec.md` quitando las referencias "quemadas" a la antigua ubicación. Se registró la alteración de la configuración de SddIA en `SddIA/evolution/`.
Referencia archivada: [docs/bugs/bug-log-sddia/objectives.md](./bugs/bug-log-sddia/objectives.md)

[2026-04-10] [fix/ui-components-testid] [Añadido data-testid a props de componentes UI] [DONE].

## feature: ui-components-testid
Resumen: Se ha añadido explícitamente `'data-testid'?: string;` a las interfaces de `InputProps` y `ButtonProps` en los componentes base de UI para estandarizar los hooks de testing y cumplir con las guidelines de memoria del proyecto.
Referencia archivada: docs/features/ui-components-testid/objectives.md