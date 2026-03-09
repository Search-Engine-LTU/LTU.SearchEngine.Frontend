import { useSearch } from '../hooks/useSearch';
import { SearchInput } from '../components/SearchInput';
import { SearchResultList } from '../components/SearchResultList';

export const SearchView = () => {
  const { executeSearch, searchData, isLoading, error, warning } = useSearch();

  return (
    <div className="search-view">
      <SearchInput onSearch={executeSearch} isLoading={isLoading} />
      
      {/* Felhantering och varningar samlade */}
      {error && <p className="error-message">{error}</p>}
      {warning && <p className="warning-message">{warning}</p>}

      {/* Resultat och Paginering (Issue #11) */}
      {searchData && (
        <>
          <p>Found {searchData.totalResults} results</p>
          <SearchResultList results={searchData.results} />
          {/* Här hamnar Pagination-komponenten sen */}
        </>
      )}
    </div>
  );
};