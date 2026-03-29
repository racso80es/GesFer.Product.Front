---
title: Clarificación de Actualización de README
type: clarify
feature_id: actualizacion-readme
---
# Clarificación

## Decisiones arquitectónicas
- **Configuración (`src/config/README.md`)**: El documento detalla variables como `NEXT_PUBLIC_API_URL`, `DB_SERVER`, etc., y la detección de entornos. Dado que el `README.md` principal ya cuenta con secciones como "Inicio rápido" y "Solución de problemas", integraremos esta configuración detallada allí bajo "Configuración de Entornos".
- **Tests (`src/tests/README.md`)**: Dado el mandato de "Specialized architectural and testing guides reside in docs/architecture/ and docs/testing/", moveremos este documento a `docs/testing/testing-guide.md` en vez de engordar demasiado el `README.md` principal. El README.md se actualizará para enlazar a `docs/testing/testing-guide.md` (y su predecesor en la tabla).