import { AnimatePresence, motion } from "motion/react";
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
  animated?: boolean;
}

export function SearchResultList({
  results,
  onNavigate,
  animated = false,
}: SearchResultListProps) {
  return (
    <motion.ul className="search-results-list" layout={animated}>
      <AnimatePresence initial={animated} mode="popLayout">
        {results.map((result, index) => (
          <motion.li
            key={result.id}
            layout={animated ? "position" : false}
            initial={
              animated ? { opacity: 0, y: 18, scale: 0.985 } : undefined
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              animated
                ? { opacity: 0, y: -8, scale: 0.985 }
                : undefined
            }
            transition={{
              duration: 0.34,
              delay: animated ? Math.min(index * 0.045, 0.22) : 0,
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <Link to={result.url} onClick={onNavigate}>
              <div>
                <span>{typeLabels[result.type]}</span>
                <span>{result.eyebrow}</span>
              </div>
              <strong>{result.title}</strong>
              <p>{result.description}</p>
              <motion.span
                className="search-result__arrow"
                aria-hidden="true"
                whileHover={{ x: 3 }}
              >
                →
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
