export type MediaKind = "image" | "video" | "sequence" | "scene";

export interface MediaAsset {
  kind: MediaKind;
  src?: string;
  poster?: string;
  alt: string;
  aspectRatio?: `${number}/${number}`;
  frameCount?: number;
  framePath?: string;
}

export interface ProductCategory {
  id: string;
  eyebrow: string;
  name: string;
  title: string;
  description: string;
  media: MediaAsset;
  groups: ProductGroup[];
  note?: string;
}

export interface ProductGroup {
  name: string;
  models: string[];
}

export interface CatalogProduct {
  id: string;
  segmentId: string;
  groupName: string;
  model: string;
  displayName: string;
  eyebrow: string;
  tagline: string;
  description: string;
  year?: number;
  platform: string;
  support: string;
  availability: string;
  tier: string;
  media: MediaAsset;
  features: ProductFeature[];
  highlights: ProductHighlight[];
  specifications: ProductSpecGroup[];
  finishes: ProductFinish[];
}

export interface ProductFeature {
  eyebrow: string;
  title: string;
  body: string;
}

export interface ProductHighlight {
  value: string;
  label: string;
}

export interface ProductSpecGroup {
  title: string;
  items: ProductSpec[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFinish {
  name: string;
  color: string;
}

export interface CinematicChapter {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  media: MediaAsset;
  tone: "light" | "brand" | "dark";
}

export interface VelaTheme {
  accent: string;
  accentSoft: string;
  ink: string;
  surface: string;
  glow: string;
}

export interface VelaContent {
  name: string;
  parent: string;
  category: string;
  statement: string;
  description: string;
  theme: VelaTheme;
  hero: MediaAsset;
  products: ProductCategory[];
  chapters: CinematicChapter[];
}
