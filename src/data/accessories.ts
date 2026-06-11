import type { ProductFinish } from "../types/content";
import type { ProductProfile } from "./productProfiles";

export interface AccessoryVariant {
  label: string;
  price: number;
  detail?: string;
}

export interface AccessoryDefinition {
  model: string;
  group: string;
  price: number;
  compatibility: string;
  material: string;
  capability: string;
  detail: string;
  finishes: ProductFinish[];
  variants?: AccessoryVariant[];
  organizationOnly?: boolean;
  serviceOnly?: boolean;
  bespoke?: boolean;
}

type AccessorySeed = [
  model: string,
  price: number,
  compatibility: string,
  material: string,
  capability: string,
  detail?: string,
  variants?: AccessoryVariant[],
  flags?: Pick<
    AccessoryDefinition,
    "organizationOnly" | "serviceOnly" | "bespoke"
  >,
];

const palette = {
  black: { name: "vela black", color: "#101113" },
  graphite: { name: "Graphite", color: "#252729" },
  silver: { name: "Arctic Silver", color: "#d8d6ce" },
  starlight: { name: "Starlight", color: "#e8e0d2" },
  white: { name: "Ceramic White", color: "#f2f0ea" },
  blue: { name: "Frost Blue", color: "#b9c9d8" },
  navy: { name: "Dusk Blue", color: "#25364e" },
  sage: { name: "Sage", color: "#aeb9a8" },
  coral: { name: "Coral", color: "#cf5f55" },
  forest: { name: "Forest", color: "#2f4037" },
  titanium: { name: "Natural Titanium", color: "#c8c0b4" },
  orange: { name: "Rescue Orange", color: "#d75b22" },
  district: { name: "District Blue", color: "#496b95" },
  clear: { name: "Clear", color: "#e9f0f0" },
  privacy: { name: "Privacy Tint", color: "#1b1c1e" },
};

const finishSets: Record<string, ProductFinish[]> = {
  protection: [
    palette.black,
    palette.starlight,
    palette.blue,
    palette.sage,
    palette.coral,
  ],
  premium: [
    palette.black,
    palette.graphite,
    palette.titanium,
    palette.navy,
    palette.forest,
  ],
  workspace: [
    palette.graphite,
    palette.silver,
    palette.starlight,
    palette.navy,
  ],
  power: [palette.graphite, palette.white, palette.starlight],
  personal: [
    palette.graphite,
    palette.starlight,
    palette.blue,
    palette.coral,
    palette.sage,
  ],
  field: [palette.black, palette.orange, palette.forest],
  organization: [palette.graphite, palette.district, palette.silver],
};

function finishesFor(model: string, fallback: ProductFinish[]) {
  const value = model.toLowerCase();

  if (
    value.includes("shield") ||
    value.includes("clear") ||
    value.includes("glass") ||
    value.includes("film")
  ) {
    return value.includes("privacy")
      ? [palette.clear, palette.privacy]
      : [palette.clear, palette.graphite];
  }
  if (
    value.includes("classroom") ||
    value.includes("teacher") ||
    value.includes("fleet") ||
    value.includes("secure cable") ||
    value.includes("u4") ||
    value.includes("u6+")
  ) {
    return finishSets.organization;
  }
  if (
    value.includes("field") ||
    value.includes("rugged") ||
    value.includes("holster") ||
    value.includes("vehicle")
  ) {
    return finishSets.field;
  }
  if (
    value.includes("aramid") ||
    value.includes("titanium") ||
    value.includes("leather alternative") ||
    value.includes("trifold") ||
    value.includes("creator cage") ||
    value.includes("dock ultra")
  ) {
    return finishSets.premium;
  }
  return fallback;
}

const variant = (
  label: string,
  price: number,
  detail?: string,
): AccessoryVariant => ({ label, price, detail });

