/**
 * Thin wrapper so you can swap to pino/winston later without touching tests.
 */
export const log = {
  debug: (...args: unknown[]) => {
    if (process.env.DEBUG_E2E) console.debug('[e2e]', ...args);
  },
  info: (...args: unknown[]) => console.info('[e2e]', ...args),
  warn: (...args: unknown[]) => console.warn('[e2e]', ...args),
  error: (...args: unknown[]) => console.error('[e2e]', ...args),
};
