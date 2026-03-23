import { test, expect } from '../../src/fixtures/base.fixture.js';
import { LoginPage } from '../../src/pages/login.page.js';

/**
 * Template: enable when `BASE_URL` targets your app and selectors match `LoginPage`.
 */
test.describe('@regression auth template', () => {
  test.skip(true, 'Remove skip when your app under test is configured');

  test('logs in and lands on home', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(
      process.env.E2E_USER_EMAIL ?? 'qa+e2e@example.com',
      process.env.E2E_USER_PASSWORD ?? ''
    );
    await expect(page.getByTestId('app-home')).toBeVisible();
  });
});
