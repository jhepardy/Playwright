import { test, expect } from '../../src/fixtures/base.fixture.js';
import { stubJson } from '../../src/api/interceptor.js';
import { TodoPage } from '../../src/pages/todo.page.js';

/**
 * UI + network control: stub backend responses while exercising the real DOM/runtime.
 * Replace URL pattern with your XHR/fetch routes.
 */
test.describe('@regression @hybrid', () => {
  test('continues when profile API is stubbed', async ({ page }) => {
    await stubJson(page, '**/api/me', { id: 'qa-user', name: 'QA' });

    const todo = new TodoPage(page);
    await todo.open();
    await expect(todo.input()).toBeVisible();
  });
});
