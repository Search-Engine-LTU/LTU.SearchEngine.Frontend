import { useSearchParams } from "react-router-dom";

const inputStyles: React.CSSProperties = {
  flex: 1,
  padding: "8px",
  border: "2px solid #ccc",
  outline: "none",
  borderRadius: "4px",
};

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchInput = ({ onSearch, isLoading }: SearchInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
 
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); 
    const newQuery = formData.get("query-input") as string;
    setSearchParams({ query: newQuery });
    onSearch(newQuery);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          name="query-input"
          type="text"
          key={query}
          defaultValue={query}
          placeholder='Try "cats" AND "dogs"...'
          style={inputStyles}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};
