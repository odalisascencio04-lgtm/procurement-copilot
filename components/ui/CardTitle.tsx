import { ReactNode } from "react";

export default function CardTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
      {children}
    </h2>
  );
}