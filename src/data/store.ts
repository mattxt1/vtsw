import type { CatalogProduct } from "../types/content";
import type {
  StoreOption,
  StoreOptionGroup,
  StoreProductConfiguration,
} from "../types/store";
import {
  accessoryBasePrices,
  accessoryByModel,
} from "./accessories";
import { catalogProducts } from "./catalog";
import { getProductKey } from "./productKey";

const basePrices: Record<string, number> = {
  "x26 Ultra": 1399,
  "x26 Pro": 1099,
  x26: 899,
  "x25 SE": 599,
  "x25 Edge": 849,
  "Fold Pro": 2199,
  Fold: 1799,
  Flip: 999,
  "Flip SE": 699,
  "Trifold Ultra": 5999,
  Trifold: 2999,
  "a9 5G": 449,
  "a8 5G": 349,
  "a7 5G": 279,
  "m6 5G": 249,
  "m5 5G": 199,
  "m4 5G": 149,
  "r23+": 799,
  r23: 699,
  "tab t26 Ultra": 1299,
  "tab t26+": 899,
  "tab t26": 699,
  "tab t26 SE+": 599,
  "tab t26 SE": 449,
  "tab t26 Lite": 329,
  "tab t25+": 499,
  "tab u6+": 399,
  "tab u4": 249,
  "tab t23R": 899,
  "notebook ultra": 2799,
  "notebook pro": 1999,
  notebook: 1099,
  "notebook SE": 799,
  "notebook lite": 599,
  "notebook education edition": 699,
  "notebook enterprise ultra": 3499,
  "watch ultra": 849,
  watch: 399,
  "watch SE": 249,
  "probuds ultra": 299,
  probuds: 179,
  "probuds SE": 99,
  ring: 299,
  XR: 1499,
  "pencil ultra": 149,
  "pencil pro": 99,
  pencil: 79,
  "pencil u1": 39,
  "tv ultra": 1799,
  "tv pro": 1299,
  "tv plus": 999,
  "tv SE": 799,
  "tv lite": 699,
  "tv rx26": 1999,
  "tv u8": 899,
  "projector ultra": 3999,
  "projector pro": 2499,
  "projector plus": 1499,
  "projector lite": 699,
  "display ultra": 3499,
  "display pro": 1899,
  "display plus": 1299,
  "display SE": 599,
  "display lite": 299,
  "display education edition": 179,
  "home speaker pro": 399,
  "home speaker mini": 99,
  "party speaker pro": 699,
  "party speaker plus": 399,
  "party speaker SE": 199,
  "soundbar ultra": 1499,
  "soundbar pro": 799,
  "soundbar SE": 349,
  ...accessoryBasePrices,
};

const option = (
  id: string,
  label: string,
  priceDelta = 0,
  detail?: string,
): StoreOption => ({ id, label, priceDelta, detail });

const group = (
  id: string,
  label: string,
  options: StoreOption[],
  description?: string,
  mode: StoreOptionGroup["mode"] = "single",
): StoreOptionGroup => ({ id, label, options, description, mode });

