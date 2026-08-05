"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  active: number;
  pending: number;
  inactive: number;
}

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function SupplierChart({
  active,
  pending,
  inactive,
}: Props) {
  const data = [
    { name: "Active", value: active },
    { name: "Pending", value: pending },
    { name: "Inactive", value: inactive },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Supplier Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}