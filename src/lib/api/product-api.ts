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
      const rawText = await response.text();
      let detail = response.statusText || "Error";
      if (rawText) {
        try {
          const parsed = JSON.parse(rawText) as {
            message?: string;
            error?: string;
            title?: string;
          };
          detail =
            parsed.message ||
            parsed.error ||
            parsed.title ||
            rawText.slice(0, 500);
        } catch {
          detail = rawText.slice(0, 500);
        }
      }
      throw new Error(`API error ${response.status}: ${detail}`);
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
