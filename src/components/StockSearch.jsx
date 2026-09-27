import { useState } from "react";
import { searchStocks } from "../services/marketApi";

function StockSearch({ onSelectStock }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (query.trim() === "") {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const stocks = await searchStocks(query);

      const sortedStocks = stocks
        .filter((stock) => stock.symbol)
        .sort((a, b) => {
          return (
            a.description.length -
            b.description.length
          );
        });

      setResults(sortedStocks.slice(0, 8));
    } catch (error) {
      setError("Unable to search stocks.");
      setResults([]);
    }

    setLoading(false);
  }

  function handleSelect(stock) {
    onSelectStock(stock);

    setQuery(stock.displaySymbol);
    setResults([]);
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex gap-3"
      >
        <input
          type="text"
          placeholder="Search stocks e.g. Apple"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error !== "" ? (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      {results.length > 0 ? (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.map((stock) => (
            <button
              key={`${stock.symbol}-${stock.displaySymbol}`}
              onClick={() => handleSelect(stock)}
              className="block w-full border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50"
            >
              <p className="font-medium text-gray-900">
                {stock.description}
              </p>

              <p className="text-sm text-gray-500">
                {stock.displaySymbol} · {stock.type}
              </p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default StockSearch;