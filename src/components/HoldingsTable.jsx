function HoldingsTable({
  holdings,
  onDelete,
}) {
  if (holdings.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h3 className="font-semibold text-gray-800">
          Your portfolio is empty
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Search for a stock above to add your first holding.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full min-w-900px">

        <thead>
          <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
            <th className="px-5 py-4">Stock</th>
            <th className="px-5 py-4">Shares</th>
            <th className="px-5 py-4">Buy Price</th>
            <th className="px-5 py-4">Current</th>
            <th className="px-5 py-4">Value</th>
            <th className="px-5 py-4">P&L</th>
            <th className="px-5 py-4">Return</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((holding) => (
            <tr
              key={holding.symbol}
              className="border-b last:border-0"
            >
              <td className="px-5 py-4">
                <p className="font-semibold">
                  {holding.symbol}
                </p>

                <p className="text-xs text-gray-500">
                  {holding.name}
                </p>
              </td>

              <td className="px-5 py-4">
                {holding.shares}
              </td>

              <td className="px-5 py-4">
                ${holding.buyPrice.toFixed(2)}
              </td>

              <td className="px-5 py-4">
                ${holding.currentPrice.toFixed(2)}
              </td>

              <td className="px-5 py-4">
                ${holding.currentValue.toFixed(2)}
              </td>

              <td
                className={`px-5 py-4 font-medium ${
                  holding.profitLoss >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {holding.profitLoss >= 0
                  ? "+"
                  : ""}
                ${holding.profitLoss.toFixed(2)}
              </td>

              <td
                className={`px-5 py-4 font-medium ${
                  holding.returnPercentage >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {holding.returnPercentage >= 0
                  ? "+"
                  : ""}
                {holding.returnPercentage.toFixed(2)}%
              </td>

              <td className="px-5 py-4">
                <button
                  onClick={() =>
                    onDelete(holding.symbol)
                  }
                  className="rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default HoldingsTable;