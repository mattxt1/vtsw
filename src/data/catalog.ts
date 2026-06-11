import type {
  CatalogProduct,
  ProductCategory,
  ProductFeature,
} from "../types/content";
import { vela } from "./vela";

const years: Record<string, number> = {
  "x26 Ultra": 2026,
  "x26 Pro": 2026,
  x26: 2026,
  "x25 SE": 2025,
  "x25 Edge": 2025,
  "Fold Pro": 2026,
  Fold: 2026,
  Flip: 2026,
  "Flip SE": 2025,
  "Trifold Ultra": 2026,
  Trifold: 2026,
  "a9 5G": 2025,
  "a8 5G": 2025,
  "a7 5G": 2025,
  "m6 5G": 2025,
  "m5 5G": 2025,
  "m4 5G": 2025,
  "tab t26 Ultra": 2026,
  "tab t26+": 2026,
  "tab t26": 2026,
  "tab t26 SE+": 2026,
  "tab t26 SE": 2026,
  "tab t26 Lite": 2026,
  "tab t25+": 2025,
  "notebook ultra": 2026,
  "notebook pro": 2026,
  notebook: 2026,
  "notebook SE": 2026,
  "notebook lite": 2026,
  "notebook education edition": 2026,
  "notebook enterprise ultra": 2025,
  "watch ultra": 2026,
  watch: 2026,
  "watch SE": 2025,
  "probuds ultra": 2025,
  probuds: 2025,
  "probuds SE": 2024,
  ring: 2023,
  XR: 2022,
  "pencil ultra": 2025,
  "pencil pro": 2022,
  pencil: 2022,
  "pencil u1": 2022,
  "tv ultra": 2026,
  "tv pro": 2026,
  "tv plus": 2026,
  "tv SE": 2026,
  "tv lite": 2026,
  "tv rx26": 2026,
  "tv u8": 2026,
  "projector ultra": 2025,
  "projector pro": 2025,
  "projector plus": 2024,
  "projector lite": 2024,
  "display ultra": 2026,
  "display pro": 2026,
  "display plus": 2026,
  "display SE": 2026,
  "display lite": 2026,
  "display education edition": 2023,
  "home speaker pro": 2026,
  "home speaker mini": 2026,
  "party speaker pro": 2025,
  "party speaker plus": 2025,
  "party speaker SE": 2025,
  "soundbar ultra": 2026,
  "soundbar pro": 2026,
  "soundbar SE": 2025,
  "d8 ultra": 2026,
  "d8 max": 2026,
  "d8 pro": 2026,
  d8: 2026,
  "m8 max": 2026,
  "m8 pro": 2026,
  m8: 2026,
  "vOS 26": 2026,
};

const segmentFeatures: Record<string, ProductFeature[]> = {
  mobile: [
    {
      eyebrow: "vOS 26",
      title: "Familiar from the first touch.",
      body: "The same clear system language, continuity features, and privacy controls shared across the vela ecosystem.",
    },
    {
      eyebrow: "vela pulse",
      title: "Performance shaped around the device.",
      body: "Hardware and software are developed together to keep everyday interactions fast, composed, and efficient.",
    },
    {
      eyebrow: "continuity",
      title: "Your day moves with you.",
      body: "Calls, files, media, and context can continue naturally across your other vela devices.",
    },
  ],
  computing: [
    {
      eyebrow: "canvas",
      title: "Room for focused work.",
      body: "A calm workspace, thoughtful input, and a display experience designed for long sessions.",
    },
    {
      eyebrow: "vela pulse",
      title: "Quiet power for real workflows.",
      body: "Integrated vela silicon balances sustained performance, responsiveness, and efficiency.",
    },
    {
      eyebrow: "continuity",
      title: "Everything is already here.",
      body: "Your conversations, files, and connected devices arrive through the same familiar vOS experience.",
    },
  ],
  wearables: [
    {
      eyebrow: "personal",
      title: "Useful without asking for attention.",
      body: "Thoughtful notifications, health context, sound, or input stay close while the interface stays quiet.",
    },
    {
      eyebrow: "fit",
      title: "Designed for the way it is worn.",
      body: "Every interaction is shaped around proximity, comfort, and the moments when a smaller device is enough.",
    },
    {
      eyebrow: "continuity",
      title: "An extension of the ecosystem.",
      body: "Setup, identity, media, and context move naturally from the vela devices you already use.",
    },
  ],
  display: [
    {
      eyebrow: "picture",
      title: "A screen made to disappear.",
      body: "A restrained interface and considered industrial design keep attention on what you came to see.",
    },
    {
      eyebrow: "vOS for tv",
      title: "The ecosystem, across the room.",
      body: "Content, controls, audio, and connected vela devices meet in one familiar television experience.",
    },
    {
      eyebrow: "continuity",
      title: "Move media without the setup.",
      body: "Bring viewing, presentations, and sound from another vela device to the larger screen naturally.",
    },
  ],
  audio: [
    {
      eyebrow: "sound",
      title: "Tuned for the space around it.",
      body: "vela audio products are designed to feel balanced, clear, and effortless in everyday rooms.",
    },
    {
      eyebrow: "connection",
      title: "Ready when the room is.",
      body: "Playback and controls move naturally between personal devices, displays, and connected speakers.",
    },
    {
      eyebrow: "vOS",
      title: "One familiar control surface.",
      body: "The same system language keeps setup and everyday use composed across the vela ecosystem.",
    },
  ],
  platform: [
    {
      eyebrow: "architecture",
      title: "Built as part of the whole.",
      body: "vela platform products are developed alongside the hardware and experiences they enable.",
    },
    {
      eyebrow: "integration",
      title: "Fewer layers between idea and result.",
      body: "Shared engineering across silicon, software, and devices creates a more coherent system.",
    },
    {
      eyebrow: "longevity",
      title: "A foundation made to evolve.",
      body: "The platform is designed to support feature additions, security improvements, and long-term device updates.",
    },
  ],
};

