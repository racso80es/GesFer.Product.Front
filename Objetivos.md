# Objetivos del proyecto GesFer.Product.Front

## Descripción del contexto

Este repositorio es el **frontend de producto (cliente)** del ecosistema GesFer, **fuera del monolito**, como solución independiente. La infraestructura de agentes y normas (**SddIA**) se tomó inicialmente como base desde otra solución y se va **adecuando** a GesFer.Product.Front (constitución, README, agentes, scripts).

El código de la aplicación vive en **`src/`** (paquete npm `gesfer-cliente`): **Next.js 14 (App Router)** que consume la **API de backend** como servicio externo vía HTTP (`NEXT_PUBLIC_API_URL`, `API_URL` en tests).

## Código compartido temporal

Las piezas pendientes de integrar en la estructura definitiva pueden estar en **`src/TemporalShared`**, con el objetivo de **moverlas, adaptarlas y eliminar** esa carpeta cuando ya no sea necesaria.

## Stack tecnológico (resumen)

- **Framework:** Next.js 14 (App Router), TypeScript
- **UI:** Tailwind CSS, Lucide React, componentes estilo shadcn
- **Estado:** TanStack React Query, React Context
- **Formularios:** react-hook-form + Zod
- **Autenticación:** NextAuth 5
- **i18n:** next-intl
- **Testing:** Jest, Testing Library, Playwright
- **Puerto desarrollo (por defecto Next.js):** 3000

## Objetivos del proyecto (documentación viva)

1. **Una sola fuente de verdad**  
   Documentación y SddIA deben describir **GesFer.Product.Front**, sin asumir monorepo ni nombres de otras soluciones como contexto actual.

2. **README y Objetivos al día**  
   Cómo ejecutar, testear y desplegar el cliente; variables de entorno alineadas con `src/lib/config.ts`.

3. **Claridad para nuevos desarrolladores**  
   Entender de inmediato que es el **frontend de producto** GesFer y el rol de `TemporalShared` como puente temporal.

4. **Alineación con `AGENTS.md`**  
   Entorno Windows/PowerShell, sin commits directos a `master`, build verificado, comandos vía skills/tools cuando aplique.

5. **Independencia respecto al monorepo**  
   Sin dependencias a rutas externas al repo (`../../Shared/`, etc.); imports definitivos bajo `src/` y convención `@/`.

---

*Este documento se actualizará cuando cambien los objetivos o el alcance del proyecto.*
Home Publica Terminado
