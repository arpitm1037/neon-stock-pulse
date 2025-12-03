import { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim().toUpperCase());
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        placeholder="Search NSE symbol (RELIANCE, TCS, INFY...)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button className="btn btn--primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Track'}
      </button>
    </form>
  );
};

export default SearchBar;