const protection: AccessorySeed[] = [
  ["x26 silicone case", 49, "vela x26", "Soft-touch silicone with microfiber lining", "1.5 m drop protection and magnetic charging", "Raised screen and camera lips with covered aluminum buttons."],
  ["x26 clear case", 49, "vela x26", "Anti-yellowing polycarbonate and flexible TPU", "1.2 m drop protection and magnetic charging", "A clear camera surround keeps the x26 finish visible."],
  ["x26 woven case", 69, "vela x26", "Recycled woven polymer over a rigid shell", "1.5 m drop protection and magnetic charging", "A water-resistant textile finish with aluminum button caps."],
  ["x26 aramid thin case", 79, "vela x26", "Aramid fiber composite", "0.65 mm thin profile", "Minimal bulk with a protected camera edge and magnetic charging."],
  ["x26 shield glass", 39, "vela x26", "9H-class strengthened glass", "Anti-reflective, case-compatible protection", "Includes an alignment tray and oleophobic coating."],
  ["x26 pro silicone case", 49, "vela x26 pro", "Soft-touch silicone with microfiber lining", "1.5 m drop protection and magnetic charging", "A ceramic-coated camera ring and enhanced button tactility."],
  ["x26 pro woven case", 69, "vela x26 pro", "Recycled woven polymer and aluminum controls", "Structured everyday protection", "A water-resistant premium textile surface."],
  ["x26 pro clear case", 49, "vela x26 pro", "Clear polycarbonate with flexible TPU rails", "Magnetic charging compatibility", "Available with graphite or titanium magnetic-ring accents."],
  ["x26 pro aramid case", 89, "vela x26 pro", "Low-profile aramid fiber", "Thin professional protection", "A matte woven finish with a close-fitting inner coating."],
  ["x26 pro shield glass pro", 44, "vela x26 pro", "Anti-reflective strengthened glass", "Tray-guided display protection", "A black alignment border keeps installation precise."],
  ["x26 ultra silicone case", 59, "vela x26 ultra", "Soft-touch silicone and microfiber", "1.8 m drop protection and magnetic charging", "Titanium-toned camera and button hardware."],
  ["x26 ultra woven case", 79, "vela x26 ultra", "Premium woven polymer with titanium controls", "Structured side and camera protection", "Designed around the x26 ultra camera plateau."],
  ["x26 ultra leather alternative case", 99, "vela x26 ultra", "Plant-based coated microfiber composite", "Premium rigid-shell protection", "Patina-resistant with a soft microfiber interior."],
  ["x26 ultra aramid pro case", 109, "vela x26 ultra", "Aramid composite with titanium camera surround", "Thin professional protection", "An open lower rail keeps the profile exceptionally light."],
  ["x26 ultra rugged field case", 119, "vela x26 ultra", "Aramid shell, TPU corners, and aluminum guard", "3.0 m field drop protection", "Includes a port cover and removable lanyard anchor."],
  ["x26 ultra shield glass ultra", 49, "vela x26 ultra", "Anti-reflective strengthened glass", "Case-compatible display protection", "Clear and privacy treatments include an installation tray.", [variant("Clear", 49), variant("Privacy", 59)]],
  ["flip silicone ring case", 69, "vela flip", "Soft-touch silicone with a stainless ring", "Grip and kickstand modes", "A two-piece magnetic-charging-compatible shell."],
  ["flip clear shell", 59, "vela flip", "Anti-yellowing polycarbonate", "Cover-display and edge protection", "A flexible hinge-side cushion keeps the shell compact."],
  ["flip woven grip case", 79, "vela flip", "Woven polymer with aluminum ring grip", "Grip, stand, and scratch protection", "A microfiber lining protects both case halves."],
  ["flip cover glass kit", 34, "vela flip", "Shield glass and foldable polymer film", "Three-surface protection kit", "Includes main-display film, cover glass, and camera glass."],
  ["fold slim shell", 89, "vela fold", "Two-piece polycarbonate with microfiber pads", "Outer-display and camera protection", "A slim shell with magnetic charging compatibility."],
  ["fold hinge guard case", 129, "vela fold", "Shock-absorbing TPU with sliding hinge cover", "2.0 m drop and hinge protection", "Includes an integrated kickstand."],
  ["fold standing woven case", 119, "vela fold", "Woven polymer with aluminum kickstand", "Portrait, landscape, and desk modes", "A premium stand case with magnetic charging."],
  ["fold outer shield glass", 39, "vela fold", "Strengthened shield glass", "Outer-display protection", "Includes a guided installation tray."],
  ["fold inner display service film", 49, "vela fold", "Low-friction foldable polymer", "Factory-installed inner-display protection", "Available through vela service installation only.", undefined, { serviceOnly: true }],
  ["fold pro titanium hinge case", 169, "vela fold pro", "Aramid plates with grade 5 titanium hinge guard", "Hinge protection, stand, and pencil-tip storage", "A professional shell with reduced-efficiency magnetic charging."],
  ["fold pro creator folio", 149, "vela fold pro", "Woven polymer with reinforced folding stand", "Sketch, video call, and document modes", "Includes a pencil loop and document pocket."],
  ["fold pro shield kit", 69, "vela fold pro", "Shield glass, camera glass, and clear rear film", "Complete exterior protection", "Includes a hinge-cleaning kit for installation."],
  ["trifold travel shell", 199, "vela trifold", "Aramid shell with titanium hinge-side bumper", "Three-panel travel protection", "Adds kickstand use with open-panel magnetic charging."],
  ["trifold studio folio", 249, "vela trifold", "Leather alternative with titanium reinforcement", "Sketch, desk, and presentation modes", "Includes a magnetic pencil rail and document sleeve."],
  ["trifold ultra bespoke folio", 399, "vela trifold ultra", "Made-to-order premium surface with titanium hardware", "Serialized bespoke protection", "Custom fitted during the trifold ultra ownership consultation.", undefined, { bespoke: true }],
  ["a-series silicone case", 34, "vela a9 5G, a8 5G, or a7 5G", "Silicone over a polycarbonate shell", "Everyday fitted protection", "Each a-series size receives its own device-specific shell."],
  ["a-series clear case", 29, "vela a9 5G, a8 5G, or a7 5G", "Clear polycarbonate and flexible TPU", "Low-profile everyday protection", "A clear back with a graphite-ring option."],
  ["a-series shield glass", 24, "vela a9 5G, a8 5G, or a7 5G", "Strengthened clear glass", "Device-specific display protection", "Precisely cut for each current a-series phone."],
  ["m-series impact case", 24, "vela m6 5G, m5 5G, or m4 5G", "Flexible textured TPU", "Grip-focused impact protection", "Raised rails protect the display and camera."],
  ["m-series wallet folio", 34, "vela m6 5G, m5 5G, or m4 5G", "Leather alternative with TPU cradle", "Two-card storage and stand mode", "A magnetic closure keeps the folio composed."],
  ["m-series shield glass", 19, "vela m6 5G, m5 5G, or m4 5G", "Strengthened clear glass", "Entry-device display protection", "A simple case-compatible protective layer."],
];

