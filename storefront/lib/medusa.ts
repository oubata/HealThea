const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
};

// Server-side fetch (supports ISR caching via next options)
export async function medusaFetch<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, next } = options;

  const response = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    next,
  });

  if (!response.ok) {
    throw new Error(`Medusa API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

// Client-side fetch (no ISR caching, for cart/auth operations)
export async function medusaClientFetch<T = unknown>(
  path: string,
  options: Omit<RequestOptions, "next"> & { token?: string } = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, token } = options;

  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_KEY,
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Medusa API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

// Cached region lookup (CAD default)
let cachedRegion: { id: string; currency_code: string } | null = null;

export async function getRegion() {
  if (cachedRegion) return cachedRegion;

  const data = await medusaFetch<{
    regions: Array<{ id: string; currency_code: string }>;
  }>("/store/regions", { next: { revalidate: 3600 } });

  cachedRegion =
    data.regions.find((r) => r.currency_code === "cad") || data.regions[0];
  return cachedRegion;
}
