"use client";

import { Sparkles } from "lucide-react";

export default function AIInsights() {
  const insights = [
    "Spend increased by 18% this month.",
    "Cisco remains your best-performing supplier.",
    "Two contracts expire within 30 days.",
    "No critical procurement risks detected.",
    "Potential savings: $14,500 by consolidating vendors.",
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center gap-3">
        <Sparkles className="text-teal-500" />
        <h2 className="text-xl font-bold">
          AI Insights
        </h2>
      </div>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-slate-50 p-4"
          >
            🤖 {item}
          </div>
        ))}
      </div>
    </div>
  );
}