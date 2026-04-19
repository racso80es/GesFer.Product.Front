/**
 * Origen público del API backend (sin barra final).
 * Única fuente de verdad de valores por entorno: `config/api-origin-defaults.json`
 * + variables de entorno (prioridad).
 */
import defaults from "@/config/api-origin-defaults.json";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Resuelve el origen del API para cliente y servidor.
 * Prioridad: NEXT_PUBLIC_API_URL → API_URL (solo Node/tests) → default según NODE_ENV.
 */
export function getPublicApiOrigin(): string {
  const fromNext = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromNext) {
    return stripTrailingSlash(fromNext);
  }
  if (typeof window === "undefined") {
    const fromApi = process.env.API_URL?.trim();
    if (fromApi) {
      return stripTrailingSlash(fromApi);
    }
  }
  if (process.env.NODE_ENV === "production") {
    return defaults.production;
  }
  return defaults.development;
}

/**
 * Base URL del API de producto (rutas tipo `/mycompany` bajo `/api`).
 * NOTA: Cuando apiClient llama a `/api/my-company`, si NEXT_PUBLIC_API_URL
 * apunta al origen de la app Next.js (ej: localhost:3000), el request es
 * interceptado por el Route Handler BFF en `src/app/api/my-company/route.ts`.
 */
export function getProductApiBaseUrl(): string {
  const origin = getPublicApiOrigin();
  return `${origin}/api`;
}
