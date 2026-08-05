"use client";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">

      {[1, 2, 3, 4, 5].map((row) => (

        <div
          key={row}
          className="h-14 animate-pulse rounded-xl bg-slate-200"
        />

      ))}

    </div>
  );
}