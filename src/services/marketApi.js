const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export async function searchStocks(query) {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Unable to search stocks");
  }

  const data = await response.json();

  return data.result || [];
}

export async function getStockQuote(symbol) {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch stock price");
  }

  const data = await response.json();

  return {
    currentPrice: data.c,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    previousClosePrice: data.pc,
    change: data.d,
    changePercent: data.dp,
  };
}