import type { Page } from '@playwright/test';
import { BasePage } from './base.page.js';

/** Example POM: one place per screen; methods read like user intent. */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private emailInput() {
    return this.byTestId('login-email');
  }

  private passwordInput() {
    return this.byTestId('login-password');
  }

  private submitButton() {
    return this.page.getByRole('button', { name: /sign in|log in/i });
  }

  async open() {
    await this.actions.goto('/login');
  }

  async login(email: string, password: string) {
    await this.actions.type(this.emailInput(), email);
    await this.actions.type(this.passwordInput(), password);
    await this.actions.click(this.submitButton());
  }
}
