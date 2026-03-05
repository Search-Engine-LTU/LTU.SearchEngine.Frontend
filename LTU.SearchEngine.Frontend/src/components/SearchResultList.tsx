import type { SearchResultItem } from "../models/SearchInterface";

export const SearchResultList = ({
  results,
}: {
  results: SearchResultItem[];
}) => {
  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          {/* FRQ-3013: Visar rubriken */}
          <a
            href={result.url}
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {result.title}
          </a>
          <br />
          <small>{result.url}</small>
          {/* FRQ-3014: Renderar snippet med HTML-highlighting */}
          <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
      ))}
    </div>
  );
};
