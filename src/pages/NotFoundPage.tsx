import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — vela";
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / disconnected</p>
        <h1>This device is out of range.</h1>
        <p>The page you were looking for is unavailable or has moved.</p>
        <Link className="embossed-button" to="/">
          Return home
          <span aria-hidden="true">←</span>
        </Link>
      </main>
    </PageTransition>
  );
}
