import type { Frame, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { log } from '../utils/logger.js';

/**
 * Composable UI primitives: pages stay thin (selectors + intent), actions hold
 * interaction policy (retries are mostly Playwright auto-wait; this layer adds
 * explicit guards where product behavior is async).
 */
export class UiActions {
  constructor(private readonly page: Page) {}

  async goto(path: string) {
    log.debug('goto', path);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async click(locator: Locator, options?: { force?: boolean }) {
    await locator.scrollIntoViewIfNeeded().catch(() => {});
    await locator.click({ ...options });
  }

  async type(locator: Locator, text: string, options?: { clear?: boolean }) {
    if (options?.clear !== false) await locator.fill('');
    await locator.fill(text);
  }

  async waitForVisible(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async uploadFile(inputLocator: Locator, ...files: string[]) {
    await inputLocator.setInputFiles(files);
  }

  /** Use `frame.locator(...)` inside returned Frame for iframe content. */
  async contentFrame(frameSelector: string): Promise<Frame> {
    const handle = await this.page.waitForSelector(frameSelector);
    const frame = await handle.contentFrame();
    if (!frame) throw new Error(`No content frame for ${frameSelector}`);
    return frame;
  }

  async assertEventually(locator: Locator, assertion: () => Promise<void>) {
    await expect(async () => {
      await assertion();
    }).toPass({ timeout: 15_000 });
  }
}
