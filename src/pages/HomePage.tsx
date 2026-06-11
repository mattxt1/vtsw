import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AbstractMedia } from "../components/AbstractMedia";
import { CinematicChapter } from "../components/CinematicChapter";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import { TactileCard } from "../components/TactileCard";
import { slugifyProduct } from "../data/catalog";
import { vela } from "../data/vela";
import { usePointerSurface } from "../hooks/usePointerSurface";

const [ecosystemChapter, powerChapter, softwareChapter] = vela.chapters;

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
    document.title = "vela — technology, naturally connected";
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="vela-page" style={themeStyle}>
        <section className="home-hero vela-hero" {...heroPointer}>
          <div className="home-hero__halo vela-hero__device" aria-hidden="true">
            <span className="vela-hero__lens" />
            <span className="vela-hero__edge" />
          </div>
          <p className="eyebrow">vela · consumer technology by veritas</p>
          <h1>
            Technology,
            <span> naturally connected.</span>
          </h1>
          <p className="home-hero__intro">{vela.description}</p>
          <a className="embossed-button" href="#products">
            Explore vela
            <span aria-hidden="true">↓</span>
          </a>
          <div className="home-hero__imprint vela-hero__imprint" aria-hidden="true">
            vela
          </div>
        </section>

        <section className="manifesto section-shell">
          <Reveal>
            <p className="eyebrow">one connected experience</p>
            <p className="manifesto__statement">
              Your technology should understand the whole picture, not ask you
              to connect the pieces.
            </p>
          </Reveal>
        </section>

        <CinematicChapter
          chapter={ecosystemChapter}
          accent={vela.theme.accent}
        />

        <section id="products" className="product-family section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">the vela family</p>
            <h2>Everything you use. Designed together.</h2>
            <p>
              Personal devices, home technology, and accessories shaped by one
              clear material and software language.
            </p>
          </Reveal>

          <div className="product-grid">
            {vela.products.map((product, index) => (
              <Reveal
                key={product.id}
                className={`product-grid__item product-grid__item--${index + 1}`}
                delay={(index % 3) * 0.06}
              >
                <TactileCard className="product-card">
                  <div className="product-card__topline">
                    <p>{product.eyebrow}</p>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="product-card__media">
                    <AbstractMedia media={product.media} variant={index} />
                  </div>
                  <div className="product-card__copy">
                    <p className="product-card__name">{product.name}</p>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <Link
                      className="product-card__discover"
                      to={`/products/${product.id}`}
                    >
                      Explore {product.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                    <div className="product-card__lineup">
                      {product.groups.map((group) => (
                        <div key={group.name} className="product-group">
                          <p>{group.name}</p>
                          <ul aria-label={`${group.name} models`}>
                            {group.models.map((model) => (
                              <li key={model}>
                                <Link
                                  to={`/products/${product.id}/${slugifyProduct(model)}`}
                                >
                                  {model}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {product.note ? (
                      <p className="product-card__note">{product.note}</p>
                    ) : null}
                  </div>
                </TactileCard>
              </Reveal>
            ))}
          </div>
        </section>

        <CinematicChapter chapter={powerChapter} accent={vela.theme.accent} />

        <section className="continuity section-shell">
          <Reveal className="continuity__copy">
            <p className="eyebrow">continuity</p>
            <h2>Start here. Continue there.</h2>
            <p>
              Calls, files, sound, rooms, and routines move with you through
              vOS 26. Every vela device is aware of the others without turning
              that intelligence into another setting to manage.
            </p>
          </Reveal>
          <Reveal className="continuity__surface" delay={0.1}>
            <div className="continuity__orbit" aria-hidden="true">
              <span>phone</span>
              <span>laptop</span>
              <span>home</span>
              <strong>vela</strong>
            </div>
          </Reveal>
        </section>

        <CinematicChapter chapter={softwareChapter} accent={vela.theme.accent} />

        <section className="principles section-shell">
          <Reveal className="section-heading">
            <p className="eyebrow">made the vela way</p>
            <h2>Less friction. More feeling.</h2>
          </Reveal>
          <div className="principle-grid">
            <Reveal>
              <p className="principle-grid__number">01</p>
              <h3>Calm by default.</h3>
              <p>Clear choices, gentle feedback, and no noise for its own sake.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="principle-grid__number">02</p>
              <h3>Supported for longer.</h3>
              <p>
                Eight years for flagship and organizational devices, six for
                midrange, rugged, TV, and display, and four for entry-level.
                Trifold Ultra receives twelve.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="principle-grid__number">03</p>
              <h3>Protected when needed.</h3>
              <p>
                vela protect adds reduced-cost repairs, accidental damage
                coverage, and express replacements.
              </p>
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
