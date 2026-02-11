const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
};

export async function medusaFetch<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, next } = options;

  const response = await fetch(`${MEDUSA_BACKEND_URL}/store${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    next,
  });

  if (!response.ok) {
    throw new Error(`Medusa API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
