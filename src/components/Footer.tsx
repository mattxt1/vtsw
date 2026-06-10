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
          <a href="#products">products</a>
          <a href="#ecosystem">ecosystem</a>
          <a href="#software">software</a>
        </nav>
        <p>a veritas brand · 2026</p>
      </div>
    </footer>
  );
}
