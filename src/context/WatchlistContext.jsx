import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WatchlistContext = createContext();

const STORAGE_KEY = 'indian-stock-tracker/watchlist';

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Unable to load watchlist from storage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.warn('Unable to persist watchlist:', error);
    }
  }, [watchlist]);

  const addStock = (stock) => {
    if (!stock?.symbol) return;
    setWatchlist((prev) => {
      if (prev.find((item) => item.symbol === stock.symbol)) {
        return prev;
      }
      return [...prev, stock];
    });
  };

  const removeStock = (symbol) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  const isInWatchlist = (symbol) =>
    watchlist.some((item) => item.symbol === symbol);

  const value = useMemo(
    () => ({
      watchlist,
      addStock,
      removeStock,
      isInWatchlist,
    }),
    [watchlist],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
};

