// Small, friendly fallback data so the UI stays populated if the API fails.
const buildHistory = (basePrice, seed = 1) => {
  const points = [];
  let price = basePrice;

  for (let i = 29; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Gentle deterministic wave based on sine so charts look alive.
    const variation =
      Math.sin((i + seed) * 0.45) * (seed * 0.9) +
      Math.cos((i + seed) * 0.3) * 0.4;

    price = Math.max(basePrice * 0.7, price + variation);

    points.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: '2-digit' }),
      price: Number(price.toFixed(2)),
    });
  }

  return points;
};

export const fallbackStocks = [
  {
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries',
    price: 2765.2,
    change: 18.3,
    percentChange: 0.67,
    open: 2741.6,
    dayHigh: 2778.1,
    dayLow: 2720.4,
    sector: 'Energy',
    industry: 'Conglomerate',
  },
  {
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    price: 3942.35,
    change: -22.6,
    percentChange: -0.57,
    open: 3964.5,
    dayHigh: 3989.9,
    dayLow: 3904.5,
    sector: 'Information Technology',
    industry: 'IT Services',
  },
  {
    symbol: 'INFY',
    companyName: 'Infosys',
    price: 1584.7,
    change: 6.1,
    percentChange: 0.39,
    open: 1573.8,
    dayHigh: 1594.1,
    dayLow: 1559.4,
    sector: 'Information Technology',
    industry: 'IT Services',
  },
  {
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank',
    price: 1668.45,
    change: 11.2,
    percentChange: 0.68,
    open: 1655.1,
    dayHigh: 1679.9,
    dayLow: 1639.2,
    sector: 'Financials',
    industry: 'Banking',
  },
  {
    symbol: 'ITC',
    companyName: 'ITC Limited',
    price: 438.65,
    change: -2.4,
    percentChange: -0.55,
    open: 441.05,
    dayHigh: 444.7,
    dayLow: 432.2,
    sector: 'Consumer Goods',
    industry: 'Diversified FMCG',
  },
  {
    symbol: 'SBIN',
    companyName: 'State Bank of India',
    price: 615.3,
    change: 4.2,
    percentChange: 0.69,
    open: 611.1,
    dayHigh: 622.5,
    dayLow: 603.8,
    sector: 'Financials',
    industry: 'Banking',
  },
  {
    symbol: 'WIPRO',
    companyName: 'Wipro Limited',
    price: 432.1,
    change: -3.5,
    percentChange: -0.8,
    open: 436.2,
    dayHigh: 439.6,
    dayLow: 425.4,
    sector: 'Information Technology',
    industry: 'IT Services',
  },
  {
    symbol: 'HCLTECH',
    companyName: 'HCL Technologies',
    price: 1548.4,
    change: 9.8,
    percentChange: 0.64,
    open: 1536.5,
    dayHigh: 1559.9,
    dayLow: 1518.3,
    sector: 'Information Technology',
    industry: 'IT Services',
  },
  {
    symbol: 'SUNPHARMA',
    companyName: 'Sun Pharmaceutical',
    price: 1232.9,
    change: 5.4,
    percentChange: 0.44,
    open: 1225.1,
    dayHigh: 1248.2,
    dayLow: 1212.6,
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
  },
  {
    symbol: 'LT',
    companyName: 'Larsen & Toubro',
    price: 3584.6,
    change: 21.4,
    percentChange: 0.6,
    open: 3552.1,
    dayHigh: 3602.3,
    dayLow: 3499.8,
    sector: 'Industrials',
    industry: 'Engineering & Construction',
  },
  {
    symbol: 'ASIANPAINT',
    companyName: 'Asian Paints',
    price: 3184.3,
    change: -12.5,
    percentChange: -0.39,
    open: 3206.4,
    dayHigh: 3222.1,
    dayLow: 3152.8,
    sector: 'Consumer Goods',
    industry: 'Paints & Coatings',
  },
  {
    symbol: 'BAJFINANCE',
    companyName: 'Bajaj Finance',
    price: 7342.8,
    change: 46.4,
    percentChange: 0.64,
    open: 7294.1,
    dayHigh: 7399.9,
    dayLow: 7208.7,
    sector: 'Financials',
    industry: 'NBFC',
  },
  {
    symbol: 'KOTAKBANK',
    companyName: 'Kotak Mahindra Bank',
    price: 1854.1,
    change: -14.2,
    percentChange: -0.76,
    open: 1866.8,
    dayHigh: 1882.5,
    dayLow: 1831.4,
    sector: 'Financials',
    industry: 'Banking',
  },
  {
    symbol: 'ULTRACEMCO',
    companyName: 'UltraTech Cement',
    price: 9735.5,
    change: 53.2,
    percentChange: 0.55,
    open: 9678.3,
    dayHigh: 9794.1,
    dayLow: 9554.2,
    sector: 'Materials',
    industry: 'Cement',
  },
  {
    symbol: 'ADANIGREEN',
    companyName: 'Adani Green Energy',
    price: 1245.7,
    change: 38.2,
    percentChange: 3.16,
    open: 1201.5,
    dayHigh: 1258.9,
    dayLow: 1188.4,
    sector: 'Energy',
    industry: 'Renewables',
  },
  {
    symbol: 'MARUTI',
    companyName: 'Maruti Suzuki',
    price: 10985.2,
    change: -84.4,
    percentChange: -0.76,
    open: 11042.6,
    dayHigh: 11138.2,
    dayLow: 10880.7,
    sector: 'Consumer Discretionary',
    industry: 'Automobile',
  },
];

export const fallbackHistory = fallbackStocks.reduce((acc, stock, index) => {
  acc[stock.symbol] = buildHistory(stock.price, index + 1);
  return acc;
}, {});

export const popularSymbols = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ITC'];

export const generateHistoryFromPrice = (price, seed = 1) =>
  buildHistory(price || 100, seed);

