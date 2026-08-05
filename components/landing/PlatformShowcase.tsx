import {
    Brain,
    ShieldCheck,
    TrendingUp,
    FileText,
    ArrowRight,
  } from "lucide-react";
  
  export default function PlatformShowcase() {
    return (
      <section className="bg-[#081722] py-36">
  
        <div className="mx-auto max-w-7xl px-8">
  
          {/* Heading */}
  
          <div className="max-w-3xl">
  
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
              Platform
            </p>
  
            <h2 className="text-5xl font-black leading-tight text-white">
              AI that works like
              <br />
              your procurement team.
            </h2>
  
            <p className="mt-8 text-xl leading-9 text-slate-400">
              Every supplier, every contract, every invoice,
              every sourcing event—analyzed instantly by AI.
            </p>
  
          </div>
  
          {/* Grid */}
  
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
  
            {/* Left */}
  
            <div className="rounded-3xl border border-white/10 bg-[#0F2533] p-10">
  
              <div className="flex items-center justify-between">
  
                <div>
  
                  <p className="text-slate-400">
                    AI Procurement Dashboard
                  </p>
  
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Executive Overview
                  </h3>
  
                </div>
  
                <div className="rounded-xl bg-emerald-500/20 px-4 py-2 font-semibold text-emerald-400">
                  LIVE
                </div>
  
              </div>
  
              {/* Fake Chart */}
  
              <div className="mt-12 flex h-72 items-end gap-4">
  
                {[40,55,70,60,95,120,110,135,150].map((v)=>(
                  <div
                    key={v}
                    className="flex-1 rounded-t-2xl bg-gradient-to-t from-teal-500 to-emerald-400"
                    style={{height:`${v}px`}}
                  />
                ))}
  
              </div>
  
              <div className="mt-10 grid gap-5 md:grid-cols-3">
  
                <Stat
                  title="Spend"
                  value="$4.82M"
                />
  
                <Stat
                  title="Savings"
                  value="$638K"
                />
  
                <Stat
                  title="Suppliers"
                  value="268"
                />
  
              </div>
  
            </div>
  
            {/* Right */}
  
            <div className="space-y-6">
  
              <Insight
                icon={<Brain />}
                title="AI Copilot"
                text="Ask procurement questions naturally."
              />
  
              <Insight
                icon={<ShieldCheck />}
                title="Risk Detection"
                text="Identify supplier risks before they happen."
              />
  
              <Insight
                icon={<TrendingUp />}
                title="Spend Forecast"
                text="Predict next month's procurement spend."
              />
  
              <Insight
                icon={<FileText />}
                title="Contract Intelligence"
                text="Summarize long contracts in seconds."
              />
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  function Stat({
    title,
    value,
  }:{
    title:string;
    value:string;
  }){
    return(
      <div className="rounded-2xl bg-[#132C3B] p-6">
  
        <p className="text-slate-400">
          {title}
        </p>
  
        <h3 className="mt-3 text-3xl font-bold text-white">
          {value}
        </h3>
  
      </div>
    )
  }
  
  function Insight({
    icon,
    title,
    text,
  }:{
    icon:React.ReactNode;
    title:string;
    text:string;
  }){
    return(
  
      <div className="group rounded-3xl border border-white/10 bg-[#0F2533] p-7 transition hover:border-teal-400/20 hover:bg-[#123244]">
  
        <div className="mb-5 inline-flex rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 p-3 text-white">
          {icon}
        </div>
  
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
  
        <p className="mt-4 leading-7 text-slate-400">
          {text}
        </p>
  
        <div className="mt-6 flex items-center gap-2 text-teal-400">
  
          Learn More
  
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
  
        </div>
  
      </div>
  
    )
  }