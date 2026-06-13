import { expect, test } from "@playwright/test";

test("visitors can move through the vela ecosystem", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /power, made quiet/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Know the road ahead." }),
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

test("the mobile hero keeps its product image clear of the spec grid", async ({
  page,
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 440, height: 956 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /power, made quiet/i }),
    ).toBeVisible();

    const layout = await page.evaluate(() => {
      const visual = document.querySelector(".launch-hero__visual");
      const metrics = document.querySelector(".launch-hero__metrics");
      const skipLink = document.querySelector(".skip-link");

      if (!visual || !metrics || !skipLink) {
        throw new Error("Expected homepage hero elements");
      }

      const visualRect = visual.getBoundingClientRect();
      const metricsRect = metrics.getBoundingClientRect();
      const skipStyle = getComputedStyle(skipLink);

      return {
        visualBottom: visualRect.bottom,
        metricsTop: metricsRect.top,
        skipOpacity: skipStyle.opacity,
        skipWidth: skipLink.getBoundingClientRect().width,
      };
    });

    expect(layout.visualBottom, `${viewport.width}px hero`).toBeLessThanOrEqual(
      layout.metricsTop + 1,
    );
    expect(layout.skipOpacity, `${viewport.width}px skip link`).toBe("0");
    expect(layout.skipWidth, `${viewport.width}px skip link`).toBeLessThanOrEqual(
      1,
    );
  }

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});

test("core page families remain contained on narrow mobile screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  const routes = [
    "/products/mobile",
    "/products/mobile/x26-ultra",
    "/buy/mobile/x26-ultra",
    "/compare",
    "/search?q=charging",
    "/sitemap",
    "/cart",
    "/products/platform",
    "/products/platform/vos-27",
    "/products/atlas",
    "/products/atlas/atlas-pro",
  ];

  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, route).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("core page families remain contained at tablet widths", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  const routes = [
    "/",
    "/products/mobile",
    "/products/mobile/x26-ultra",
    "/buy/mobile/x26-ultra",
    "/compare",
    "/sitemap",
    "/products/atlas",
  ];

  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, route).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("mobile configurator content clears the sticky navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/buy/mobile/x26-ultra");
  await expect(
    page.getByRole("heading", { name: "Make it yours." }),
  ).toBeVisible();

  const positions = await page.evaluate(() => {
    const navigation = document.querySelector(".store-local-nav");
    const price = document.querySelector(".buy-visual__price");

    if (!navigation || !price) {
      throw new Error("Expected configurator navigation and price panel");
    }

    return {
      navigationBottom: navigation.getBoundingClientRect().bottom,
      priceTop: price.getBoundingClientRect().top,
    };
  });

  expect(positions.priceTop).toBeGreaterThanOrEqual(
    positions.navigationBottom - 1,
  );
  await expect(
    page.locator(".buy-visual__price").getByText("Configured subtotal"),
  ).toBeVisible();
});

test("reduced motion retains products and software content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Your devices, now more adaptive." }),
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

test("the search shortcut toggles the dialog", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+K");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ControlOrMeta+K");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("atlas is searchable and complete without joining the primary toolbar", async ({
  page,
}) => {
  await page.goto("/");
  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(
    primaryNavigation.getByRole("link", { name: /atlas/i }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: /search/i }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("searchbox", { name: "Search vela" })
    .fill("vela atlas pro");
  await dialog.locator('a[href="/products/atlas/atlas-pro"]').click();

  await expect(page).toHaveURL(/\/products\/atlas\/atlas-pro$/);
  await expect(
    page.getByRole("heading", { name: "vela atlas pro", level: 1 }),
  ).toBeVisible();
  await expect(
    page.locator(".product-metadata").getByText("Coming June 9, 2027"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /^Pre-order$/i }).first()).toBeVisible();

  await page.goto(
    "/compare?products=atlas:atlas-core,atlas:atlas-pro,atlas:atlas-ultra",
  );
  await expect(
    page.getByRole("heading", {
      name: "Find your level of road intelligence.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "vela atlas core" }),
  ).toBeVisible();
  await expect(
    page.getByRole("option", { name: "atlas pilot max" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("rowheader", { name: "Autonomy engine" }),
  ).toBeVisible();

  await page.goto("/buy/atlas/atlas-pro");
  await expect(
    page.getByRole("heading", { name: "Build your atlas." }),
  ).toBeVisible();
  await page.getByRole("radio", { name: /atlas pilot max/i }).check();
  await expect(page.getByText(/\$299\/month in services/i)).toBeVisible();
  await page.getByRole("button", { name: /^Pre-order/i }).click();
  await expect(page.getByRole("status")).toContainText(
    "Preorders will start soon.",
  );
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

test("vOS 27 presents its developer beta in a distinct adaptive experience", async ({
  page,
}) => {
  await page.goto("/products/platform/vos-27");

  await expect(
    page.getByRole("heading", { name: "vOS 27", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Begins June 15, 2026." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "One system that understands the screen.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Adaptive App Kit" }),
  ).toBeVisible();

  const colors = await page.locator(".vos27-page").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      violet: style.getPropertyValue("--vos27-violet").trim(),
      background: style.backgroundColor,
    };
  });

  expect(colors.violet).toBe("#7776d7");
  expect(colors.background).not.toBe("rgba(0, 0, 0, 0)");
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
    page.getByRole("heading", { name: "How would you like to pay?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("radio", { name: /thrivepay monthly/ }),
  ).toBeChecked();
  await page.getByLabel("Custom down payment").fill("199");
  await page.getByRole("radio", { name: /12 months/i }).check();
  await expect(
    page.getByRole("heading", { name: /\$133.33/ }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /Continue with thrivepay/ })
    .click();
  await expect(
    page.getByText("Your thrivepay plan is ready to review."),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "No identity check, credit inquiry, payment, financing agreement, or order was submitted.",
  );
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

test("sale pricing remains active without a homepage campaign card", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "More of the ecosystem, for less.",
    }),
  ).toHaveCount(0);

  await page.goto("/products/mobile");
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
