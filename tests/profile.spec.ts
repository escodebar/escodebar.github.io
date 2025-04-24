import { test, expect } from "@playwright/test";

test("highlight role", async ({ page }) => {
  await test.step("loads the homepage", async () => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pablo/);
  });
});
