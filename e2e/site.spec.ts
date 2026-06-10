import { expect, test } from "@playwright/test";

test("visitors can move through the vela ecosystem", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /technology, naturally connected/i }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "products" })
    .click();
  await expect(page).toHaveURL(/#products$/);
  await expect(
    page.getByRole("heading", { name: "Everything you use. Designed together." }),
  ).toBeVisible();
});

test("the mobile layout does not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test("reduced motion retains products and software content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "One system, across every screen." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Built to stay current." }),
  ).toBeVisible();
});
