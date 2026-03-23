import type { Locator, Page } from '@playwright/test';
import { UiActions } from '../actions/ui.actions.js';

/**
 * Base page: shared wiring + dynamic locator helpers. Prefer `getByRole`/`getByTestId`
 * from Playwright; fall back to resilient strategies when the DOM is unstable.
 */
export abstract class BasePage {
  readonly actions: UiActions;

  constructor(protected readonly page: Page) {
    this.actions = new UiActions(page);
  }

  /** Prefer stable `data-testid` from app; centralize strings to avoid typos. */
  protected byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Dynamic text: escape user-controlled fragments to reduce brittle XPath/CSS.
   * For i18n apps, key off test ids or ARIA, not visible copy.
   */
  protected byRoleWithName(role: Parameters<Page['getByRole']>[0], name: string | RegExp): Locator {
    return this.page.getByRole(role, { name });
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
