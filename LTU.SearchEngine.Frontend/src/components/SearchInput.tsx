import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";

export const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { executeSearch, error, warning, isLoading } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(inputValue);
  };

  const inputBorderColor = error ? "red" : warning ? "#ffcc00" : "#ccc";

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
            border: `2px solid ${inputBorderColor}`,
            outline: "none",
            borderRadius: "4px",
          }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
          {error}
        </p>
      )}

      {warning && !error && (
        <p style={{ color: "#d4a000", fontSize: "14px", marginTop: "4px" }}>
          {warning}
        </p>
      )}
    </div>
  );
};