const segmentDescriptions: Record<string, string> = {
  mobile:
    "A personal vela device shaped around clear communication, capable imaging, and the effortless movement of your day.",
  computing:
    "A composed vOS workspace designed for focused work, creative flow, and continuity across the vela ecosystem.",
  wearables:
    "Personal technology that stays close, feels considered, and gives you useful context without unnecessary noise.",
  display:
    "A premium visual experience with a restrained interface and a natural connection to the devices around it.",
  audio:
    "Connected sound designed around clarity, atmosphere, and simple control across the vela ecosystem.",
  platform:
    "The in-house technology foundation connecting vela hardware, software, service, and long-term support.",
};

const tierTaglines: Record<string, string> = {
  ultra: "The most capable expression of its category.",
  max: "More headroom for larger, sustained work.",
  pro: "More capability for people who ask more of it.",
  plus: "The familiar experience, with more room.",
  se: "A proven design, thoughtfully carried forward.",
  lite: "The easiest way into the vela experience.",
  education: "Built for shared learning and long service.",
  enterprise: "Designed for demanding organizational work.",
  rugged: "Purpose-built for environments beyond the everyday.",
  standard: "The balanced choice for everyday use.",
};

export function slugifyProduct(value: string) {
  return value
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTier(model: string, groupName: string) {
  const value = model.toLowerCase();
  if (value.includes("ultra")) return "ultra";
  if (value.includes("max")) return "max";
  if (value.includes("pro")) return "pro";
  if (value.includes("+") || value.includes("plus")) return "plus";
  if (value.includes(" se")) return "se";
  if (value.includes("lite") || value.includes("mini")) return "lite";
  if (value.includes("education")) return "education";
  if (value.includes("enterprise") || value.includes(" u1")) return "enterprise";
  if (value.includes("r23") || groupName.includes("r series")) return "rugged";
  return "standard";
}

function getPlatform(segmentId: string, groupName: string) {
  if (segmentId === "display") {
    return groupName === "display" ? "vOS 26 basic firmware" : "vOS 26 for tv";
  }
  if (segmentId === "audio") {
    return groupName === "home audio" ? "vOS 26 for home" : "vOS 26 basic firmware";
  }
  if (segmentId === "wearables" && groupName !== "pencil") {
    return "vOS 26 for wearables";
  }
  if (segmentId === "platform") return "vela platform";
  return groupName === "pencil" ? "vOS 26 basic firmware" : "vOS 26";
}

function getSupport(segmentId: string, groupName: string, model: string) {
  const value = model.toLowerCase();
  if (model === "Trifold Ultra") return "12 years guaranteed";
  if (
    value.includes("education") ||
    value.includes("enterprise") ||
    value.includes(" u1") ||
    value.includes(" u4") ||
    value.includes(" u6") ||
    model === "tv u8"
  ) {
    return "8 years guaranteed";
  }
  if (segmentId === "display") return "6 years guaranteed";
  if (segmentId === "mobile") {
    if (groupName === "a series" || groupName === "r series") {
      return "6 years guaranteed";
    }
    if (groupName === "m series") return "4 years guaranteed";
    return "8 years guaranteed";
  }
  if (
    segmentId === "computing" ||
    (segmentId === "wearables" && groupName === "watch")
  ) {
    return "8 years guaranteed";
  }
  if (segmentId === "platform" && model === "vOS 26") {
    return "Ongoing platform updates";
  }
  return "Feature and security updates";
}

function getAvailability(model: string) {
  const value = model.toLowerCase();
  if (model === "Trifold Ultra") return "Bespoke · made to order";
  if (model === "Trifold") return "Limited production";
  if (
    value.includes("education") ||
    value.includes("enterprise") ||
    value.includes(" u1") ||
    value.includes(" u4") ||
    value.includes(" u6") ||
    model === "tv u8"
  ) {
    return "Available to organizations";
  }
  if (model === "pencil pro" || model === "tab t25+") {
    return "Available while stock lasts";
  }
  if (model === "ring" || model === "XR") {
    return "Available · no successor planned";
  }
  return "Current lineup";
}

function displayName(model: string) {
  if (model === "vOS 26" || model === "vela protect") return model;
  return `vela ${model}`;
}

function createProduct(
  segment: ProductCategory,
  groupName: string,
  model: string,
): CatalogProduct {
  const tier = getTier(model, groupName);

  return {
    id: slugifyProduct(model),
    segmentId: segment.id,
    groupName,
    model,
    displayName: displayName(model),
    eyebrow: `${groupName} · ${tier}`,
    tagline: tierTaglines[tier],
    description: segmentDescriptions[segment.id],
    year: years[model],
    platform: getPlatform(segment.id, groupName),
    support: getSupport(segment.id, groupName, model),
    availability: getAvailability(model),
    tier,
    media: {
      kind: "sequence",
      alt: `${displayName(model)} rotating in a soft mineral space`,
    },
    features: segmentFeatures[segment.id],
  };
}

export const segments = vela.products;

export const catalogProducts = segments.flatMap((segment) =>
  segment.groups.flatMap((group) =>
    group.models.map((model) => createProduct(segment, group.name, model)),
  ),
);

export function getSegment(segmentId: string | undefined) {
  return segments.find((segment) => segment.id === segmentId);
}

export function getProductsForSegment(segmentId: string) {
  return catalogProducts.filter((product) => product.segmentId === segmentId);
}

export function getProduct(segmentId: string | undefined, productId: string | undefined) {
  return catalogProducts.find(
    (product) =>
      product.segmentId === segmentId && product.id === productId,
  );
}
