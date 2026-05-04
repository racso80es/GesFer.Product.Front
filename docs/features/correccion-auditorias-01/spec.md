---
id: spec-correccion-auditorias-01
action_id: correccion-auditorias-01
feature_id: correccion-auditorias-01
title: Especificaciones de la corrección
status: done
---

# Especificaciones
Se debe actualizar `src/hooks/use-my-company.test.tsx` reemplazando `as any` por la interfaz de tipo adecuada y pasando los campos obligatorios al updateCompany mock, para garantizar la seguridad de tipos y cumplir con la política de 0 "as any".
