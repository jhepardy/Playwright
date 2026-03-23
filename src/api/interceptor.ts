import type { Page } from '@playwright/test';

/**
 * Route interception for stubs, latency injection, or capturing payloads in UI tests.
 * Prefer contract tests against real lower envs; mock only third parties or flaky partners.
 */
export async function stubJson(
  page: Page,
  urlPredicate: string | RegExp,
  body: unknown,
  status = 200
) {
  await page.route(urlPredicate, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

export async function logApiCalls(page: Page, urlSubstring: string) {
  page.on('request', (req) => {
    if (req.url().includes(urlSubstring) && req.resourceType() === 'xhr') {
      // Hook for debug; replace with your logger in real suites
      if (process.env.DEBUG_E2E) console.debug('[api]', req.method(), req.url());
    }
  });
}
