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

      {searchData && (
        <>
          <p>Found {searchData.totalResults} results</p>
          <SearchResultList results={searchData.results} />
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
