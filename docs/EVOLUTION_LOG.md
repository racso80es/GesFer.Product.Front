[2026-04-11] [feat/kaizen-2026-04-11-test-id-standardization] [Estandarizar data-testid en componentes UI] [DONE].

## feature: Estandarizar data-testid en componentes UI
Resumen: Se añadió de forma explícita el tipado y propagación de `'data-testid'?: string` a los componentes UI de Shadcn para alinearse con la memoria estandarizada de testing del proyecto.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_11_test_id_standardization.md](docs/TASKS/DONE/Kaizen_2026_04_11_test_id_standardization.md)

[2026-04-13] [feat/kaizen-i18n-routing] [Enforce strict i18n routing structure] [DONE].

## feature: Enforce strict i18n routing structure
Resumen: Se eliminaron las rutas duplicadas sin localizar en `src/app/(client)` y se movió `src/app/my-company` a `src/app/[locale]/my-company` para cumplir estrictamente con la guía arquitectónica de i18n del proyecto. Se actualizaron las referencias en las pruebas.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_13_i18n_routing.md](docs/TASKS/DONE/Kaizen_2026_04_13_i18n_routing.md)
[2026-04-14] [fix/kaizen-duplicate-html-layouts] [Fix duplicate html tags in locale layout] [DONE].

## feature: Fix duplicate html tags in locale layout
Resumen: Se eliminaron las etiquetas <html> y <body> y los providers redundantes de src/app/[locale]/layout.tsx que causaban duplicados ya que están en el layout raíz.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_14_fix_duplicate_html_layouts.md](docs/TASKS/DONE/Kaizen_2026_04_14_fix_duplicate_html_layouts.md)

[2024-04-17] [feat/kaizen-add-locale-tests] [Agregar tests para utilidades de locale] [DONE].

## feature: Agregar tests para utilidades de locale
Resumen: Se agregaron pruebas unitarias para getLocaleFromUser en locale.ts y se actualizó la configuración de Jest para procesar next-intl.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2024_04_17_add_locale_tests.md](docs/TASKS/DONE/Kaizen_2024_04_17_add_locale_tests.md)

[2026-04-19] [feat/kaizen-add-table-tests] [Add unit tests for Table UI component] [DONE].

## feature: Add unit tests for Table UI component
Resumen: Se agregaron tests unitarios para los componentes de Table (Table, TableHeader, TableBody, TableRow, TableHead, TableCell) para mejorar la cobertura de código y asegurar su correcto funcionamiento.
Referencia archivada: [docs/TASKS/DONE/Kaizen_2026_04_19_add_table_tests.md](docs/TASKS/DONE/Kaizen_2026_04_19_add_table_tests.md)
