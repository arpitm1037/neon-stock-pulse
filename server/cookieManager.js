import axios from 'axios';

export const NSE_BASE_URL = 'https://www.nseindia.com';
const NSE_HOST = 'www.nseindia.com';
const NSE_INDEX = 'NIFTY 500';
export const NSE_EQUITY_URL = `${NSE_BASE_URL}/api/equity-stockIndices?index=${encodeURIComponent(
  NSE_INDEX,
)}`;

const session = {
  cookies: '',
  lastRefreshed: 0,
};

const buildCookieHeader = (cookieArray = []) =>
  cookieArray
    .map((cookie) => cookie?.split(';')[0])
    .filter(Boolean)
    .join('; ');

const NSE_BOOT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  Accept: 'text/html,application/json',
  Referer: `${NSE_BASE_URL}/`,
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  Host: NSE_HOST,
};

const NSE_DATA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  Accept: 'application/json',
  Referer: `${NSE_BASE_URL}/`,
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
  Host: NSE_HOST,
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
};

export const refreshSession = async () => {
  console.log('[NSE] Bootstrapping session...');
  const response = await axios.get(NSE_BASE_URL, {
    headers: NSE_BOOT_HEADERS,
    timeout: 8000,
    responseType: 'text',
  });
  const cookies = buildCookieHeader(response.headers['set-cookie']);
  if (!cookies) {
    throw new Error('NSE did not return session cookies.');
  }
  session.cookies = cookies;
  session.lastRefreshed = Date.now();
  console.log('[NSE] Session refreshed.');
  return session.cookies;
};

const ensureSession = async () => {
  if (!session.cookies) {
    await refreshSession();
  }
  return session.cookies;
};

export const requestWithSession = async (url, options = {}, retry = true) => {
  await ensureSession();
  const headers = {
    ...NSE_DATA_HEADERS,
    ...(options.headers || {}),
    Cookie: session.cookies,
  };

  try {
    return await axios.get(url, { ...options, headers, timeout: options.timeout ?? 8000 });
  } catch (error) {
    const status = error.response?.status;
    if (retry && (status === 401 || status === 403)) {
      console.warn(`[NSE] ${status} received. Refreshing cookies and retrying once.`);
      session.cookies = '';
      await refreshSession();
      return requestWithSession(url, options, false);
    }
    throw error;
  }
};

