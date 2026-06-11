import { expect, test } from "@playwright/test";

test("visitors can move through the vela ecosystem", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /power, made quiet/i }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "phones" })
    .click();
  await expect(page).toHaveURL(/\/products\/mobile$/);
  await expect(
    page.getByRole("heading", { name: "A phone for every way forward." }),
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
    page.getByRole("heading", { name: "Everything feels closer." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Start on one. Continue on another." }),
  ).toBeVisible();
});

test("the top menu reaches notebook and tablet lineup groups", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "notebooks" })
    .click();
  await expect(page).toHaveURL(/\/products\/computing#notebook$/);
  await expect(page.locator("#notebook")).toBeVisible();

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "tablets" })
    .click();
  await expect(page).toHaveURL(/\/products\/computing#tab-t-series$/);
  await expect(page.locator("#tab-t-series")).toBeVisible();
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

test("visitors can build and refine a shareable comparison", async ({ page }) => {
  await page.goto("/compare?products=mobile:x26-ultra");

  await expect(
    page.getByRole("heading", { name: "See what fits." }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Add a device" })
    .selectOption("mobile:x26-pro");

  await expect(page).toHaveURL(
    /products=mobile%3Ax26-ultra%2Cmobile%3Ax26-pro/,
  );
  await expect(
    page.getByRole("heading", { name: "vela x26 Pro" }),
  ).toBeVisible();

  await page
    .getByRole("checkbox", { name: "Show differences only" })
    .check();
  await expect(
    page.getByRole("rowheader", { name: /Peak brightness/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("rowheader", { name: /Platform/ }),
  ).toHaveCount(0);
});

test("the compare surface contains horizontal scrolling on small screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/compare");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    tableViewport: document.querySelector(".compare-table-scroll")?.clientWidth,
    tableContent: document.querySelector(".compare-table-scroll")?.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.tableContent).toBeGreaterThan(dimensions.tableViewport ?? 0);
});