const tabletAndNotebook: AccessorySeed[] = [
  ["tab t26 ultra keyboard studio", 349, "vela tab t26 ultra", "Aluminum deck, woven cover, and glass haptic trackpad", "Floating hinge and desktop-class input", "Backlit keys, function row, passthrough charging, and pencil clearance.", [variant("12.9-inch", 349), variant("14.6-inch", 399)]],
  ["tab t26 ultra magnetic folio", 119, "vela tab t26 ultra", "Woven polymer with microfiber interior", "Front, back, typing, and viewing protection", "A magnetic attachment array preserves the pencil charging rail.", [variant("12.9-inch", 119), variant("14.6-inch", 139)]],
  ["tab t26 ultra artist cover", 149, "vela tab t26 ultra", "Woven exterior with reinforced sketch hinge", "Drawing and upright reference modes", "Includes pencil storage and removable strap anchors.", [variant("12.9-inch", 149), variant("14.6-inch", 169)]],
  ["tab t26 ultra shield glass", 69, "vela tab t26 ultra", "Strengthened display glass", "Clear, paper-texture, or nano treatment", "Sized for both ultra canvases.", [variant("12.9-inch clear", 69), variant("14.6-inch clear", 89), variant("12.9-inch paper texture", 79), variant("14.6-inch nano anti-reflective", 109)]],
  ["tab t26 keyboard folio", 249, "vela tab t26 or t26+", "Woven cover, aluminum hinge rail, and glass trackpad", "Backlit keyboard and media row", "Magnetic attachment with pencil charging clearance.", [variant("t26", 249), variant("t26+", 299)]],
  ["tab t26 smart folio", 89, "vela tab t26 or t26+", "Woven polymer with microfiber interior", "Magnetic viewing and typing angles", "Protects the front and back without a keyboard.", [variant("t26", 89), variant("t26+", 109)]],
  ["tab t26 shield glass", 49, "vela tab t26 or t26+", "Strengthened display glass", "Clear, paper-texture, or privacy treatment", "Device-specific glass for both sizes.", [variant("t26 clear", 49), variant("t26+ clear", 59), variant("Paper texture", 59), variant("Privacy", 69)]],
  ["tab t26 se folio", 69, "vela tab t26 SE or SE+", "Recycled polyurethane with microfiber interior", "Front, back, typing, and viewing protection", "A familiar lightweight folio.", [variant("SE", 69), variant("SE+", 89)]],
  ["tab t26 se rugged bumper", 79, "vela tab t26 SE or SE+", "Reinforced TPU and polycarbonate", "1.8 m drop protection", "Includes a stand, pencil holder, and optional hand strap.", [variant("SE", 79), variant("SE+", 99)]],
  ["tab t26 lite folio", 59, "vela tab t26 lite", "Polyurethane with microfiber interior", "Typing, viewing, and sleep/wake support", "Includes a simple pencil loop."],
  ["tab t26 lite keyboard cover", 149, "vela tab t26 lite", "Polycarbonate keyboard deck with fabric exterior", "Detachable keyboard and compact trackpad", "USB-C charging keeps the cover independent."],
  ["tab u6+ classroom keyboard case", 119, "vela tab u6+", "Reinforced polymer with spill-resistant keyboard", "1.5 m classroom drop protection", "Replaceable key modules, stylus loop, and asset window.", undefined, { organizationOnly: true }],
  ["tab u4 kids bumper", 39, "vela tab u4", "EVA foam with a hard internal cradle", "Carry handle and kickstand", "A classroom label window supports shared-device fleets.", undefined, { organizationOnly: true }],
  ["classroom charge cart 32", 1499, "Up to 32 vela tablets or notebooks", "Powder-coated steel with locking front door", "Managed charging, cooling, and fleet status", "Lockable casters and cable-managed trays.", undefined, { organizationOnly: true }],
  ["notebook woven sleeve", 69, "vela notebook family", "Recycled woven textile, microfiber, and impact foam", "Magnetic-close everyday protection", "Available for every notebook size.", [variant("13-inch / lite / SE", 69), variant("14-inch", 79), variant("15-inch", 79), variant("16-inch", 89)]],
  ["notebook leather alternative sleeve", 119, "vela notebook family", "Plant-based leather alternative with microfiber", "Premium magnetic-close protection", "A tailored sleeve offered in four notebook sizes.", [variant("13-inch", 119), variant("14-inch", 129), variant("15-inch", 139), variant("16-inch", 149)]],
  ["notebook hard travel shell", 129, "vela notebook family", "Rigid polycarbonate, impact foam, and microfiber", "2.0 m bag-drop protection", "Includes accessory and document storage.", [variant("13/14-inch", 129), variant("15/16-inch", 149)]],
  ["stand", 99, "vela notebooks up to 16-inch", "Recycled aluminum with silicone pads", "Fixed ergonomic lift", "Improves posture and passive airflow."],
  ["stand pro", 179, "vela notebooks up to 16-inch", "Machined aluminum with stainless hinge", "Adjustable height and tilt", "Supports up to 5 kg and folds flat for travel."],
  ["dock pro", 299, "vela notebooks and compatible USB-C devices", "Aluminum with graphite glass status strip", "Multi-display, 2.5Gb Ethernet, and 100W passthrough", "Thunder-class, USB-C, USB-A, HDMI, DisplayPort, SD, and audio connectivity."],
  ["dock ultra", 499, "vela notebook pro and ultra", "Actively cooled machined aluminum", "Dual 6K or single 8K workspace", "10Gb Ethernet, thunder-class, display, storage, audio, and 180W power connectivity."],
];

