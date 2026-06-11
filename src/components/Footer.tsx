import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer id="about" className="footer">
      <p className="footer__statement">
        Technology should feel like less to manage, not more.
      </p>
      <div className="footer__row">
        <Link className="wordmark" to="/">
          vela
        </Link>
        <nav aria-label="Footer navigation">
          <Link to="/#products">products</Link>
          <Link to="/compare">compare</Link>
          <Link to="/products/platform/lattice-1">lattice</Link>
          <Link to="/products/platform/ethos-ai">ethos ai</Link>
          <Link to="/products/platform">software</Link>
        </nav>
        <p>a veritas brand · 2026</p>
      </div>
    </footer>
  );
}
