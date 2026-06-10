import { expect, test } from "@playwright/test";

test("visitors can explore a brand and use adjacent navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /we make the everyday/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Explore Ora" }).click();
  await expect(page).toHaveURL(/\/brands\/ora$/);
  await expect(
    page.getByRole("heading", { name: "Small rituals, made remarkable." }),
  ).toBeVisible();

  await page.getByRole("navigation", { name: "More brands" }).getByText("Morrow").click();
  await expect(page).toHaveURL(/\/brands\/morrow$/);
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

test("reduced motion retains the complete experience", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/brands/ora");

  await expect(
    page.getByRole("heading", { name: "Small rituals, made remarkable." }),
  ).toBeVisible();
  await expect(page.getByText("Shaped by the hand.")).toBeVisible();
});
