---
id: stabilidad-front-api-back-informe
feature_id: stabilidad-front-api-back
title: "Informe de situación actual (usuario)"
date: "2026-03-26"
status: current
---

# Informe de situación actual

## Alcance de la herramienta **start-frontend**

- **Qué hace:** levanta el cliente Next.js en `src/` (`npm run dev`), comprueba que el origen del dev server (p. ej. `http://localhost:3000`) responda y emite resultado JSON según contrato. **No arranca** GesFer.Product.Back ni modifica la base de datos.
- **Estado de implementación:** el ejecutable **`start_frontend.exe`** está disponible en `scripts/tools/start-frontend/` (generado desde `scripts/tools-rs` vía `install.ps1`). Los launchers `Start-Frontend.bat` invocan ese binario.

Herramientas hermanas en la misma línea (misma compilación/copia):

- `scripts/tools/prepare-frontend-env/prepare_frontend_env.exe`
- `scripts/tools/run-tests-frontend/run_tests_frontend.exe`

## ¿Puedo loguearme y usar la aplicación solo con start-frontend?

**No basta con ejecutar start-frontend.** Hace falta, además:

| Requisito | Motivo |
|-----------|--------|
| **API Back en ejecución** | Login y datos REST van al origen configurado (p. ej. `NEXT_PUBLIC_API_URL` en `src/.env.local`, alineado con `next.config.js`). |
| **Variables de entorno correctas** | Tras cambiar `.env.local`, reiniciar el dev server. |
| **Base de datos del Back con usuarios/empresa válidos** | Si el login devuelve 401, suele deberse a credenciales incorrectas o ausencia de seed (`seed-data.sql` u homólogo en el proyecto del API). |
| **CORS / origen permitido** | El navegador llama desde `http://localhost:3000` (o el puerto que use Next); la API debe permitir ese origen. |

**Conclusión:** start-frontend permite **abrir la UI** en el puerto del dev server. **Login y funcionalidades reales** dependen del **Back + BD + env + credenciales** coherentes con tu entorno.

## Estado técnico resumido (última revisión documentada)

- **Salud API:** `GET /health` y `GET /api/health` respondieron correctamente cuando la API estaba levantada en el origen de prueba (`5020`).
- **Build Next:** OK tras correcciones BFF en `/api/my-company` (reenvío de `Authorization`).
- **Jest:** integración `system-integrity` puede fallar en login **401** si la BD no tiene datos demo o credenciales distintas a las del test.
- **Playwright:** muchos escenarios dependen de auth, seed y front en `:3000`; sin ese conjunto, fallos esperables en integración.

## Próximos pasos si el login falla

1. Confirmar que la API responde en `NEXT_PUBLIC_API_URL`.
2. Revisar `src/.env.local` y reiniciar `npm run dev`.
3. En el **proyecto del Back:** aplicar seed o crear usuario/empresa acordes a lo que usa el front.
4. Para E2E: API + front en marcha y datos de prueba alineados.

---

*Documento vivo alineado con `analisis-temporal.md` y `validacion.md` en esta carpeta.*
