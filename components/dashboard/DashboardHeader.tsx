"use client";

import ThemeToggle from "./ThemeToggle";
import {
  Bell,
  Search,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-10 flex items-center justify-between">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Procurement Dashboard
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Welcome back 👋
          Manage suppliers, contracts, purchase orders and AI insights.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="
            w-72
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-11
            pr-4
            shadow-sm
            outline-none
            transition
            focus:border-emerald-500
            dark:border-slate-700
            dark:bg-slate-900
            "
          />

        </div>

        {/* Notification */}

        <button className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900">

          <Bell size={20} />

        </button>

        <ThemeToggle />

        {/* Avatar */}

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white">

            D

          </div>

          <div>

            <p className="font-semibold">
              David
            </p>

            <p className="text-xs text-slate-500">
              Procurement Manager
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}