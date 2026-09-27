const STORAGE_KEY = "marketlens-holdings";

export function getHoldings() {
  const savedHoldings = localStorage.getItem(STORAGE_KEY);

  if (!savedHoldings) {
    return [];
  }

  return JSON.parse(savedHoldings);
}

export function saveHoldings(holdings) {
  localStorage.setItem( STORAGE_KEY,JSON.stringify(holdings) );
}

export function clearHoldings() {
  localStorage.removeItem(STORAGE_KEY);
}