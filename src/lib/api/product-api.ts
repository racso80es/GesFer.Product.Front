import { getProductApiBaseUrl } from "@/lib/api-origin";

export const getProductApi = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_PRODUCT_API_URL?.replace(/\/$/, "") || getProductApiBaseUrl();

  const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const url = `${baseUrl}${path}`;
    const headers = new Headers({ "Content-Type": "application/json" });
    const incoming = new Headers(options.headers as HeadersInit);
    incoming.forEach((value, key) => {
      headers.set(key, value);
    });

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
  };

  return {
    get: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { method: "GET", ...init }),
    post: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body), ...init }),
    put: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, { method: "PUT", body: JSON.stringify(body), ...init }),
    delete: (path: string, init?: RequestInit) =>
      request(path, { method: "DELETE", ...init }),
  };
};
