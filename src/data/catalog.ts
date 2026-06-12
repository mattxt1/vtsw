import type {
  CatalogProduct,
  ProductCategory,
  ProductFeature,
  ProductSpecGroup,
} from "../types/content";
import { accessoryByModel, accessoryProfiles } from "./accessories";
import { atlasProfiles } from "./atlas";
import { productProfiles } from "./productProfiles";
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
  "lattice 1 mini": 2026,
  "lattice 1": 2026,
  "lattice 1 pro": 2026,
  "ethos ai": 2026,
  "vOS 27": 2027,
  "vOS 26": 2026,
  "atlas core": 2027,
  atlas: 2027,
  "atlas pro": 2027,
  "atlas ultra": 2027,
  "atlas fleet": 2027,
  "atlas response": 2027,
  "atlas connect": 2027,
  "atlas assist": 2027,
  "atlas pilot": 2027,
  "atlas pilot pro": 2027,
  "atlas pilot max": 2027,
  "atlas pilot ultra": 2027,
  "atlas scout": 2027,
  "atlas concierge": 2027,
  "atlas fleet command": 2027,
  "atlas response network": 2027,
  "atlas network": 2027,
  "atlas link": 2027,
  "atlas satellite": 2027,
  "atlas app": 2027,
  "atlas guardian": 2027,
  "atlas memory drive": 2027,
  "atlas trip view": 2027,
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
      eyebrow: "lattice",
      title: "One framework across the ecosystem.",
      body: "lattice gives vela teams shared interface, service, deployment, API, and security foundations without forcing every product into the same shape.",
    },
    {
      eyebrow: "ethos ai",
      title: "Intelligence that belongs in the system.",
      body: "ethos ai combines vOS context with vela silicon so useful intelligence can feel fast, private, personal, and native to each device.",
    },
    {
      eyebrow: "vela foundation",
      title: "Designed together below the surface.",
      body: "Frameworks, operating systems, silicon, APIs, security, deployment, and long-term services evolve as one connected foundation.",
    },
  ],
  accessories: [
    {
      eyebrow: "designed together",
      title: "A precise fit from the start.",
      body: "Compatibility, attachment, charging, and materials are developed around the vela products each accessory serves.",
    },
    {
      eyebrow: "material system",
      title: "Quiet materials, made for daily use.",
      body: "Soft silicone, woven polymer, aluminum, titanium, aramid, and strengthened glass share one restrained design language.",
    },
    {
      eyebrow: "ecosystem",
      title: "Useful beyond one device.",
      body: "Power, connectivity, travel, and workspace accessories are designed to move naturally across the wider vela ecosystem.",
    },
  ],
  atlas: [
    {
      eyebrow: "atlas guardian",
      title: "Calm awareness around the whole vehicle.",
      body: "Cameras, radar, lidar, localization, and driver monitoring are fused into one safety model, with core guardian protections available without a paid autonomy plan.",
    },
    {
      eyebrow: "vOS 27 mobility",
      title: "The vehicle joins the vela ecosystem.",
      body: "Status, trips, sensors, maps, service, and supported controls move naturally across phone, watch, tablet, notebook, vehicle display, and fleet web.",
    },
    {
      eyebrow: "atlas network",
      title: "Road intelligence that can travel beyond one vehicle.",
      body: "Encrypted maps, live hazards, atlas link, satellite safety fallback, and fleet telemetry keep atlas connected while preserving local-first safety behavior.",
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
    "The frameworks, intelligence, operating systems, silicon, infrastructure, and services connecting every vela experience.",
  accessories:
    "A considered extension of the vela ecosystem, designed for precise compatibility, quiet utility, and a coherent material experience.",
  atlas:
    "A calm, connected vehicle-intelligence platform built around sensor fusion, supervised autonomy, vOS 27 mobility, and vela pulse automotive silicon.",
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

function getPlatform(segmentId: string, groupName: string, model: string) {
  if (segmentId === "atlas") {
    if (groupName === "vOS 27 mobility") return "vOS 27 mobility";
    if (groupName === "atlas network") return "vela atlas network";
    if (groupName === "pilot + services") return "vela atlas service";
    return "vOS 27 mobility · vela pulse a9";
  }
  if (segmentId === "accessories") {
    return groupName === "power + charging" ||
      groupName === "cables + connectivity" ||
      groupName === "creator + travel"
      ? "vOS 26 accessory integration"
      : "No software required";
  }
  if (segmentId === "display") {
    return groupName === "display" ? "vOS 26 basic firmware" : "vOS 26 for tv";
  }
  if (segmentId === "audio") {
    return groupName === "home audio" ? "vOS 26 for home" : "vOS 26 basic firmware";
  }
  if (segmentId === "wearables" && groupName !== "pencil") {
    return "vOS 26 for wearables";
  }
  if (model.startsWith("lattice")) return "lattice framework";
  if (model === "ethos ai") return "vela native intelligence";
  if (segmentId === "platform") return "vela foundation";
  return groupName === "pencil" ? "vOS 26 basic firmware" : "vOS 26";
}

function getSupport(segmentId: string, groupName: string, model: string) {
  const value = model.toLowerCase();
  if (segmentId === "atlas") {
    if (model === "atlas core" || model === "atlas") {
      return "8 years hardware · 10 years safety firmware";
    }
    if (model === "atlas pro") {
      return "10 years hardware · 12 years safety firmware";
    }
    if (model === "atlas ultra" || model === "atlas response") {
      return "12 years hardware and safety firmware";
    }
    if (model === "atlas fleet") return "8 years hardware · fleet contract software";
    return "Continuous atlas service updates";
  }
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
  if (segmentId === "accessories") return "Limited accessory warranty";
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
  if (
    segmentId === "platform" &&
    (model === "vOS 26" || model === "vOS 27")
  ) {
    return "Ongoing platform updates";
  }
  if (model.startsWith("lattice")) return "Active framework releases";
  if (model === "ethos ai") return "Continuous intelligence updates";
  return "Feature and security updates";
}

function getAvailability(model: string, segmentId?: string) {
  const value = model.toLowerCase();
  if (segmentId === "atlas") {
    if (model === "atlas ultra") return "Coming late 2027 · invite-only early access";
    if (model === "atlas fleet") return "Coming July 2027 · enterprise contracts";
    if (model === "atlas response") return "Coming August 2027 · approved agencies only";
    if (model === "atlas core") return "Coming April 21, 2027";
    if (model === "atlas") return "Coming May 12, 2027";
    if (model === "atlas pro") return "Coming June 9, 2027";
    return "Coming with the 2027 atlas platform";
  }
  const accessory = accessoryByModel.get(model);
  if (accessory?.organizationOnly) return "Available to organizations";
  if (accessory?.serviceOnly) return "Installed by vela service";
  if (accessory?.bespoke) return "Bespoke · made to order";
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
  if (model.startsWith("lattice")) return "Available to vela developers";
  if (model === "ethos ai") return "Integrated across supported vela products";
  if (model === "vOS 27") return "Developer beta begins June 15, 2026";
  return "Current lineup";
}

function displayName(model: string, segmentId?: string, groupName?: string) {
  if (
    segmentId === "atlas" &&
    (groupName === "consumer systems" || groupName === "enterprise systems")
  ) {
    return `vela ${model}`;
  }
  if (segmentId === "atlas") return model;
  if (
    model === "vOS 26" ||
    model === "vOS 27" ||
    model === "vela protect" ||
    model === "ethos ai" ||
    model.startsWith("lattice")
  ) {
    return model;
  }
  return `vela ${model}`;
}

function createProduct(
  segment: ProductCategory,
  groupName: string,
  model: string,
): CatalogProduct {
  const tier = getTier(model, groupName);
  const profile =
    productProfiles[model] ?? accessoryProfiles[model] ?? atlasProfiles[model];
  const fallbackSpecifications: ProductSpecGroup[] = [
    {
      title: "Experience",
      items: [
        { label: "Platform", value: getPlatform(segment.id, groupName, model) },
        { label: "Support", value: getSupport(segment.id, groupName, model) },
        { label: "Availability", value: getAvailability(model, segment.id) },
      ],
    },
  ];

  return {
    id: slugifyProduct(model),
    segmentId: segment.id,
    groupName,
    model,
    displayName: displayName(model, segment.id, groupName),
    eyebrow: `${groupName} · ${tier}`,
    tagline: profile?.tagline ?? tierTaglines[tier],
    description: profile?.description ?? segmentDescriptions[segment.id],
    year: years[model] ?? (segment.id === "accessories" ? 2026 : undefined),
    platform: getPlatform(segment.id, groupName, model),
    support: getSupport(segment.id, groupName, model),
    availability: getAvailability(model, segment.id),
    tier,
    media: {
      kind: "sequence",
      alt: `${displayName(model, segment.id, groupName)} presented in a calm technical space`,
    },
    features: segmentFeatures[segment.id],
    highlights:
      profile?.highlights ??
      [
        {
          value: getPlatform(segment.id, groupName, model),
          label: "platform",
        },
        { value: getSupport(segment.id, groupName, model), label: "support" },
      ],
    specifications: profile?.specifications ?? fallbackSpecifications,
    finishes: profile?.finishes ?? [],
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
