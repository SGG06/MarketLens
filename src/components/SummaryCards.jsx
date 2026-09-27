function SummaryCards({ totals }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Invested
        </p>

        <p className="mt-2 text-2xl font-bold">
          ${totals.totalInvested.toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Current Value
        </p>

        <p className="mt-2 text-2xl font-bold">
          ${totals.totalCurrentValue.toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Total P&L
        </p>

        <p
          className={`mt-2 text-2xl font-bold ${
            totals.totalProfitLoss >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ${totals.totalProfitLoss.toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Total Return
        </p>

        <p
          className={`mt-2 text-2xl font-bold ${
            totals.totalReturnPercentage >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {totals.totalReturnPercentage.toFixed(2)}%
        </p>
      </div>

    </div>
  );
}

export default SummaryCards;