import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const envName = process.env.TEST_ENV ?? 'dev';
const isCI = !!process.env.CI;

/**
 * Central config: retries, traces, reporters, and projects live here so
 * local vs CI behavior stays consistent and discoverable.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? undefined : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  timeout: 60_000,
  expect: { timeout: 15_000 },

  use: {
    // Default demo host so smoke tests run without local app; override per env in CI.
    baseURL: process.env.BASE_URL ?? 'https://demo.playwright.dev',
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: isCI ? 'retain-on-failure' : 'off',
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    ignoreHTTPSErrors: envName !== 'prod',
  },

  projects: [
    {
      name: 'chromium',
      testIgnore: /\/api\//,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      testIgnore: /\/api\//,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'api',
      testMatch: /\/api\/.*\.spec\.ts/,
      use: { baseURL: process.env.API_BASE_URL ?? process.env.BASE_URL },
    },
  ],
});
