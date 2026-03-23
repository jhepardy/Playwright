import type { APIRequestContext } from '@playwright/test';

/**
 * Thin API facade: keeps URLs and default headers in one place for hybrid tests.
 */
export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string,
    private readonly defaultHeaders: Record<string, string> = {}
  ) {}

  private url(path: string) {
    return new URL(path.replace(/^\//, ''), this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`).toString();
  }

  async getJson<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const res = await this.request.get(this.url(path), { headers: { ...this.defaultHeaders, ...headers } });
    if (!res.ok()) throw new Error(`GET ${path} -> ${res.status()}`);
    return (await res.json()) as T;
  }

  async postJson<T>(path: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    const res = await this.request.post(this.url(path), {
      data: body,
      headers: { ...this.defaultHeaders, ...headers },
    });
    if (!res.ok()) throw new Error(`POST ${path} -> ${res.status()}`);
    return (await res.json()) as T;
  }
}
