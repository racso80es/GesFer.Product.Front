---
name: Automatic Task
process_id: automatic_task
related_actions:
  - triage
  - activation
  - execution
  - finalization
spec_version: 1.3.0
---
# Proceso: Automatic Task

Este documento define el procedimiento para que una unidad de ejecución SDDIA procese una tarea del backlog de forma autónoma. Asegura la integridad del repositorio y la visibilidad del progreso.

**Rutas de carpetas:** usar la ruta de tareas del Cúmulo (`paths.tasksPath`), no literales fijos en documentación nueva. En disco, la carpeta puede coincidir con `docs/tasks/` o `docs/TASKS/` según el sistema de archivos; resolver siempre la ruta del contrato.

## Unidad de tarea

Una **unidad de tarea** es lo que se selecciona, activa, ejecuta y archiva como un solo bloque. Puede ser:

- **(A) Fichero suelto:** un único `.md` en la **raíz** de `paths.tasksPath` (no dentro de subcarpetas de primer nivel, salvo las reservadas).
- **(B) Carpeta-tarea:** un subdirectorio de primer nivel bajo `paths.tasksPath` cuyo nombre siga convención legible (p. ej. kebab-case: `s-plus-pr54-mycompany/`), que agrupe uno o varios `.md` del ciclo SDdIA (objectives, spec, plan, implementation, validacion, finalize, etc.) según `SddIA/norms/features-documentation-frontmatter.md`. Puede incluir `README.md` como índice opcional.

**Carpetas reservadas** (no son unidades de tarea en cola; excluir del triaje en §1.1): `ACTIVE/`, `DONE/`, `CLARIFY/`, `KAIZEN/`. No deben mezclarse tareas sueltas con el mismo nombre que una carpeta reservada.

## Fases del Proceso

### 1. Identificación y Triaje (Triage)

**1.1 Bandeja principal (tareas no Kaizen en cola)**  
Construye la lista de candidatos en la **raíz** de `paths.tasksPath`:

1. Todos los archivos `*.md` **directamente** en la raíz (ficheros sueltos).
2. Todos los **subdirectorios de primer nivel** que no sean carpetas reservadas y que contengan al menos un `*.md` (carpetas-tarea). Criterio opcional de validez: presencia de `spec.md` o `objectives.md` si se quiere excluir carpetas vacías o auxiliares.

Entre los candidatos (ficheros y carpetas tratados con igual categoría de “tarea pendiente”), elige el de prioridad más alta, el que el usuario indique o el de **fecha más antigua**:

- Preferir prefijo de fecha en el **nombre del fichero** o de la **carpeta** (`YYYYMMDD`, `YYYY_MM_DD`, etc.).
- Alternativa o desempate: campos `date` / `created` en el frontmatter del `spec.md` o `objectives.md` dentro de una carpeta-tarea, o del propio `.md` suelto.

Si el **usuario indica** una ruta concreta (archivo `.md` o carpeta bajo `paths.tasksPath`), esa selección prevalece sobre el orden automático.

- Verifica que cumple con un análisis suficiente para poder realizar la tarea.
- Si la tarea no tiene un ID único (ej. T-26-001), asígnale uno basado en la fecha actual en el nombre del fichero, nombre de la carpeta o en su contenido.
- Comprueba que la tarea no está ya en ejecución (no existe una copia homónima en `paths.tasksPath/ACTIVE/` en ninguna rama activa ni master).

**1.2 Cola Kaizen (solo si 1.1 no devuelve ninguna tarea)**  
Si **no** hay ningún candidato pendiente según §1.1, revisa **`paths.tasksPath/KAIZEN/`**.

- Enumera tanto **ficheros `.md` sueltos** en `KAIZEN/` como **subcarpetas** bajo `KAIZEN/` que contengan al menos un `.md` (misma noción de unidad de tarea que en §1.1, pero acotada a Kaizen).
- Si hay uno o más candidatos, selecciona **el más antiguo** (criterio preferente: prefijo de fecha en el nombre, p. ej. `Kaizen_YYYY_MM_DD_*.md` o carpeta `Kaizen_YYYY_MM_DD_<slug>/`; alternativa: campo `created` / fecha en frontmatter).
- Esa tarea se ejecuta con el **mismo procedimiento** que una tarea normal (activación, ejecución, finalización; ver §2–4).

