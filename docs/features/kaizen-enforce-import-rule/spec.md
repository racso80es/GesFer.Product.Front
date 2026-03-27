---
id: kaizen-enforce-import-rule
type: spec
---
# Especificaciones Técnicas

- Modificar `src/.eslintrc.json` para añadir el plugin de "import".
- En la sección `rules` de `.eslintrc.json`, agregar la regla `"import/first": "error"`.
- Instalar dependencias necesarias (`eslint-plugin-import`).
- Ejecutar `npm run lint` sobre los ficheros en `src/` para garantizar la viabilidad.