---
feature: update-readme
status: final
---

# Plan

1. Leer el `README.md` de la raíz para retener la introducción básica y las partes críticas sobre el proyecto.
2. Leer los documentos de la carpeta `src` que contienen información de configuración y solución de problemas.
3. Crear un nuevo borrador de `README.md` que contenga todo integrado:
   - Título y Descripción.
   - Tecnologías y Requisitos Previos.
   - Instalación y Configuración (`src/SETUP.md`, `src/INSTRUCCIONES.md`).
   - Configuración de la API y Variables de Entorno (`src/CONFIGURACION-API.md`).
   - Solución de problemas comunes y errores de CORS (`src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`).
   - Autenticación y credenciales de prueba.
   - Scripts disponibles y notas para Docker.
   - Documentación y herramientas adiciones (referencia a `SddIA`).
4. Reemplazar el archivo `README.md` de la raíz por el nuevo borrador de forma atómica.
5. Eliminar los archivos fuente de la carpeta `src/`.