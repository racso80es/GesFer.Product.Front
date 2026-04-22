---
id: "kaizen-overlay-fix-test-id-clarify"
action_id: clarify
feature_id: kaizen-overlay-fix-test-id
decisions: Retornar un div oculto en lugar de null para exponer el data-testid en el DOM.
clarify_pending: none
---
# Clarificación

Se ha decidido que el componente no puede retornar `null` si se espera inspeccionar el `data-testid` en las pruebas. Retornará un div con `display: 'none'`.