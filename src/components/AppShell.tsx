import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { brands } from "../data/brands";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark tactile-label" to="/" aria-label="Fieldwork home">
          Fieldwork
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {brands.map((brand) => (
            <NavLink
              key={brand.slug}
              to={`/brands/${brand.slug}`}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`
              }
            >
              {brand.name}
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
