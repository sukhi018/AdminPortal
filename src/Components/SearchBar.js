import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Styles/SearchBar.css";

function SearchBar({ searchData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    searchData(searchTerm);
  };

  return (
    <div className='searchBar'>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
