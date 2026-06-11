# vela

The consumer technology brand of `veritas`. This site presents vela as one
calm, premium ecosystem spanning personal devices, home technology,
accessories, and the software connecting them.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Content

Brand copy, product categories, themes, and cinematic chapters live in
`src/data/vela.ts` and follow the contracts in `src/types/content.ts`.
The catalog is grouped by ecosystem division and product family so yearly model
refreshes can be made in data without changing presentation components.

The current visuals are procedural placeholders. `CinematicChapter` supports
production image sequences and video, while `SceneStage` provides an isolated
React Three Fiber layer for selected device moments.

## Experience Structure

- Hero: vela positioning and the relationship to veritas.
- Ecosystem: scroll-scrubbed connected-device story.
- Products: mobile, computing, wearables, display, audio, and platform families.
- Segment pages: `/products/:segment` showcases each product family.
- Product pages: `/products/:segment/:product` provides cinematic discovery for
  every current model.
- Buy placeholders: `/buy/:segment/:product` intentionally returns the branded
  store 404 until commerce is implemented.
- Continuity: a shared interaction model across devices.
- Software: vOS 26, pulse integration, and long-term support.
- Principles: calm interaction, support commitments, and vela protect.

## Motion Responsibilities

- CSS handles material depth, lighting, simple states, and tactile interaction.
- Motion handles component entry and page transitions.
- GSAP ScrollTrigger is loaded only for pinned cinematic chapters.
- Three.js is loaded only for capable browsers reaching a `SceneStage`.

Native scrolling remains intact. Touch, reduced-motion, reduced-transparency,
and non-WebGL users receive complete static alternatives.

## Performance Budgets

- Initial application JavaScript target: under 180 kB compressed.
- Three.js remains outside the initial route bundle.
- Hero media target: under 500 kB before user interaction.
- Production image sequences should load the first and nearby frames first,
  remain under 12 MB per chapter, and use AVIF or WebP.
- Canvas pixel density is capped at 2; WebGL pixel density is capped at 1.75.

## Deployment

`vercel.json` rewrites all routes to `index.html`. The production command is
`npm run build` and the output directory is `dist`.
