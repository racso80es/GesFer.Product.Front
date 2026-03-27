Contexto de Tarea: Instalación y Configuración de Sistema de Diseño (MUI)

Instrucciones de Acción:

Triaje de Dependencias: Instala las librerías base de MUI para TypeScript:
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

Configuración de Tipado (TS): >    * Crea la carpeta src/theme y genera un archivo theme.ts.

Configura un ThemeProvider básico. Asegúrate de que el tema esté fuertemente tipado.

Si existe un archivo de estilos globales, adáptalo para evitar conflictos con CssBaseline.

Estructura de Componentes (Regla de Oro):

Crea la carpeta src/components/common para componentes de UI reutilizables.

Implementa un componente de ejemplo CustomButton.tsx que extienda el Button de MUI, demostrando el uso de interfaces de TypeScript para las props.

Verificación Kaizen:

El código debe compilar sin errores de tipos (any prohibido).

Asegúrate de que las fuentes (Roboto o similar) estén configuradas correctamente en el index.html o vía @fontsource.

Restricción: No apliques estilos inline pesados; prioriza el uso de styled de Emotion o el sistema de sx para ajustes puntuales, manteniendo la limpieza del JSX.
