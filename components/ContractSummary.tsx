interface Props {
  supplier: string;
  duration: string;
  payment: string;
  risk: string;
  recommendation: string;
}

export default function ContractSummary({
  supplier,
  duration,
  payment,
  risk,
  recommendation,
}: Props) {
  const riskColor =
    risk === "Low"
      ? "text-green-600"
      : risk === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="mt-8 rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        🤖 AI Contract Summary
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-gray-500">Supplier</p>
          <h3 className="text-xl font-bold">{supplier}</h3>
        </div>

        <div>
          <p className="text-gray-500">Contract Duration</p>
          <h3 className="text-xl font-bold">{duration}</h3>
        </div>

        <div>
          <p className="text-gray-500">Payment Terms</p>
          <h3 className="text-xl font-bold">{payment}</h3>
        </div>

        <div>
          <p className="text-gray-500">Risk Level</p>
          <h3 className={`text-xl font-bold ${riskColor}`}>
            {risk}
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-blue-50 p-5">

        <h3 className="mb-2 font-bold">
          AI Recommendation
        </h3>

        <p>{recommendation}</p>

      </div>

    </div>
  );
}