"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TableToolbar({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          placeholder="Search..."
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          pl-10
          pr-4
          outline-none
          focus:border-emerald-500
          "
        />

      </div>

    </div>
  );
}