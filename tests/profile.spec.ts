import { test, expect } from '@playwright/test';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

test('loads the homepage', async ({ page }) => {
  const filePath = resolve(__dirname, '../public/index.html');
  const url = pathToFileURL(filePath).href;

  await page.goto(url);
  await expect(page).toHaveTitle(/Pablo/);
});
