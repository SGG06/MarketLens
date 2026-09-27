import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AllocationChart({ holdings }) {
  if (holdings.length === 0) {
    return null;
  }

  const data = holdings.map((holding) => ({
    name: holding.symbol,
    value: holding.currentValue,
  }));

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        Portfolio Allocation
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AllocationChart;