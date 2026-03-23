import { test, expect } from '../../src/fixtures/base.fixture.js';

test.describe('@smoke @api', () => {
  test('public echo endpoint responds', async ({ request }) => {
    const res = await request.get('https://httpbingo.org/get', {
      params: { ping: 'pong' },
    });
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as { args?: { ping?: string | string[] } };
    const ping = body.args?.ping;
    expect(ping === 'pong' || (Array.isArray(ping) && ping[0] === 'pong')).toBeTruthy();
  });
});
