import { test, expect } from "@playwright/test";

test("highlight projects based on role", async ({ page }) => {
  await test.step("loads the homepage", async () => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pablo/);
  });

  await expect(page.locator(".assignments .highlight")).toHaveCount(0);

  await test.step("clicking role", async () => {
    await page.getByRole("button", { name: "Software Engineer" }).click();
  });

  for (const item of await page
    .locator('.assignments [data-roles~="dev"]')
    .all()) {
    await expect(item).toHaveClass(/(^|\s)highlight(\s|$)/);
  }
});
