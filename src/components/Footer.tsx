import { Link } from "react-router-dom";
import { brands } from "../data/brands";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__statement">
        Building useful things with an unreasonable amount of care.
      </p>
      <div className="footer__row">
        <Link className="wordmark" to="/">
          Fieldwork
        </Link>
        <nav aria-label="Footer navigation">
          {brands.map((brand) => (
            <Link key={brand.slug} to={`/brands/${brand.slug}`}>
              {brand.name}
            </Link>
          ))}
        </nav>
        <p>Independent · 2026</p>
      </div>
    </footer>
  );
}
