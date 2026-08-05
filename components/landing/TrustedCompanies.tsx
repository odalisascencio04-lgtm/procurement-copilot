export default function TrustedCompanies() {
    const companies = [
      "Microsoft",
      "Dell",
      "Oracle",
      "Cisco",
      "IBM",
      "SAP",
    ];
  
    return (
      <section className="bg-[#071B24] py-24">
  
        <div className="mx-auto max-w-7xl px-8">
  
          <p className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
            Trusted by Procurement Teams Worldwide
          </p>
  
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
  
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-20 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] text-lg font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/20 hover:bg-white/[0.05] hover:text-white"
              >
                {company}
              </div>
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  }