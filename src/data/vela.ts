import type { VelaContent } from "../types/content";

export const vela: VelaContent = {
  name: "vela",
  parent: "veritas",
  category: "consumer technology",
  statement: "Technology, in its calmest form.",
  description:
    "Everyday devices designed as one considered system. Simple to understand, quietly powerful, and naturally connected from the moment you turn them on.",
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
      eyebrow: "01 / one system",
      title: "Everything finds its place.",
      body: "Move from phone to laptop, room to room, or work to rest without thinking about the handoff. vela keeps the pieces in step.",
      media: {
        kind: "sequence",
        alt: "A vela device smoothly changing between connected forms",
      },
      tone: "brand",
    },
    {
      id: "quiet-power",
      eyebrow: "02 / quiet power",
      title: "Powerful without the performance.",
      body: "Fast, capable technology recedes into the background. The interface stays clear. The hardware stays composed. You stay focused on what matters.",
      media: {
        kind: "image",
        alt: "A precise vela device surface with a soft illuminated edge",
      },
      tone: "light",
    },
    {
      id: "software",
      eyebrow: "03 / vela os",
      title: "One language, on every screen.",
      body: "A shared software foundation makes every device familiar. Controls, content, and context arrive where you need them, without making you manage the connection.",
      media: {
        kind: "image",
        alt: "Layered vela software surfaces moving between screens",
      },
      tone: "dark",
    },
  ],
  products: [
    {
      id: "phone",
      eyebrow: "personal",
      name: "phone",
      title: "The center, made lighter.",
      description:
        "A precise everyday companion with a clear interface and a camera that keeps the moment natural.",
      media: { kind: "scene", alt: "A slim vela phone with softened edges" },
    },
    {
      id: "laptop",
      eyebrow: "work",
      name: "laptop",
      title: "Space to think.",
      description:
        "Quiet performance, a generous display, and the things from your other devices already waiting.",
      media: { kind: "image", alt: "An open vela laptop in profile" },
    },
    {
      id: "tablet",
      eyebrow: "create",
      name: "tablet",
      title: "Ideas stay fluid.",
      description:
        "A responsive canvas for reading, making, watching, and moving naturally between them.",
      media: { kind: "image", alt: "A floating vela tablet" },
    },
    {
      id: "watch",
      eyebrow: "wear",
      name: "watch",
      title: "What matters, at a glance.",
      description:
        "Useful context, considered health tools, and fewer reasons to reach for another screen.",
      media: { kind: "image", alt: "A softly rounded vela watch" },
    },
    {
      id: "home",
      eyebrow: "live",
      name: "home",
      title: "A home that understands the room.",
      description:
        "Displays, speakers, and controls that cooperate quietly with the people and spaces around them.",
      media: { kind: "image", alt: "A vela home display and speaker" },
    },
    {
      id: "accessories",
      eyebrow: "complete",
      name: "accessories",
      title: "The small things belong, too.",
      description:
        "Audio, charging, input, and protection designed with the same materials and the same logic.",
      media: { kind: "image", alt: "A collection of vela accessories" },
    },
  ],
};
