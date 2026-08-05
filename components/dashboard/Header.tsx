import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">

      <div>

        <p className="text-slate-400">
          Welcome back 👋
        </p>

        <h1 className="mt-2 text-4xl font-black text-white">
          Dashboard
        </h1>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-500"
          />

          <input
            placeholder="Search..."
            className="w-80 rounded-2xl border border-white/10 bg-[#102A39] py-4 pl-11 pr-5 text-white outline-none"
          />

        </div>

        <button className="rounded-2xl bg-[#102A39] p-4">

          <Bell className="text-white" />

        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-[#102A39] p-2 pr-5">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white">
            D
          </div>

          <div>

            <h3 className="font-semibold text-white">
              David
            </h3>

            <p className="text-sm text-slate-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}