import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <article className="card">
      <div className="card__header">
        <div>
          <p className="card__symbol">{stock.symbol}</p>
          <p className="card__company">{stock.companyName}</p>
        </div>
        <span
          className={`badge ${isPositive ? 'badge--up' : 'badge--down'}`}
        >
          {isPositive ? '+' : ''}
          {stock.percentChange}%
        </span>
      </div>

      <div className="card__body">
        <p className="card__price">₹{stock.price}</p>
        <p className="card__change">
          {isPositive ? '+' : ''}
          {stock.change} pts
        </p>
      </div>

      <div className="card__actions">
        <Link className="btn btn--ghost" to={`/stock/${stock.symbol}`}>
          View details
        </Link>
      </div>
    </article>
  );
};

export default StockCard;

