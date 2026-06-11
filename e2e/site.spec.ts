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

test("site search finds products, software, and pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /search/i }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("searchbox", { name: "Search vela" }).fill("ethos ai");
  await expect(
    dialog.locator('a[href="/products/platform/ethos-ai"]'),
  ).toBeVisible();

  await dialog.getByRole("link", { name: /View all results/i }).click();
  await expect(page).toHaveURL(/\/search\?q=ethos%20ai$/);
  await expect(
    page.getByRole("heading", { name: /matches for “ethos ai”/i }),
  ).toBeVisible();
  await expect(
    page
      .locator(".search-page__results")
      .locator('a[href="/products/platform/ethos-ai"]'),
  ).toBeVisible();
});

test("lattice and ethos ai are presented inside the vela foundation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "lattice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ethos ai" })).toBeVisible();

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "software" })
    .click();
  await expect(page).toHaveURL(/\/products\/platform$/);
  await expect(
    page.getByRole("heading", {
      name: "The systems behind every vela experience.",
    }),
  ).toBeVisible();

  await page.locator('a[href="/products/platform/lattice-1"]').first().click();
  await expect(page).toHaveURL(/\/products\/platform\/lattice-1$/);
  await expect(
    page.getByRole("heading", { name: "lattice 1", level: 1 }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Buy" })).toHaveCount(0);
});

test("visitors can configure a product and carry it into the bag", async ({
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
    page.getByRole("heading", { name: "Make it yours." }),
  ).toBeVisible();

  await page.getByRole("radio", { name: /1TB/i }).check();
  await expect(
    page.getByRole("region", { name: "Configuration subtotal" }),
  ).toContainText("$1,799");
  await page.getByRole("button", { name: /Add to bag/i }).click();

  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("heading", { name: "Your bag." })).toBeVisible();
  await expect(page.getByText("1TB")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Made for your x26 Ultra." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "vela x26 ultra silicone case",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Check out/i }).click();
  await expect(page).toHaveURL(/\/checkout$/);
  await expect(
    page.getByRole("heading", { name: "Where should it arrive?" }),
  ).toBeVisible();

  await page.getByLabel("Email address").fill("vela@example.com");
  await page.getByLabel("Phone number").fill("555-0100");
  await page.getByLabel("First name").fill("Vela");
  await page.getByLabel("Last name").fill("Customer");
  await page.getByLabel("Street address").fill("1 Connected Way");
  await page.getByLabel("City").fill("New York");
  await page.getByLabel("State").fill("NY");
  await page.getByLabel("ZIP code").fill("10001");
  await page.getByRole("button", { name: /Continue to payment/i }).click();
  await expect(
    page.getByText("This is the end of the prototype checkout."),
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
  await expect(
    page.getByRole("region", {
      name: "Device specification comparison",
    }),
  ).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    tableViewport: document.querySelector(".compare-table-scroll")?.clientWidth,
    tableContent: document.querySelector(".compare-table-scroll")?.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.tableContent).toBeGreaterThan(dimensions.tableViewport ?? 0);
});

test("the archive supports cross-generation comparison", async ({ page }) => {
  await page.goto(
    "/compare?products=mobile:x26-ultra,mobile:archive-x23-ultra-2023",
  );

  await expect(
    page.getByRole("heading", { name: "vela x23 Ultra (2023)" }),
  ).toBeVisible();
  await expect(page.getByText("archive 2023")).toBeVisible();
  await expect(page.getByText("Followed by vela x24 Ultra")).toBeVisible();
  await expect(page.getByText(/generational view/i)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Discover x23 Ultra/i }),
  ).toHaveCount(0);

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test("accessories move from compatibility-led discovery into configuration", async ({
  page,
}) => {
  await page.goto("/products/accessories/tab-t26-ultra-keyboard-studio");

  await expect(
    page.getByRole("heading", {
      name: "vela tab t26 ultra keyboard studio",
      level: 1,
    }),
  ).toBeVisible();
  await expect(page.getByText(/floating hinge/i).first()).toBeVisible();
  await expect(page.getByText(/\$349/)).toHaveCount(0);

  await page.getByRole("link", { name: "Buy" }).first().click();
  await expect(page.getByText("From $349.")).toBeVisible();
  await page.getByRole("radio", { name: /14.6-inch/i }).check();
  await expect(
    page.getByRole("heading", { name: "$399", level: 2 }),
  ).toBeVisible();
});

test("the premium event carries sale pricing from home into configuration", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "More of the ecosystem, for less.",
    }),
  ).toBeVisible();
  await expect(page.getByText("From $949")).toBeVisible();

  await page.goto("/buy/mobile/x26-pro");
  await expect(page.getByText("Now from")).toBeVisible();
  await expect(page.getByText("$1,099").first()).toBeVisible();
  await page.getByRole("radio", { name: /1TB/i }).check();
  await expect(
    page.getByRole("heading", { name: "$1,399", level: 2 }),
  ).toBeVisible();
  await expect(page.getByText("You save $150")).toBeVisible();
});
