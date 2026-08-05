"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  viewHref: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({
  viewHref,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">

      <Link
        href={viewHref}
        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
      >
        <Eye size={18} />
      </Link>

      <button
        onClick={onEdit}
        className="rounded-lg bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}