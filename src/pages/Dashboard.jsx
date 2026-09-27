import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StockSearch from "../components/StockSearch";
import HoldingForm from "../components/HoldingForm";
import SummaryCards from "../components/SummaryCards";
import PerformanceCard from "../components/PerformanceCard";
import HoldingsTable from "../components/HoldingsTable";
import AllocationChart from "../components/AllocationChart";

import {
  getStockQuote,
} from "../services/marketApi";


import {
  calculateHolding,
  calculatePortfolioTotals,
} from "../utils/Calculations";

import {
  getHoldings,
  saveHoldings,
} from "../utils/storage";

function Dashboard() {
  const [holdings, setHoldings] = useState([]);

  const [selectedStock, setSelectedStock] =
    useState(null);

  const [selectedPrice, setSelectedPrice] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const savedHoldings = getHoldings();

    setHoldings(savedHoldings);
  }, []);

  useEffect(() => {
    saveHoldings(holdings);
  }, [holdings]);

  async function handleSelectStock(stock) {
    setSelectedStock(stock);
    setSelectedPrice(null);
    setError("");
    setLoading(true);

    try {
      const quote = await getStockQuote(
        stock.displaySymbol
      );

      if (!quote.currentPrice) {
        throw new Error("Price unavailable");
      }

      setSelectedPrice(
        quote.currentPrice
      );
    } catch (error) {
      setError(
        "Unable to fetch the current stock price."
      );
    }

    setLoading(false);
  }

  function handleAddHolding(newHolding) {
    const alreadyExists = holdings.some(
      (holding) =>
        holding.symbol === newHolding.symbol
    );

    if (alreadyExists) {
      setError(
        "This stock is already in your portfolio."
      );
      return;
    }

    setHoldings([
      ...holdings,
      newHolding,
    ]);

    setSelectedStock(null);
    setSelectedPrice(null);
    setError("");
  }

  function handleDelete(symbol) {
    const updatedHoldings =
      holdings.filter(
        (holding) =>
          holding.symbol !== symbol
      );

    setHoldings(updatedHoldings);
  }

  async function handleRefreshPrices() {
    if (holdings.length === 0) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const updatedHoldings = [];

      for (const holding of holdings) {
        const quote = await getStockQuote(
          holding.symbol
        );

        updatedHoldings.push({
          ...holding,
          currentPrice:
            quote.currentPrice,
        });
      }

      setHoldings(updatedHoldings);
    } catch (error) {
      setError(
        "Unable to refresh stock prices."
      );
    }

    setLoading(false);
  }

  const calculatedHoldings =
    holdings.map((holding) => {
      return calculateHolding(holding);
    });

  const totals =
    calculatePortfolioTotals(
      calculatedHoldings
    );

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Search */}

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Search Stocks
            </h2>

            <p className="text-sm text-gray-500">
              Search for a stock and add it to your portfolio.
            </p>
          </div>

          <StockSearch
            onSelectStock={
              handleSelectStock
            }
          />

          {error !== "" ? (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}
        </section>


        {/* Add Holding */}

        {selectedStock &&
        selectedPrice !== null ? (
          <HoldingForm
            stock={selectedStock}
            currentPrice={selectedPrice}
            onAddHolding={
              handleAddHolding
            }
            onCancel={() => {
              setSelectedStock(null);
              setSelectedPrice(null);
            }}
          />
        ) : null}


        {/* Loading */}

        {loading ? (
          <div className="rounded-lg bg-white p-4 text-center text-sm text-gray-500 shadow">
            Loading market data...
          </div>
        ) : null}


        {/* Summary */}

        <section>
          <SummaryCards
            totals={totals}
          />
        </section>


        {/* Performance */}

        <section>
          <PerformanceCard
            holdings={calculatedHoldings}
          />
        </section>


        {/* Portfolio */}

        <section>

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                My Holdings
              </h2>

              <p className="text-sm text-gray-500">
                Track your investments and performance.
              </p>
            </div>

            <button
              onClick={
                handleRefreshPrices
              }
              disabled={
                loading ||
                holdings.length === 0
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Refreshing..."
                : "Refresh Prices"}
            </button>

          </div>

          <HoldingsTable
            holdings={
              calculatedHoldings
            }
            onDelete={handleDelete}
          />

        </section>


        {/* Allocation */}

        <section>
          <AllocationChart
            holdings={
              calculatedHoldings
            }
          />
        </section>

      </main>

    </div>
  );
}

export default Dashboard;