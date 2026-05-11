---
id: Kaizen_2026_05_08_clean_code
title: Refactorizacion de tipos as any en overlay-fix.test.tsx
created: 2026-05-08
---
# Tarea: Refactorizacion de tipos as any en overlay-fix.test.tsx

Reemplazar los casteos `as any` por `as unknown as ReturnType<typeof window.getComputedStyle>` en `src/__tests__/components/ui/overlay-fix.test.tsx` para cumplir con la política estricta de The Wall.
