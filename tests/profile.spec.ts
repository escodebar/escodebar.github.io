import { test, expect } from '@playwright/test';

test('loads the homepage', async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Pablo/);
});