function storageOptions(product: CatalogProduct): StoreOption[] | undefined {
  const model = product.model.toLowerCase();

  if (model === "x26 ultra") {
    return [
      option("512gb", "512GB", 0, "16GB memory"),
      option("1tb", "1TB", 400, "24GB memory"),
      option("2tb", "2TB", 800, "24GB memory"),
      option("4tb", "4TB", 1700, "32GB memory"),
    ];
  }
  if (model === "x26 pro") {
    return [
      option("256gb", "256GB", 0, "12GB memory"),
      option("512gb", "512GB", 200, "16GB memory"),
      option("1tb", "1TB", 450, "16GB memory"),
      option("2tb", "2TB", 900, "24GB memory"),
    ];
  }
  if (model === "x26") {
    return [
      option("256gb", "256GB", 0, "12GB memory"),
      option("512gb", "512GB", 150, "12GB memory"),
      option("1tb", "1TB", 350, "16GB memory"),
    ];
  }
  const documentedPhoneConfigurations: Record<string, StoreOption[]> = {
    "x25 se": [
      option("128gb", "128GB", 0, "8GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
      option("512gb", "512GB", 300, "12GB memory"),
    ],
    "x25 edge": [
      option("256gb", "256GB", 0, "12GB memory"),
      option("512gb", "512GB", 150, "12GB memory"),
      option("1tb", "1TB", 350, "16GB memory"),
    ],
    fold: [
      option("512gb", "512GB", 0, "16GB memory"),
      option("1tb", "1TB", 250, "16GB memory"),
      option("2tb", "2TB", 700, "24GB memory"),
    ],
    "fold pro": [
      option("1tb", "1TB", 0, "24GB memory"),
      option("2tb", "2TB", 400, "24GB memory"),
      option("4tb", "4TB", 1300, "32GB memory"),
    ],
    flip: [
      option("256gb", "256GB", 0, "12GB memory"),
      option("512gb", "512GB", 150, "12GB memory"),
      option("1tb", "1TB", 400, "16GB memory"),
    ],
    "flip se": [
      option("128gb", "128GB", 0, "8GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
      option("512gb", "512GB", 300, "12GB memory"),
    ],
    trifold: [
      option("1tb", "1TB", 0, "24GB memory"),
      option("2tb", "2TB", 600, "32GB memory"),
      option("4tb", "4TB", 1500, "32GB memory"),
    ],
    "trifold ultra": [
      option("2tb", "2TB", 0, "32GB memory"),
      option("4tb", "4TB", 1500, "48GB memory"),
      option("8tb", "8TB", 4000, "64GB memory"),
    ],
    "a9 5g": [
      option("128gb", "128GB", 0, "8GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
      option("512gb", "512GB", 250, "12GB memory"),
    ],
    "a8 5g": [
      option("128gb", "128GB", 0, "6GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
    ],
    "a7 5g": [
      option("128gb", "128GB", 0, "6GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
    ],
    "m6 5g": [
      option("128gb", "128GB", 0, "6GB memory"),
      option("256gb", "256GB", 80, "8GB memory"),
    ],
    "m5 5g": [
      option("128gb-4gb", "128GB", 0, "4GB memory"),
      option("128gb-6gb", "128GB", 30, "6GB memory"),
      option("256gb", "256GB", 80, "6GB memory"),
    ],
    "m4 5g": [
      option("64gb", "64GB", 0, "4GB memory"),
      option("128gb-4gb", "128GB", 30, "4GB memory"),
      option("128gb-6gb", "128GB", 70, "6GB memory"),
    ],
    r23: [
      option("256gb", "256GB", 0, "8GB memory"),
      option("512gb", "512GB", 200, "12GB memory"),
    ],
    "r23+": [
      option("256gb", "256GB", 0, "8GB memory"),
      option("512gb", "512GB", 200, "12GB memory"),
    ],
  };
  if (documentedPhoneConfigurations[model]) {
    return documentedPhoneConfigurations[model];
  }
  if (model === "tab t26 ultra") {
    return [
      option("512gb", "512GB", 0, "16GB memory"),
      option("1tb", "1TB", 400, "24GB memory"),
      option("2tb", "2TB", 900, "32GB memory"),
      option("4tb", "4TB", 1700, "32GB memory"),
    ];
  }
  if (model === "tab t26" || model === "tab t26+") {
    return [
      option("256gb", "256GB", 0, "8GB memory"),
      option("512gb", "512GB", 200, "12GB memory"),
      option("1tb", "1TB", 500, "16GB memory"),
    ];
  }
  if (model === "tab t26 se" || model === "tab t26 se+") {
    return [
      option("128gb", "128GB", 0, "8GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
      option("512gb", "512GB", 250, "12GB memory"),
    ];
  }
  if (model === "tab t26 lite") {
    return [
      option("128gb", "128GB", 0, "6GB memory"),
      option("256gb", "256GB", 100, "8GB memory"),
    ];
  }
  if (model === "tab t25+") {
    return [
      option("256gb", "256GB", 0, "8GB memory"),
      option("512gb", "512GB", 150, "12GB memory"),
    ];
  }
  if (product.groupName === "notebook") {
    if (model === "notebook ultra" || model === "notebook pro") {
      return [
        option("1tb", "1TB"),
        option("2tb", "2TB", 400),
        option("4tb", "4TB", 1000),
        option("8tb", "8TB", 2200),
        ...(model === "notebook ultra"
          ? [option("16tb", "16TB", 4800)]
          : []),
      ];
    }
    if (model === "notebook") {
      return [
        option("512gb", "512GB"),
        option("1tb", "1TB", 200),
        option("2tb", "2TB", 600),
        option("4tb", "4TB", 1200),
      ];
    }
    if (model === "notebook se") {
      return [
        option("256gb", "256GB"),
        option("512gb", "512GB", 150),
        option("1tb", "1TB", 350),
        option("2tb", "2TB", 750),
      ];
    }
    if (model === "notebook lite") {
      return [
        option("256gb", "256GB"),
        option("512gb", "512GB", 150),
        option("1tb", "1TB", 350),
      ];
    }
    if (model === "notebook education edition") {
      return [
        option("256gb", "256GB", 0, "16GB memory"),
        option("512gb", "512GB", 100, "16GB memory"),
      ];
    }
    if (model === "notebook enterprise ultra") {
      return [option("2tb", "2TB", 0, "64GB memory")];
    }
    return [
      option("256gb", "256GB"),
      option("512gb", "512GB", 150),
      option("1tb", "1TB", 350),
      option("2tb", "2TB", 700),
    ];
  }
  if (
    product.groupName.includes("tab") ||
    product.groupName === "organization"
  ) {
    if (model === "tab u6+") {
      return [
        option("128gb", "128GB", 0, "8GB memory"),
        option("256gb", "256GB", 70, "8GB memory"),
      ];
    }
    if (model === "tab u4") {
      return [
        option("64gb", "64GB", 0, "6GB memory"),
        option("128gb", "128GB", 40, "6GB memory"),
      ];
    }
    if (model === "tab t23r") {
      return [
        option("256gb", "256GB", 0, "8GB memory"),
        option("512gb", "512GB", 200, "12GB memory"),
      ];
    }
    return product.tier === "ultra"
      ? [
          option("256gb", "256GB"),
          option("512gb", "512GB", 200),
          option("1tb", "1TB", 450),
          option("2tb", "2TB", 850),
        ]
      : [
          option("128gb", "128GB"),
          option("256gb", "256GB", 100),
          option("512gb", "512GB", 250),
          option("1tb", "1TB", 500),
        ];
  }
  if (product.segmentId === "mobile") {
    if (product.groupName === "a series") {
      return [
        option("128gb", "128GB"),
        option("256gb", "256GB", 100),
        option("512gb", "512GB", 250),
      ];
    }
    if (product.groupName === "m series") {
      return [
        option("64gb", "64GB"),
        option("128gb", "128GB", 50),
        option("256gb", "256GB", 120),
      ];
    }
    return [
      option("128gb", "128GB"),
      option("256gb", "256GB", 100),
      option("512gb", "512GB", 250),
    ];
  }
  if (product.model === "XR") {
    return [option("256gb", "256GB")];
  }

  return undefined;
}

function memoryOptions(product: CatalogProduct): StoreOption[] | undefined {
  const model = product.model.toLowerCase();

  if (model === "notebook ultra") {
    return [
      option("36gb", "36GB unified memory"),
      option("64gb", "64GB unified memory", 400),
      option("96gb", "96GB unified memory", 800),
      option("128gb", "128GB unified memory", 1400),
      option("192gb", "192GB unified memory", 2400, "Requires d8 ultra"),
      option("256gb", "256GB unified memory", 3200, "Requires d8 ultra"),
    ];
  }
  if (model === "notebook pro") {
    return [
      option("24gb", "24GB unified memory"),
      option("36gb", "36GB unified memory", 300),
      option("64gb", "64GB unified memory", 700),
      option("96gb", "96GB unified memory", 1200, "Requires d8 max"),
      option("128gb", "128GB unified memory", 1800, "Requires d8 max"),
    ];
  }
  if (model === "notebook") {
    return [
      option("16gb", "16GB unified memory"),
      option("24gb", "24GB unified memory", 200),
      option("32gb", "32GB unified memory", 400),
    ];
  }
  if (
    model.includes("notebook se")
  ) {
    return [
      option("16gb", "16GB unified memory"),
      option("24gb", "24GB unified memory", 200),
    ];
  }
  if (model.includes("notebook lite")) {
    return [
      option("12gb", "12GB unified memory"),
      option("16gb", "16GB unified memory", 150),
    ];
  }
  return undefined;
}

function sizeOptions(product: CatalogProduct): StoreOption[] | undefined {
  const model = product.model.toLowerCase();

  if (model === "notebook ultra") {
    return [
      option("14-inch", "14-inch"),
      option("16-inch", "16-inch", 500),
    ];
  }
  if (model === "notebook pro") {
    return [
      option("14-inch", "14-inch"),
      option("16-inch", "16-inch", 500),
    ];
  }
  if (model === "notebook") {
    return [
      option("13-inch", "13-inch"),
      option("15-inch", "15-inch", 200),
    ];
  }
  if (product.groupName === "watch") {
    if (model === "watch ultra") return undefined;
    return [
      option("small", model === "watch se" ? "40 mm" : "42 mm"),
      option("large", model === "watch se" ? "44 mm" : "46 mm", 30),
    ];
  }
  if (model === "tab t26 ultra") {
    return [
      option("12-9-inch", "12.9-inch"),
      option("14-6-inch", "14.6-inch", 300),
    ];
  }
  if (model === "ring") {
    return Array.from({ length: 9 }, (_, index) =>
      option(`size-${index + 5}`, `Size ${index + 5}`),
    );
  }
  if (model.startsWith("tv ")) {
    const sizePrices: Record<string, Array<[number, number]>> = {
      "tv ultra": [[32, 1799], [42, 2499], [55, 3499], [65, 4999], [77, 7999], [85, 11999]],
      "tv pro": [[32, 1299], [42, 1899], [55, 2699], [65, 3799], [77, 5999], [83, 7499], [98, 14999]],
      "tv plus": [[32, 999], [42, 1399], [55, 1999], [65, 2799], [77, 4499], [83, 5999], [98, 9999], [115, 19999], [198, 149999]],
      "tv se": [[43, 799], [55, 1099], [65, 1499], [75, 2199], [85, 3299], [98, 5999], [115, 12999], [198, 99999]],
      "tv lite": [[55, 699], [65, 899], [75, 1299], [85, 1899], [98, 3499]],
      "tv u8": [[65, 899], [75, 1199], [85, 1699]],
      "tv rx26": [[45, 1999], [55, 2799], [65, 3799], [75, 5499], [85, 7999]],
    };
    return sizePrices[model]?.map(([size, price]) =>
      option(`${size}-inch`, `${size}-inch`, price - basePrices[product.model]),
    );
  }
  if (model.startsWith("display ")) {
    if (model === "display ultra" || model === "display plus") return undefined;
    if (model === "display pro") {
      return [
        option("27-inch", "27-inch"),
        option("32-inch", "32-inch", 600),
      ];
    }
    if (model === "display se") {
      return [
        option("24-inch", "24-inch"),
        option("27-inch", "27-inch", 200),
      ];
    }
    if (model === "display lite") {
      return [
        option("24-inch", "24-inch · 1440p"),
        option("27-inch", "27-inch · 4K", 150),
      ];
    }
    return [
      option("24-inch", "24-inch"),
      option("27-inch", "27-inch", 150),
    ];
  }
  return undefined;
}

function connectivityOptions(product: CatalogProduct): StoreOption[] | undefined {
  const model = product.model.toLowerCase();
  if (model === "watch") {
    return [
      option("gps", "GPS"),
      option("cellular", "GPS + Cellular", 100),
    ];
  }
  if (model === "watch se") {
    return [
      option("gps", "GPS"),
      option("cellular", "GPS + Cellular", 80),
    ];
  }
  if (
    model === "tab t26 ultra" ||
    model === "tab t26" ||
    model === "tab t26+" ||
    model === "tab t26 se" ||
    model === "tab t26 se+"
  ) {
    return [
      option("wifi", "Wi-Fi"),
      option(
        "wifi-cellular",
        "Wi-Fi + 5G",
        product.model.includes("SE") ? 150 : product.model.includes("t26") && product.model !== "tab t26 Ultra" ? 180 : 200,
      ),
    ];
  }
  return undefined;
}

function materialOptions(product: CatalogProduct): StoreOption[] | undefined {
  if (product.model.toLowerCase() !== "watch") return undefined;
  return [
    option("aluminum", "Aluminum"),
    option("stainless-steel", "Stainless steel", 250),
  ];
}

function displayOptions(product: CatalogProduct): StoreOption[] | undefined {
  if (
    product.model === "notebook ultra" ||
    product.model === "notebook pro"
  ) {
    return [
      option("standard-glass", "Standard glass"),
      option("nano-texture", "Nano-texture glass", 150),
    ];
  }
  return undefined;
}

function additionOptions(product: CatalogProduct): StoreOption[] {
  if (product.segmentId === "mobile") {
    return [
      option("probuds", "vela probuds", 179),
      option("probuds-ultra", "vela probuds ultra", 299),
    ];
  }
  if (product.groupName === "notebook" || product.model.includes("notebook")) {
    return [
      option("probuds", "vela probuds", 179),
      option("probuds-ultra", "vela probuds ultra", 299),
    ];
  }
  if (
    product.groupName.includes("tab") ||
    product.model.startsWith("tab ")
  ) {
    return [
      option("pencil", "vela pencil ultra", 149),
      option("pencil-standard", "vela pencil", 79),
    ];
  }
  if (product.groupName === "watch") {
    return [
      option("probuds", "vela probuds", 179),
      option("probuds-ultra", "vela probuds ultra", 299),
    ];
  }
  if (product.groupName === "probuds") {
    return [
      option("tips", "Extended fit kit", 19),
      option("charger", "Compact USB-C charger", 29),
    ];
  }
  if (product.segmentId === "display") {
    return [
      option("soundbar", "vela soundbar SE", 349),
      option("home-speaker-mini", "vela home speaker mini", 99),
    ];
  }
  if (product.segmentId === "audio") {
    return [
      option("stand", "Matching stand or wall mount", 79),
      option("cable", "Premium connection kit", 39),
    ];
  }
  return [];
}

function protectOptions(product: CatalogProduct): StoreOption[] {
  if (product.model === "Trifold Ultra") {
    return [
      option("included", "vela protect elite included", 0, "12-year ownership coverage"),
    ];
  }

  const base = basePrices[product.model] ?? 499;
  const twoYears = Math.max(49, Math.round((base * 0.12) / 10) * 10 - 1);
  const threeYears = Math.max(
    79,
    Math.round((base * 0.18) / 10) * 10 - 1,
  );

  return [
    option("none", "No vela protect"),
    option(
      "two-years",
      "vela protect · 2 years",
      twoYears,
      "Accidental damage service and priority support",
    ),
    option(
      "three-years",
      "vela protect+ · 3 years",
      threeYears,
      "Longer coverage with express replacement",
    ),
  ];
}

export function getStoreConfiguration(
  product: CatalogProduct,
): StoreProductConfiguration {
  const accessory = accessoryByModel.get(product.model);

  if (accessory) {
    const optionGroups: StoreOptionGroup[] = [];

    if (accessory.variants && accessory.variants.length > 1) {
      optionGroups.push(
        group(
          "variant",
          "Choose your version.",
          accessory.variants.map((item, index) =>
            option(
              `variant-${index + 1}`,
              item.label,
              item.price - accessory.price,
              item.detail,
            ),
          ),
          "Compatibility, size, and included hardware can vary by version.",
        ),
      );
    }

    if (product.finishes.length > 0) {
      optionGroups.push(
        group(
          "finish",
          "Choose your finish.",
          product.finishes.map((finish) => ({
            id: finish.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            label: finish.name,
            color: finish.color,
            priceDelta: 0,
          })),
        ),
      );
    }

    const restricted =
      accessory.organizationOnly || accessory.serviceOnly || accessory.bespoke;

    return {
      productKey: getProductKey(product),
      basePrice: accessory.price,
      purchasable: !restricted,
      purchaseNote: accessory.organizationOnly
        ? "This accessory is purchased through vela organization sales."
        : accessory.serviceOnly
          ? "This accessory is supplied and installed through vela service."
          : accessory.bespoke
            ? "This accessory is commissioned through a vela bespoke consultation."
            : undefined,
      optionGroups,
      protectOptions: [],
    };
  }

  const optionGroups: StoreOptionGroup[] = [];
  const size = sizeOptions(product);
  const storage = storageOptions(product);
  const memory = memoryOptions(product);
  const connectivity = connectivityOptions(product);
  const display = displayOptions(product);
  const material = materialOptions(product);
  const additions = additionOptions(product);

  if (product.finishes.length > 0) {
    optionGroups.push(
      group(
        "finish",
        "Choose your finish.",
        product.finishes.map((finish) => ({
          id: finish.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          label: finish.name,
          color: finish.color,
          priceDelta: 0,
        })),
      ),
    );
  }
  if (size) optionGroups.push(group("size", "Choose your size.", size));
  if (material) {
    optionGroups.push(group("material", "Choose your case material.", material));
  }
  if (storage) {
    optionGroups.push(
      group(
        "storage",
        "Choose your storage.",
        storage,
        "More storage keeps larger libraries and projects on the device.",
      ),
    );
  }
  if (memory) {
    optionGroups.push(
      group(
        "memory",
        "Choose your memory.",
        memory,
        "More unified memory gives demanding workflows additional headroom.",
      ),
    );
  }
  if (connectivity) {
    optionGroups.push(
      group("connectivity", "Choose your connectivity.", connectivity),
    );
  }
  if (display) {
    optionGroups.push(
      group("display", "Choose your display finish.", display),
    );
  }
  if (additions.length > 0) {
    optionGroups.push(
      group(
        "additions",
        "Add the essentials.",
        additions,
        "Optional additions arrive with your configured device.",
        "multiple",
      ),
    );
  }

  const organizationOnly = product.availability
    .toLowerCase()
    .includes("organization");
  const foundation = product.segmentId === "platform";

  return {
    productKey: getProductKey(product),
    basePrice: basePrices[product.model] ?? 499,
    purchasable: !organizationOnly && !foundation,
    purchaseNote: organizationOnly
      ? "This configuration is purchased through vela organization sales."
      : foundation
        ? "This is part of the vela software foundation and is not sold as consumer hardware."
        : undefined,
    optionGroups,
    protectOptions: protectOptions(product),
  };
}

export function getStoreProductsForFamily(product: CatalogProduct) {
  if (product.segmentId === "accessories") return [product];

  return catalogProducts.filter(
    (candidate) =>
      candidate.segmentId === product.segmentId &&
      candidate.groupName === product.groupName &&
      candidate.segmentId !== "platform",
  );
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
