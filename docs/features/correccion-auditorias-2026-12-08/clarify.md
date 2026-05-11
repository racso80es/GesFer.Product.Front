---
type: clarify
status: completed
---

# Clarificaciones
- ¿Afecta `jest.mock` al hoisting si la importación está antes? No, Jest intercepta de forma adecuada las referencias de mocks incluso si las importaciones estáticas ocurren primero.
