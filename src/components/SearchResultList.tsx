import { Link } from "react-router-dom";
import type { SearchResult } from "../data/search";

const typeLabels: Record<SearchResult["type"], string> = {
  page: "Page",
  category: "Lineup",
  product: "Product",
  accessory: "Accessory",
  software: "Software",
};

interface SearchResultListProps {
  results: SearchResult[];
  onNavigate?: () => void;
}

export function SearchResultList({
  results,
  onNavigate,
}: SearchResultListProps) {
  return (
    <ul className="search-results-list">
      {results.map((result) => (
        <li key={result.id}>
          <Link to={result.url} onClick={onNavigate}>
            <div>
              <span>{typeLabels[result.type]}</span>
              <span>{result.eyebrow}</span>
            </div>
            <strong>{result.title}</strong>
            <p>{result.description}</p>
            <span className="search-result__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

