import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchInput = ({ onSearch, isLoading }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Try "cats" AND "dogs"...'
          style={{
            flex: 1,
            padding: "8px",
            border: "2px solid #ccc",
            outline: "none",
            borderRadius: "4px",
          }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};
