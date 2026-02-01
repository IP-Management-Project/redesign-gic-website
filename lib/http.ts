// src/lib/http.ts
import { api } from "./api";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export function request<T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  params?: unknown,
): Promise<T> {
  return api({
    method,
    url,
    data,
    params,
  });
}
