import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';

const WatchlistPage = () => {
  const { watchlist, removeStock } = useWatchlist();

  return (
    <section className="page">
      <div className="hero hero--compact">
        <div>
          <p className="eyebrow">Personal pulse</p>
          <h1>Your watchlist</h1>
          <p className="hero__copy">
            Saved stocks live here. Tap a row for the full detail view or remove
            it if you want to declutter.
          </p>
        </div>
      </div>

      {watchlist.length === 0 && (
        <p className="alert alert--ghost">
          Watchlist is empty. Head back to the home page and add a stock you
          love.
        </p>
      )}

      <div className="watchlist">
        {watchlist.map((stock) => (
          <article key={stock.symbol} className="watch-card">
            <div>
              <p className="watch-card__symbol">{stock.symbol}</p>
              <p className="watch-card__company">{stock.companyName}</p>
            </div>
            <div>
              <p className="watch-card__price">₹{stock.price}</p>
              <p className="watch-card__change">
                {stock.change >= 0 ? '+' : ''}
                {stock.change} pts
              </p>
            </div>
            <div className="watch-card__actions">
              <Link className="btn btn--ghost" to={`/stock/${stock.symbol}`}>
                Open
              </Link>
              <button
                className="btn btn--danger"
                onClick={() => removeStock(stock.symbol)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WatchlistPage;

