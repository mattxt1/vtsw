import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Reveal } from "../components/Reveal";
import {
  vos27BetaDate,
  vos27BetaMilestones,
  vos27Compatibility,
  vos27DeveloperFeatures,
  vos27EcosystemFeatures,
  vos27HeadlineFeatures,
} from "../data/vos27";

export function VOS27Page() {
  useEffect(() => {
    document.title = "vOS 27 preview — vela";
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="vos27-page">
        <nav className="vos27-local-nav" aria-label="vOS 27 navigation">
          <Link to="/products/platform">Software + foundation</Link>
          <strong>vOS 27</strong>
          <div>
            <a href="#features">Features</a>
            <a href="#developers">Developers</a>
            <a href="#compatibility">Compatibility</a>
          </div>
        </nav>

        <section className="vos27-hero">
          <div className="vos27-hero__aurora" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="vos27-hero__copy">
            <p className="eyebrow">Preview / the next vOS</p>
            <h1>vOS 27</h1>
            <p className="vos27-hero__statement">
              More personal. More connected. More capable.
            </p>
            <p>
              The biggest vela ecosystem update yet makes interfaces adaptive,
              continuity more natural, intelligence more useful, and privacy
              easier to understand across every supported screen.
            </p>
            <div className="vos27-hero__actions">
              <a className="vos27-button" href="#features">
                Explore the preview
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#developers">Developer overview</a>
            </div>
          </div>
          <div className="vos27-hero__system" aria-label="vOS 27 interface preview">
            <div className="vos27-device vos27-device--notebook">
              <span>Workspace</span>
              <div>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="vos27-device vos27-device--phone">
              <span>Glance</span>
              <div>
                <i />
                <i />
              </div>
            </div>
            <div className="vos27-device vos27-device--watch">
              <i />
            </div>
          </div>
        </section>

        <section className="vos27-beta-banner">
          <div>
            <p className="eyebrow">Developer beta 1</p>
            <h2>Begins {vos27BetaDate}.</h2>
          </div>
          <p>
            The first developer beta introduces the adaptive interface
            foundation, Dynamic Surface, glance panels, continuity updates,
            productivity tools, privacy controls, and new developer APIs.
          </p>
        </section>

        <section className="vos27-intro">
          <Reveal>
            <p className="eyebrow">Adaptive ecosystem intelligence</p>
            <h2>Your devices already work together. Now they adapt together.</h2>
            <p>
              vOS 26 unified the lineup. vOS 27 makes that shared system more
              responsive to the device, the moment, and the way you choose to
              work, create, communicate, and unwind.
            </p>
          </Reveal>
        </section>

        <section id="features" className="vos27-features">
          {vos27HeadlineFeatures.map((feature, index) => (
            <article className="vos27-feature" id={feature.id} key={feature.id}>
              <Reveal className="vos27-feature__copy">
                <p className="eyebrow">
                  {String(index + 1).padStart(2, "0")} / {feature.eyebrow}
                </p>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
                <ul>
                  {feature.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className={`vos27-visual vos27-visual--${index + 1}`}>
                <div className="vos27-visual__surface">
                  <span>{feature.eyebrow}</span>
                  <strong>{feature.title}</strong>
                  <div>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </section>

        <section className="vos27-ecosystem">
          <Reveal className="vos27-section-heading">
            <p className="eyebrow">Across the ecosystem</p>
            <h2>Thoughtful updates, everywhere you use vela.</h2>
          </Reveal>
          <div className="vos27-ecosystem__grid">
            {vos27EcosystemFeatures.map((feature, index) => (
              <Reveal delay={(index % 3) * 0.05} key={feature.title}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="developers" className="vos27-developers">
          <Reveal className="vos27-developers__heading">
            <p className="eyebrow">Built with lattice</p>
            <h2>One adaptive foundation for every vela experience.</h2>
            <p>
              vOS 27 gives developers shared layout, intent, gaming, and privacy
              foundations designed for the full vela ecosystem.
            </p>
          </Reveal>
          <div className="vos27-developers__grid">
            {vos27DeveloperFeatures.map((feature) => (
              <Reveal key={feature.title}>
                <article>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="vos27-developers__link">
            <Link to="/products/platform/lattice-1">
              Explore the lattice framework foundation
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>

        <section className="vos27-roadmap">
          <Reveal className="vos27-section-heading">
            <p className="eyebrow">Developer beta roadmap</p>
            <h2>Built in stages. Refined in the open.</h2>
          </Reveal>
          <div className="vos27-roadmap__list">
            {vos27BetaMilestones.map((milestone, index) => (
              <Reveal delay={index * 0.04} key={milestone.label}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{milestone.date}</p>
                    <h3>{milestone.label}</h3>
                  </div>
                  <p>{milestone.features}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="compatibility" className="vos27-compatibility">
          <Reveal className="vos27-section-heading">
            <p className="eyebrow">Compatibility</p>
            <h2>Designed to make supported devices feel new again.</h2>
            <p>
              Feature availability and visual complexity scale with hardware.
              Final compatibility details will be published before the public
              release.
            </p>
          </Reveal>
          <div className="vos27-compatibility__grid">
            {vos27Compatibility.map((tier) => (
              <Reveal key={tier.title}>
                <article>
                  <h3>{tier.title}</h3>
                  <p>{tier.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="vos27-future">
          <Reveal>
            <p className="eyebrow">Looking ahead</p>
            <h2>Built for what comes next.</h2>
            <p>
              vOS 27 also introduces new foundations for future vela pulse
              hardware, with advances in on-device intelligence, displays,
              imaging, performance, and precise proximity experiences.
            </p>
          </Reveal>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}

