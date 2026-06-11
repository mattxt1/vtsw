import type { CatalogProduct } from "../types/content";
import { getProduct } from "./catalog";

const recommendationIds: Record<string, string[]> = {
  "x26 Ultra": [
    "x26-ultra-silicone-case",
    "x26-ultra-shield-glass-ultra",
    "magnetic-charger",
    "camera-grip",
  ],
  "x26 Pro": [
    "x26-pro-silicone-case",
    "x26-pro-shield-glass-pro",
    "magnetic-charging-stand",
    "camera-grip",
  ],
  x26: [
    "x26-silicone-case",
    "x26-shield-glass",
    "magnetic-charger",
    "camera-grip",
  ],
  Fold: [
    "fold-hinge-guard-case",
    "fold-outer-shield-glass",
    "magnetic-battery-pro",
    "camera-grip",
  ],
  "Fold Pro": [
    "fold-pro-titanium-hinge-case",
    "fold-pro-creator-folio",
    "magnetic-battery-pro",
    "camera-grip",
  ],
  Flip: [
    "flip-silicone-ring-case",
    "flip-cover-glass-kit",
    "magnetic-charger",
    "mobile-game-controller",
  ],
  Trifold: [
    "trifold-travel-shell",
    "trifold-studio-folio",
    "magnetic-battery-pro",
    "travel-organizer",
  ],
  "Trifold Ultra": [
    "trifold-ultra-bespoke-folio",
    "magnetic-battery-pro",
    "140w-charger",
    "travel-organizer",
  ],
  "tab t26 Ultra": [
    "tab-t26-ultra-keyboard-studio",
    "tab-t26-ultra-magnetic-folio",
    "tab-t26-ultra-shield-glass",
    "100w-charger",
  ],
  "tab t26": [
    "tab-t26-keyboard-folio",
    "tab-t26-smart-folio",
    "tab-t26-shield-glass",
    "70w-charger",
  ],
  "tab t26+": [
    "tab-t26-keyboard-folio",
    "tab-t26-smart-folio",
    "tab-t26-shield-glass",
    "70w-charger",
  ],
  "tab t26 Lite": [
    "tab-t26-lite-keyboard-cover",
    "tab-t26-lite-folio",
    "45w-charger",
    "usb-c-charge-cable-60w",
  ],
  "watch ultra": [
    "alpine-band-ultra",
    "ocean-band-ultra",
    "watch-magnetic-fast-charger",
    "watch-travel-dock",
  ],
  watch: [
    "sport-band",
    "woven-magnetic-band",
    "watch-magnetic-fast-charger",
    "watch-travel-dock",
  ],
  "watch SE": [
    "sport-band",
    "sport-loop",
    "watch-magnetic-fast-charger",
    "watch-travel-dock",
  ],
};

const groupRecommendations: Record<string, string[]> = {
  "x series": [
    "magnetic-charger",
    "magnetic-battery",
    "35w-dual-charger",
    "mobile-game-controller",
  ],
  foldables: [
    "magnetic-battery-pro",
    "70w-charger",
    "camera-grip",
    "travel-organizer",
  ],
  "a series": [
    "a-series-silicone-case",
    "a-series-shield-glass",
    "45w-charger",
    "mobile-game-controller",
  ],
  "m series": [
    "m-series-impact-case",
    "m-series-shield-glass",
    "20w-compact-charger",
    "travel-organizer",
  ],
  "r series": [
    "r23-field-holster",
    "field-battery-40k",
    "usb-c-charge-cable-240w",
    "travel-organizer",
  ],
  notebook: [
    "notebook-woven-sleeve",
    "stand-pro",
    "dock-pro",
    "100w-charger",
  ],
  organization: [
    "rugged-tablet-hand-strap",
    "classroom-dock",
    "usb-c-charge-cable-60w",
    "secure-cable-lock-adapter",
  ],
  "tab t series": [
    "tab-t26-smart-folio",
    "tab-t26-shield-glass",
    "70w-charger",
    "usb-c-charge-cable-240w",
  ],
  probuds: [
    "probuds-silicone-case",
    "probuds-woven-case",
    "probuds-lanyard",
    "20w-compact-charger",
  ],
  "spatial + health": [
    "travel-organizer",
    "35w-dual-charger",
    "usb-c-charge-cable-60w",
    "magnetic-battery",
  ],
  "vela tv": [
    "remote",
    "zero-gap-wall-mount",
    "hdmi-pro-cable",
    "calibration-camera",
  ],
  projector: [
    "projector-wall-screen",
    "projector-ust-alignment-kit",
    "hdmi-pro-cable",
    "projector-ceiling-mount",
  ],
  display: [
    "display-pro-stand",
    "display-vesa-adapter",
    "displayport-pro-cable",
    "calibration-camera",
  ],
  "home audio": [
    "home-speaker-floor-stand",
    "home-speaker-wall-mount",
    "35w-dual-charger",
    "usb-c-charge-cable-60w",
  ],
  "party speaker": [
    "party-speaker-battery-pack",
    "party-speaker-rolling-case",
    "travel-battery-25k",
    "usb-c-charge-cable-240w",
  ],
  soundbar: [
    "soundbar-wall-mount",
    "hdmi-pro-cable",
    "rear-speaker-stands",
    "calibration-camera",
  ],
};

function notebookRecommendations(product: CatalogProduct) {
  if (!product.model.includes("notebook")) return undefined;

  if (product.tier === "ultra" || product.tier === "pro") {
    return [
      "notebook-woven-sleeve",
      "stand-pro",
      product.tier === "ultra" ? "dock-ultra" : "dock-pro",
      "140w-charger",
    ];
  }

  return groupRecommendations.notebook;
}

export function getAccessoryRecommendations(product: CatalogProduct) {
  if (product.segmentId === "accessories" || product.segmentId === "platform") {
    return [];
  }

  const ids =
    recommendationIds[product.model] ??
    notebookRecommendations(product) ??
    groupRecommendations[product.groupName] ??
    [];

  return ids.flatMap((id) => {
    const accessory = getProduct("accessories", id);
    return accessory ? [accessory] : [];
  });
}
