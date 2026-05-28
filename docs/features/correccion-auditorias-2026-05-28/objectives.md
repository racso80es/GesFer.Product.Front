# Objectives: Corrección Auditoría 2026_05_28_01

1. Configurar el entorno de tests global (`IS_REACT_ACT_ENVIRONMENT = true`) para suprimir warnings de `act()`.
2. Agregar un mock funcional de `IntersectionObserver` para resolver interacciones de next/link en tests asíncronos.
3. Asegurar que los tests en `src/__tests__/app/login/page.test.tsx` y `src/__tests__/app/usuarios/page.test.tsx` corran sin emitir `Warning: The current testing environment is not configured to support act(...)`.
