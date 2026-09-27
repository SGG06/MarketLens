function PerformanceCard({ holdings }) {
  if (holdings.length === 0) {
    return null;
  }

  const sortedHoldings = [...holdings].sort(
    (a, b) => b.returnPercentage - a.returnPercentage
  );

  const best = sortedHoldings[0];

  const worst =
    sortedHoldings[sortedHoldings.length - 1];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Best Performer
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {best.symbol}
            </p>

            <p className="text-sm text-gray-500">
              {best.name}
            </p>
          </div>

          <p className="font-semibold text-green-600">
            {best.returnPercentage >= 0 ? "+" : ""}
            {best.returnPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Worst Performer
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {worst.symbol}
            </p>

            <p className="text-sm text-gray-500">
              {worst.name}
            </p>
          </div>

          <p
            className={`font-semibold ${
              worst.returnPercentage >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {worst.returnPercentage >= 0 ? "+" : ""}
            {worst.returnPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

    </div>
  );
}

export default PerformanceCard;