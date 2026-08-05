const features = [
  {
    icon: "🤖",
    title: "AI Quote Comparison",
    description: "Compare supplier quotations in seconds.",
  },
  {
    icon: "📄",
    title: "AI Contract Review",
    description: "Summarize contracts and identify important clauses.",
  },
  {
    icon: "📊",
    title: "Spend Analytics",
    description: "Visualize procurement spending and identify savings opportunities.",
  },
  {
    icon: "⭐",
    title: "Supplier Scorecards",
    description: "Evaluate supplier performance using AI insights.",
  },
];

export default function Features() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything Procurement Teams Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Procurement Copilot helps organizations reduce costs, compare
            suppliers, review contracts, and make better purchasing decisions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
