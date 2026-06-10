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

export interface BrandHighlight {
  eyebrow: string;
  title: string;
  description: string;
  media: MediaAsset;
}

export interface CinematicChapter {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  media: MediaAsset;
  tone: "light" | "brand" | "dark";
}

export interface BrandTheme {
  accent: string;
  accentSoft: string;
  ink: string;
  surface: string;
  glow: string;
}

export interface Brand {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  statement: string;
  description: string;
  externalUrl: string;
  theme: BrandTheme;
  hero: MediaAsset;
  highlights: BrandHighlight[];
  chapters: CinematicChapter[];
}
