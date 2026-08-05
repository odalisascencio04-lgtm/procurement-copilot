import {
    Plus,
    Upload,
    BrainCircuit,
    FileBarChart,
  } from "lucide-react";
  
  const actions = [
    {
      title: "Add Supplier",
      icon: Plus,
    },
    {
      title: "Upload Contract",
      icon: Upload,
    },
    {
      title: "Ask AI",
      icon: BrainCircuit,
    },
    {
      title: "Generate Report",
      icon: FileBarChart,
    },
  ];
  
  export default function QuickActions() {
    return (
      <section className="rounded-3xl border border-white/10 bg-[#102A39] p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Quick Actions
        </h2>
  
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
  
            return (
              <button
                key={action.title}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0F2533] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30"
              >
                <div className="rounded-2xl bg-emerald-500/15 p-4">
                  <Icon className="text-emerald-400" size={28} />
                </div>
  
                <span className="mt-4 font-semibold text-white">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    );
  }