const watchAndPersonal: AccessorySeed[] = [
  ["sport band", 49, "vela watch and watch SE", "Fluoroelastomer with pin-and-tuck closure", "Sweat-ready everyday fit", "Multiple band lengths cover compact, standard, and ultra wrists."],
  ["sport loop", 49, "vela watch family", "Woven nylon with hook-and-loop closure", "Soft, continuously adjustable fit", "A breathable universal band."],
  ["woven magnetic band", 99, "vela watch family", "Recycled woven textile with embedded magnets", "Clean magnetic closure", "Stainless connector lugs and three wrist lengths."],
  ["titanium link band", 299, "vela watch and watch ultra", "Titanium links with butterfly clasp", "Tool-free removable sizing links", "Natural and black titanium match current watch cases.", [variant("Standard", 299), variant("Ultra 49 mm", 349)]],
  ["alpine band ultra", 99, "vela watch ultra 49 mm and watch 46 mm", "High-strength woven textile with titanium G-hook", "Secure trail-focused fit", "A 46 mm adapter extends compatibility."],
  ["ocean band ultra", 99, "vela watch ultra", "Molded fluoroelastomer with titanium buckle", "Water-focused secure fit", "An extension kit supports wear over equipment."],
  ["watch magnetic fast charger", 29, "vela watch family", "Ceramic magnetic puck and woven USB-C cable", "Compact fast charging", "A one-meter cable is integrated."],
  ["watch travel dock", 49, "vela watch family", "Aluminum and silicone", "Fold-flat nightstand charging", "A magnetic closure protects the charging cradle in transit."],
  ["dual watch charger", 79, "Two vela watches", "Aluminum base with dual ceramic pucks", "Simultaneous family charging", "A 20W USB-C input powers both positions."],
  ["probuds silicone case", 29, "vela probuds family", "Silicone with microfiber contact layer", "Soft everyday case protection", "Includes an aluminum carabiner ring."],
  ["probuds clear case", 24, "vela probuds family", "Clear polycarbonate with flexible hinge", "Low-profile transparent protection", "Available in clear or smoke."],
  ["probuds woven case", 39, "vela probuds family", "Woven polymer over a rigid shell", "Premium pocket protection", "Includes an aluminum carabiner."],
  ["probuds lanyard", 19, "vela probuds cases and compatible loops", "Woven nylon with aluminum clip", "Secure 420 mm carry strap", "Color-matched to the wider accessory palette."],
  ["pencil ultra tip kit", 19, "vela pencil ultra", "Low-friction polymer composite", "Standard, paper-feel, and foldable-display tips", "Four replacement tips cover everyday writing and specialist surfaces."],
  ["pencil ultra pro artist tip kit", 29, "vela pencil ultra", "Precision polymer composite", "Fine-line, paper-feel, and soft tips", "Five tips arrive in a protective storage capsule."],
  ["pencil case", 39, "vela pencil, pencil pro, and pencil ultra", "Aluminum tube with microfiber interior", "Magnetic-close stylus protection", "A slim case for carrying one vela pencil."],
];

