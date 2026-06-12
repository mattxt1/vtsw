import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AtlasVisual } from "../components/AtlasVisual";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ProductPlaceholder } from "../components/ProductPlaceholder";
import { ProductRender } from "../components/ProductRender";
import { Reveal } from "../components/Reveal";
import { getProduct } from "../data/catalog";
import { vela } from "../data/vela";
import { usePointerSurface } from "../hooks/usePointerSurface";
import type { ProductRenderKind } from "../utils/productVisual";

const featuredProducts = {
  phone: getProduct("mobile", "x26-ultra"),
  notebook: getProduct("computing", "notebook-ultra"),
  tablet: getProduct("computing", "tab-t26-ultra"),
  watch: getProduct("wearables", "watch-ultra"),
  audio: getProduct("wearables", "probuds-ultra"),
  tv: getProduct("display", "tv-ultra"),
  speaker: getProduct("audio", "home-speaker-pro"),
  software: getProduct("platform", "vos-27"),
  lattice: getProduct("platform", "lattice-1"),
  ethos: getProduct("platform", "ethos-ai"),
  atlas: getProduct("atlas", "atlas-pro"),
};

const categoryLinks: Array<{
  name: string;
  eyebrow: string;
  description: string;
  to: string;
  kind: ProductRenderKind | "software";
}> = [
  {
    name: "Phones",
    eyebrow: "x, fold, a, m + r",
    description: "Flagships, foldables, and everyday phones.",
    to: "/products/mobile",
    kind: "phone",
  },
  {
    name: "Notebooks",
    eyebrow: "notebook family",
    description: "Portable workspaces powered by vela pulse d8.",
    to: "/products/computing#notebook",
    kind: "notebook",
  },
  {
    name: "Tablets",
    eyebrow: "tab family",
    description: "Flexible canvases for work, creativity, and learning.",
    to: "/products/computing#tab-t-series",
    kind: "tablet",
  },
  {
    name: "Wearables",
    eyebrow: "watch, probuds + more",
    description: "Personal technology that stays quietly useful.",
    to: "/products/wearables",
    kind: "watch",
  },
  {
    name: "TV + displays",
    eyebrow: "home entertainment",
    description: "Large vela canvases built around the ecosystem.",
    to: "/products/display",
    kind: "display",
  },
  {
    name: "Speakers",
    eyebrow: "home + theater",
    description: "Room-aware sound for music, television, and home.",
    to: "/products/audio",
    kind: "speaker",
  },
  {
    name: "Accessories",
    eyebrow: "protect, power + connect",
    description:
      "Cases, chargers, bands, docks, stands, cables, and creator tools.",
    to: "/products/accessories",
    kind: "accessory",
  },
  {
    name: "Software + foundation",
    eyebrow: "lattice, ethos ai, vOS + pulse",
    description:
      "The frameworks, intelligence, software, and silicon behind vela.",
    to: "/products/platform",
    kind: "software",
  },
];

