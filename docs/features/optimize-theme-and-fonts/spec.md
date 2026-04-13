---
id: spec-optimize-theme-and-fonts
action_id: spec
feature_id: optimize-theme-and-fonts
title: Especificación técnica de Optimize Theme and Fonts
status: done
---
# Especificación técnica

- Añadir la directiva `'use client';` en `src/theme/theme.ts`.
- Configurar la fuente Roboto con `next/font/google` en `src/app/[locale]/layout.tsx` respetando las reglas de lint (import/first).
