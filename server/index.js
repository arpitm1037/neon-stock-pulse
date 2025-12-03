import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  NSE_BASE_URL,
  NSE_EQUITY_URL,
  requestWithSession,
  refreshSession,
} from './cookieManager.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT) || 8080;

const YAHOO_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const YAHOO_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  Accept: 'application/json',
};

app.use(cors());
app.use(express.json());

const toNumber = (value, fallback = null) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const cleanStock = (stock) => ({
  symbol: stock?.symbol || '',
  open: toNumber(stock?.open),
  dayHigh: toNumber(stock?.dayHigh ?? stock?.high),
  dayLow: toNumber(stock?.dayLow ?? stock?.low),
  lastPrice: toNumber(stock?.lastPrice),
  previousClose: toNumber(stock?.previousClose),
  pChange: toNumber(stock?.pChange),
  totalTradedVolume: toNumber(stock?.totalTradedVolume, 0),
});

const fetchNseStocks = async () => {
  const response = await requestWithSession(NSE_EQUITY_URL);
  const rows = response.data?.data ?? [];
  return rows.map(cleanStock).filter((row) => row.symbol);
};

const fetchYahooSeries = async (ticker) => {
  const url = `${YAHOO_URL}${ticker}?interval=1d&range=6mo`;
  const { data } = await axios.get(url, { headers: YAHOO_HEADERS, timeout: 8000 });
  const result = data?.chart?.result?.[0];
  if (!result?.timestamp || !result?.indicators?.quote?.[0]?.close) {
    throw new Error('Invalid Yahoo Finance payload');
  }

  const closes = result.indicators.quote[0].close;
  return result.timestamp
    .map((timestamp, index) => {
      const price = closes[index];
      if (!Number.isFinite(price)) return null;
      return {
        date: new Date(timestamp * 1000).toISOString(),
        price: Number(price.toFixed(2)),
      };
    })
    .filter(Boolean);
};

app.get('/api/stocks', async (_req, res) => {
  try {
    const stocks = await fetchNseStocks();
    res.json(stocks);
  } catch (error) {
    console.error('Failed to fetch NSE stocks:', error.message);
    res.status(502).json({
      message: 'Unable to fetch NSE India data right now.',
    });
  }
});

app.get('/api/chart/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const candidates = [`${symbol}.NS`, `${symbol}.BO`];

  for (const ticker of candidates) {
    try {
      const series = await fetchYahooSeries(ticker);
      if (series.length > 0) {
        res.json({ symbol, series });
        return;
      }
    } catch (error) {
      console.warn(`Yahoo chart fetch failed for ${ticker}:`, error.message);
    }
  }

  res.status(502).json({
    message: 'Price history not available for this symbol.',
  });
});

const startServer = async () => {
  try {
    await refreshSession();
    console.log('[NSE] Initial session bootstrap completed.');
  } catch (error) {
    console.error('[NSE] Initial session bootstrap failed:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`Proxy server ready on http://localhost:${PORT}`);
  });
};

startServer();

