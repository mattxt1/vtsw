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

test("segment, product, and temporary buy routes form a complete journey", async ({
  page,
}) => {
  await page.goto("/products/mobile");
  await expect(
    page.getByRole("heading", { name: "A phone for every way forward." }),
  ).toBeVisible();

  await page.getByRole("link", { name: /vela x26 ultra/i }).click();
  await expect(page).toHaveURL(/\/products\/mobile\/x26-ultra$/);
  await expect(
    page.getByRole("heading", { name: "vela x26 Ultra", level: 1 }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Product navigation" })
    .getByRole("link", { name: "Buy" })
    .click();
  await expect(page).toHaveURL(/\/buy\/mobile\/x26-ultra$/);
  await expect(
    page.getByRole("heading", { name: "The store is not connected yet." }),
  ).toBeVisible();
});
