import type {
  ProductFinish,
  ProductHighlight,
  ProductSpecGroup,
} from "../types/content";

export interface ProductProfile {
  tagline: string;
  description: string;
  highlights: ProductHighlight[];
  specifications: ProductSpecGroup[];
  finishes?: ProductFinish[];
}

type Pair = [label: string, value: string];

const highlights = (...items: Pair[]): ProductHighlight[] =>
  items.map(([value, label]) => ({ value, label }));

const specs = (title: string, ...items: Pair[]): ProductSpecGroup => ({
  title,
  items: items.map(([label, value]) => ({ label, value })),
});

const finishes = (...items: Pair[]): ProductFinish[] =>
  items.map(([name, color]) => ({ name, color }));

const phoneConnectivity: Pair[] = [
  ["Wireless", "Wi-Fi 7, Bluetooth 5.4, UWB 3"],
  ["Mobile", "5G with satellite communication"],
  ["Smart home", "Thread radio"],
];

const standardPhoneFinishes = finishes(
  ["Black", "#252729"],
  ["Starlight Silver", "#d8d5cb"],
  ["Frost Blue", "#aebfca"],
  ["Sage Glass", "#aab6a3"],
  ["Sunset Copper", "#bd7962"],
);

export const productProfiles: Record<string, ProductProfile> = {
  "x26 Ultra": {
    tagline: "The ultimate vela phone.",
    description:
      "A titanium flagship built around vela pulse m8 max, a 1-inch main camera, and the brightest display in the x26 family.",
    highlights: highlights(
      ["Up to 3,800 nits", "tandem OLED display"],
      ["8x optical", "telephoto camera"],
      ["Up to 39 hours", "mixed-use battery"],
      ["72 TOPS", "ethos ai engine"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.86-inch tandem OLED"],
        ["Refresh rate", "Adaptive 1-144Hz"],
        ["Peak brightness", "Up to 3,800 nits"],
      ),
      specs(
        "Camera system",
        ["Main", "50MP 1-inch sensor with variable aperture"],
        ["Additional cameras", "50MP ultrawide, 50MP 3x, 50MP 8x"],
        ["Depth", "LiDAR scanner"],
        ["Video", "Up to 8K at 60 fps or 4K at 240 fps"],
      ),
      specs(
        "Performance",
        ["Chip", "vela pulse m8 max"],
        ["Architecture", "12-core CPU, 18-core GPU"],
        ["Neural engine", "72 TOPS"],
      ),
      specs(
        "Design and power",
        ["Materials", "Grade 5 titanium and ceramic composite"],
        ["Protection", "IP68 and IP6X"],
        ["Battery", "Up to 39 hours mixed use"],
        ["Weight", "226 g"],
      ),
      specs("Connectivity", ...phoneConnectivity),
    ],
    finishes: finishes(
      ["Black Titanium", "#282829"],
      ["Natural Titanium", "#aaa79d"],
      ["Alpine", "#c6cbc7"],
      ["Midnight Green", "#354941"],
      ["Obsidian Violet", "#40384b"],
    ),
  },
  "x26 Pro": {
    tagline: "Professional capability, precisely balanced.",
    description:
      "A compact titanium flagship with a 144Hz OLED canvas, 5x telephoto camera, LiDAR, and pro-grade video tools.",
    highlights: highlights(
      ["Up to 3,500 nits", "OLED display"],
      ["5x optical", "telephoto camera"],
      ["Up to 33 hours", "mixed-use battery"],
      ["58 TOPS", "ethos ai engine"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.48-inch OLED"],
        ["Refresh rate", "Adaptive 1-144Hz"],
        ["Peak brightness", "Up to 3,500 nits"],
      ),
      specs(
        "Camera system",
        ["Cameras", "50MP main, 48MP ultrawide, 48MP 5x telephoto"],
        ["Depth", "LiDAR scanner"],
        ["Front camera", "24MP"],
        ["Video", "Up to 8K at 60 fps, spatial video, and log capture"],
      ),
      specs(
        "Performance and design",
        ["Chip", "High-bin vela pulse m8 pro with 14-core GPU"],
        ["Neural engine", "58 TOPS"],
        ["Materials", "Titanium-aluminum frame and glass"],
        ["Protection", "IP68"],
        ["Weight", "196 g"],
      ),
      specs("Connectivity", ...phoneConnectivity),
    ],
    finishes: finishes(
      ["Graphite", "#393a3b"],
      ["Arctic", "#dce0dd"],
      ["Deep Navy", "#263b4e"],
      ["Forest", "#415044"],
      ["Garnet", "#6f343d"],
    ),
  },
  x26: {
    tagline: "The flagship, distilled.",
    description:
      "The balanced x26 experience pairs a bright adaptive OLED display with capable cameras, all-day endurance, and local vela intelligence.",
    highlights: highlights(
      ["Up to 3,200 nits", "OLED display"],
      ["Up to 8K", "video capture"],
      ["Up to 30 hours", "mixed-use battery"],
      ["58 TOPS", "ethos ai engine"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.36-inch OLED"],
        ["Refresh rate", "Adaptive 1-120Hz"],
        ["Peak brightness", "Up to 3,200 nits"],
      ),
      specs(
        "Camera system",
        ["Cameras", "50MP main and 48MP ultrawide"],
        ["Optical-quality range", "2x sensor crop"],
        ["Front camera", "24MP"],
        ["Video", "Up to 8K at 30 fps or 4K at 120 fps"],
      ),
      specs(
        "Performance and design",
        ["Chip", "vela pulse m8 pro"],
        ["Architecture", "10-core CPU, 12-core GPU"],
        ["Neural engine", "58 TOPS"],
        ["Materials", "Aluminum and glass"],
        ["Protection", "IP68"],
        ["Weight", "181 g"],
      ),
      specs("Connectivity", ...phoneConnectivity),
    ],
    finishes: standardPhoneFinishes,
  },
  "x25 SE": {
    tagline: "A proven flagship, thoughtfully carried forward.",
    description:
      "A familiar compact x-series design with a smooth OLED display, versatile dual-camera system, and full vOS 26 support.",
    highlights: highlights(
      ["Up to 2,000 nits", "OLED display"],
      ["48MP", "main camera"],
      ["Up to 26 hours", "mixed-use battery"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.18-inch OLED"],
        ["Refresh rate", "Adaptive 60-120Hz"],
        ["Peak brightness", "Up to 2,000 nits"],
      ),
      specs(
        "Camera system",
        ["Cameras", "48MP main and 12MP ultrawide"],
        ["Front camera", "16MP"],
        ["Video", "Up to 4K at 60 fps"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7"],
        ["Battery", "Up to 26 hours mixed use"],
        ["Protection", "IP68"],
        ["Weight", "173 g"],
      ),
    ],
    finishes: finishes(
      ["Midnight", "#22272c"],
      ["Silver", "#c9ccca"],
      ["Blue Mist", "#a5b7c5"],
      ["Rose Clay", "#b9857e"],
    ),
  },
  "x25 Edge": {
    tagline: "Flagship technology at its thinnest.",
    description:
      "A remarkably slim x-series phone with a 120Hz OLED display and two high-resolution cameras in a 5.65 mm body.",
    highlights: highlights(
      ["5.65 mm", "thin"],
      ["159 g", "light"],
      ["Up to 2,800 nits", "OLED display"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.62-inch OLED"],
        ["Refresh rate", "120Hz"],
        ["Peak brightness", "Up to 2,800 nits"],
      ),
      specs(
        "Camera system",
        ["Cameras", "50MP main and 48MP ultrawide"],
        ["Telephoto", "Optical-quality sensor crop"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7 pro"],
        ["Thickness", "5.65 mm"],
        ["Weight", "159 g"],
        ["Protection", "IP68"],
      ),
    ],
    finishes: finishes(
      ["Edge Black", "#242628"],
      ["Vapor Silver", "#c5c8c8"],
      ["Ice Blue", "#adbfca"],
    ),
  },
  "Fold Pro": {
    tagline: "A larger canvas, without compromise.",
    description:
      "The most capable vela book-style foldable, with tandem OLED displays, pencil support, m8 max, and a titanium hinge.",
    highlights: highlights(
      ["8.32 inches", "inner tandem OLED"],
      ["Up to 144Hz", "adaptive refresh"],
      ["5x optical", "telephoto camera"],
      ["65W", "wired charging"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Outer", "6.54-inch OLED, up to 144Hz and 3,400 nits"],
        ["Inner", "8.32-inch tandem OLED, up to 144Hz and 2,800 nits"],
        ["Input", "vela pencil support"],
      ),
      specs(
        "Camera system",
        ["Rear", "50MP main, 50MP ultrawide, 50MP 5x telephoto"],
        ["Depth", "Depth sensor"],
        ["Front", "24MP outer and 16MP inner"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 max"],
        ["Battery", "5,680 mAh"],
        ["Charging", "Up to 65W wired and 30W wireless"],
        ["Design", "Titanium hinge, IPX8"],
        ["Weight", "258 g"],
      ),
    ],
    finishes: finishes(
      ["Black", "#252627"],
      ["Desert", "#b7a58f"],
      ["Ink Blue", "#334859"],
      ["Ceramic White", "#e6e4dd"],
    ),
  },
  Fold: {
    tagline: "Your phone, opened into more.",
    description:
      "A refined foldable with an expansive 8.05-inch inner canvas, versatile triple cameras, and familiar x-series performance.",
    highlights: highlights(
      ["8.05 inches", "inner OLED"],
      ["Up to 120Hz", "adaptive refresh"],
      ["Up to 50W", "wired charging"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Outer", "6.42-inch OLED, up to 120Hz and 3,000 nits"],
        ["Inner", "8.05-inch folding OLED, up to 120Hz and 2,400 nits"],
      ),
      specs(
        "Camera system",
        ["Rear", "50MP main, 48MP ultrawide, 12MP 3x telephoto"],
        ["Front", "24MP outer and 12MP inner"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 pro"],
        ["Battery", "5,150 mAh"],
        ["Charging", "Up to 50W wired and 25W wireless"],
        ["Profile", "5.6 mm open, 11.4 mm folded"],
        ["Protection", "IPX8"],
        ["Weight", "241 g"],
      ),
    ],
    finishes: finishes(
      ["Graphite", "#3d3e3e"],
      ["Pearl", "#dad8d0"],
      ["Dusk Blue", "#64798b"],
      ["Olive Gray", "#70756a"],
    ),
  },
  Flip: {
    tagline: "Full-size expression. Half-size form.",
    description:
      "A compact foldable with a spacious cover display, flagship m8 pro performance, and two high-resolution cameras.",
    highlights: highlights(
      ["6.86 inches", "inner OLED"],
      ["4.05 inches", "cover display"],
      ["50MP", "main camera"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Inner", "6.86-inch folding OLED, up to 120Hz and 2,800 nits"],
        ["Cover", "4.05-inch OLED"],
      ),
      specs(
        "Camera system",
        ["Rear", "50MP main and 48MP ultrawide"],
        ["Front", "24MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 pro"],
        ["Battery", "4,420 mAh"],
        ["Charging", "Up to 45W wired and 20W wireless"],
        ["Protection", "IPX8"],
        ["Weight", "188 g"],
      ),
    ],
    finishes: finishes(
      ["Black", "#242628"],
      ["Cream", "#ded8c6"],
      ["Coral", "#d17a68"],
      ["Cloud", "#c5cbd0"],
      ["Lavender", "#a99db8"],
    ),
  },
  "Flip SE": {
    tagline: "The compact foldable, made more accessible.",
    description:
      "A proven folding design with a smooth inner OLED display and a useful cover screen for essentials at a glance.",
    highlights: highlights(
      ["6.7 inches", "inner OLED"],
      ["3.1 inches", "cover display"],
      ["Up to 120Hz", "refresh rate"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Inner", "6.7-inch folding OLED, up to 120Hz"],
        ["Cover", "3.1-inch OLED"],
      ),
      specs(
        "Camera system",
        ["Rear", "48MP main and 12MP ultrawide"],
        ["Front", "16MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7"],
        ["Battery", "3,950 mAh"],
        ["Protection", "IPX8"],
        ["Weight", "184 g"],
      ),
    ],
    finishes: finishes(
      ["Graphite", "#3c3e40"],
      ["Mint", "#a9c1b2"],
      ["Pink", "#d2a7aa"],
      ["Silver", "#c9ccca"],
    ),
  },
  "Trifold Ultra": {
    tagline: "A personal workspace, made to order.",
    description:
      "A bespoke tri-fold built from titanium, ceramic, and sapphire, with a 10.8-inch tandem OLED canvas and the complete Ultra camera system.",
    highlights: highlights(
      ["10.8 inches", "inner tandem OLED"],
      ["Up to 3,000 nits", "inner display"],
      ["8x optical", "telephoto camera"],
      ["12 years", "guaranteed support"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Cover", "6.56-inch OLED, up to 144Hz"],
        ["Inner", "10.8-inch tandem OLED, up to 144Hz and 3,000 nits"],
        ["Surface", "Nano-texture option with vela pencil support"],
      ),
      specs(
        "Camera system",
        ["Main", "50MP 1-inch sensor"],
        ["Additional", "50MP ultrawide, 50MP 3x, 50MP 8x"],
        ["Depth", "LiDAR scanner"],
        ["Front", "24MP outer and 16MP inner"],
      ),
      specs(
        "Core",
        ["Chip", "Ultra-bin vela pulse m8 max"],
        ["Battery", "6,800 mAh"],
        ["Charging", "Up to 80W wired and 30W wireless"],
        ["Materials", "Grade 5 titanium, ceramic, and sapphire"],
        ["Weight", "334 g"],
      ),
      specs(
        "Ownership",
        ["Production", "Bespoke and made to order"],
        ["Care", "vela protect elite included"],
        ["Software", "12 years of guaranteed support"],
      ),
    ],
    finishes: finishes(
      ["Black Ceramic", "#222324"],
      ["Natural Titanium", "#aaa79d"],
      ["Deep Sapphire", "#283d57"],
      ["Forged Bronze", "#8d6650"],
      ["Archer White", "#e8e6df"],
    ),
  },
  Trifold: {
    tagline: "A tablet-sized canvas that still fits your day.",
    description:
      "A limited-production tri-fold with a 10.4-inch inner display, pencil support, and m8 max performance.",
    highlights: highlights(
      ["10.4 inches", "inner OLED"],
      ["5x optical", "telephoto camera"],
      ["6,200 mAh", "battery"],
    ),
    specifications: [
      specs(
        "Displays",
        ["Cover", "6.5-inch OLED, up to 120Hz"],
        ["Inner", "10.4-inch tri-fold OLED, up to 120Hz and 2,400 nits"],
        ["Input", "vela pencil support"],
      ),
      specs(
        "Camera system",
        ["Rear", "50MP main, 48MP ultrawide, 50MP 5x telephoto"],
        ["Front", "24MP outer and 12MP inner"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 max"],
        ["Battery", "6,200 mAh"],
        ["Charging", "Up to 65W wired and 25W wireless"],
        ["Protection", "IPX8"],
        ["Weight", "312 g"],
      ),
    ],
    finishes: finishes(
      ["Carbon", "#303234"],
      ["Natural", "#b4afa3"],
    ),
  },
  "a9 5G": {
    tagline: "Premium essentials, thoughtfully balanced.",
    description:
      "A bright 120Hz OLED phone with a capable 48MP camera, wireless charging, and six years of guaranteed updates.",
    highlights: highlights(
      ["Up to 2,200 nits", "OLED display"],
      ["120Hz", "refresh rate"],
      ["5,000 mAh", "battery"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.55-inch OLED"],
        ["Refresh rate", "120Hz"],
        ["Peak brightness", "Up to 2,200 nits"],
      ),
      specs(
        "Camera",
        ["Rear", "48MP main and 12MP ultrawide"],
        ["Front", "16MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7"],
        ["Battery", "5,000 mAh"],
        ["Charging", "Up to 35W wired and 15W wireless"],
        ["Protection", "IP67"],
        ["Weight", "192 g"],
      ),
    ],
  },
  "a8 5G": {
    tagline: "A clear, connected everyday phone.",
    description:
      "An efficient 5G phone with a 90Hz OLED display, long-lasting battery, and the complete vOS 26 experience.",
    highlights: highlights(
      ["90Hz", "OLED display"],
      ["5,100 mAh", "battery"],
      ["48MP", "main camera"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.45-inch OLED"],
        ["Refresh rate", "90Hz"],
        ["Peak brightness", "Up to 1,600 nits"],
      ),
      specs(
        "Camera",
        ["Rear", "48MP main and 8MP ultrawide"],
        ["Front", "13MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7 lite"],
        ["Battery", "5,100 mAh"],
        ["Charging", "Up to 30W wired"],
        ["Protection", "IP67"],
        ["Weight", "194 g"],
      ),
    ],
  },
  "a7 5G": {
    tagline: "The essentials, with room to grow.",
    description:
      "An approachable OLED phone with smooth 90Hz motion, a 48MP camera, and six years of guaranteed updates.",
    highlights: highlights(
      ["90Hz", "OLED display"],
      ["5,000 mAh", "battery"],
      ["6 years", "guaranteed updates"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.35-inch OLED"],
        ["Refresh rate", "90Hz"],
        ["Peak brightness", "Up to 1,400 nits"],
      ),
      specs(
        "Camera",
        ["Rear", "48MP main and 8MP ultrawide"],
        ["Front", "12MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m6 pro refresh"],
        ["Battery", "5,000 mAh"],
        ["Charging", "Up to 25W wired"],
        ["Protection", "IP54"],
        ["Weight", "187 g"],
      ),
    ],
  },
  "m6 5G": {
    tagline: "More battery. Less barrier.",
    description:
      "A durable entry point to vela with a large 120Hz display, 5G, and a 5,500 mAh battery.",
    highlights: highlights(
      ["120Hz", "display"],
      ["5,500 mAh", "battery"],
      ["50MP", "main camera"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.6-inch LCD"],
        ["Refresh rate", "120Hz"],
        ["Peak brightness", "Up to 1,000 nits"],
      ),
      specs(
        "Camera",
        ["Rear", "50MP main and 5MP secondary"],
        ["Front", "12MP"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m6"],
        ["Battery", "5,500 mAh"],
        ["Charging", "Up to 25W"],
        ["Protection", "IP54"],
        ["Weight", "205 g"],
      ),
    ],
  },
  "m5 5G": {
    tagline: "Everyday 5G, made straightforward.",
    description:
      "A dependable entry-level phone with a smooth 90Hz display, 50MP main camera, and generous battery.",
    highlights: highlights(
      ["90Hz", "display"],
      ["5,200 mAh", "battery"],
      ["50MP", "main camera"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.5-inch LCD"],
        ["Refresh rate", "90Hz"],
      ),
      specs(
        "Camera",
        ["Rear", "50MP main"],
        ["Front", "8MP"],
      ),
      specs(
        "Core",
        ["Battery", "5,200 mAh"],
        ["Charging", "Up to 20W"],
        ["Connectivity", "5G"],
        ["Weight", "204 g"],
      ),
    ],
  },
  "m4 5G": {
    tagline: "A simple way into the vela ecosystem.",
    description:
      "The most accessible vela phone, with 5G, a 90Hz display, and a battery designed to carry the day.",
    highlights: highlights(
      ["90Hz", "display"],
      ["5,000 mAh", "battery"],
      ["48MP", "main camera"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.4-inch LCD"],
        ["Refresh rate", "90Hz"],
      ),
      specs(
        "Camera",
        ["Rear", "48MP main"],
        ["Front", "8MP"],
      ),
      specs(
        "Core",
        ["Battery", "5,000 mAh"],
        ["Charging", "Up to 18W"],
        ["Connectivity", "5G"],
        ["Weight", "208 g"],
      ),
    ],
  },
  "r23+": {
    tagline: "Rugged capability, on a larger canvas.",
    description:
      "The larger r23 pairs an outdoor-ready OLED display with a 6,900 mAh battery and field-focused expansion.",
    highlights: highlights(
      ["6.8 inches", "rugged OLED"],
      ["6,900 mAh", "battery"],
      ["IP69K", "protection"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.8-inch rugged OLED"],
        ["Refresh rate", "120Hz"],
        ["Use", "Glove and wet-touch support"],
        ["Cover", "Sapphire"],
      ),
      specs(
        "Field system",
        ["Rear", "48MP main and 12MP ultrawide"],
        ["Special imaging", "Optional thermal camera"],
        ["Charging", "Up to 45W wired, 15W wireless, pogo pins"],
      ),
      specs(
        "Durability",
        ["Battery", "6,900 mAh"],
        ["Protection", "IP68, IP69K, and MIL-tested"],
        ["Drop rating", "Up to 2 m"],
        ["Weight", "326 g"],
      ),
    ],
  },
  r23: {
    tagline: "Built for work beyond the everyday.",
    description:
      "A field-ready vela phone with wet and glove touch, optional thermal imaging, and a hot-day-sized battery.",
    highlights: highlights(
      ["120Hz", "rugged OLED"],
      ["5,800 mAh", "battery"],
      ["Up to 2 m", "drop rating"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "6.2-inch rugged OLED"],
        ["Refresh rate", "120Hz"],
        ["Use", "Glove and wet-touch support"],
        ["Cover", "Sapphire"],
      ),
      specs(
        "Field system",
        ["Rear", "48MP main and 12MP ultrawide"],
        ["Front", "16MP"],
        ["Special imaging", "Optional thermal camera"],
        ["Charging", "Up to 45W wired, 15W wireless, pogo pins"],
      ),
      specs(
        "Durability",
        ["Chip", "vela pulse m5 rugged"],
        ["Battery", "5,800 mAh"],
        ["Protection", "IP68, IP69K, and MIL-tested"],
        ["Drop rating", "Up to 2 m"],
        ["Weight", "282 g"],
      ),
    ],
  },
  "tab t26 Ultra": {
    tagline: "The ultimate portable vela canvas.",
    description:
      "An expansive tandem OLED tablet with m8 max, low-latency pencil input, LiDAR, and desktop-class connectivity.",
    highlights: highlights(
      ["Up to 14.6 inches", "tandem OLED"],
      ["144Hz", "adaptive refresh"],
      ["Up to 14 hours", "video playback"],
      ["4 ms", "pencil latency"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "Up to 14.6-inch tandem OLED"],
        ["Refresh rate", "Up to 144Hz"],
        ["HDR brightness", "Up to 2,000 nits"],
        ["Input", "vela pencil with 4 ms latency"],
      ),
      specs(
        "Performance",
        ["Chip", "vela pulse m8 max"],
        ["Camera", "50MP main, 12MP ultrawide, LiDAR, 24MP front"],
        ["Connectivity", "Wi-Fi 7, Bluetooth 5.4, UWB 3, USB4"],
      ),
      specs(
        "Design and power",
        ["Battery", "Up to 13,200 mAh"],
        ["Charging", "Up to 65W"],
        ["Playback", "Up to 14 hours video"],
        ["Body", "Aluminum with quad speakers and IP68"],
        ["Weight", "Up to 718 g"],
      ),
    ],
  },
  "tab t26+": {
    tagline: "The familiar vela tablet, with more room.",
    description:
      "A larger OLED tablet for work, entertainment, and pencil input, powered by vela pulse m8 pro.",
    highlights: highlights(
      ["Up to 13 inches", "OLED display"],
      ["120Hz", "refresh rate"],
      ["Up to 10,800 mAh", "battery"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "Up to 13-inch OLED"],
        ["Refresh rate", "120Hz"],
        ["Peak brightness", "Up to 1,600 nits"],
        ["Input", "vela pencil support"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 pro"],
        ["Camera", "24MP main, 12MP ultrawide, 16MP front"],
        ["Battery", "Up to 10,800 mAh"],
        ["Charging", "Up to 45W"],
        ["Body", "Aluminum with four speakers"],
      ),
    ],
  },
  "tab t26": {
    tagline: "A complete everyday canvas.",
    description:
      "A balanced OLED tablet with m8 pro performance, precise pencil support, and the continuity of vOS 26.",
    highlights: highlights(
      ["Up to 13 inches", "OLED display"],
      ["120Hz", "refresh rate"],
      ["Up to 1,600 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "OLED, up to 13 inches across the family"],
        ["Refresh rate", "120Hz"],
        ["Peak brightness", "Up to 1,600 nits"],
        ["Input", "vela pencil support"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 pro"],
        ["Camera", "24MP main, 12MP ultrawide, 16MP front"],
        ["Charging", "Up to 45W"],
        ["Body", "Aluminum with four speakers"],
      ),
    ],
  },
  "tab t26 SE+": {
    tagline: "A proven design, opened wider.",
    description:
      "A large mini-LED vela tablet with m8 performance and pencil support in a familiar, long-lived design.",
    highlights: highlights(
      ["Up to 12.9 inches", "mini-LED display"],
      ["90Hz", "refresh rate"],
      ["Up to 10,200 mAh", "battery"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "Up to 12.9-inch mini-LED"],
        ["Refresh rate", "90Hz"],
        ["Brightness", "Up to 700 nits"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8"],
        ["Camera", "12MP rear and 12MP front"],
        ["Battery", "Up to 10,200 mAh"],
        ["Input", "vela pencil support"],
      ),
    ],
  },
  "tab t26 SE": {
    tagline: "A familiar tablet, ready for vOS 26.",
    description:
      "A refined mini-LED tablet that carries a proven design forward with m8 performance and long-term support.",
    highlights: highlights(
      ["Up to 12.9 inches", "mini-LED family"],
      ["90Hz", "refresh rate"],
      ["vela pulse m8", "performance"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "Mini-LED, up to 12.9 inches across the family"],
        ["Refresh rate", "90Hz"],
        ["Brightness", "Up to 700 nits"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8"],
        ["Camera", "12MP rear and 12MP front"],
        ["Input", "vela pencil support"],
      ),
    ],
  },
  "tab t26 Lite": {
    tagline: "A modern tablet made easy to enter.",
    description:
      "An aluminum 10.8-inch tablet with a smooth 90Hz display, all-day battery, and the complete vela software experience.",
    highlights: highlights(
      ["10.8 inches", "display"],
      ["90Hz", "refresh rate"],
      ["8,400 mAh", "battery"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "10.8-inch LCD"],
        ["Refresh rate", "90Hz"],
        ["Brightness", "Up to 600 nits"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m8 lite"],
        ["Camera", "12MP rear and 12MP front"],
        ["Battery", "8,400 mAh"],
        ["Charging", "Up to 30W"],
        ["Body", "Aluminum"],
      ),
    ],
  },
  "tab t25+": {
    tagline: "A premium OLED canvas, still in the lineup.",
    description:
      "A previous-generation large tablet with a 120Hz OLED display and vela pulse m7, available through select retailers.",
    highlights: highlights(
      ["12.9 inches", "OLED display"],
      ["120Hz", "refresh rate"],
      ["vela pulse m7", "performance"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "12.9-inch OLED"],
        ["Refresh rate", "120Hz"],
      ),
      specs(
        "Core",
        ["Chip", "vela pulse m7"],
        ["Software", "vOS 26"],
        ["Availability", "Select retailers while stock lasts"],
      ),
    ],
  },
  "tab u6+": {
    tagline: "A durable canvas for shared work and learning.",
    description:
      "An organization-only tablet with a reinforced body, long battery life, and managed education and enterprise tools.",
    highlights: highlights(
      ["11.6 inches", "display"],
      ["Up to 14 hours", "battery life"],
      ["Up to 1.5 m", "drop rating"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "11.6-inch LCD"],
        ["Brightness", "Up to 600 nits"],
        ["Refresh rate", "60Hz"],
      ),
      specs(
        "Organization design",
        ["Chip", "vela pulse m8 education"],
        ["Battery", "10,200 mAh, up to 14 hours"],
        ["Protection", "IP54 and up to 1.5 m drop rating"],
        ["Management", "Education and enterprise fleet tools"],
      ),
    ],
  },
  "tab u4": {
    tagline: "Designed for younger learners and longer service.",
    description:
      "A durable organization-only tablet with an integrated protective bumper, antimicrobial surfaces, and managed vOS tools.",
    highlights: highlights(
      ["10.4 inches", "display"],
      ["8,800 mAh", "battery"],
      ["8 years", "guaranteed updates"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "10.4-inch LCD"],
        ["Refresh rate", "60Hz"],
      ),
      specs(
        "Education design",
        ["Chip", "vela pulse m7 education"],
        ["Battery", "8,800 mAh"],
        ["Protection", "Integrated bumper and antimicrobial surfaces"],
        ["Management", "Education fleet tools"],
      ),
    ],
  },
  "tab t23R": {
    tagline: "A rugged tablet built for the field.",
    description:
      "A hot-swappable, glove-ready OLED tablet with the same durable design language as the r23 phone.",
    highlights: highlights(
      ["11.5 inches", "rugged OLED"],
      ["12,000 mAh", "hot-swappable battery"],
      ["IP69K", "protection"],
    ),
    specifications: [
      specs(
        "Display",
        ["Canvas", "11.5-inch rugged OLED"],
        ["Refresh rate", "120Hz"],
        ["Brightness", "Up to 1,200 nits"],
        ["Use", "Glove and wet-touch support"],
      ),
      specs(
        "Field system",
        ["Chip", "vela pulse m5 rugged"],
        ["Battery", "12,000 mAh, hot-swappable"],
        ["Protection", "IP68, IP69K, and MIL-tested"],
      ),
    ],
  },
  "notebook ultra": {
    tagline: "The most capable portable vela.",
    description:
      "A no-compromise creative workstation with up to d8 ultra performance, a tandem OLED display, and extensive pro connectivity.",
    highlights: highlights(
      ["Up to 76-core", "GPU"],
      ["Up to 256GB", "unified memory"],
      ["Up to 16TB", "storage"],
      ["Up to 22 hours", "video playback"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "Up to vela pulse d8 ultra"],
        ["Architecture", "Up to 28-core CPU and 76-core GPU"],
        ["Neural engine", "Up to 144 TOPS"],
        ["Unified memory", "Up to 256GB"],
        ["Storage", "Up to 16TB"],
      ),
      specs(
        "Display",
        ["Canvas", "Up to 16.2-inch tandem OLED"],
        ["Refresh rate", "Up to 144Hz"],
        ["HDR brightness", "Up to 2,000 nits"],
      ),
      specs(
        "Studio",
        ["Camera", "24MP"],
        ["Audio", "Six-speaker system and four-mic array"],
        ["Ports", "Three USB-C 5, HDMI, SD, magnetic power, headphone"],
      ),
      specs(
        "Design and power",
        ["Battery", "Up to 99Wh"],
        ["Playback", "Up to 22 hours video"],
        ["Charging", "Up to 140W"],
        ["Materials", "Aluminum-magnesium, carbon, and vapor chamber"],
        ["Weight", "Up to 2.08 kg"],
      ),
    ],
  },
  "notebook pro": {
    tagline: "Pro performance, ready to travel.",
    description:
      "A sustained-performance notebook with up to d8 max, a precise mini-LED display, and complete professional I/O.",
    highlights: highlights(
      ["Up to 40-core", "GPU"],
      ["Up to 128GB", "unified memory"],
      ["Up to 8TB", "storage"],
      ["Up to 24 hours", "video playback"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "Up to vela pulse d8 max"],
        ["Architecture", "Up to 18-core CPU and 40-core GPU"],
        ["Neural engine", "Up to 96 TOPS"],
        ["Unified memory", "Up to 128GB"],
        ["Storage", "Up to 8TB"],
      ),
      specs(
        "Display",
        ["Canvas", "Up to 16.1-inch mini-LED"],
        ["Refresh rate", "Up to 120Hz"],
        ["HDR brightness", "Up to 1,600 nits"],
      ),
      specs(
        "Studio and power",
        ["Camera", "18MP"],
        ["Ports", "Three USB-C, HDMI, SD, magnetic power, headphone"],
        ["Battery", "Up to 96Wh"],
        ["Playback", "Up to 24 hours video"],
        ["Weight", "Up to 2.12 kg"],
      ),
    ],
  },
  notebook: {
    tagline: "Everything most people need, beautifully balanced.",
    description:
      "A thin OLED notebook with d8 performance, long battery life, and the quiet continuity of vOS 26.",
    highlights: highlights(
      ["Up to 15.3 inches", "OLED display"],
      ["Up to 32GB", "unified memory"],
      ["Up to 4TB", "storage"],
      ["Up to 21 hours", "video playback"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "vela pulse d8"],
        ["Unified memory", "Up to 32GB"],
        ["Storage", "Up to 4TB"],
      ),
      specs(
        "Display",
        ["Canvas", "Up to 15.3-inch OLED"],
        ["Refresh rate", "Up to 90Hz"],
        ["HDR brightness", "Up to 1,200 nits"],
      ),
      specs(
        "Everyday system",
        ["Camera", "16MP"],
        ["Ports", "Two USB-C 4 ports"],
        ["Battery", "Up to 72Wh"],
        ["Playback", "Up to 21 hours video"],
        ["Weight", "Up to 1.48 kg"],
      ),
    ],
  },
  "notebook SE": {
    tagline: "A proven notebook, refined for another generation.",
    description:
      "A compact, efficient vela notebook with a familiar design, strong battery life, and full vOS continuity.",
    highlights: highlights(
      ["13.3 inches", "display"],
      ["Up to 24GB", "unified memory"],
      ["Up to 2TB", "storage"],
      ["Up to 19 hours", "video playback"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "Efficiency-tuned vela pulse d8"],
        ["Unified memory", "Up to 24GB"],
        ["Storage", "Up to 2TB"],
      ),
      specs(
        "Everyday system",
        ["Display", "13.3-inch LCD, up to 500 nits"],
        ["Camera", "12MP"],
        ["Battery", "56Wh, up to 19 hours video"],
        ["Weight", "1.25 kg"],
      ),
    ],
  },
  "notebook lite": {
    tagline: "The easiest way into vela computing.",
    description:
      "A light, compact notebook with modern d8 efficiency and the complete connected vOS 26 experience.",
    highlights: highlights(
      ["12.8 inches", "display"],
      ["Up to 16GB", "unified memory"],
      ["Up to 1TB", "storage"],
      ["Up to 16 hours", "video playback"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "vela pulse d8 lite"],
        ["Unified memory", "Up to 16GB"],
        ["Storage", "Up to 1TB"],
      ),
      specs(
        "Everyday system",
        ["Display", "12.8-inch LCD, up to 450 nits"],
        ["Battery", "48Wh, up to 16 hours video"],
        ["Weight", "1.14 kg"],
      ),
    ],
  },
  "notebook education edition": {
    tagline: "Built to learn, share, repair, and repeat.",
    description:
      "An organization-only notebook based on notebook SE, reinforced for classrooms and designed for long managed service.",
    highlights: highlights(
      ["13.3 inches", "reinforced display"],
      ["Up to 512GB", "storage"],
      ["8 years", "guaranteed updates"],
    ),
    specifications: [
      specs(
        "Learning system",
        ["Chip", "vela pulse d8 education"],
        ["Display", "13.3-inch reinforced LCD"],
        ["Storage", "Up to 512GB"],
        ["Input", "Spill-resistant keyboard"],
      ),
      specs(
        "Service design",
        ["Structure", "Reinforced hinge and chassis"],
        ["Management", "Asset tracking and education fleet tools"],
        ["Repair", "Organization-focused repair program"],
      ),
    ],
  },
  "notebook enterprise ultra": {
    tagline: "A managed workstation for sensitive work.",
    description:
      "A high-performance enterprise notebook with hardware privacy controls, managed boot, cellular connectivity, and long service.",
    highlights: highlights(
      ["Up to 128GB", "unified memory"],
      ["Up to 8TB", "storage"],
      ["120Hz", "mini-LED display"],
      ["8 years", "guaranteed updates"],
    ),
    specifications: [
      specs(
        "Performance",
        ["Chip", "Up to vela pulse d7 ultra"],
        ["Unified memory", "Up to 128GB"],
        ["Storage", "Up to 8TB"],
        ["Display", "16-inch mini-LED, up to 120Hz"],
      ),
      specs(
        "Enterprise",
        ["Privacy", "Hardware camera and microphone switch"],
        ["Security", "Removable secure enclave and managed boot"],
        ["Connectivity", "Optional 5G and smart-card support"],
        ["Management", "Enterprise deployment and fleet controls"],
      ),
    ],
  },
  "watch ultra": {
    tagline: "The most capable vela watch.",
    description:
      "A titanium adventure watch with micro-LED clarity, satellite communication, precision sensors, and multi-day endurance.",
    highlights: highlights(
      ["Up to 4,000 nits", "micro-LED display"],
      ["Up to 96 hours", "low-power use"],
      ["40 m", "dive support"],
    ),
    specifications: [
      specs(
        "Display and design",
        ["Case", "49 mm titanium"],
        ["Display", "1.98-inch micro-LED, up to 120Hz"],
        ["Brightness", "Up to 4,000 nits"],
        ["Cover", "Sapphire"],
        ["Weight", "64 g"],
      ),
      specs(
        "Health and adventure",
        ["Sensors", "Heart rate, ECG, blood oxygen, temperature"],
        ["Navigation", "Precision GPS, barometer, and compass"],
        ["Safety", "Siren, fall detection, and satellite communication"],
        ["Water", "Dive support to 40 m"],
      ),
      specs(
        "Power",
        ["Chip", "vela pulse w8 ultra"],
        ["Battery", "Up to 48 hours, or 96 hours in low-power use"],
      ),
    ],
  },
  watch: {
    tagline: "A clearer view of every day.",
    description:
      "A refined health and communication companion with an exceptionally bright OLED display and advanced safety features.",
    highlights: highlights(
      ["Up to 3,000 nits", "OLED display"],
      ["Up to 28 hours", "battery life"],
      ["120Hz", "refresh rate"],
    ),
    specifications: [
      specs(
        "Display and design",
        ["Case", "Up to 46 mm, aluminum or steel"],
        ["Display", "OLED, up to 120Hz and 3,000 nits"],
      ),
      specs(
        "Health and safety",
        ["Sensors", "Heart rate, ECG, blood oxygen, and temperature"],
        ["Navigation", "GPS"],
        ["Safety", "Fall and crash detection"],
        ["Control", "Gesture input"],
      ),
      specs(
        "Power",
        ["Chip", "vela pulse w8"],
        ["Battery", "Up to 28 hours"],
      ),
    ],
  },
  "watch SE": {
    tagline: "Core health and safety, in a proven design.",
    description:
      "An approachable vela watch with essential health sensing, GPS, and the same calm wearable software experience.",
    highlights: highlights(
      ["Up to 1,500 nits", "OLED display"],
      ["Up to 24 hours", "battery life"],
      ["Up to 44 mm", "case"],
    ),
    specifications: [
      specs(
        "Display and design",
        ["Case", "Up to 44 mm"],
        ["Display", "OLED, 60Hz and up to 1,500 nits"],
      ),
      specs(
        "Health and safety",
        ["Sensors", "Heart rate and temperature"],
        ["Navigation", "GPS"],
        ["Safety", "Fall and crash detection"],
        ["Advanced sensors", "ECG and blood oxygen not included"],
      ),
      specs(
        "Power",
        ["Chip", "vela pulse w7"],
        ["Battery", "Up to 24 hours"],
      ),
    ],
  },
  "probuds ultra": {
    tagline: "Every detail, with less of the world in the way.",
    description:
      "Dual-driver wireless earbuds with lossless audio, advanced noise cancellation, spatial sound, and hearing support.",
    highlights: highlights(
      ["Up to 8 hours", "earbud listening"],
      ["Up to 34 hours", "with charging case"],
      ["2.5x stronger", "noise cancellation"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Drivers", "Dual-driver acoustic system"],
        ["Audio", "Lossless playback and personalized spatial audio"],
        ["Listening modes", "Advanced ANC, transparency, conversation awareness"],
        ["Hearing", "Hearing assistance features"],
      ),
      specs(
        "Power and design",
        ["Listening", "Up to 8 hours"],
        ["With case", "Up to 34 hours"],
        ["Protection", "IP57"],
      ),
    ],
  },
  probuds: {
    tagline: "Immersive sound, tuned for every day.",
    description:
      "Comfortable wireless earbuds with active noise cancellation, transparency, and spatial audio across vela devices.",
    highlights: highlights(
      ["Up to 7 hours", "earbud listening"],
      ["Up to 30 hours", "with charging case"],
      ["IP54", "protection"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Listening modes", "Active noise cancellation and transparency"],
        ["Audio", "Personalized spatial audio"],
      ),
      specs(
        "Power and design",
        ["Listening", "Up to 7 hours"],
        ["With case", "Up to 30 hours"],
        ["Protection", "IP54"],
      ),
    ],
  },
  "probuds SE": {
    tagline: "Clear, comfortable sound made simple.",
    description:
      "Straightforward wireless earbuds with adaptive equalization and effortless pairing across the vela ecosystem.",
    highlights: highlights(
      ["Up to 6 hours", "earbud listening"],
      ["Up to 26 hours", "with charging case"],
      ["IP54", "protection"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Tuning", "Adaptive equalization"],
        ["Noise control", "Passive isolation; ANC not included"],
      ),
      specs(
        "Power and design",
        ["Listening", "Up to 6 hours"],
        ["With case", "Up to 26 hours"],
        ["Protection", "IP54"],
      ),
    ],
  },
  ring: {
    tagline: "Health context, quietly close.",
    description:
      "A lightweight titanium ring for sleep, recovery, heart rate, temperature, and activity insights without a screen.",
    highlights: highlights(
      ["Up to 7 days", "battery life"],
      ["Sizes 5-13", "fit range"],
      ["Titanium", "construction"],
    ),
    specifications: [
      specs(
        "Health",
        ["Insights", "Sleep, readiness, and workout tracking"],
        ["Sensors", "Heart rate and skin temperature"],
      ),
      specs(
        "Design",
        ["Material", "Titanium"],
        ["Fit", "Sizes 5-13"],
        ["Battery", "Up to 7 days"],
      ),
    ],
  },
  XR: {
    tagline: "A spatial vela workspace.",
    description:
      "A mixed-reality headset with dual 4K micro-OLED displays, precise eye tracking, and deep integration with vOS.",
    highlights: highlights(
      ["Dual 4K", "micro-OLED displays"],
      ["Up to 120Hz", "refresh rate"],
      ["Up to 512GB", "storage"],
    ),
    specifications: [
      specs(
        "Visual system",
        ["Displays", "Dual 4K micro-OLED"],
        ["Refresh rate", "90Hz or up to 120Hz"],
        ["Tracking", "Eye and hand tracking"],
      ),
      specs(
        "Core",
        ["Processors", "Dual vela pulse m4"],
        ["Storage", "Up to 512GB"],
        ["Software", "vOS 26 for spatial computing"],
        ["Lifecycle", "Maintenance updates; no successor planned"],
      ),
    ],
  },
  "pencil ultra": {
    tagline: "The most natural input for a vela canvas.",
    description:
      "A precision stylus with pressure, tilt, barrel roll, squeeze, haptic feedback, hover, and magnetic charging.",
    highlights: highlights(
      ["4 ms", "supported tablet latency"],
      ["Haptic", "feedback"],
      ["Magnetic", "charging"],
    ),
    specifications: [
      specs(
        "Input",
        ["Drawing", "Pressure, tilt, and barrel-roll sensing"],
        ["Controls", "Squeeze gesture and haptic feedback"],
        ["Preview", "Hover support on compatible displays"],
      ),
      specs(
        "Design",
        ["Charging", "Magnetic pairing and charging"],
        ["Tips", "Replaceable"],
      ),
    ],
  },
  "pencil pro": {
    tagline: "Proven precision for compatible vela tablets.",
    description:
      "A previous-generation magnetic stylus with pressure and tilt sensitivity, available through remaining retail stock.",
    highlights: highlights(
      ["Pressure", "sensitivity"],
      ["Tilt", "sensitivity"],
      ["Magnetic", "charging"],
    ),
    specifications: [
      specs(
        "Input",
        ["Drawing", "Pressure and tilt sensing"],
        ["Charging", "Magnetic pairing and charging"],
        ["Advanced controls", "Haptic and barrel controls not included"],
      ),
      specs(
        "Lifecycle",
        ["Status", "Replaced by pencil ultra"],
        ["Availability", "Select retailers while stock lasts"],
      ),
    ],
  },
  pencil: {
    tagline: "Precise input, simply connected.",
    description:
      "A straightforward USB-C stylus with pressure and tilt sensitivity for writing, sketching, and annotation.",
    highlights: highlights(
      ["Pressure", "sensitivity"],
      ["Tilt", "sensitivity"],
      ["USB-C", "charging"],
    ),
    specifications: [
      specs(
        "Input",
        ["Drawing", "Pressure and tilt sensing"],
        ["Charging", "USB-C"],
        ["Magnetic attachment", "Not included"],
      ),
    ],
  },
  "pencil u1": {
    tagline: "A durable classroom tool.",
    description:
      "An organization-only stylus for u-series tablets, with a tether point, replaceable tip, and simple low-maintenance input.",
    highlights: highlights(
      ["Replaceable", "tip"],
      ["Integrated", "tether point"],
      ["u series", "compatibility"],
    ),
    specifications: [
      specs(
        "Input",
        ["Compatibility", "u-series tablets"],
        ["Pressure sensitivity", "Not included"],
        ["Tip", "Replaceable"],
        ["Retention", "Integrated tether point"],
      ),
      specs(
        "Availability",
        ["Purchase", "Organization bundles only"],
      ),
    ],
  },
  "tv ultra": {
    tagline: "The purest vela picture.",
    description:
      "A premium tandem OLED television with 6K clarity, reference-grade processing, room-aware sound, and complete ecosystem control.",
    highlights: highlights(
      ["Up to 85 inches", "tandem OLED"],
      ["6K", "resolution"],
      ["144Hz", "refresh rate"],
      ["Up to 2,500 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "Tandem OLED, up to 85 inches"],
        ["Resolution", "6K"],
        ["Refresh rate", "Up to 144Hz"],
        ["Peak brightness", "Up to 2,500 nits"],
        ["Color", "12-bit pipeline and professional calibration"],
      ),
      specs(
        "Intelligence and sound",
        ["Chip", "vela pulse m8 max for tv"],
        ["Processing", "AI upscaling and cinema modes"],
        ["Audio", "6.2.2-channel spatial system"],
        ["Room features", "Room tuning and vela soundbar sync"],
      ),
      specs(
        "Design and connection",
        ["Materials", "Aluminum and glass"],
        ["Ports", "Four HDMI and two USB-C"],
        ["Wireless", "Wi-Fi 7, Bluetooth, Thread, and vela continuity"],
      ),
    ],
  },
  "tv pro": {
    tagline: "Brilliant color, built for cinema and play.",
    description:
      "A large-format 6K QD-OLED television with fast 144Hz motion, m8 pro processing, and immersive integrated sound.",
    highlights: highlights(
      ["Up to 98 inches", "QD-OLED"],
      ["6K", "resolution"],
      ["144Hz", "refresh rate"],
      ["Up to 2,200 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "QD-OLED, up to 98 inches"],
        ["Resolution", "6K"],
        ["Refresh rate", "Up to 144Hz"],
        ["Peak brightness", "Up to 2,200 nits"],
      ),
      specs(
        "System",
        ["Chip", "vela pulse m8 pro for tv"],
        ["Audio", "4.2.2-channel spatial system"],
        ["Design", "Precision aluminum enclosure"],
        ["Software", "vOS 26 for tv"],
      ),
    ],
  },
  "tv plus": {
    tagline: "An OLED canvas, at nearly any scale.",
    description:
      "A versatile 5K OLED television family spanning intimate rooms to architectural installations, all on vOS 26.",
    highlights: highlights(
      ["Up to 198 inches", "OLED canvas"],
      ["5K", "resolution"],
      ["120Hz", "refresh rate"],
      ["Up to 1,500 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "OLED, up to 198 inches"],
        ["Resolution", "5K"],
        ["Refresh rate", "Up to 120Hz"],
        ["Peak brightness", "Up to 1,500 nits"],
      ),
      specs(
        "System",
        ["Audio", "4.1-channel integrated system"],
        ["Software", "vOS 26 for tv"],
        ["Continuity", "Shared playback and control with vela devices"],
      ),
    ],
  },
  "tv SE": {
    tagline: "Expansive mini-LED contrast, thoughtfully balanced.",
    description:
      "A 4.5K QD-mini-LED television with dense local dimming, smooth 120Hz motion, and vOS ecosystem features.",
    highlights: highlights(
      ["Up to 198 inches", "QD-mini-LED"],
      ["Up to 12,000", "dimming zones"],
      ["4.5K", "resolution"],
      ["Up to 2,000 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "QD-mini-LED, up to 198 inches"],
        ["Resolution", "4.5K"],
        ["Refresh rate", "Up to 120Hz"],
        ["Peak brightness", "Up to 2,000 nits"],
        ["Local dimming", "Up to 12,000 zones"],
      ),
      specs(
        "System",
        ["Chip", "vela pulse m8 for tv"],
        ["Software", "vOS 26 for tv"],
      ),
    ],
  },
  "tv lite": {
    tagline: "A direct way into the vela living room.",
    description:
      "A premium 4K QD-mini-LED television with bright HDR, smooth motion, and the complete connected vOS experience.",
    highlights: highlights(
      ["Up to 98 inches", "QD-mini-LED"],
      ["4K", "resolution"],
      ["Up to 120Hz", "refresh rate"],
      ["Up to 1,200 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "QD-mini-LED, up to 98 inches"],
        ["Resolution", "4K"],
        ["Refresh rate", "Up to 120Hz"],
        ["Peak brightness", "Up to 1,200 nits"],
      ),
      specs(
        "System",
        ["Chip", "vela pulse m8 lite for tv"],
        ["Software", "vOS 26 for tv"],
      ),
    ],
  },
  "tv rx26": {
    tagline: "A premium vela picture, made for full sun.",
    description:
      "A sealed outdoor 4K television with sustained high brightness, weather resistance, and premium aluminum construction.",
    highlights: highlights(
      ["Up to 85 inches", "outdoor canvas"],
      ["2,500 nits", "sustained brightness"],
      ["IP66", "weather protection"],
    ),
    specifications: [
      specs(
        "Outdoor picture",
        ["Display", "QD-mini-LED, up to 85 inches"],
        ["Resolution", "4K"],
        ["Brightness", "2,500 nits sustained"],
        ["Use", "Full-sun visibility"],
      ),
      specs(
        "Environment",
        ["Protection", "IP66"],
        ["Operating range", "-20 degrees C to 50 degrees C"],
        ["Cooling", "Sealed thermal system"],
        ["Materials", "Premium aluminum enclosure"],
      ),
    ],
  },
  "tv u8": {
    tagline: "A managed display for shared spaces.",
    description:
      "An organization-only 4K television for classrooms, signage, and hospitality, without consumer advertising or tracking.",
    highlights: highlights(
      ["Up to 85 inches", "4K display"],
      ["8 years", "guaranteed updates"],
      ["No ads", "or consumer tracking"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "LED, up to 85 inches"],
        ["Resolution", "4K"],
        ["Refresh rate", "60Hz"],
      ),
      specs(
        "Organization system",
        ["Use", "Classroom, signage, and hospitality"],
        ["Management", "Fleet deployment and remote administration"],
        ["Privacy", "No consumer advertising pipeline"],
        ["Software", "8 years of guaranteed updates"],
      ),
    ],
  },
  "projector ultra": {
    tagline: "A cinema-sized picture, placed close.",
    description:
      "A triple-laser 4K ultra-short-throw projector with rich brightness, wall calibration, and integrated spatial sound.",
    highlights: highlights(
      ["Up to 150 inches", "image"],
      ["3,200 ANSI lumens", "brightness"],
      ["120Hz", "gaming mode"],
    ),
    specifications: [
      specs(
        "Image",
        ["Projection", "Triple-laser 4K ultra-short throw"],
        ["Image size", "Up to 150 inches"],
        ["Brightness", "3,200 ANSI lumens"],
        ["Gaming", "Up to 120Hz"],
        ["Setup", "Automatic wall calibration"],
      ),
      specs(
        "Sound and software",
        ["Audio", "4.2-channel integrated system"],
        ["Software", "vOS 26 for tv"],
      ),
    ],
  },
  "projector pro": {
    tagline: "A clean 4K cinema without the long throw.",
    description:
      "A bright laser ultra-short-throw projector with a large image, low-latency 120Hz mode, and vOS 26 for tv.",
    highlights: highlights(
      ["Up to 130 inches", "image"],
      ["2,500 ANSI lumens", "brightness"],
      ["120Hz", "low-latency mode"],
    ),
    specifications: [
      specs(
        "Image",
        ["Projection", "Laser 4K ultra-short throw"],
        ["Image size", "Up to 130 inches"],
        ["Brightness", "2,500 ANSI lumens"],
        ["Gaming", "Up to 120Hz low-latency mode"],
      ),
      specs(
        "Software",
        ["Platform", "vOS 26 for tv"],
        ["Continuity", "Shared playback and control with vela devices"],
      ),
    ],
  },
  "projector plus": {
    tagline: "A wall-sized canvas you can touch.",
    description:
      "An interactive ultra-short-throw projector with 4K pixel shifting, stylus input, and touch-enabled collaboration.",
    highlights: highlights(
      ["4K", "pixel-shifted image"],
      ["Interactive", "touch input"],
      ["Ultra-short throw", "placement"],
    ),
    specifications: [
      specs(
        "Image and input",
        ["Projection", "Interactive ultra-short throw"],
        ["Resolution", "4K pixel shifting"],
        ["Input", "Stylus and touch interaction"],
      ),
      specs(
        "Software",
        ["Platform", "vOS 26 for tv"],
        ["Use", "Collaboration, learning, and presentation"],
      ),
    ],
  },
  "projector lite": {
    tagline: "A vela screen that can move with you.",
    description:
      "A compact portable projector with a built-in battery, integrated sound, and the same familiar vOS entertainment experience.",
    highlights: highlights(
      ["800 ANSI lumens", "brightness"],
      ["Up to 3 hours", "battery"],
      ["20W", "integrated audio"],
    ),
    specifications: [
      specs(
        "Image",
        ["Resolution", "1080p native with 4K input"],
        ["Brightness", "800 ANSI lumens"],
      ),
      specs(
        "Portable system",
        ["Battery", "Up to 3 hours"],
        ["Audio", "20W integrated speaker"],
        ["Software", "vOS 26 for tv"],
      ),
    ],
  },
  "display ultra": {
    tagline: "Reference clarity for the vela desktop.",
    description:
      "A calibrated 6K tandem OLED monitor with exceptional HDR, high-refresh motion, studio camera, and one-cable notebook connection.",
    highlights: highlights(
      ["32 inches", "tandem OLED"],
      ["6K", "resolution"],
      ["120Hz", "refresh rate"],
      ["Up to 2,000 nits", "HDR brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "32-inch tandem OLED"],
        ["Resolution", "6K"],
        ["Refresh rate", "120Hz"],
        ["HDR brightness", "Up to 2,000 nits"],
        ["Color", "Factory calibrated"],
      ),
      specs(
        "Studio and connection",
        ["Camera", "24MP studio camera"],
        ["Audio", "Six speakers and studio microphones"],
        ["Ports", "USB-C 5, HDMI, DisplayPort, hub, and Ethernet"],
        ["Power delivery", "Up to 140W"],
      ),
    ],
  },
  "display pro": {
    tagline: "OLED precision for creative work.",
    description:
      "A high-refresh 5K QD-OLED professional display with wide color, strong HDR, and a complete desktop connection hub.",
    highlights: highlights(
      ["Up to 32 inches", "QD-OLED"],
      ["5K", "resolution"],
      ["120Hz", "refresh rate"],
      ["Up to 1,600 nits", "HDR brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "QD-OLED, up to 32 inches"],
        ["Resolution", "5K"],
        ["Refresh rate", "120Hz"],
        ["HDR brightness", "Up to 1,600 nits"],
      ),
      specs(
        "Connection",
        ["Ports", "USB-C 5, HDMI, and DisplayPort"],
        ["Power delivery", "Up to 96W"],
      ),
    ],
  },
  "display plus": {
    tagline: "5K detail with mini-LED control.",
    description:
      "A sharp 27-inch QD-mini-LED monitor with 120Hz motion and thousands of local dimming zones for focused work.",
    highlights: highlights(
      ["27 inches", "QD-mini-LED"],
      ["5K", "resolution"],
      ["2,304", "dimming zones"],
      ["120Hz", "refresh rate"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "27-inch QD-mini-LED"],
        ["Resolution", "5K"],
        ["Refresh rate", "120Hz"],
        ["HDR brightness", "Up to 1,200 nits"],
        ["Local dimming", "2,304 zones"],
      ),
    ],
  },
  "display SE": {
    tagline: "A clear 4K desktop, thoughtfully balanced.",
    description:
      "A precise QLED monitor with wide P3 color and single-cable USB-C connectivity for a calm everyday workspace.",
    highlights: highlights(
      ["Up to 27 inches", "QLED"],
      ["4K", "resolution"],
      ["Up to 600 nits", "brightness"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "QLED, up to 27 inches"],
        ["Resolution", "4K"],
        ["Refresh rate", "60Hz"],
        ["Brightness", "Up to 600 nits"],
        ["Color", "Wide P3 gamut"],
      ),
      specs(
        "Connection",
        ["USB-C power delivery", "Up to 65W"],
      ),
    ],
  },
  "display lite": {
    tagline: "A modern vela desktop, made approachable.",
    description:
      "A flexible everyday monitor with smooth motion, crisp resolution, and simple USB-C notebook connection.",
    highlights: highlights(
      ["Up to 27 inches", "display"],
      ["Up to 4K", "resolution"],
      ["Up to 100Hz", "refresh rate"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "LED, up to 27 inches"],
        ["Resolution", "Up to 4K"],
        ["Refresh rate", "Up to 100Hz"],
        ["Brightness", "Up to 500 nits"],
      ),
      specs(
        "Connection",
        ["USB-C power delivery", "Up to 45W"],
      ),
    ],
  },
  "display education edition": {
    tagline: "A durable, manageable display for shared spaces.",
    description:
      "An organization-only monitor with an anti-glare surface, replaceable stand, asset tools, and flexible mounting.",
    highlights: highlights(
      ["Up to 27 inches", "display"],
      ["Up to 1440p", "resolution"],
      ["8 years", "organizational support"],
    ),
    specifications: [
      specs(
        "Picture",
        ["Display", "LED, up to 27 inches"],
        ["Resolution", "Up to 1440p"],
        ["Refresh rate", "60Hz"],
        ["Surface", "Anti-glare"],
      ),
      specs(
        "Organization design",
        ["Management", "Fleet and asset tools"],
        ["Service", "Replaceable stand"],
        ["Mounting", "VESA compatible"],
      ),
    ],
  },
  "home speaker pro": {
    tagline: "Room-filling sound that tunes itself.",
    description:
      "A high-fidelity connected speaker with spatial audio, automatic room tuning, and flexible home theater roles.",
    highlights: highlights(
      ["6 drivers", "acoustic system"],
      ["Wi-Fi 7", "wireless audio"],
      ["8-10 years", "home software updates"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Drivers", "One woofer and five tweeters"],
        ["Processing", "Automatic room tuning and spatial audio"],
        ["Pairing", "Stereo pair or rear-channel mode"],
      ),
      specs(
        "Core and connection",
        ["Chip", "vela pulse h8"],
        ["Wireless", "Wi-Fi 7, Bluetooth, Thread, and UWB"],
        ["Dimensions", "168 x 142 mm"],
        ["Weight", "2.4 kg"],
      ),
    ],
  },
  "home speaker mini": {
    tagline: "Natural vela sound, in every room.",
    description:
      "A compact connected speaker with room-aware tuning, stereo pairing, and simple control through vOS for home.",
    highlights: highlights(
      ["360 degrees", "room-aware sound"],
      ["410 g", "weight"],
      ["Wi-Fi", "connected audio"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Drivers", "Full-range driver with dual passive radiators"],
        ["Processing", "Automatic room tuning"],
        ["Pairing", "Stereo pair support"],
      ),
      specs(
        "Design",
        ["Dimensions", "88 x 98 mm"],
        ["Weight", "410 g"],
        ["Software", "vOS 26 for home"],
      ),
    ],
  },
  "party speaker pro": {
    tagline: "Big sound, built to go outside.",
    description:
      "A powerful battery speaker with reactive lighting, microphone and instrument inputs, karaoke tools, and replaceable power.",
    highlights: highlights(
      ["240W", "output"],
      ["Up to 24 hours", "battery"],
      ["IP67", "protection"],
    ),
    specifications: [
      specs(
        "Sound and performance",
        ["Output", "240W"],
        ["Drivers", "Dual woofers with high-frequency array"],
        ["Inputs", "Microphone and guitar"],
        ["Features", "Karaoke controls and reactive lighting"],
      ),
      specs(
        "Portable design",
        ["Battery", "Up to 24 hours, replaceable"],
        ["Protection", "IP67"],
      ),
    ],
  },
  "party speaker plus": {
    tagline: "A complete party system, easier to carry.",
    description:
      "A weather-ready connected speaker with powerful sound, reactive lighting, and all-day battery life.",
    highlights: highlights(
      ["140W", "output"],
      ["Up to 20 hours", "battery"],
      ["IP67", "protection"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Output", "140W"],
        ["Features", "Reactive lighting and party linking"],
      ),
      specs(
        "Portable design",
        ["Battery", "Up to 20 hours"],
        ["Protection", "IP67"],
      ),
    ],
  },
  "party speaker SE": {
    tagline: "Connected sound for smaller gatherings.",
    description:
      "A straightforward portable speaker with strong output, useful weather protection, and long battery life.",
    highlights: highlights(
      ["80W", "output"],
      ["Up to 16 hours", "battery"],
      ["IP54", "protection"],
    ),
    specifications: [
      specs(
        "Sound",
        ["Output", "80W"],
        ["Connection", "Bluetooth and vela device handoff"],
      ),
      specs(
        "Portable design",
        ["Battery", "Up to 16 hours"],
        ["Protection", "IP54"],
      ),
    ],
  },
  "soundbar ultra": {
    tagline: "A complete spatial theater, precisely synchronized.",
    description:
      "A flagship 9.1.4-channel system with wireless subwoofer and rear speakers, room tuning, and lossless vela audio.",
    highlights: highlights(
      ["9.1.4 channel", "spatial audio"],
      ["4 pieces", "complete system"],
      ["Lossless", "wireless audio"],
    ),
    specifications: [
      specs(
        "Sound",
        ["System", "9.1.4-channel soundbar, subwoofer, and rear speakers"],
        ["Processing", "Room tuning and dialogue enhancement"],
        ["Sync", "Acoustic synchronization with compatible vela tv"],
        ["Wireless", "Lossless vela audio"],
      ),
      specs(
        "Connection",
        ["HDMI", "eARC plus two passthrough inputs"],
        ["Wireless", "Wi-Fi 7, Bluetooth, and Thread"],
      ),
    ],
  },
  "soundbar pro": {
    tagline: "Immersive home theater, cleanly composed.",
    description:
      "A 5.1.2-channel soundbar system with wireless subwoofer, room-aware processing, and optional rear expansion.",
    highlights: highlights(
      ["5.1.2 channel", "spatial audio"],
      ["Wireless", "subwoofer"],
      ["Optional", "rear speakers"],
    ),
    specifications: [
      specs(
        "Sound",
        ["System", "5.1.2-channel soundbar with wireless subwoofer"],
        ["Expansion", "Optional wireless rear speakers"],
        ["Processing", "Room tuning and dialogue enhancement"],
      ),
      specs(
        "Connection",
        ["TV", "HDMI eARC and vela tv synchronization"],
        ["Wireless", "Wi-Fi and Bluetooth"],
      ),
    ],
  },
  "soundbar SE": {
    tagline: "Clearer television sound, simply connected.",
    description:
      "A compact 3.1-channel soundbar with focused dialogue, virtual surround processing, and optional bass expansion.",
    highlights: highlights(
      ["3.1 channel", "sound"],
      ["Virtual", "surround"],
      ["Optional", "wireless subwoofer"],
    ),
    specifications: [
      specs(
        "Sound",
        ["System", "3.1-channel soundbar"],
        ["Processing", "Dialogue enhancement and virtual surround"],
        ["Expansion", "Optional wireless subwoofer"],
      ),
      specs(
        "Connection",
        ["TV", "HDMI eARC"],
        ["Wireless", "Bluetooth"],
      ),
    ],
  },
  "d8 ultra": {
    tagline: "Maximum vela performance for portable workstations.",
    description:
      "The flagship 2.5 nm desktop-class vela pulse design, built for intensive creative, engineering, and ethos ai workflows.",
    highlights: highlights(
      ["28-core", "CPU"],
      ["76-core", "GPU"],
      ["144 TOPS", "neural engine"],
      ["Up to 256GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "28 cores"],
        ["GPU", "76 cores"],
        ["Neural engine", "144 TOPS"],
        ["Memory bandwidth", "1.1 TB/s"],
        ["Unified memory", "Up to 256GB"],
      ),
    ],
  },
  "d8 max": {
    tagline: "Large-scale performance with exceptional efficiency.",
    description:
      "A high-bandwidth vela pulse chip for demanding pro notebooks, sustained graphics, and local ethos ai processing.",
    highlights: highlights(
      ["18-core", "CPU"],
      ["40-core", "GPU"],
      ["96 TOPS", "neural engine"],
      ["Up to 128GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "18 cores"],
        ["GPU", "40 cores"],
        ["Neural engine", "96 TOPS"],
        ["Memory bandwidth", "640 GB/s"],
        ["Unified memory", "Up to 128GB"],
      ),
    ],
  },
  "d8 pro": {
    tagline: "Professional compute, tuned as one system.",
    description:
      "A balanced pro-class vela pulse design for creative applications, sustained multitasking, and on-device intelligence.",
    highlights: highlights(
      ["14-core", "CPU"],
      ["24-core", "GPU"],
      ["72 TOPS", "neural engine"],
      ["Up to 64GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "14 cores"],
        ["GPU", "24 cores"],
        ["Neural engine", "72 TOPS"],
        ["Memory bandwidth", "330 GB/s"],
        ["Unified memory", "Up to 64GB"],
      ),
    ],
  },
  d8: {
    tagline: "Everyday desktop-class performance, made efficient.",
    description:
      "The foundation of vela notebooks, combining responsive CPU and graphics performance with a powerful local neural engine.",
    highlights: highlights(
      ["10-core", "CPU"],
      ["12-core", "GPU"],
      ["54 TOPS", "neural engine"],
      ["Up to 32GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "10 cores"],
        ["GPU", "12 cores"],
        ["Neural engine", "54 TOPS"],
        ["Unified memory", "Up to 32GB"],
      ),
    ],
  },
  "m8 max": {
    tagline: "Flagship mobile performance for the largest vela canvases.",
    description:
      "The most capable mobile vela pulse design, built for Ultra phones, foldables, tablets, advanced cameras, and local ethos ai processing.",
    highlights: highlights(
      ["12-core", "CPU"],
      ["18-core", "GPU"],
      ["72 TOPS", "neural engine"],
      ["Up to 32GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "12 cores"],
        ["GPU", "18 cores"],
        ["Neural engine", "72 TOPS"],
        ["Unified memory", "Up to 32GB"],
      ),
      specs(
        "Media and connection",
        ["Video engines", "Dual 8K at 60 fps"],
        ["Wireless", "5G Pro, Wi-Fi 7, Bluetooth 5.4, and UWB 3"],
      ),
    ],
  },
  "m8 pro": {
    tagline: "Pro mobile performance, deeply integrated.",
    description:
      "A high-performance mobile system on a chip for flagship phones and tablets, with advanced imaging and local intelligence.",
    highlights: highlights(
      ["10-core", "CPU"],
      ["12-core", "GPU"],
      ["58 TOPS", "neural engine"],
      ["Up to 24GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "10 cores"],
        ["GPU", "12 cores"],
        ["Neural engine", "58 TOPS"],
        ["Unified memory", "Up to 24GB"],
      ),
      specs(
        "Imaging and connection",
        ["Image processor", "Triple ISP with RAW pipeline"],
        ["Wireless", "5G Pro, Wi-Fi 7, Bluetooth 5.4, and UWB 3"],
      ),
    ],
  },
  m8: {
    tagline: "The efficient heart of the vela mobile ecosystem.",
    description:
      "An eighth-generation mobile system on a chip balancing responsive performance, advanced imaging, connectivity, and battery life.",
    highlights: highlights(
      ["8-core", "CPU"],
      ["8-core", "GPU"],
      ["42 TOPS", "neural engine"],
      ["Up to 16GB", "unified memory"],
    ),
    specifications: [
      specs(
        "Architecture",
        ["Process", "2.5 nm"],
        ["CPU", "8 cores"],
        ["GPU", "8 cores"],
        ["Neural engine", "42 TOPS"],
        ["Unified memory", "Up to 16GB"],
      ),
      specs(
        "Imaging and connection",
        ["Image processor", "Dual 18-bit ISP"],
        ["Wireless", "5G Pro, Wi-Fi 7, Bluetooth 5.4, and UWB 3"],
      ),
    ],
  },
  "lattice 1 mini": {
    tagline: "The lightest way to build with the vela foundation.",
    description:
      "A compact, approachable lattice framework for smaller tools, prototypes, focused experiences, and teams that need a simple path into vela infrastructure.",
    highlights: highlights(
      ["Lightweight", "framework profile"],
      ["Low complexity", "learning curve"],
      ["Ecosystem-ready", "vela services"],
    ),
    specifications: [
      specs(
        "Framework",
        ["Role", "Lightweight application and tool foundation"],
        ["Best suited for", "Focused experiences, prototypes, and internal tools"],
        ["Approach", "Simple defaults with a smaller framework surface"],
        ["Ecosystem", "Connected to supported vela services and APIs"],
      ),
      specs(
        "Foundation",
        ["Team", "lattice, within vela"],
        ["Capabilities", "UI foundations, APIs, deployment, and security defaults"],
        ["Position", "Entry point to the lattice framework family"],
      ),
    ],
  },
  "lattice 1": {
    tagline: "The standard production framework for vela software.",
    description:
      "The primary lattice framework for dependable production software, combining shared interface foundations, APIs, deployment systems, security layers, and ecosystem services.",
    highlights: highlights(
      ["Production", "framework profile"],
      ["Full-stack", "vela integration"],
      ["Shared", "security + deployment"],
    ),
    specifications: [
      specs(
        "Framework",
        ["Role", "Standard production framework"],
        ["Best suited for", "Production applications, services, and connected experiences"],
        ["Approach", "Balanced capability, maintainability, and developer control"],
        ["Ecosystem", "Deep integration with vOS, vela services, and internal APIs"],
      ),
      specs(
        "Infrastructure",
        ["Interface foundation", "Shared components and interaction systems"],
        ["Delivery", "Integrated build, deployment, and observability tools"],
        ["Security", "Common identity, permissions, and security layers"],
        ["Team", "lattice, a mostly independent infrastructure team within vela"],
      ),
    ],
  },
  "lattice 1 pro": {
    tagline: "Advanced infrastructure for the most demanding vela systems.",
    description:
      "The most powerful and security-focused lattice framework, intended for complex, sensitive, deeply integrated systems where control matters more than ease of use.",
    highlights: highlights(
      ["Advanced", "framework profile"],
      ["Hardened", "security model"],
      ["Maximum", "system control"],
    ),
    specifications: [
      specs(
        "Framework",
        ["Role", "Advanced production and infrastructure framework"],
        ["Best suited for", "Sensitive, complex, high-control systems"],
        ["Approach", "Greater capability and explicit control with a steeper learning curve"],
        ["Ecosystem", "Deep access to supported vela infrastructure and system services"],
      ),
      specs(
        "Security and operations",
        ["Security", "Hardened policy, identity, permissions, and isolation foundations"],
        ["Delivery", "Advanced deployment, observability, and operational tooling"],
        ["APIs", "Expanded infrastructure and service integration"],
        ["Team", "lattice, within vela"],
      ),
    ],
  },
  "ethos ai": {
    tagline: "The native intelligence layer of the vela ecosystem.",
    description:
      "ethos ai combines vOS, vela silicon, and on-device intelligence to make vela products more personal, contextual, capable, private, and fast.",
    highlights: highlights(
      ["On-device", "intelligence first"],
      ["Private", "context processing"],
      ["System-wide", "vela integration"],
    ),
    specifications: [
      specs(
        "Mission",
        ["Purpose", "Make vela devices more personal, contextual, and capable"],
        ["Experience", "Intelligence that feels built in rather than added on"],
        ["Foundation", "vOS context, vela pulse silicon, and native system integration"],
      ),
      specs(
        "Intelligence",
        ["Processing", "On-device first on supported vela pulse hardware"],
        ["Context", "Works across supported apps, devices, and system experiences"],
        ["Privacy", "Designed to minimize unnecessary movement of personal context"],
        ["Performance", "Hardware-aware execution tuned with vOS and vela silicon"],
      ),
      specs(
        "Ecosystem",
        ["Devices", "Integrated across supported vela product categories"],
        ["Software", "Native intelligence services within vOS"],
        ["Infrastructure", "Supported by lattice APIs, security, and deployment foundations"],
      ),
    ],
  },
  "vOS 26": {
    tagline: "One calm system, across every vela device.",
    description:
      "The in-house operating system that unifies identity, apps, media, communication, privacy, and continuity across the full vela ecosystem.",
    highlights: highlights(
      ["One account", "across every device"],
      ["ethos ai", "native intelligence"],
      ["8-12 years", "flagship support range"],
    ),
    specifications: [
      specs(
        "Continuity",
        ["Identity", "Universal vela account"],
        ["Handoff", "Apps, media, files, calls, and clipboard"],
        ["Extended display", "Continuity Display between compatible devices"],
        ["Camera", "Studio Camera from compatible phone or tablet"],
      ),
      specs(
        "Intelligence",
        ["Native layer", "ethos ai across supported system experiences"],
        ["Local processing", "On-device intelligence on supported m8 and d8 Pro, Max, and Ultra chips"],
        ["Broader access", "Private cloud assistance for supported entry and older devices"],
      ),
      specs(
        "Foundation",
        ["Frameworks", "lattice foundations for interfaces, APIs, security, and deployment"],
        ["Silicon", "Closely developed with vela pulse hardware"],
      ),
      specs(
        "Security and management",
        ["Authentication", "Secure enclave and passkeys"],
        ["Privacy", "Granular permissions and privacy-preserving telemetry"],
        ["Households", "Family controls and shared services"],
        ["Organizations", "Enterprise and education deployment"],
      ),
    ],
  },
  "vela protect": {
    tagline: "More certainty when the unexpected happens.",
    description:
      "Optional service coverage for eligible vela devices, with reduced-cost accidental repair, faster replacement, and priority support.",
    highlights: highlights(
      ["Express", "replacement"],
      ["Below 80%", "battery service threshold"],
      ["Priority", "repair access"],
    ),
    specifications: [
      specs(
        "Coverage",
        ["Accidental damage", "Reduced-cost repair for eligible incidents"],
        ["Replacement", "Express replacement service"],
        ["Battery", "Service when retained capacity falls below 80%"],
        ["Repair", "Priority mail-in or store service"],
      ),
      specs(
        "Options",
        ["Mobile devices", "Optional theft and loss coverage"],
        ["Ultra ownership", "vela protect elite included with Trifold Ultra"],
      ),
    ],
  },
};
