import type { Page } from '@playwright/test';
import { BasePage } from './base.page.js';

/**
 * Runnable example against Playwright's public TodoMVC demo (no auth required).
 * Swap for your app-specific pages in real suites.
 */
export class TodoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.actions.goto('/todomvc');
  }

  input() {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  item(label: string) {
    return this.page.getByTestId('todo-item').filter({ hasText: label });
  }
}
