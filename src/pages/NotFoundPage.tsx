import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — Fieldwork";
  }, []);

  return (
    <PageTransition>
      <main id="main-content" className="not-found">
        <p className="eyebrow">404 / Uncharted</p>
        <h1>This field is still empty.</h1>
        <p>The page you were looking for has moved or never took root.</p>
        <Link className="embossed-button" to="/">
          Return home
          <span aria-hidden="true">←</span>
        </Link>
      </main>
    </PageTransition>
  );
}
