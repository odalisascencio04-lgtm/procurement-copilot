import Link from "next/link";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#071B24] via-[#0B2533] to-[#10384A]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-8">

        <div className="grid w-full gap-20 lg:grid-cols-2">

          {/* Left */}

          <div className="flex flex-col justify-center">

            <div className="mb-6 inline-flex w-fit rounded-full border border-teal-400/30 bg-teal-500/10 px-5 py-2 text-sm font-semibold text-teal-300">
              AI-Powered Procurement Platform
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-white">
              Spend Control,
              <br />
              Simplified.
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
              AI analyzes your suppliers, spending, and contracts
              to uncover savings opportunities, supplier risks,
              and purchasing mistakes before they cost you money.
            </p>

            <div className="mt-12 flex gap-5">

              <Link
                href="/register"
                className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600"
              >
                Book Demo
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Platform
              </Link>

            </div>

          </div>

          {/* Right */}

          <HeroDashboard />

        </div>

      </div>
    </section>
  );
}