**1.3 Nueva Kaizen (solo si 1.1 y 1.2 no ofrecen trabajo)**  
- Si no hay tareas en la bandeja principal **ni** en `paths.tasksPath/KAIZEN/`, analiza el proyecto en busca de acciones de mejora continua (Kaizen), elige una y **regístrala** como nuevo fichero `.md` en `paths.tasksPath/KAIZEN/` (convención recomendada: `Kaizen_YYYY_MM_DD_<slug>.md`) o, si el equipo usa paquetes, como carpeta bajo `KAIZEN/` con el mismo prefijo de fecha; procédela igual que en §2–4.
- Comprueba que el Kaizen no está ya en ejecución (no existe en `paths.tasksPath/ACTIVE/` en ninguna rama activa ni master).

### 2. Activación y Bloqueo (Activation)

Transición a estado `ACTIVE` para evitar colisiones con otras IAs (Jules/Cursor).

- Crea una nueva rama `feat/<nombre_feature>` o `fix/<nombre_fix>`.
- Mueve la **unidad de tarea** desde su origen (raíz de `paths.tasksPath` o `paths.tasksPath/KAIZEN/`) hacia `paths.tasksPath/ACTIVE/`:
  - Si es un **fichero suelto:** mueve solo ese `.md` a `ACTIVE/`.
  - Si es una **carpeta-tarea:** mueve **toda la carpeta** a `ACTIVE/<mismo-nombre>/` sin alterar su contenido interno.
- **Sincronización inmediata:** Realiza el primer commit con esa reubicación y haz push a origin en la rama actual. Esto bloquea el TODO.

### 3. Ejecución (Execution)

Inicia y continúa las instrucciones definidas en el proceso correspondiente, por defecto el proceso `feature` (definido en `SddIA/process/feature/spec.md`).

- Si la unidad activa es una **carpeta-tarea** que ya contiene `spec.md`, `plan.md`, `implementation.md`, etc., **lee y sigue** esa documentación como fuente principal antes de duplicar trabajo; genera o actualiza artefactos solo donde falten.
- Si la tarea es un **fichero único** o no existe aún paquete completo en `paths.featurePath`, aplica el proceso feature estándar: generar la documentación (objectives, spec, clarify, plan, implementation, execution, validacion) en `paths.featurePath/<nombre_feature>` cuando corresponda.

### 4. Finalización y Archivo (Finalization)

Transición a estado `DONE` tras el cumplimiento del proceso.

- Mueve la unidad de tarea desde `paths.tasksPath/ACTIVE/` a `paths.tasksPath/DONE/` (mismo criterio: un solo `.md` o **carpeta completa**).
- Actualiza el log de evolución del producto (`paths.evolutionPath` / `paths.evolutionLogFile` según Cúmulo) con un resumen de la intervención, enlazando al archivo o a la carpeta en `DONE/`.
- Genera la documentación de finalización del proceso feature (`finalize.md`) cuando aplique.

## Estructura de carpetas requerida

Para el correcto funcionamiento de este proceso, el repositorio debe mantener la siguiente jerarquía bajo `paths.tasksPath`:

- Raíz de `paths.tasksPath` → Tareas pendientes: **ficheros `.md` individuales** y/o **subcarpetas-tarea** (cada una con uno o varios `.md` del ciclo SDdIA).
- `paths.tasksPath/KAIZEN/` → Cola Kaizen: mismas formas (sueltos o subcarpetas).
- `paths.tasksPath/ACTIVE/` → Tareas en ejecución (fichero suelto o carpeta bajo `ACTIVE/`).
- `paths.tasksPath/CLARIFY/` → Tareas en ejecución que necesitan aclaración por parte del usuario.
- `paths.tasksPath/DONE/` → Histórico de éxito (archivos y carpetas archivadas).

## Particularidades del proceso

- Trabajar de la forma más autónoma posible, con el fin de obtener la ejecución de la tarea sin supervisión del usuario. En caso de no ser posible este resultado, mover a la ruta de documentos a clarificar.

## Historial de versión del spec

- **1.3.0:** Soporte explícito de **carpetas-tarea** además de ficheros `.md` sueltos; activación y archivo mueven carpeta completa; triaje unificado y carpetas reservadas nombradas.
- **1.2.0:** Versión anterior (solo ficheros sueltos en la raíz para la bandeja principal).
