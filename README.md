# Fieldwork Company Foundation

A tactile, multi-brand company experience built with React, TypeScript, Vite,
Motion, GSAP ScrollTrigger, and progressively enhanced React Three Fiber.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Content

Brand content lives in `src/data/brands.ts` and follows the types in
`src/types/content.ts`. Replace the sample brands and abstract media with final
content without changing route or presentation components.

`CinematicChapter` supports image-style compositions and procedural sequence
scrubbing today. Its `MediaAsset` contract reserves `src`, `poster`,
`frameCount`, and `framePath` for production video and image sequence loaders.

## Motion Responsibilities

- CSS handles material depth, simple states, and decorative transitions.
- Motion handles component entry, page transitions, and UI choreography.
- GSAP ScrollTrigger is loaded only by cinematic chapters for pinning and scrub.
- Three.js is loaded only when a capable browser reaches a `SceneStage`.

Native page scrolling remains intact. Reduced-motion users receive the complete
content as static compositions.

## Performance Budgets

- Initial application JavaScript target: under 180 kB compressed.
- Three.js remains outside the initial route bundle.
- Hero media target: under 500 kB before user interaction.
- Production image sequences should preload the first frame and nearest 6 frames,
  remain under 12 MB total per chapter, and use AVIF or WebP.
- Canvas pixel density is capped at 2; WebGL pixel density is capped at 1.75.
- Animate transforms and opacity wherever possible; avoid layout animation inside
  pinned chapters.

## Deployment

`vercel.json` rewrites all routes to `index.html` so brand URLs work when loaded
directly. The production command is `npm run build` and output directory is
`dist`.
