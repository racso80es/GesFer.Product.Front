---
id: kaizen-enforce-import-rule
type: objectives
---
# Objetivos

- Mejorar la consistencia y la integridad del codebase implementando la regla `import/first` en el linter.
- Evitar que declaraciones de imports no se sitúen en la parte superior de los archivos, lo que puede causar errores en Next.js.
- Proveer un análisis automatizado vía Husky / npm test de este requisito.