const powerAndCharging: AccessorySeed[] = [
  ["20w compact charger", 19, "probuds, watch, m-series, and accessories", "Recycled polycarbonate", "20W USB-C charging", "Foldable prongs keep it compact."],
  ["35w dual charger", 39, "phone, watch, probuds, and light tablet charging", "Recycled polycarbonate", "Dynamic two-port power sharing", "A compact travel charger with foldable prongs."],
  ["45w charger", 49, "x26 family, flip, a-series, and selected tablets", "Recycled polycarbonate", "45W single-port USB-C power", "Sized for everyday phone and tablet charging."],
  ["70w charger", 69, "x26 ultra, foldables, tablets, and lighter notebooks", "Recycled polycarbonate", "70W dual-port USB-C power", "A balanced charger for mixed-device travel."],
  ["100w charger", 89, "vela notebook, notebook pro 14, and tab t26 ultra", "Recycled polycarbonate", "100W three-port USB-C power", "Designed for mobile work kits."],
  ["140w charger", 109, "notebook pro 16, notebook ultra, and dock pro", "Recycled polycarbonate", "140W high-power charging", "Two high-power ports and one accessory port."],
  ["240w desktop power station", 199, "Multi-device desks", "Aluminum top shell with silicone feet", "240W across six USB ports", "Live wattage display, 140W single-port output, and cable groove."],
  ["magnetic charger", 39, "x26 family and vela foldables", "Aluminum puck with soft-touch face", "Up to 30W aligned wireless charging", "A 1.5 m woven USB-C cable is integrated."],
  ["magnetic charging stand", 79, "Magnetic-compatible vela phones", "Aluminum with silicone base", "Portrait, landscape, and standby charging", "Includes a 35W charger."],
  ["magnetic charging pad duo", 99, "vela phone plus watch or probuds", "Aluminum with dual soft-touch surfaces", "Two-device fold-flat charging", "Includes a 45W charger."],
  ["magnetic travel charger trio", 149, "vela phone, watch, and probuds", "Woven exterior with aluminum internal plates", "Three-device fold-flat charging", "Includes a 45W charger."],
  ["magnetic battery", 99, "vela x26 and x26 pro", "Aluminum with soft-touch magnetic face", "5,000 mAh with 15W wireless output", "Battery widgets and passthrough charging integrate with vOS."],
  ["magnetic battery pro", 149, "vela x26 ultra, fold, and trifold", "Aluminum with graphite cooling layer", "10,000 mAh with 25W wireless output", "A kickstand and vOS battery-health communication are built in."],
  ["travel battery 25k", 179, "vela notebooks, tablets, and mobile devices", "Travel-ready reinforced enclosure", "25,000 mAh and 145W total output", "Airline carry-on compliant with a small OLED power display."],
  ["field battery 40k", 299, "r-series, field docks, and emergency kits", "IP54 rugged shell", "40,000 mAh and 240W total output", "Includes 140W USB-C, 12V field power, and an emergency light."],
];

