Actúa como un Arquitecto Frontend Senior. Tu objetivo es refactorizar y modernizar la pantalla actual ubicada en el endpoint `/companies` de nuestro aplicativo. 

Contexto de la migración:
Esta pantalla contiene código heredado (legacy) y debe ser adaptada al nuevo estándar arquitectónico. Debe dejar de usar cualquier rastro del endpoint companies antiguo y conectarse exclusivamente al nuevo controlador del backend: `/api/MyCompany`.

Requisitos Funcionales:
1. Vista de Consulta (Read-Only): Al cargar, la pantalla debe hacer un GET a `/api/MyCompany` para obtener y mostrar la información actual de la empresa.
2. Vista de Edición: Debe existir un mecanismo (botón "Editar" o formulario directo) para modificar los campos de la empresa.
3. Persistencia: Al guardar, se debe enviar la actualización (PUT) al mismo endpoint `/api/MyCompany`.

Requisitos Técnicos (Estricto cumplimiento):
- Clean Architecture: Separa estrictamente la capa de red de la UI. Crea un archivo de servicio (ej. `myCompanyService.ts/js`) para las peticiones HTTP.
- Gestión de Estado y Ciclo de Vida: Implementa un custom hook (ej. `useMyCompany`) que encapsule la llamada al servicio, gestione el estado de la data, el estado de carga (loading) y los posibles errores.
- Prevención de Errores: Incluye manejo de excepciones explícito en las llamadas a la API.
- Tipado (Si usas TypeScript): Define la interfaz del modelo de datos de la empresa basándote en el modelo devuelto por el controlador.
- UI Limpia: El componente principal de React/Vue debe limitarse a pintar la vista y consumir el hook, sin lógica de negocio compleja anidada.

Por favor, revisa el código actual de la vista `/companies` para eliminar aquello fuera de uso.

Modelo company 
1 - GET
Respuesta 200
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "taxId": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "postalCodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "stateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "languageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isActive": true,
  "createdAt": "2026-04-18T05:13:53.510Z",
  "updatedAt": "2026-04-18T05:13:53.510Z"
}

Respuesta 404
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}


2 - PUT
Peticion
{
  "name": "string",
  "taxId": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "postalCodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "stateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "languageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isActive": true
}

Respuesta:
Misma que get
