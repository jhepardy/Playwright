import { test, expect } from '../../src/fixtures/base.fixture.js';
import { TodoPage } from '../../src/pages/todo.page.js';
import { loadJson } from '../../src/utils/test-data.js';

test.describe('@smoke @ui', () => {
  test('creates a todo (data-driven label)', async ({ page }) => {
    const users = loadJson<{ validUser: { email: string } }>('users.json');
    const todo = new TodoPage(page);
    await todo.open();

    await todo.actions.type(todo.input(), `Ship release for ${users.validUser.email}`);
    await todo.input().press('Enter');

    await expect(todo.item(users.validUser.email)).toBeVisible();
  });
});
