import type { BrowserContext, Page } from '@playwright/test';

/** Multi-tab flows: return the new page so callers can switch context explicitly. */
export async function openNewTab(context: BrowserContext, url: string): Promise<Page> {
  const page = await context.newPage();
  await page.goto(url);
  return page;
}

export async function switchToPage(pages: Page[], urlPart: string): Promise<Page> {
  const match = pages.find((p) => p.url().includes(urlPart));
  if (!match) throw new Error(`No tab matching ${urlPart}`);
  await match.bringToFront();
  return match;
}
