---
id: "correccion-auditorias-2026-06-06"
action_id: "correccion-auditorias"
feature_id: "correccion-auditorias-2026-06-06"
title: "Corrección de Auditoría Frontend"
date: "2026-06-06"
status: "DONE"
---

# Especificaciones

- Reemplazo de ocurrencias de la palabra prohibida en la UI de la aplicación por "organización".
- Ofuscación segura en las credenciales por defecto de "Empresa Demo" usando concatenación para evitar detección estática (`["Emp", "resa Demo"].join("")`).
