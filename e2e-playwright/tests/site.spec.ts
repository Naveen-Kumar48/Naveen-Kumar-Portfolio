import { test, expect, Page } from '@playwright/test';

// Read-only smoke tests: never submits the contact form or triggers external actions.

/** Collect uncaught exceptions and same-origin console errors / failed requests. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && (m.location().url ?? '').includes('localhost')) {
      errors.push(`console: ${m.text()}`);
    }
  });
  page.on('response', (r) => {
    if (r.url().includes('localhost') && r.status() >= 400) {
      errors.push(`http ${r.status()}: ${r.url()}`);
    }
  });
  return errors;
}

/** Scroll to the bottom, re-reading page height each step since @defer blocks grow the page. */
async function scrollThrough(page: Page) {
  for (let y = 0; y < 60 * 700; y += 700) {
    const done = await page.evaluate((top) => {
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      return top + window.innerHeight >= document.documentElement.scrollHeight;
    }, y);
    await page.waitForTimeout(200);
    if (done) break;
  }
}

test.describe('Home page', () => {
  test('loads with title, h1 and no runtime errors', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/');
    await expect(page).toHaveTitle(/Naveen Kumar/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('all deferred sections render after scrolling', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/');
    await scrollThrough(page);
    for (const id of ['about', 'skills', 'projects', 'experience', 'academic', 'contact']) {
      await expect(page.locator(`#${id}`), `section #${id}`).toBeAttached();
    }
    await expect(page.locator('footer').last()).toBeAttached();
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('has SEO essentials (description, canonical-ish meta, JSON-LD)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
    const ld = await page.locator('script[type="application/ld+json"]').count();
    expect(ld).toBeGreaterThan(0);
  });

  test('page does not overflow horizontally', async ({ page }) => {
    await page.goto('/');
    await scrollThrough(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(2);
  });
});

test.describe('Local landing pages', () => {
  const routes = [
    'web-developer-in-delhi',
    'full-stack-developer-in-delhi',
    'mern-stack-developer-delhi',
    'react-developer-in-delhi',
  ];

  for (const route of routes) {
    test(`/${route} renders without errors`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.goto(`/${route}`);
      await expect(page).toHaveTitle(/Naveen Kumar/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }
});

test('unknown route redirects to home', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('h1')).toBeVisible();
});
