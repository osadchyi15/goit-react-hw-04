import s from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onSearchChanged, clientQuery }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChanged(value);
    e.target.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder={
            clientQuery
              ? `Current search '${value.toUpperCase()}'. Enter new search.`
              : "Search images and photos"
          }
        />
        <button type="submit" className={s.submitBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
