import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PriceChart from '../components/PriceChart';
import StatsGrid from '../components/StatsGrid';
import { useWatchlist } from '../context/WatchlistContext';
import { fetchChartSeries, fetchStockBySymbol } from '../api/stockService';

const DetailsPage = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addStock, removeStock, isInWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(symbol);

  useEffect(() => {
    const loadStock = async () => {
      setLoading(true);
      setError('');
      try {
        const details = await fetchStockBySymbol(symbol);
        if (!details) {
          setError('Unable to locate that symbol. Try another one!');
          return;
        }
        setStock(details);
        const series = await fetchChartSeries(symbol, details.price);
        setChart(series);
      } catch (err) {
        setError(err.message || 'Failed to load stock details.');
      } finally {
        setLoading(false);
      }
    };

    loadStock();
  }, [symbol]);

  const handleWatchlistToggle = () => {
    if (!stock) return;
    if (isSaved) {
      removeStock(stock.symbol);
    } else {
      addStock(stock);
    }
  };

  if (loading) {
    return (
      <section className="page page--center">
        <p className="loader">Fetching neon data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page page--center">
        <p className="alert alert--error">{error}</p>
      </section>
    );
  }

  if (!stock) return null;

  return (
    <section className="page">
      <div className="details__header">
        <div>
          <p className="eyebrow">Indian Stock • {stock.symbol}</p>
          <h1>{stock.companyName}</h1>
          <p className="details__price">₹{stock.price}</p>
          <p className="details__change">
            {stock.change >= 0 ? '+' : ''}
            {stock.change} pts ({stock.percentChange}%)
          </p>
        </div>
        <button className="btn btn--primary" onClick={handleWatchlistToggle}>
          {isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
        </button>
      </div>

      <PriceChart data={chart} />

      <StatsGrid data={stock} />

      <section className="info">
        <div>
          <p className="info__label">Sector</p>
          <p className="info__value">{stock.sector}</p>
        </div>
        <div>
          <p className="info__label">Industry</p>
          <p className="info__value">{stock.industry}</p>
        </div>
      </section>
    </section>
  );
};

export default DetailsPage;

