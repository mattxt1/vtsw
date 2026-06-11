import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { SearchResultList } from "../components/SearchResultList";
import {
  searchSite,
  type SearchResult,
  type SearchResultType,
} from "../data/search";

type SearchFilter = "all" | SearchResultType;

const filters: Array<{ value: SearchFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "product", label: "Products" },
  { value: "accessory", label: "Accessories" },
  { value: "software", label: "Software" },
  { value: "category", label: "Lineups" },
  { value: "page", label: "Pages" },
];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  useEffect(() => {
    document.title = query ? `${query} — Search — vela` : "Search — vela";
  }, [query]);

  return <SearchPageContent key={query} query={query} />;
}

function SearchPageContent({ query }: { query: string }) {
  const [, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState(query);
  const [filter, setFilter] = useState<SearchFilter>("all");
  const results = useMemo(() => searchSite(query), [query]);
  const visibleResults =
    filter === "all"
      ? results
      : results.filter((result) => result.type === filter);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = draft.trim();
    setSearchParams(nextQuery ? { q: nextQuery } : {});
  }

  function countFor(type: SearchResultType) {
    return results.filter((result) => result.type === type).length;
  }

  return (
    <PageTransition>
      <main id="main-content" className="search-page">
        <section className="search-page__hero">
          <p className="eyebrow">Search vela</p>
          <h1>{query ? "Find what fits." : "Search the ecosystem."}</h1>
          <form className="search-form search-form--page" role="search" onSubmit={submitSearch}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Search products, software, and pages"
              aria-label="Search vela"
              autoFocus
            />
            <button type="submit">Search</button>
          </form>
        </section>

        <section className="search-page__results section-shell">
          {query ? (
            <>
              <div className="search-page__summary">
                <div>
                  <p className="eyebrow">Results</p>
                  <h2>
                    {results.length} {results.length === 1 ? "match" : "matches"}{" "}
                    for “{query}”
                  </h2>
                </div>
                {results.length > 0 && (
                  <div className="search-filters" aria-label="Filter results">
                    {filters.map((item) => {
                      const count =
                        item.value === "all"
                          ? results.length
                          : countFor(item.value);
                      if (item.value !== "all" && count === 0) return null;

                      return (
                        <button
                          className={filter === item.value ? "is-active" : ""}
                          type="button"
                          onClick={() => setFilter(item.value)}
                          aria-pressed={filter === item.value}
                          key={item.value}
                        >
                          {item.label}
                          <span>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {visibleResults.length > 0 ? (
                <SearchResultList results={visibleResults as SearchResult[]} />
              ) : (
                <div className="search-empty search-empty--page">
                  <p className="eyebrow">Nothing in this view</p>
                  <h3>Try another result type.</h3>
                </div>
              )}
            </>
          ) : (
            <div className="search-empty search-empty--page">
              <p className="eyebrow">A connected catalog</p>
              <h2>Products, accessories, software, and pages in one place.</h2>
              <p>
                Search by product name, family, feature, finish, specification,
                or the part of the vela ecosystem you want to explore.
              </p>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
}
