import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AbstractMedia } from "../components/AbstractMedia";
import { BrandMark } from "../components/BrandMark";
import { CinematicChapter } from "../components/CinematicChapter";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import { TactileCard } from "../components/TactileCard";
import { brands } from "../data/brands";
import { usePointerSurface } from "../hooks/usePointerSurface";

const featuredChapter = brands[0].chapters[0];

export function HomePage() {
  const heroPointer = usePointerSurface<HTMLElement>();

  useEffect(() => {
    document.title = "Fieldwork — A family of curious brands";
  }, []);

  return (
    <PageTransition>
      <main id="main-content">
        <section className="home-hero" {...heroPointer}>
          <div className="home-hero__halo" aria-hidden="true" />
          <p className="eyebrow">Independent company · Three growing brands</p>
          <h1>
            We make the everyday
            <span> feel considered.</span>
          </h1>
          <p className="home-hero__intro">
            Fieldwork creates thoughtful objects, foods, and places with distinct
            points of view and one shared belief: usefulness can be beautiful.
          </p>
          <a className="embossed-button" href="#brands">
            Explore the family
            <span aria-hidden="true">↓</span>
          </a>
          <div className="home-hero__imprint" aria-hidden="true">
            FW
          </div>
        </section>

        <section className="manifesto section-shell">
          <Reveal>
            <p className="eyebrow">Our field of work</p>
            <p className="manifesto__statement">
              Different categories. Different characters. The same appetite for
              making things people choose to keep close.
            </p>
          </Reveal>
        </section>

        <CinematicChapter
          chapter={featuredChapter}
          accent={brands[0].theme.accent}
        />

        <section id="brands" className="brand-index section-shell">
          <Reveal className="section-heading">
            <p className="eyebrow">The brand family</p>
            <h2>Three ideas, fully inhabited.</h2>
          </Reveal>
          <div className="brand-grid">
            {brands.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.08}>
                <Link
                  to={`/brands/${brand.slug}`}
                  className="brand-card-link"
                  aria-label={`Explore ${brand.name}`}
                >
                  <TactileCard className="brand-card">
                    <div
                      className="brand-card__wash"
                      style={
                        {
                          "--brand-accent": brand.theme.accent,
                          "--brand-soft": brand.theme.accentSoft,
                        } as React.CSSProperties
                      }
                    />
                    <div className="brand-card__topline">
                      <p>{brand.category}</p>
                      <span>0{index + 1}</span>
                    </div>
                    <BrandMark brand={brand} />
                    <div className="brand-card__footer">
                      <div>
                        <h3>{brand.name}</h3>
                        <p>{brand.statement}</p>
                      </div>
                      <span className="round-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </TactileCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="highlights section-shell">
          <Reveal className="section-heading section-heading--split">
            <p className="eyebrow">From across the studio</p>
            <h2>Recently, in detail.</h2>
            <p>
              Selected materials, spaces, and objects from the worlds we are
              building.
            </p>
          </Reveal>
          <div className="editorial-grid">
            {brands.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.08}>
                <Link
                  className="editorial-card"
                  to={`/brands/${brand.slug}`}
                  style={{ "--brand-accent": brand.theme.accent } as React.CSSProperties}
                >
                  <AbstractMedia
                    media={brand.highlights[0].media}
                    variant={index}
                  />
                  <p className="eyebrow">
                    {brand.name} · {brand.highlights[0].eyebrow}
                  </p>
                  <h3>{brand.highlights[0].title}</h3>
                  <p>{brand.highlights[0].description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
}
