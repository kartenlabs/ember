import { test, expect, type Page } from '@playwright/test';
import type { TimerState } from '../lib/storage';

const errors = new WeakMap<Page, string[]>();
const timer = (page: Page): Promise<TimerState> => page.evaluate(() => JSON.parse(localStorage.getItem('ember.timer')!));
const sessionCount = (page: Page): Promise<number> => page.evaluate(() => JSON.parse(localStorage.getItem('ember.sessions')!).length);

test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page)!.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|React error/i.test(message.text())) errors.get(page)!.push(message.text());
  });
  // Exercise our player shell without depending on a third-party stream.
  await page.route('https://www.youtube-nocookie.com/**', route => route.abort());
  await page.clock.install({ time: new Date('2026-09-07T12:00:00-07:00') });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

test('running sessions retain their metadata through settings edits, pause, and reload', async ({ page }) => {
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await page.clock.fastForward(60_000);
  const original = await timer(page);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('button', { name: 'Increase Focus', exact: true }).click();
  await page.getByLabel('What you are working on').fill('Changed label');
  await page.getByRole('button', { name: 'Increase Focus', exact: true }).focus();
  await page.keyboard.press('Space');
  expect((await timer(page)).endsAt).toBe(original.endsAt);
  expect((await timer(page)).block).toEqual(original.block);
  await page.getByRole('radio', { name: 'wood block', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('radio', { name: 'wood block', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Timer', exact: true }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  const held = (await timer(page)).held;
  await page.reload();
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeVisible();
  expect((await timer(page)).held).toBe(held);
  expect((await timer(page)).block).toEqual(original.block);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.getByRole('button', { name: 'Full screen', exact: true }).click();
  await page.clock.fastForward(held * 1000 + 500);
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('25 minutes');
  expect(await dialog.evaluate(element => element.matches(':modal'))).toBe(true);
  expect(await sessionCount(page)).toBe(1);
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  expect((await timer(page)).mode).toBe('short');
  expect((await timer(page)).started).toBe(false);
  await page.getByRole('button', { name: 'Leave full screen' }).click();
});

test('expired sessions and their handoff recover exactly once', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('ember.timer', JSON.stringify({
      mode: 'focus', completed: 0, endsAt: Date.now() - 1000, held: 0, started: true,
      block: { minutes: 25, startedAt: Date.now() - 1_501_000, task: 'recovered' },
    }));
  });
  await page.reload();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await sessionCount(page)).toBe(1);
  await page.reload();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await sessionCount(page)).toBe(1);
  await page.getByRole('button', { name: 'Start break' }).click();
  await expect.poll(async () => (await timer(page)).mode).toBe('short');
  expect((await timer(page)).started).toBe(true);
});

test('auto-start advances both modes and skipping a long break resets the cycle', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('ember.settings', JSON.stringify({ focus: 5, short: 1, sets: 2, autoBreak: true, autoFocus: true })));
  await page.reload();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await page.clock.fastForward(300_001);
  await page.clock.runFor(100);
  await expect.poll(async () => (await timer(page)).mode).toBe('short');
  expect((await timer(page)).started).toBe(true);
  await page.clock.fastForward(60_001);
  await page.clock.runFor(100);
  await expect.poll(async () => (await timer(page)).mode).toBe('focus');
  expect((await timer(page)).completed).toBe(1);
  expect(await sessionCount(page)).toBe(2);
  await page.getByRole('button', { name: 'Long', exact: true }).click();
  await page.getByRole('button', { name: 'Skip', exact: true }).click();
  expect((await timer(page)).completed).toBe(0);
  expect(await sessionCount(page)).toBe(2);
});

test('today controls refresh at local midnight and retain other days', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('ember.sessions', JSON.stringify([
    { id: 'yesterday', startedAt: Date.now() - 86_400_000, mode: 'focus', minutes: 25, task: '' },
    { id: 'today', startedAt: Date.now(), mode: 'focus', minutes: 25, task: '' },
  ])));
  await page.goto('/settings');
  const clear = page.getByRole('button', { name: 'Clear today' });
  await expect(clear).toBeEnabled();
  await page.clock.fastForward(12 * 60 * 60 * 1000 + 100);
  await expect(clear).toBeDisabled();
  expect(await sessionCount(page)).toBe(2);
});

/* The privacy page promises that opening Ember contacts no third party. That is
   only true while the station iframe stays unmounted until it is asked for, so
   the promise is asserted here rather than trusted. */
test('the station contacts YouTube only after play is pressed', async ({ page }) => {
  const hits: string[] = [];
  page.on('request', request => {
    if (request.url().includes('youtube-nocookie.com')) hits.push(request.url());
  });

  await page.reload();
  await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible();
  expect(hits, 'nothing should reach YouTube before play is pressed').toEqual([]);

  await page.getByRole('button', { name: 'Play radio', exact: true }).click();
  await expect.poll(() => hits.length, { message: 'pressing play should mount the player' }).toBeGreaterThan(0);
});

test('all routes handle corrupt storage, daylight hydration, and long labels at mobile and desktop sizes', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('ember.timer', 'null');
    localStorage.setItem('ember.sessions', '[null,{},false]');
    localStorage.setItem('ember.settings', JSON.stringify({ focus: {}, sets: 1000000, theme: 'light', task: 'x'.repeat(500) }));
  });
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/settings', '/log', '/about', '/privacy', '/license', '/no-such-page']) {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(size.scroll, `${path} at ${width}px`).toBeLessThanOrEqual(size.width);
    }
  }
});