export function HomePage() {
  const heroPointer = usePointerSurface<HTMLElement>();
  const themeStyle = {
    "--brand-accent": vela.theme.accent,
    "--brand-soft": vela.theme.accentSoft,
    "--brand-ink": vela.theme.ink,
    "--brand-surface": vela.theme.surface,
    "--brand-glow": vela.theme.glow,
  } as React.CSSProperties;

  useEffect(() => {
    document.title = "vela - technology, naturally connected";
  }, []);

  const phone = featuredProducts.phone;
  const notebook = featuredProducts.notebook;
  const tablet = featuredProducts.tablet;
  const watch = featuredProducts.watch;
  const audio = featuredProducts.audio;
  const tv = featuredProducts.tv;
  const speaker = featuredProducts.speaker;
  const software = featuredProducts.software;
  const lattice = featuredProducts.lattice;
  const ethos = featuredProducts.ethos;
  const atlas = featuredProducts.atlas;

  if (
    !phone ||
    !notebook ||
    !tablet ||
    !watch ||
    !audio ||
    !tv ||
    !speaker ||
    !software ||
    !lattice ||
    !ethos ||
    !atlas
  ) {
    return null;
  }

  return (
    <PageTransition>
      <main id="main-content" className="vela-page home-launch" style={themeStyle}>
        <section className="launch-hero" {...heroPointer}>
          <div className="launch-hero__copy">
            <p className="eyebrow">new / vela x26 Ultra</p>
            <h1>
              Power,
              <span> made quiet.</span>
            </h1>
            <p>
              The ultimate vela phone. A titanium flagship with a 1-inch camera,
              tandem OLED display, and vela pulse m8 max.
            </p>
            <div className="launch-actions">
              <Link
                className="embossed-button"
                to="/products/mobile/x26-ultra"
              >
                Discover x26 Ultra
              </Link>
              <Link to="/compare?products=mobile:x26-ultra,mobile:x26-pro,mobile:x26">
                Compare x26
              </Link>
            </div>
          </div>
          <div className="launch-hero__visual">
            <ProductRender
              product={phone}
              finishColor={phone.finishes[0]?.color}
              finishName={phone.finishes[0]?.name}
              priority
            />
          </div>
          <div className="launch-hero__metrics" aria-label="x26 Ultra highlights">
            {phone.highlights.slice(0, 4).map((highlight) => (
              <div key={`${highlight.value}-${highlight.label}`}>
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="home-atlas section-shell"
          aria-labelledby="home-atlas-heading"
        >
          <Reveal className="home-atlas__card">
            <div className="home-atlas__copy">
              <div className="home-atlas__status">
                <span />
                coming 2027
              </div>
              <p className="eyebrow">vela atlas / mobility preview</p>
              <h2 id="home-atlas-heading">Know the road ahead.</h2>
              <p>
                Certified vehicle intelligence combining cameras, radar,
                LiDAR, maps, connected safety, and vOS 27 mobility in one
                installable system.
              </p>
              <div className="home-atlas__metrics">
                {atlas.highlights.slice(0, 3).map((highlight) => (
                  <div key={`${highlight.value}-${highlight.label}`}>
                    <strong>{highlight.value}</strong>
                    <span>{highlight.label}</span>
                  </div>
                ))}
              </div>
              <div className="launch-actions">
                <Link className="embossed-button" to="/products/atlas">
                  Explore vela atlas
                  <span aria-hidden="true">→</span>
                </Link>
                <Link to="/compare?mode=atlas&products=atlas:atlas-core,atlas:atlas,atlas:atlas-pro">
                  Compare atlas systems
                </Link>
              </div>
            </div>
            <div className="home-atlas__visual">
              <AtlasVisual focus="vela atlas pro" />
              <span className="home-atlas__imprint" aria-hidden="true">
                atlas
              </span>
            </div>
          </Reveal>
        </section>

        <section id="software" className="software-feature section-shell">
          <Reveal className="software-feature__copy">
            <p className="eyebrow">preview / vOS 27</p>
            <h2>Your devices, now more adaptive.</h2>
            <p>
              Adaptive interfaces, glance panels, Live Handoff 2, private
              contextual intelligence, and deeper tools across the vela
              ecosystem. Developer beta begins June 15.
            </p>
            <div className="launch-actions">
              <Link
                className="embossed-button"
                to="/products/platform/vos-27"
              >
                Preview vOS 27
              </Link>
              <Link to="/products/platform">Software + foundation</Link>
            </div>
          </Reveal>
          <Reveal className="software-feature__visual" delay={0.08}>
            <ProductPlaceholder kind="software" label="vOS 27" tone="dark" />
            <ul>
              {software.specifications[0]?.items.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="software-feature__platforms">
            <Reveal>
              <Link to="/products/platform/lattice-1">
                <p className="eyebrow">frameworks + infrastructure</p>
                <h3>lattice</h3>
                <p>
                  The framework platform behind vela interfaces, APIs,
                  deployment, internal tools, and security foundations.
                </p>
                <span>{lattice.tagline}</span>
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Link to="/products/platform/ethos-ai">
                <p className="eyebrow">native intelligence</p>
                <h3>ethos ai</h3>
                <p>
                  Personal, contextual intelligence designed with vOS and vela
                  silicon for private, fast, useful experiences.
                </p>
                <span>{ethos.tagline}</span>
              </Link>
            </Reveal>
            <Reveal delay={0.12}>
              <Link to="/products/platform/vos-27">
                <p className="eyebrow">operating system</p>
                <h3>vOS 27</h3>
                <p>
                  The next adaptive system for every supported vela screen,
                  with a developer beta beginning June 15.
                </p>
                <span>{software.tagline}</span>
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="products" className="latest-products section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">the latest from vela</p>
            <h2>Built to work beautifully together.</h2>
            <p>
              The newest vela devices, each designed around the same calm
              materials, connected software, and long-term support.
            </p>
          </Reveal>

          <article className="launch-product launch-product--wide">
            <Reveal className="launch-product__copy">
              <p className="eyebrow">vela notebook ultra / 2026</p>
              <h2>A studio you can close.</h2>
              <p>{notebook.description}</p>
              <div className="launch-product__highlights">
                {notebook.highlights.slice(0, 3).map((highlight) => (
                  <span key={highlight.label}>
                    <strong>{highlight.value}</strong>
                    {highlight.label}
                  </span>
                ))}
              </div>
              <div className="launch-actions">
                <Link to="/products/computing/notebook-ultra">
                  Discover notebook ultra
                </Link>
                <Link to="/products/computing#notebook">Explore notebooks</Link>
              </div>
            </Reveal>
            <Reveal className="launch-product__visual" delay={0.08}>
              <ProductRender
                product={notebook}
                finishColor={notebook.finishes[0]?.color}
                finishName={notebook.finishes[0]?.name}
              />
            </Reveal>
          </article>

          <div className="launch-product-pair">
            <article className="launch-product launch-product--stacked launch-product--blue">
              <Reveal className="launch-product__copy">
                <p className="eyebrow">vela tab t26 Ultra</p>
                <h2>A canvas without edges.</h2>
                <p>{tablet.tagline}</p>
                <Link to="/products/computing/tab-t26-ultra">
                  Discover tab t26 Ultra
                </Link>
              </Reveal>
              <Reveal className="launch-product__visual" delay={0.08}>
                <ProductRender
                  product={tablet}
                  finishColor={tablet.finishes[1]?.color}
                  finishName={tablet.finishes[1]?.name}
                />
              </Reveal>
            </article>

            <article className="launch-product launch-product--stacked">
              <Reveal className="launch-product__copy">
                <p className="eyebrow">vela watch ultra</p>
                <h2>More capable. Less demanding.</h2>
                <p>{watch.tagline}</p>
                <Link to="/products/wearables/watch-ultra">
                  Discover watch ultra
                </Link>
              </Reveal>
              <Reveal className="launch-product__visual" delay={0.08}>
                <ProductRender
                  product={watch}
                  finishColor={watch.finishes[0]?.color}
                  finishName={watch.finishes[0]?.name}
                />
              </Reveal>
            </article>
          </div>

          <article className="launch-product launch-product--wide launch-product--reverse">
            <Reveal className="launch-product__copy">
              <p className="eyebrow">vela tv ultra / vOS 26 for tv</p>
              <h2>The ecosystem, across the room.</h2>
              <p>{tv.description}</p>
              <div className="launch-product__highlights">
                {tv.highlights.slice(0, 3).map((highlight) => (
                  <span key={highlight.label}>
                    <strong>{highlight.value}</strong>
                    {highlight.label}
                  </span>
                ))}
              </div>
              <div className="launch-actions">
                <Link to="/products/display/tv-ultra">Discover tv ultra</Link>
                <Link to="/products/display">Explore TV + displays</Link>
              </div>
            </Reveal>
            <Reveal className="launch-product__visual" delay={0.08}>
              <ProductRender
                product={tv}
                finishColor={tv.finishes[0]?.color}
                finishName={tv.finishes[0]?.name}
              />
            </Reveal>
          </article>

          <div className="launch-product-pair launch-product-pair--compact">
            <article className="launch-product launch-product--compact">
              <Reveal className="launch-product__copy">
                <p className="eyebrow">vela probuds ultra</p>
                <h2>Hear more. Carry less.</h2>
                <p>{audio.tagline}</p>
                <Link to="/products/wearables/probuds-ultra">
                  Discover probuds ultra
                </Link>
              </Reveal>
              <Reveal className="launch-product__visual" delay={0.08}>
                <ProductRender
                  product={audio}
                  finishColor={audio.finishes[0]?.color}
                  finishName={audio.finishes[0]?.name}
                />
              </Reveal>
            </article>

            <article className="launch-product launch-product--compact launch-product--blue">
              <Reveal className="launch-product__copy">
                <p className="eyebrow">vela home speaker pro</p>
                <h2>Sound, shaped to the room.</h2>
                <p>{speaker.tagline}</p>
                <Link to="/products/audio/home-speaker-pro">
                  Discover home speaker pro
                </Link>
              </Reveal>
              <Reveal className="launch-product__visual" delay={0.08}>
                <ProductRender
                  product={speaker}
                  finishColor={speaker.finishes[1]?.color}
                  finishName={speaker.finishes[1]?.name}
                />
              </Reveal>
            </article>
          </div>
        </section>

        <section id="ecosystem" className="ecosystem-band">
          <Reveal>
            <p className="eyebrow">one vela ecosystem</p>
            <h2>Start on one. Continue on another.</h2>
            <p>
              Calls, files, cameras, displays, sound, and rooms move naturally
              through vOS 26 and ethos ai, supported by lattice below the
              surface. Your devices feel less like separate products and more
              like one considered system.
            </p>
            <div className="ecosystem-band__devices" aria-hidden="true">
              <span>phone</span>
              <span>notebook</span>
              <span>tablet</span>
              <span>watch</span>
              <span>home</span>
              <span>accessories</span>
            </div>
          </Reveal>
        </section>

        <section className="category-browser section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">explore the lineup</p>
            <h2>Find your vela.</h2>
            <p>
              Browse every current product, or place up to three devices side
              by side in compare.
            </p>
          </Reveal>
          <div className="category-browser__grid">
            {categoryLinks.map((category, index) => (
              <Reveal key={category.name} delay={(index % 3) * 0.04}>
                <Link className="category-tile" to={category.to}>
                  <div className="category-tile__visual">
                    {category.kind === "software" ? (
                      <ProductPlaceholder
                        kind="software"
                        label={category.name}
                      />
                    ) : (
                      <ProductRender
                        kind={category.kind}
                        label={category.name}
                        variant={index}
                      />
                    )}
                  </div>
                  <p className="eyebrow">{category.eyebrow}</p>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span>Explore</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="compare-callout">
            <div>
              <p className="eyebrow">vela compare</p>
              <h2>See the difference clearly.</h2>
              <p>
                Compare specifications and features across up to three vela
                devices, with shared and category-specific details called out.
              </p>
            </div>
            <Link className="embossed-button" to="/compare">
              Compare devices
            </Link>
          </Reveal>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
