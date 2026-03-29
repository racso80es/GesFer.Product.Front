---
title: Especificación técnica para unificar README
type: specification
---
# Especificación

## Detalles Técnicos
La documentación de uso general, configuración y solución de problemas está duplicada entre `README.md` principal y el interior de la carpeta `src/`. Esto viola el principio de tener una sola fuente de verdad para la entrada del proyecto.

La solución especificada requiere:
1. Extraer o enlazar contenido de `src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`, `src/COMANDOS-GIT.md` hacia el archivo principal `README.md`. Como el `README.md` actual ya está bastante completo, revisaremos los ficheros del `src/` para añadir secciones que falten, o simplemente incorporaremos sus contenidos en nuevas secciones en el `README.md`.
2. Como las "Specialized architectural and testing guides reside in docs/architecture/ and docs/testing/", los archivos de guías de test y de i18n se moverán a esas rutas especificadas.
3. Al finalizar, los ficheros del `src/` mencionados quedarán eliminados.