const connectivity: AccessorySeed[] = [
  ["usb-c charge cable 60w", 19, "USB-C vela devices", "Braided woven jacket with aluminum shells", "60W charging and USB 2 data", "Offered in one- and two-meter lengths.", [variant("1 m", 19), variant("2 m", 29)]],
  ["usb-c charge cable 240w", 29, "vela notebooks, docks, and power stations", "Braided woven jacket", "240W e-marked charging", "Offered in one-, two-, and three-meter lengths.", [variant("1 m", 29), variant("2 m", 39), variant("3 m", 49)]],
  ["usb-c pro cable", 49, "High-performance USB-C vela devices", "Active-shielded braided cable", "40Gb/s, 240W, and up to 6K display output", "A professional data and display cable.", [variant("1 m", 49), variant("2 m", 69)]],
  ["thunder-class cable 5", 79, "dock ultra, display ultra, and supported notebooks", "Braided jacket with titanium connector shell", "80Gb/s bidirectional and 120Gb/s display burst", "Carries up to 240W alongside the highest data tier.", [variant("1 m", 79), variant("2 m active", 129)]],
  ["hdmi pro cable", 29, "vela displays, televisions, projectors, and docks", "Braided jacket", "HDMI 2.1b with 4K240 or 8K60", "Variable refresh support across three lengths.", [variant("1.5 m", 29), variant("3 m", 39), variant("5 m active", 79)]],
  ["displayport pro cable", 39, "vela displays and compatible docks", "Braided jacket", "DisplayPort 2.1 high-refresh output", "Designed for 5K and 6K vela displays.", [variant("2 m", 39), variant("3 m", 49)]],
  ["usb-c to hdmi adapter", 39, "USB-C vela devices and HDMI displays", "Aluminum housing with braided cable tail", "4K120 or 8K60 HDR output", "A compact single-purpose display adapter."],
  ["usb-c digital av multiport adapter", 79, "USB-C vela devices", "Aluminum housing", "HDMI, USB-C power/data, and USB-A", "Supports 4K120 and up to 100W passthrough charging."],
];

const homeAndPlacement: AccessorySeed[] = [
  ["remote", 79, "vela tv and supported home experiences", "Aluminum, glass, and silicone", "UWB finding, voice, haptics, and backlit controls", "USB-C rechargeable with a haptic click wheel."],
  ["remote se", 39, "vela tv", "Recycled polycarbonate and rubber", "Straightforward physical control", "AAA powered without UWB or haptics."],
  ["zero-gap wall mount", 149, "vela tv", "Steel with aluminum adjustment rails", "Near-flush mounting with tilt adjustment", "Includes cable routing; selected ultra sizes include the mount.", [variant("32-55-inch", 149), variant("65-85-inch", 249), variant("98-inch+", 599, "Custom installation")]],
  ["articulated wall mount", 199, "vela tv", "Steel arm with aluminum covers", "Extension, tilt, swivel, and safety lock", "Integrated cable routing keeps movement composed.", [variant("32-55-inch", 199), variant("65-85-inch", 299), variant("98-inch", 599)]],
  ["tv pedestal stand pro", 199, "vela tv", "Aluminum column and weighted steel base", "Height adjustment and swivel", "A felt base and hidden cable channel protect the room.", [variant("32-55-inch", 199), variant("65-85-inch", 299)]],
  ["display height/tilt stand", 199, "Compatible vela displays", "Aluminum with steel hinge core", "Height and tilt adjustment", "A quick-release replacement stand."],
  ["display pro stand", 299, "Compatible vela displays", "Machined aluminum with counterbalanced hinge", "Height, tilt, rotation, and portrait mode", "Integrated cable routing supports creative desks."],
  ["display vesa adapter", 49, "Compatible vela displays", "Aluminum plate with steel mounting points", "100 x 100 VESA conversion", "Uses the vela quick-release attachment."],
  ["monitor arm", 249, "Displays up to 12 kg", "Aluminum arm with steel clamp", "Tension-adjustable desk mounting", "Clamp and grommet hardware plus internal cable routing are included."],
  ["calibration camera", 199, "vela displays and televisions", "Aluminum with glass sensor cover", "Display, TV, and ambient-light profiling", "Built for creative users and home-theater installers."],
  ["projector wall screen", 699, "vela and vTV projectors", "Ambient-light-rejecting surface and aluminum frame", "Tensioned fixed projection surface", "Available in three large formats.", [variant("100-inch", 699), variant("120-inch", 899), variant("150-inch", 1499)]],
  ["projector floor rising screen", 1199, "vela and vTV projectors", "Motorized aluminum housing and tensioned screen", "Retractable floor-rising presentation", "Available in 100- and 120-inch sizes.", [variant("100-inch", 1199), variant("120-inch", 1499)]],
  ["projector ceiling mount", 149, "projector lite and vTV portable projector", "Steel with aluminum adjustment plate", "Tilt, swivel, and cable routing", "A compact permanent mounting solution."],
  ["projector ust alignment kit", 79, "vela ultra-short-throw projectors", "Reusable installation tools", "Guided distance, level, and laser alignment", "Includes leveling feet and a wall calibration card."],
  ["home speaker wall mount", 39, "home speaker pro and mini", "Powder-coated aluminum with silicone pads", "Low-profile wall placement", "An adapter ring supports home speaker mini."],
  ["home speaker floor stand", 129, "vela home speakers", "Aluminum column and weighted steel base", "Cable-managed room placement", "Available individually or as a pair.", [variant("Single", 129), variant("Pair", 229)]],
  ["soundbar wall mount", 49, "soundbar SE, pro, and ultra", "Powder-coated steel with isolation pads", "Secure wall placement", "Rubber isolation separates the soundbar from the wall."],
  ["rear speaker stands", 179, "vela rear theater speakers", "Aluminum with weighted steel base", "Height-adjustable pair", "Designed for cable-managed surround placement."],
  ["party speaker battery pack", 99, "party speaker pro and plus", "Gasketed reinforced polymer", "96Wh replaceable power", "Extends portable listening away from an outlet."],
  ["party speaker rolling case", 149, "vela party speakers", "Weather-resistant woven shell and reinforced base", "Rolling transport with organized storage", "Includes cable, accessory, and microphone pockets."],
];

