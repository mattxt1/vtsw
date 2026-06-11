import type { VelaContent } from "../types/content";
import { accessoryGroups } from "./accessories";

export const vela: VelaContent = {
  name: "vela",
  parent: "veritas",
  category: "consumer technology",
  statement: "Technology, in its calmest form.",
  description:
    "Everyday devices designed as one considered system. Simple to understand, quietly powerful, and naturally connected through vOS 26.",
  theme: {
    accent: "#778d9b",
    accentSoft: "#c4d0d5",
    ink: "#252a2d",
    surface: "#e7e8e5",
    glow: "#d7e8ec",
  },
  hero: {
    kind: "scene",
    alt: "A softly floating vela device in a calm mineral space",
  },
  chapters: [
    {
      id: "ecosystem",
      eyebrow: "01 / vOS 26",
      title: "One system, across every screen.",
      body: "vOS 26 runs across the vela lineup with ethos ai intelligence, lattice foundations, and vela pulse silicon. Move between phone, notebook, display, and home without thinking about the handoff.",
      media: {
        kind: "sequence",
        alt: "A vela device smoothly changing between connected forms",
      },
      tone: "brand",
    },
    {
      id: "quiet-power",
      eyebrow: "02 / vela pulse",
      title: "Powerful without the performance.",
      body: "Eighth-generation vela pulse d8 and m8 silicon is produced by veritas fabs and tuned for the hardware and software around it.",
      media: {
        kind: "image",
        alt: "A precise vela pulse processor with a soft illuminated edge",
      },
      tone: "light",
    },
    {
      id: "software",
      eyebrow: "03 / long-term by design",
      title: "Built to stay current.",
      body: "Flagship and organizational devices receive eight years of guaranteed updates, with tailored commitments across the rest of the lineup and vela protect available for added care.",
      media: {
        kind: "image",
        alt: "Layered vela software surfaces moving between screens",
      },
      tone: "dark",
    },
  ],
  products: [
    {
      id: "mobile",
      eyebrow: "mobile",
      name: "phones",
      title: "A phone for every way forward.",
      description:
        "Flagship x series, expressive foldables, accessible a and m models, and purpose-built rugged devices.",
      media: { kind: "image", alt: "A slim vela x26 phone with softened edges" },
      groups: [
        {
          name: "x series",
          models: ["x26 Ultra", "x26 Pro", "x26", "x25 SE", "x25 Edge"],
        },
        {
          name: "foldables",
          models: [
            "Fold Pro",
            "Fold",
            "Flip",
            "Flip SE",
            "Trifold Ultra",
            "Trifold",
          ],
        },
        {
          name: "a series",
          models: ["a9 5G", "a8 5G", "a7 5G"],
        },
        {
          name: "m series",
          models: ["m6 5G", "m5 5G", "m4 5G"],
        },
        {
          name: "r series",
          models: ["r23+", "r23"],
        },
      ],
      note:
        "Trifold Ultra is bespoke and made to order, with 12 years of support and vela protect included.",
    },
    {
      id: "computing",
      eyebrow: "computing",
      name: "tabs + notebooks",
      title: "A complete canvas for work and ideas.",
      description:
        "Premium mobile computing, flexible tablets, and durable organizational editions, all on vOS 26.",
      media: { kind: "image", alt: "A vela notebook and tab arranged in profile" },
      groups: [
        {
          name: "notebook",
          models: [
            "notebook ultra",
            "notebook pro",
            "notebook",
            "notebook SE",
            "notebook lite",
          ],
        },
        {
          name: "tab t series",
          models: [
            "tab t26 Ultra",
            "tab t26+",
            "tab t26",
            "tab t26 SE+",
            "tab t26 SE",
            "tab t26 Lite",
            "tab t25+",
          ],
        },
        {
          name: "organization",
          models: [
            "notebook education edition",
            "notebook enterprise ultra",
            "tab u6+",
            "tab u4",
            "tab t23R",
          ],
        },
      ],
      note:
        "Education and enterprise editions are available directly to organizations.",
    },
    {
      id: "wearables",
      eyebrow: "personal",
      name: "wearables + audio",
      title: "Closer technology, with less noise.",
      description:
        "Health, sound, spatial computing, and precise input designed to stay useful without demanding attention.",
      media: { kind: "image", alt: "vela watch, probuds, ring, and pencil" },
      groups: [
        {
          name: "watch",
          models: ["watch ultra", "watch", "watch SE"],
        },
        {
          name: "probuds",
          models: ["probuds ultra", "probuds", "probuds SE"],
        },
        {
          name: "spatial + health",
          models: ["ring", "XR"],
        },
        {
          name: "pencil",
          models: ["pencil ultra", "pencil pro", "pencil", "pencil u1"],
        },
      ],
      note:
        "vela ring and vela XR remain supported with no successor currently planned. pencil pro remains available through retailers while stock lasts.",
    },
    {
      id: "display",
      eyebrow: "visual",
      name: "tv + display",
      title: "Every screen speaks the same language.",
      description:
        "Premium televisions, projectors, and monitors created for the vela ecosystem and built around vOS.",
      media: { kind: "image", alt: "A floating vela television and display" },
      groups: [
        {
          name: "vela tv",
          models: [
            "tv ultra",
            "tv pro",
            "tv plus",
            "tv SE",
            "tv lite",
            "tv rx26",
            "tv u8",
          ],
        },
        {
          name: "projector",
          models: [
            "projector ultra",
            "projector pro",
            "projector plus",
            "projector lite",
          ],
        },
        {
          name: "display",
          models: [
            "display ultra",
            "display pro",
            "display plus",
            "display SE",
            "display lite",
            "display education edition",
          ],
        },
      ],
      note:
        "vela televisions are premium ecosystem products distinct from the separately marketed legacy vTV range.",
    },
    {
      id: "audio",
      eyebrow: "audio",
      name: "speakers + soundbars",
      title: "Sound that understands the room.",
      description:
        "Connected speakers and home theater audio, tuned to work naturally with vela devices and displays.",
      media: { kind: "image", alt: "A vela home speaker and soundbar" },
      groups: [
        {
          name: "home audio",
          models: ["home speaker pro", "home speaker mini"],
        },
        {
          name: "party speaker",
          models: ["party speaker pro", "party speaker plus", "party speaker SE"],
        },
        {
          name: "soundbar",
          models: ["soundbar ultra", "soundbar pro", "soundbar SE"],
        },
      ],
      note:
        "Select vela soundbars are also supplied as vTV ClearSound 9, 7, and 5 bundles and are not sold separately under those names.",
    },
    {
      id: "accessories",
      eyebrow: "made to fit",
      name: "accessories",
      title: "Every detail, considered together.",
      description:
        "Protection, power, input, connectivity, placement, and personalization designed around the vela devices you use.",
      media: {
        kind: "image",
        alt: "A coordinated collection of vela cases, chargers, bands, docks, and stands",
      },
      groups: accessoryGroups,
      note:
        "Compatibility is shown on every accessory page. Organization, service-installed, and bespoke products remain visible with their appropriate purchase path.",
    },
    {
      id: "platform",
      eyebrow: "foundation",
      name: "software + foundation",
      title: "The systems behind every vela experience.",
      description:
        "lattice frameworks, ethos ai, vOS, custom silicon, and services developed as one connected foundation.",
      media: {
        kind: "image",
        alt: "lattice framework layers connecting vOS, ethos ai, and vela pulse",
      },
      groups: [
        {
          name: "lattice frameworks",
          models: ["lattice 1 mini", "lattice 1", "lattice 1 pro"],
        },
        {
          name: "intelligence + software",
          models: ["ethos ai", "vOS 26"],
        },
        {
          name: "pulse d8",
          models: ["d8 ultra", "d8 max", "d8 pro", "d8"],
        },
        {
          name: "pulse m8",
          models: ["m8 max", "m8 pro", "m8"],
        },
        {
          name: "care",
          models: ["vela protect"],
        },
      ],
      note:
        "lattice is a mostly independent infrastructure team within vela. It replaces the former veritas core framework identity and builds the foundation behind vela software.",
    },
  ],
};
