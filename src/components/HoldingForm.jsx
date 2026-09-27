import { useState } from "react";

function HoldingForm({
  stock,
  currentPrice,
  onAddHolding,
  onCancel,
}) {
  const [shares, setShares] = useState("");
  const [buyPrice, setBuyPrice] = useState(
    currentPrice || ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (
      Number(shares) <= 0 ||
      Number(buyPrice) <= 0
    ) {
      return;
    }

    onAddHolding({
      symbol: stock.displaySymbol,
      name: stock.description,
      shares: Number(shares),
      buyPrice: Number(buyPrice),
      currentPrice: Number(currentPrice),
    });

    setShares("");
    setBuyPrice("");
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Add Holding
          </h2>

          <p className="text-sm text-gray-500">
            {stock.description} ·{" "}
            {stock.displaySymbol}
          </p>
        </div>

        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Shares
          </label>

          <input
            type="number"
            min="0"
            step="any"
            value={shares}
            onChange={(event) =>
              setShares(event.target.value)
            }
            placeholder="10"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Buy Price
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={buyPrice}
            onChange={(event) =>
              setBuyPrice(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            Add Holding
          </button>
        </div>
      </form>
    </div>
  );
}

export default HoldingForm;