import type { CatalogProduct } from "../types/content";

export interface AtlasComparisonRow {
  label: string;
  values: Record<string, string>;
}

export interface AtlasComparisonSection {
  title: string;
  description: string;
  rows: AtlasComparisonRow[];
}

export const atlasHardwareModels = [
  "atlas core",
  "atlas",
  "atlas pro",
  "atlas ultra",
  "atlas fleet",
  "atlas response",
] as const;

export function isAtlasHardware(product: CatalogProduct) {
  return (
    product.segmentId === "atlas" &&
    (product.groupName === "consumer systems" ||
      product.groupName === "enterprise systems")
  );
}

export const atlasFit: Record<
  string,
  { role: string; idealFor: string; service: string }
> = {
  "atlas core": {
    role: "Essential retrofit",
    idealFor: "Older and mainstream vehicles",
    service: "connect, assist, limited pilot",
  },
  atlas: {
    role: "Everyday system",
    idealFor: "Most modern personal vehicles",
    service: "connect, assist, pilot, pilot pro",
  },
  "atlas pro": {
    role: "Advanced system",
    idealFor: "City, highway, trail, and premium vehicles",
    service: "Up to pilot max, scout, concierge",
  },
  "atlas ultra": {
    role: "Bespoke system",
    idealFor: "Premium vehicles and maximum redundancy",
    service: "Up to pilot ultra, scout pro, concierge",
  },
  "atlas fleet": {
    role: "Commercial deployment",
    idealFor: "Delivery, campus, security, and municipal fleets",
    service: "fleet command and contract services",
  },
  "atlas response": {
    role: "Restricted response system",
    idealFor: "Approved public-safety fleets",
    service: "response network and agency controls",
  },
};

