# Specification: Corrección Auditoría 2026_05_28_01

## Contexto
Durante la ejecución de las pruebas unitarias en React (usando Jest), se imprimen múltiples advertencias relativas al no uso correcto del helper `act()`. Si bien esto puede deberse a la arquitectura del test, la solución general en entornos como Next.js usando React 18+ es asegurar que la bandera global esté encendida. Además, componentes base que dependen del Intersection Observer levantan errores al no estar nativo en el entorno de jsdom.

## Cambios
Se modificará el fichero `src/jest.setup.js` inyectando configuraciones globales para el entorno `window` y `global`:
1. `global.IS_REACT_ACT_ENVIRONMENT = true;`
2. `global.IntersectionObserver` mock básico.

Esto suprimirá los warnings identificados en el reporte de auditoría.
