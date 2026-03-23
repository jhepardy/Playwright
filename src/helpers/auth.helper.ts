import type { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { log } from '../utils/logger.js';

export type Credentials = { email: string; password: string };

/**
 * Auth helper: UI path for true E2E; API path for fast setup when token endpoints exist.
 * Store state with `storageState` in fixtures for tests that skip the login screen.
 */
export async function loginViaUi(page: Page, creds: Credentials) {
  const login = new LoginPage(page);
  await login.open();
  await login.login(creds.email, creds.password);
}

/**
 * Example API bootstrap — replace URL/body with your real auth contract.
 * Returns token for Authorization header on subsequent APIRequestContext calls.
 */
export async function obtainApiToken(
  request: APIRequestContext,
  baseURL: string,
  creds: Credentials
): Promise<string> {
  const res = await request.post(`${baseURL}/auth/token`, {
    data: { email: creds.email, password: creds.password },
  });
  if (!res.ok()) {
    log.error('obtainApiToken failed', res.status(), await res.text());
    throw new Error(`Auth API failed: ${res.status()}`);
  }
  const body = (await res.json()) as { access_token?: string };
  if (!body.access_token) throw new Error('Auth response missing access_token');
  return body.access_token;
}

export async function saveStorageState(context: BrowserContext, path: string) {
  await context.storageState({ path });
  log.debug('saved storage state', path);
}
