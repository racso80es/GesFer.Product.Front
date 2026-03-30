---
id: "SPEC-001"
action_id: "spec-001"
feature_id: "actualizacion-readme"
title: "Especificación de Actualización de Readme"
status: "DONE"
---

# Especificación Técnica

## Ficheros Afectados

1.  **`/README.md`**: El archivo raíz se ampliará y estructurará para contener la información consolidada.
2.  **`src/SETUP.md`**: Será eliminado.
3.  **`src/INSTRUCCIONES.md`**: Será eliminado.
4.  **`src/README-TESTS.md`**: Será eliminado.

## Contenido a Migrar y Estructurar

El nuevo `/README.md` deberá incluir, de manera clara y coherentel, las siguientes secciones consolidadas a partir de los documentos origen:

1.  **Título y Descripción General**: (Ya presente, se mantiene).
2.  **Requisitos Previos**: Node.js 18+ (recomendado 20+), npm, PowerShell 7+, y un backend disponible.
3.  **Inicio Rápido y Configuración Automática**: Explicar el flujo manual básico (clonar, `npm install`, `.env.local`) y mencionar la existencia de scripts automáticos (`.\setup.ps1`).
4.  **Estructura del Proyecto y Tecnologías**: Mantener y clarificar la lista de tecnologías (Next.js 14, Tailwind, MUI/Shadcn, etc.) y la estructura de carpetas (incluyendo `__tests__`).
5.  **Autenticación y Credenciales**: Proveer detalles sobre las credenciales de prueba predeterminadas.
6.  **Testing**: Incorporar la sección de dependencias de testing (Jest, React Testing Library), estructura (`__tests__`) y cómo ejecutar pruebas (`npm test`, `npm run test:coverage`). (Proviene de `src/README-TESTS.md`).
7.  **Solución de Problemas (Troubleshooting)**: Incorporar información unificada de errores comunes de instalación o conexión a la API (CORS, Node.js no encontrado, etc.). (Proviene de `src/SETUP.md` y `src/INSTRUCCIONES.md`).
8.  **Documentación y Enlaces Útiles**: Mantener los enlaces y la tabla de otros recursos.

## Criterios de Aceptación

*   El archivo `/README.md` debe estar actualizado y su contenido no debe ser contradictorio.
*   Los archivos `src/SETUP.md`, `src/INSTRUCCIONES.md` y `src/README-TESTS.md` deben ser borrados.
*   El proyecto debe seguir levantando o compilando sin problemas, y todos los enlaces o referencias directas a archivos eliminados (si los hubiese) en la documentación general deben ser revisados (el alcance primario es solo la consolidación).
*   La escritura debe respetar las directivas de convenciones del repositorio.