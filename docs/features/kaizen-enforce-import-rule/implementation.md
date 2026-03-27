---
id: kaizen-enforce-import-rule
type: implementation
---
# Implementación

- Update `.eslintrc.json`:
```json
{
  "extends": "next/core-web-vitals",
  "plugins": ["import"],
  "rules": {
    "import/first": "error"
  }
}
```
- Instalar `eslint-plugin-import` mediante `npm install eslint-plugin-import --save-dev` en la carpeta `src`.