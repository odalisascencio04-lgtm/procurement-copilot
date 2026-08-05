"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  supplier: any;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditSupplierModal({
  supplier,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setCategory(supplier.category);
      setStatus(supplier.status);
      setRating(supplier.rating);
    }
  }, [supplier]);

  if (!supplier) return null;

  async function handleUpdate() {
    const { error } = await supabase
      .from("suppliers")
      .update({
        name,
        category,
        status,
        rating,
      })
      .eq("id", supplier.id);

    if (error) {
      alert(error.message);
      return;
    }

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          Edit Supplier
        </h2>

        <div className="space-y-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border rounded-xl px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white rounded-xl px-5 py-2"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}