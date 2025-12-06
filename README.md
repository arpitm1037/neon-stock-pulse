Neon Stock Pulse – Real-Time Stock Tracking Web App

Neon Stock Pulse is a modern, neon-themed stock market tracking web application built using React, Vite, Node.js, and Express.
It provides real-time stock data, interactive charts, watchlist support, and a fallback system that ensures the UI never breaks even when APIs fail.

The app fetches stock data from NSE India and Yahoo Finance, with a backup offline dataset and synthetic chart generator for reliability.

🚀 Features
1. Neon-Themed UI

Dark interface with glowing neon accents

Clean and modern cards for stock display

Fully responsive layout

2. Real-Time Stock Data

Fetches live stock data from NSE

Backend handles session cookies & retries automatically

3. Interactive Stock Charts

Historical price charts powered by Yahoo Finance API

Automatically switches to synthetic chart data if API fails

4. Powerful Search Functionality

Search stocks instantly by symbol

Fast filtering for large datasets

5. Watchlist Management

Add or remove stocks from watchlist

Watchlist is saved using localStorage

Persisted even after page refresh

6. Fallback & Offline Support

If APIs fail or network is unavailable:

Shows fallbackStocks dataset

Generates synthetic 30-day price history

Ensures UI never breaks

7. Full Backend Integration

Node.js + Express server

Cookie Manager to access NSE endpoints safely

Robust retry & error handling

🛠️ Tech Stack
Frontend

React

Vite

Axios

Recharts (for charts)

CSS Neon UI Layout

LocalStorage (Watchlist)

Backend

Node.js

Express

Axios

Cookie-based session management (NSE)

Yahoo Finance API

Error handling, retries, fallback switching

🔌 API Endpoints (Backend)
1. /api/stocks

Fetches live stock list from NSE (500 index).

2. /api/chart/:symbol

Fetches historical price data from Yahoo Finance (.NS and .BO tickers).

External APIs Used

NSE India (requires session cookies)

Yahoo Finance Chart API

If these fail → fallback & synthetic data is used.

🧠 How the Backend Works

The backend handles:

1. NSE Cookie Manager (cookieManager.js)

Loads NSE homepage

Extracts session cookies

Adds headers to mimic a real browser

Retries automatically on 401/403 errors

Ensures stable NSE access

2. Yahoo Finance Chart Fetching

Fetches timestamps + closing prices

Cleans & formats data for frontend charts

Uses .NS and .BO tickers as backup options

3. Fallback Logic

If all APIs fail, backend returns predefined static data

Frontend will generate synthetic chart data using buildHistory()

🧪 Synthetic & Fallback Data

Located in fallbackData.js:

Fallback Data

Predefined list of Indian stocks

Includes price, open, high, low, sector, etc.

Shown when APIs fail

Synthetic Chart Data

30-day history generated using sine & cosine patterns

Looks realistic and smooth

Ensures chart never breaks

📂 Project Structure
/server
  index.js
  cookieManager.js

/src
  components/
  pages/
  stockService.js
  fallbackData.js
  App.jsx
  main.jsx

README.md
package.json
vite.config.js

🖥️ Installation & Setup
Backend Setup
cd server
npm install
npm run dev   // or node index.js

Frontend Setup
npm install
npm run dev

Environment Variables

Create .env in root:

VITE_API_BASE_URL=http://localhost:8080
SERVER_PORT=8080

🌍 Deployment
Frontend Deployment

Recommended: Netlify or Vercel

Build command: npm run build

Publish directory: dist

Backend Deployment

Recommended: Render, Vercel, Railway, or Replit

Start command: node index.js

Update frontend .env:

VITE_API_BASE_URL=https://your-backend-url.com

📘 How the App Works – Summary

User opens app → frontend requests /api/stocks

Backend fetches NSE data using session cookies

User selects a stock → frontend requests /api/chart/:symbol

Backend fetches chart data from Yahoo → sends to frontend

If APIs fail → show fallbackStocks + synthetic charts

Watchlist is stored in localStorage

This ensures speed, reliability, and zero downtime in UI display.

✨ Key Learnings / Highlights

Handling protected APIs using session cookies

Implementing retry logic for robust backend

Building a fallback-first system

Designing neon-themed UI with smooth interactions

Proxying external APIs securely

Using synthetic data to prevent UI breakage

📄 License

This project is built for educational and learning purposes.
