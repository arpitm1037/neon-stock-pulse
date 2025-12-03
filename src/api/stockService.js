import axios from 'axios';
import {
  fallbackHistory,
  fallbackStocks,
  generateHistoryFromPrice,
  popularSymbols,
} from './fallbackData';

const API_BASE_URL = 'https://latest-stock-price.p.rapidapi.com';
const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPID_API_HOST = 'latest-stock-price.p.rapidapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

const normalizeStock = (stock) => {
  if (!stock) return null;

  const symbol = stock.symbol || stock.Symbol || 'UNKNOWN';
  const lastPrice = Number(
    stock.lastPrice ?? stock.price ?? stock.LTP ?? 0,
  );

  return {
    symbol,
    companyName: stock.companyName || stock.identifier || symbol,
    price: Number(lastPrice.toFixed(2)),
    change: Number(
      (stock.change ?? stock.netPrice ?? stock.Change ?? 0).toFixed(2),
    ),
    percentChange: Number(
      (stock.pChange ?? stock.percentChange ?? stock.PChange ?? 0).toFixed(2),
    ),
    open: Number((stock.open ?? stock.Open ?? lastPrice).toFixed(2)),
    dayHigh: Number((stock.dayHigh ?? stock.DayHigh ?? lastPrice).toFixed(2)),
    dayLow: Number((stock.dayLow ?? stock.DayLow ?? lastPrice).toFixed(2)),
    sector: stock.sector || stock.Industry || 'N/A',
    industry: stock.industry || stock.group || 'N/A',
  };
};

const withFallback = async (fn, fallback) => {
  try {
    if (!RAPID_API_KEY) {
      throw new Error('Missing RapidAPI key');
    }
    const data = await fn();
    return data;
  } catch (error) {
    console.warn('Falling back to offline data:', error.message);
    return fallback;
  }
};

export const fetchStocks = async (symbols = []) => {
  const data = await withFallback(
    async () => {
      const response = await apiClient.get('/any', {
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_API_HOST,
        },
      });
      return response.data;
    },
    fallbackStocks,
  );

  const normalized = Array.isArray(data)
    ? data.map(normalizeStock).filter(Boolean)
    : [];

  if (normalized.length === 0) {
    return fallbackStocks;
  }

  if (symbols.length === 0) {
    return normalized;
  }

  return normalized.filter((item) => symbols.includes(item.symbol));
};

export const fetchPopularStocks = () => fetchStocks(popularSymbols);

export const fetchStockBySymbol = async (symbol) => {
  if (!symbol) return null;
  const matches = await fetchStocks([symbol]);
  return matches[0] || null;
};

export const fetchChartSeries = async (symbol, fallbackPrice = 100) =>
  fallbackHistory[symbol] ||
  generateHistoryFromPrice(fallbackPrice, symbol?.length || 1);

