import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/client.js';
import { envConfig } from '../utils/env.js';
import type { Credentials } from '../helpers/auth.helper.js';
import { loginViaUi } from '../helpers/auth.helper.js';

type Fixtures = {
  /** Opt-in: add `loginAsDefaultUser` to the test args to run UI login first. */
  loginAsDefaultUser: void;
  apiClient: ApiClient;
};

const creds: Credentials = {
  email: process.env.E2E_USER_EMAIL ?? 'qa+e2e@example.com',
  password: process.env.E2E_USER_PASSWORD ?? '',
};

/**
 * Single `test` export: all specs import from here so fixtures and hooks stay centralized.
 */
export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use) => {
    const { apiBaseURL } = envConfig();
    const client = new ApiClient(request, apiBaseURL);
    await use(client);
  },

  loginAsDefaultUser: async ({ page, context }, use, testInfo) => {
    if (!creds.password) {
      testInfo.skip(true, 'Set E2E_USER_PASSWORD for authenticated UI flows');
    } else {
      await loginViaUi(page, creds);
    }
    await use(undefined);
    await context.clearCookies();
  },
});

export { expect };