export const atlasComparisonSections: AtlasComparisonSection[] = [
  {
    title: "System fit",
    description: "The role, vehicle fit, and installation commitment.",
    rows: [
      {
        label: "Designed for",
        values: Object.fromEntries(
          Object.entries(atlasFit).map(([model, fit]) => [model, fit.idealFor]),
        ),
      },
      {
        label: "Installation",
        values: {
          "atlas core": "Certified retrofit · 3.5-5 hours",
          atlas: "Certified integration · 5-7 hours",
          "atlas pro": "Multi-sensor integration · 8-12 hours",
          "atlas ultra": "Bespoke studio integration · 2-4 days",
          "atlas fleet": "Fleet-site deployment",
          "atlas response": "Agency integration and commissioning",
        },
      },
      {
        label: "Availability",
        values: {
          "atlas core": "Consumer · coming 2027",
          atlas: "Consumer · coming 2027",
          "atlas pro": "Consumer · coming 2027",
          "atlas ultra": "Invite-only · coming 2027",
          "atlas fleet": "Organization contract",
          "atlas response": "Approved agencies only",
        },
      },
    ],
  },
  {
    title: "Compute + sensing",
    description: "How deeply each system can understand the vehicle and road.",
    rows: [
      {
        label: "Compute",
        values: {
          "atlas core": "vela pulse a9",
          atlas: "vela pulse a9 pro",
          "atlas pro": "vela pulse a9 max",
          "atlas ultra": "Dual vela pulse a9 ultra",
          "atlas fleet": "vela pulse a9 max fleet",
          "atlas response": "Dual vela pulse a9 ultra response",
        },
      },
      {
        label: "Autonomy engine",
        values: {
          "atlas core": "256 TOPS",
          atlas: "512 TOPS",
          "atlas pro": "900 TOPS",
          "atlas ultra": "1,800 TOPS",
          "atlas fleet": "Commercial a9 max platform",
          "atlas response": "Hardened dual-module platform",
        },
      },
      {
        label: "Camera system",
        values: {
          "atlas core": "6 cameras",
          atlas: "9 exterior + cabin awareness",
          "atlas pro": "12 cameras",
          "atlas ultra": "16-camera redundant vision",
          "atlas fleet": "12-camera commercial system",
          "atlas response": "16 cameras + thermal assist",
        },
      },
      {
        label: "Radar",
        values: {
          "atlas core": "1 front 4D radar",
          atlas: "4 surround radar units",
          "atlas pro": "6 short and long-range channels",
          "atlas ultra": "8-zone surround array",
          "atlas fleet": "6-zone surround array",
          "atlas response": "8-zone hardened array",
        },
      },
      {
        label: "LiDAR",
        values: {
          "atlas core": "Not included",
          atlas: "Not standard",
          "atlas pro": "1 front scanner",
          "atlas ultra": "3 scanners · front and rear",
          "atlas fleet": "Optional front scanner",
          "atlas response": "3 scanners · front and rear",
        },
      },
    ],
  },
  {
    title: "Driving capability",
    description:
      "Maximum supported capability. Driver attention, mapped-road coverage, law, weather, and regional approval always apply.",
    rows: [
      {
        label: "Highway",
        values: {
          "atlas core": "Adaptive control and lane centering",
          atlas: "Supported-road supervised pilot",
          "atlas pro": "Hands-free where approved",
          "atlas ultra": "Advanced hands-free and comfort tuning",
          "atlas fleet": "Geofenced commercial pilot modes",
          "atlas response": "Agency-managed assistance",
        },
      },
      {
        label: "City",
        values: {
          "atlas core": "Safety and signal awareness",
          atlas: "Urban arterial assistance",
          "atlas pro": "Supervised city pilot on mapped roads",
          "atlas ultra": "Advanced supervised urban pilot",
          "atlas fleet": "Controlled route and depot automation",
          "atlas response": "Emergency routing and corridor prediction",
        },
      },
      {
        label: "Parking + private spaces",
        values: {
          "atlas core": "Parking visualization",
          atlas: "Automatic parking with eligible plans",
          "atlas pro": "Remote parking and private-lot summon",
          "atlas ultra": "Garage-to-curb and low-speed repositioning",
          "atlas fleet": "Depot arrival and yard movement",
          "atlas response": "Parked perimeter awareness",
        },
      },
      {
        label: "Trail",
        values: {
          "atlas core": "Not supported",
          atlas: "Not supported",
          "atlas pro": "atlas scout",
          "atlas ultra": "atlas scout pro",
          "atlas fleet": "Route-dependent",
          "atlas response": "Mission-dependent",
        },
      },
    ],
  },
  {
    title: "Connection + ownership",
    description: "Network resilience, services, and long-term support.",
    rows: [
      {
        label: "Connectivity",
        values: {
          "atlas core": "5G sub-6, Wi-Fi 7, atlas link",
          atlas: "Wide-band 5G, optional mmWave, atlas link pro",
          "atlas pro": "5G, mmWave, atlas link ultra, satellite",
          "atlas ultra": "Redundant wide-area, local, and satellite links",
          "atlas fleet": "5G, depot sync, optional satellite",
          "atlas response": "5G, mmWave, satellite, agency radio bridge",
        },
      },
      {
        label: "Compatible services",
        values: Object.fromEntries(
          Object.entries(atlasFit).map(([model, fit]) => [model, fit.service]),
        ),
      },
      {
        label: "Hardware support",
        values: {
          "atlas core": "8 years",
          atlas: "8 years",
          "atlas pro": "10 years",
          "atlas ultra": "12 years",
          "atlas fleet": "8 years",
          "atlas response": "12 years with agency contract",
        },
      },
      {
        label: "Safety firmware",
        values: {
          "atlas core": "10 years",
          atlas: "10 years",
          "atlas pro": "12 years",
          "atlas ultra": "12 years",
          "atlas fleet": "Contract software support",
          "atlas response": "Agency contract updates",
        },
      },
    ],
  },
];

export function getAtlasComparisonValue(
  product: CatalogProduct,
  row: AtlasComparisonRow,
) {
  return row.values[product.model] ?? "Not available";
}
