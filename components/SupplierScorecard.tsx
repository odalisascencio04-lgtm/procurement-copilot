interface Props {
  rating: number;
  status: string;
}

export default function SupplierScorecard({
  rating,
  status,
}: Props) {
  const performance =
    rating >= 5
      ? 98
      : rating === 4
      ? 88
      : rating === 3
      ? 74
      : 60;

  const risk =
    status === "Active"
      ? "Low"
      : status === "Pending"
      ? "Medium"
      : "High";

  const riskColor =
    risk === "Low"
      ? "text-green-600"
      : risk === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Supplier Scorecard
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-gray-500">
            Performance
          </p>

          <h3 className="mt-2 text-4xl font-bold text-blue-600">
            {performance}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Rating
          </p>

          <h3 className="mt-2 text-3xl">
            {"⭐".repeat(rating)}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Risk Level
          </p>

          <h3 className={`mt-2 text-3xl font-bold ${riskColor}`}>
            {risk}
          </h3>
        </div>

      </div>

    </div>
  );
}