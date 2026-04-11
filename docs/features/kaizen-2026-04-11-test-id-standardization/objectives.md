---
id: kaizen-2026-04-11-test-id-standardization
action_id: feature-objectives
feature_id: kaizen-2026-04-11-test-id-standardization
title: Objetivos para Estandarizar data-testid en componentes UI
status: active
---

# Objetivos

El objetivo de esta tarea Kaizen es estandarizar el uso de la propiedad `data-testid` en los componentes UI (ubicados en `src/components/ui/`), según la indicación del proyecto:
"UI components in `src/components/ui/` should explicitly include `'data-testid'?: string` in their props interfaces to standardize testing hooks."

Para ello:
1. Asegurarse de que cada componente exportado en `src/components/ui/*.tsx` tenga `data-testid` en su interfaz y se lo asigne a su elemento raíz.
2. Mantener la compatibilidad y no romper la funcionalidad existente.
3. Actualizar los test afectados y asegurarse de que pasan.
