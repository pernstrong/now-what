import React, { useState, ReactElement, SyntheticEvent } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { isPropertySignature } from "typescript";

interface Props {
  searchTerm: (term: string) => void;
}

const Header: React.FC<Props> = (props: Props): ReactElement => {
  const [searchInput, updateSearchInput] = useState("");
  const [showSearch, updateShowSearch] = useState(false);

  const handleClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    props.searchTerm(searchInput)
    clearSearch();
  };

  const clearSearch = (): void => {
    updateSearchInput("");
  };

  return (
    <header>
      <Link to="/">
        <section className="title-section">
          <h1>Now What!?</h1>
        </section>
      </Link>
      <section className="actions">
        <Link to="/favorites" className="navlink">
          <p style={{ letterSpacing: "-1px" }}>FAVORITES</p>
        </Link>
        <form className={`header-form${showSearch ? " show" : ""}`}>
          <input
            type="text"
            name="search"
            placeholder="search..."
            className="header-search"
            value={searchInput}
            onChange={(e) => updateSearchInput(e.target.value)}
            aria-label="search"
          />
          <button className="header-search-button" onClick={handleClick}>
            Search
          </button>
        </form>
        <img
          src="images/search.svg"
          alt="search"
          onClick={() => updateShowSearch(!showSearch)}
        />
      </section>
    </header>
  );
};

export default Header;
