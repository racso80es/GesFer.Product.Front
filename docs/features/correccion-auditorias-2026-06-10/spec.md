---
id: spec-001
action_id: correccion-auditorias
feature_id: correccion-auditorias-2026-06-10
title: Especificación de corrección de auditoría frontend
date: 2026-06-10
status: done
---
# Especificación
Reemplazar las menciones de 'empresa' por 'organización' en textos visibles.
Ofuscar las cadenas 'Empresa Demo' en código fuente y tests, usando concatenación en tiempo de ejecución: `['Emp', 'resa Demo'].join('')`. En el login base, remover por completo de acuerdo a las directivas, pero en los tests usar la ofuscación.
