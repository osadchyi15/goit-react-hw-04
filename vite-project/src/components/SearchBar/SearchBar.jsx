import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit, clientQuery }) => {
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onSubmit}>
        <input
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder={
            clientQuery
              ? `Current search '${clientQuery.toUpperCase()}'. Enter new search.`
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