const creatorAndTravel: AccessorySeed[] = [
  ["camera grip", 129, "x26 family and fold outer-camera mode", "Aluminum with silicone grip and magnetic attachment", "Two-stage shutter, zoom, record, and tripod controls", "An internal 1,500 mAh battery supports longer shoots."],
  ["creator cage for x26 ultra", 199, "vela x26 ultra", "Aluminum cage with protected contact rails", "Lens, filter, microphone, tripod, and cable mounting", "A focused rig for mobile production."],
  ["mobile game controller", 129, "x26, a-series, flip, fold, and vela tablets", "Reinforced polymer with aluminum rails", "Hall-effect controls and adaptive haptic triggers", "USB-C direct and Bluetooth modes include passthrough charging."],
  ["notebook controller dock", 179, "vela notebooks and mobile game controller", "Aluminum dock with polymer controller grips", "Controller charging, HDMI 2.1, and low-latency receiver", "USB-C dock mode connects play to a larger display."],
  ["magnetic car mount", 49, "Magnetic-compatible vela phones", "Aluminum arm with silicone vent grip", "15W magnetic charging", "Vent and dash mounting options are included."],
  ["magnetic car mount pro", 89, "x26 ultra and vela foldables", "Aluminum ball-joint arm", "25W charging with stronger magnetic alignment", "Includes adhesive dash and vent mounting hardware."],
  ["travel organizer", 59, "vela chargers, cables, battery, watch, and probuds", "Woven exterior with microfiber and mesh storage", "Organized technology carry", "Includes elastic cable loops and a document pocket."],
  ["travel kit", 199, "Multi-device vela travel", "Coordinated woven travel system", "70W power and three-device charging", "Includes a charger, travel trio, 2 m cable, and organizer."],
];

