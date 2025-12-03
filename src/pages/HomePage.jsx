import { useEffect, useState } from 'react';
import { fetchStockBySymbol, fetchStocks } from '../api/stockService';
import { popularSymbols } from '../api/fallbackData';
import SearchBar from '../components/SearchBar';
import StockCard from '../components/StockCard';
import StockChip from '../components/StockChip';

const HomePage = () => {
  const [allStocks, setAllStocks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAll = async () => {
      const stocks = await fetchStocks();
      setAllStocks(stocks);
    };
    loadAll();
  }, []);

  const handleSearch = async (symbol) => {
    setLoading(true);
    setError('');

    try {
      const stock = await fetchStockBySymbol(symbol);
      if (stock) {
        setSearchResult(stock);
      } else {
        setError('Symbol not found. Try RELIANCE, TCS, INFY, etc.');
        setSearchResult(null);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="hero">
        <div>
          <p className="eyebrow">NSE • BSE • 30-day pulse</p>
          <h1>Track Indian blue-chip stocks in a neon glow.</h1>
          <p className="hero__copy">
            Live quotes are proxied from NSE so the browser never hits their API
            directly, and a friendly offline fallback keeps the UI usable
            anywhere.
          </p>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      <div className="chips">
        {popularSymbols.map((symbol) => (
          <StockChip key={symbol} label={symbol} onClick={handleSearch} />
        ))}
      </div>

      {error && <p className="alert alert--error">{error}</p>}

      {searchResult && (
        <div className="search-result">
          <h3>Search result</h3>
          <StockCard stock={searchResult} />
        </div>
      )}

      <section>
        <div className="section-header">
          <h3>All tracked stocks ({allStocks.length})</h3>
          <p className="section-subtitle">
            Pulled straight from the proxied NSE NIFTY 500 feed. Scroll to
            explore everything the backend returns.
          </p>
        </div>

        <div className="grid">
          {allStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default HomePage;

