import {
    DollarSign,
    TrendingUp,
    Building2,
    FileText,
  } from "lucide-react";
  
  const stats = [
    {
      title: "Total Spend",
      value: "$4.82M",
      change: "+8.2%",
      icon: DollarSign,
    },
    {
      title: "Savings",
      value: "$638K",
      change: "+12.4%",
      icon: TrendingUp,
    },
    {
      title: "Suppliers",
      value: "268",
      change: "+14",
      icon: Building2,
    },
    {
      title: "Contracts",
      value: "54",
      change: "3 Expiring",
      icon: FileText,
    },
  ];
  
  export default function KPICards() {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
  
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#102A39] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-emerald-500/15 p-3">
                  <Icon className="text-emerald-400" size={24} />
                </div>
  
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                  {item.change}
                </span>
              </div>
  
              <p className="mt-6 text-sm text-slate-400">
                {item.title}
              </p>
  
              <h2 className="mt-2 text-4xl font-bold text-white">
                {item.value}
              </h2>
            </div>
          );
        })}
      </section>
    );
  }