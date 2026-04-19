---
id: KAIZEN-20260413-001
title: Enforce strict i18n routing structure
status: DONE
created: 2026-04-13
---
# Kaizen: Enforce strict i18n routing structure

## Context
Project memory and `docs/architecture/I18N-GUIDE.md` explicitly state: 'All new pages must be created inside src/app/[locale]/ (e.g., src/app/[locale]/login/page.tsx). Never create pages directly under src/app/ to ensure the internationalization system functions correctly.'

## Analysis
Currently, `src/app/(client)/` and `src/app/my-company/` contain non-localized page structures that violate this strict architectural rule.

## Objectives
1. Move `src/app/my-company/page.tsx` into `src/app/[locale]/my-company/page.tsx`.
2. Move all pages from `src/app/(client)/*` into their corresponding `[locale]` routes if they don't already exist, or remove the duplicate/unlocalized `(client)` directories if they overlap with `[locale]` implementations. Let's analyze overlaps.

## Result
Replaced tests imports, removed duplicate `src/app/(client)` routes since their localized versions already existed and functioned correctly, and moved the single unlocalized `my-company` to `src/app/[locale]/my-company/`.