const organizationAndField: AccessorySeed[] = [
  ["r23 field holster", 79, "vela r23 or r23+", "Reinforced polymer with stainless belt clip", "Belt, MOLLE, and quick-release carry", "Supports screen-in or screen-out field use.", [variant("r23", 79), variant("r23+", 79)]],
  ["r23 vehicle dock", 249, "vela r23 and r23+", "Aluminum plate with pogo-pin cradle", "45W charging, data, and lockable retention", "Includes 12V/24V vehicle power and RAM-mount compatibility.", undefined, { organizationOnly: true }],
  ["r23 desktop dock", 179, "vela r23 and r23+", "Weighted aluminum pogo-pin cradle", "45W charging, Ethernet, and field sync", "A stable service-desk and deployment dock.", undefined, { organizationOnly: true }],
  ["r23 thermal module", 299, "vela r23 and r23+", "Aluminum module with sapphire lens cover", "Rear-rail thermal-assist imaging", "Designed for field and enterprise workflows.", undefined, { organizationOnly: true }],
  ["fleet asset tags", 19, "vela organization device fleets", "Tamper-resistant polymer", "25-pack physical or NFC asset identification", "Supports inventory and deployment workflows.", [variant("Standard 25-pack", 19), variant("NFC 25-pack", 34)], { organizationOnly: true }],
  ["secure cable lock adapter", 39, "vela notebooks, displays, and education docks", "Steel plate with aluminum housing", "Standard cable-lock compatibility", "Attaches through supported USB-C or accessory security points.", undefined, { organizationOnly: true }],
  ["classroom dock", 129, "vela education devices", "Managed classroom enclosure", "65W power, HDMI, Ethernet, USB, and audio", "Includes an asset-management identifier.", undefined, { organizationOnly: true }],
  ["teacher presentation kit", 299, "vela classroom deployments", "Coordinated organization presentation kit", "Docked HDMI presentation and remote control", "Includes classroom dock, adapter, 5 m cable, presenter remote, and pouch.", undefined, { organizationOnly: true }],
  ["rugged tablet hand strap", 49, "tab u6+, tab u4, and tab t23R", "Elastic woven strap with polymer plate", "Rotating one-hand field grip", "Available in graphite or district blue.", undefined, { organizationOnly: true }],
];

function createDefinitions(
  group: string,
  seeds: AccessorySeed[],
  finishes: ProductFinish[],
): AccessoryDefinition[] {
  return seeds.map(
    ([
      model,
      price,
      compatibility,
      material,
      capability,
      detail = "",
      variants,
      flags,
    ]) => ({
      model,
      group,
      price,
      compatibility,
      material,
      capability,
      detail,
      finishes: finishesFor(model, finishes),
      variants,
      ...flags,
    }),
  );
}

export const accessoryDefinitions: AccessoryDefinition[] = [
  ...createDefinitions(
    "cases + protection",
    protection,
    finishSets.protection,
  ),
  ...createDefinitions(
    "tablet + notebook",
    tabletAndNotebook,
    finishSets.workspace,
  ),
  ...createDefinitions(
    "watch + personal",
    watchAndPersonal,
    finishSets.personal,
  ),
  ...createDefinitions(
    "power + charging",
    powerAndCharging,
    finishSets.power,
  ),
  ...createDefinitions(
    "cables + connectivity",
    connectivity,
    finishSets.workspace,
  ),
  ...createDefinitions(
    "home + placement",
    homeAndPlacement,
    finishSets.workspace,
  ),
  ...createDefinitions(
    "creator + travel",
    creatorAndTravel,
    finishSets.premium,
  ),
  ...createDefinitions(
    "organization + field",
    organizationAndField,
    finishSets.field,
  ),
];

export const accessoryGroups = [
  "cases + protection",
  "tablet + notebook",
  "watch + personal",
  "power + charging",
  "cables + connectivity",
  "home + placement",
  "creator + travel",
  "organization + field",
].map((name) => ({
  name,
  models: accessoryDefinitions
    .filter((accessory) => accessory.group === name)
    .map((accessory) => accessory.model),
}));

export const accessoryByModel = new Map(
  accessoryDefinitions.map((accessory) => [accessory.model, accessory]),
);

export const accessoryBasePrices = Object.fromEntries(
  accessoryDefinitions.map((accessory) => [accessory.model, accessory.price]),
);

export const accessoryProfiles: Record<string, ProductProfile> =
  Object.fromEntries(
    accessoryDefinitions.map((accessory) => [
      accessory.model,
      {
        tagline: accessory.capability,
        description: `${accessory.material}, designed for ${accessory.compatibility}. ${accessory.detail}`,
        highlights: [
          { value: accessory.compatibility, label: "compatibility" },
          { value: accessory.material, label: "materials" },
          { value: accessory.capability, label: "capability" },
        ],
        specifications: [
          {
            title: "Compatibility",
            items: [
              { label: "Works with", value: accessory.compatibility },
              {
                label: "Availability",
                value: accessory.organizationOnly
                  ? "Available to organizations"
                  : accessory.serviceOnly
                    ? "Installed by vela service"
                    : accessory.bespoke
                      ? "Made to order"
                      : "Current accessory lineup",
              },
            ],
          },
          {
            title: "Design",
            items: [
              { label: "Materials", value: accessory.material },
              { label: "Primary capability", value: accessory.capability },
              { label: "Details", value: accessory.detail },
            ],
          },
        ],
        finishes: accessory.finishes,
      },
    ]),
  );
