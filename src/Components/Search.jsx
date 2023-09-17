/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
