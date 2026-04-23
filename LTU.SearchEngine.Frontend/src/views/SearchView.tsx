import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { SearchInput } from "../components/SearchInput";
import { SearchResultList } from "../components/SearchResultList";
import { Pagination } from "../components/Pagination";

export const SearchView = () => {
  const { executeSearch, searchData, isLoading, error, warning } = useSearch();

  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = (query: string) => {
    setSubmittedQuery(query);
    executeSearch(query, 1);
  };

  const handlePageChange = (newPage: number) => {
    executeSearch(submittedQuery, newPage);
  };

  return (
    <div className="search-view">
      <SearchInput onSearch={handleSearch} isLoading={isLoading} />

      {error && <p className="error-message">{error}</p>}
      {warning && <p className="warning-message">{warning}</p>}

      {/* Issue #12: Hantera noll resultat (FRQ-4003) */}
      {searchData && searchData.totalResults === 0 && (
        <div className="no-results-container" style={{ marginTop: '20px', padding: '20px', backgroundColor: ' #3c4043;', borderRadius: '4px', border: '1px solid #ccc' }}>
          <h3>No results found</h3>
          <p>Your search for <strong>"{submittedQuery}"</strong> did not match any documents.</p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Make sure all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
          </ul>
        </div>
      )}

      {searchData && (
        <>
          <p>Found {searchData.totalResults} results</p>
          <small>{`Time taken: ${searchData.message}`}</small>
          <SearchResultList searchResults = {searchData.searchResults} />
          {
            <Pagination
              currentPage={searchData.currentPage}
              totalPages={searchData.totalPages}
              onPageChange={handlePageChange}
            />
          }
        </>
      )}
    </div>
  );
};
