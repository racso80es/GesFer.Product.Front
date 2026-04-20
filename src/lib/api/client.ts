// Origen API: getPublicApiOrigin() → lib/api-origin.ts + config/api-origin-defaults.json
import { API_URL } from "@/lib/config";

/**
 * Opciones para el cliente API
 */
export interface ApiClientOptions {
  /**
   * Token de acceso JWT para autenticación
   * Si no se proporciona, intentará obtenerlo de la sesión de Auth.js
   */
  accessToken?: string;
}

class ApiClient {
  private baseUrl: string;
  private accessToken?: string;

  constructor(baseUrl: string = API_URL, options?: ApiClientOptions) {
    this.baseUrl = baseUrl;
    this.accessToken = options?.accessToken;
  }

  /**
   * Establece el token de acceso para las siguientes peticiones
   */
  setAccessToken(token: string | undefined) {
    this.accessToken = token;
  }

  /**
   * Rutas implementadas solo en Next (Route Handlers / BFF), no en el API de producto
   * bajo el mismo path cuando NEXT_PUBLIC_API_URL apunta al backend (p. ej. :5020).
   * En el navegador deben usarse como URL relativa al origen de la app.
   */
  private effectiveBaseUrl(pathOnly: string): string {
    if (typeof window === "undefined") {
      return this.baseUrl;
    }
    if (
      pathOnly === "/api/my-company" ||
      pathOnly.startsWith("/api/my-company/")
    ) {
      return "";
    }
    return this.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const pathOnly = endpoint.split("?")[0] ?? endpoint;
    const url = `${this.effectiveBaseUrl(pathOnly)}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    // Agregar token de autenticación si existe
    // Prioridad: token pasado como parámetro > token de la instancia > NextAuth session > localStorage (legacy)
    let token = this.accessToken;
    
    if (!token && typeof window !== "undefined") {
      // Invariante de dominio:
      // - En rutas Admin, NUNCA usar el token tenant (auth_token) por fallback.
      //   El dominio Admin debe adjuntar explícitamente su token (NextAuth / accessToken).
      const pathname = window.location?.pathname || "";
      const isAdminRoute = pathname.startsWith("/admin");
      if (isAdminRoute) {
        token = undefined;
      } else {
      // Intentar obtener el token de NextAuth session si está disponible
      // NextAuth almacena la sesión en cookies, pero podemos acceder al token desde el contexto
      // Para client components, necesitamos usar useSession de next-auth/react
      // Por ahora, intentamos localStorage como fallback
      token = localStorage.getItem("auth_token") || undefined;
      }
    }

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const raw = await response.json().catch(() => null);
        const fromJson =
          raw && typeof raw === "object"
            ? (raw as { message?: string; error?: string })
            : null;
        const msg =
          fromJson?.message ||
          fromJson?.error ||
          `Error ${response.status}: ${response.statusText}`;
        throw new Error(msg);
      }

      // Si la respuesta es 204 No Content, retornar void
      if (response.status === 204) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        // Mejorar mensajes de error para problemas de conexión
        if (error.message.includes("Failed to fetch") || error.message.includes("ERR_EMPTY_RESPONSE")) {
          throw new Error(
            `No se pudo conectar con la API en ${url}. ` +
            `Verifica que la API esté ejecutándose y que la URL sea correcta. ` +
            `URL configurada: ${this.baseUrl}`
          );
        }
        throw error;
      }
      throw new Error("Error desconocido en la petición");
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const pathOnly = endpoint.split("?")[0] ?? endpoint;
    const base = this.effectiveBaseUrl(pathOnly);
    const baseForConstructor =
      base === "" && typeof window !== "undefined"
        ? window.location.origin
        : base || "http://localhost";
    const url = new URL(endpoint, `${baseForConstructor}/`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const pathOnly = endpoint.split("?")[0] ?? endpoint;
    const base = this.effectiveBaseUrl(pathOnly);
    const baseForConstructor =
      base === "" && typeof window !== "undefined"
        ? window.location.origin
        : base || "http://localhost";
    const url = new URL(endpoint, `${baseForConstructor}/`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return this.request<T>(url.pathname + url.search, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();

