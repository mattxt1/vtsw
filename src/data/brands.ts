import type { Brand } from "../types/content";

export const brands: Brand[] = [
  {
    slug: "ora",
    name: "Ora",
    monogram: "O",
    category: "Objects for daily rituals",
    statement: "Small rituals, made remarkable.",
    description:
      "Ora makes quiet tools for the first and last minutes of the day. Familiar forms are refined through material, balance, and a little wonder.",
    externalUrl: "https://example.com",
    theme: {
      accent: "#c8583a",
      accentSoft: "#e8b29e",
      ink: "#30241f",
      surface: "#eee1d5",
      glow: "#ffc3a5",
    },
    hero: { kind: "sequence", alt: "An abstract rotating Ora vessel" },
    chapters: [
      {
        id: "ora-form",
        eyebrow: "01 / Form",
        title: "Shaped by the hand.",
        body: "A study in weight, warmth, and the satisfying pause before use.",
        media: { kind: "sequence", alt: "Ora vessel changing through forms" },
        tone: "brand",
      },
      {
        id: "ora-material",
        eyebrow: "02 / Material",
        title: "Made to gather a life.",
        body: "Honest finishes develop character rather than hide the evidence of use.",
        media: { kind: "image", alt: "Close material study" },
        tone: "light",
      },
    ],
    highlights: [
      {
        eyebrow: "Morning",
        title: "The first pour",
        description: "A balanced vessel designed around the tempo of a slow start.",
        media: { kind: "image", alt: "Sculptural morning vessel" },
      },
      {
        eyebrow: "Evening",
        title: "A softer light",
        description: "A portable glow that settles naturally into the room.",
        media: { kind: "scene", alt: "Softly glowing Ora lamp" },
      },
      {
        eyebrow: "Material",
        title: "Better with touch",
        description: "Surfaces selected to patina, soften, and become distinctly yours.",
        media: { kind: "image", alt: "Textured mineral surface" },
      },
    ],
  },
  {
    slug: "morrow",
    name: "Morrow",
    monogram: "M",
    category: "Future-minded pantry",
    statement: "Good food for the days ahead.",
    description:
      "Morrow turns resilient ingredients into vivid pantry staples. Optimistic food, designed for busy tables and a changing planet.",
    externalUrl: "https://example.com",
    theme: {
      accent: "#5f773d",
      accentSoft: "#b8c996",
      ink: "#23301d",
      surface: "#e4e7d4",
      glow: "#d9f095",
    },
    hero: { kind: "image", alt: "Morrow packaging arranged as a still life" },
    chapters: [
      {
        id: "morrow-color",
        eyebrow: "01 / Appetite",
        title: "Color before caution.",
        body: "Sustainable food should feel abundant, generous, and genuinely delicious.",
        media: { kind: "image", alt: "Colorful Morrow pantry objects" },
        tone: "brand",
      },
    ],
    highlights: [
      {
        eyebrow: "Pantry",
        title: "Everyday abundance",
        description: "Flexible staples with bright flavor and a remarkably light footprint.",
        media: { kind: "image", alt: "Morrow pantry jars" },
      },
      {
        eyebrow: "Sourcing",
        title: "Ingredients with a future",
        description: "Crops selected for resilient farms and deeply satisfying food.",
        media: { kind: "image", alt: "Abstract field pattern" },
      },
      {
        eyebrow: "Table",
        title: "Made to be shared",
        description: "The best impact happens when everyone wants another helping.",
        media: { kind: "image", alt: "A colorful shared table" },
      },
    ],
  },
  {
    slug: "common",
    name: "Common",
    monogram: "C",
    category: "Neighborhood spaces",
    statement: "Places worth returning to.",
    description:
      "Common creates welcoming neighborhood rooms for coffee, culture, and unhurried company. Each location belongs to its street.",
    externalUrl: "https://example.com",
    theme: {
      accent: "#3f6480",
      accentSoft: "#9ebdd0",
      ink: "#1d2c35",
      surface: "#dce5e7",
      glow: "#a8dcf1",
    },
    hero: { kind: "image", alt: "A calm Common neighborhood interior" },
    chapters: [
      {
        id: "common-place",
        eyebrow: "01 / Place",
        title: "Designed from the sidewalk in.",
        body: "Every room begins with its neighbors, its light, and the pace of its block.",
        media: { kind: "image", alt: "Architectural shapes and afternoon light" },
        tone: "brand",
      },
    ],
    highlights: [
      {
        eyebrow: "Rooms",
        title: "Easy to enter",
        description: "Warm, legible spaces that feel familiar before the first visit ends.",
        media: { kind: "image", alt: "Common seating area" },
      },
      {
        eyebrow: "Program",
        title: "A reason to linger",
        description: "Small exhibitions, talks, and sounds shaped with local collaborators.",
        media: { kind: "image", alt: "Community event poster wall" },
      },
      {
        eyebrow: "People",
        title: "Built in company",
        description: "Hospitality that remembers the value of being recognized.",
        media: { kind: "image", alt: "People gathering around a table" },
      },
    ],
  },
];

export function getBrand(slug: string | undefined) {
  return brands.find((brand) => brand.slug === slug);
}
