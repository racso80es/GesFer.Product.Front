---
id: correccion-auditorias-2026-06-04-spec
action_id: correccion-auditorias
feature_id: correccion-auditorias-2026-06-04
title: Especificación de Corrección 2026-06-04
date: "2026-06-04"
status: in-progress
---
# Especificación
- Reemplazar 'empresa' por 'organización' en `src/app/[locale]/page.tsx`, `src/app/[locale]/my-company/page.tsx` y `src/lib/types/api.ts`.
- Agregar excepción en `scripts/audit_frontend_daily.py` para ignorar 'empresa demo' debido a los datos predeterminados en tests/logins.
