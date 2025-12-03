# Neon Indian Stock Tracker

Beginner-friendly React + Vite app for exploring Indian equities with a neon cyberpunk UI. Real NSE quotes are proxied through a tiny Express backend so the browser never hits NSE directly (avoiding CORS/403 issues). When APIs are down, synthetic fallback data keeps the UI populated.

## Features

- Vite + React Router frontend with watchlist context + Recharts line chart
- Express proxy (`/api/stocks`) that pulls the full NIFTY 500 list from NSE with the right headers
- `/api/chart/:symbol` pipes Yahoo Finance data (.NS fallback to .BO) into the graph
- Graceful loading/error states + offline fallback stocks & 30-day history
- Dark neon theme, responsive cards, reusable components

## Getting Started

```bash
cp .env.example .env          # optional: tweak ports/base URLs
npm install

# Terminal 1 - start the proxy (default http://localhost:8080)
npm run dev:server

# Terminal 2 - start the Vite client (default http://localhost:5173)
npm run dev
```

`npm run build` bundles the frontend for production. Deploy the Express server anywhere Node runs and point `VITE_API_BASE_URL` to it (defaults to `http://localhost:8080`).

## Notes

- All NSE requests go through `/server/index.js`, never directly from the browser.
- `server/cookieManager.js` bootstraps NSE session cookies on startup, refreshes them automatically on 401/403, and retries the blocked request once so prices never degrade to zero.
- Yahoo Finance rate-limits aggressively; if a symbol is missing history, the UI falls back to generated data.
- Popular quick-search chips (`RELIANCE`, `TCS`, `INFY`, `HDFCBANK`, `ITC`) are kept for convenience, but the “All tracked stocks” grid now mirrors the full NIFTY 500 feed.

