"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AISupplierRecommendation from "@/components/AISupplierRecommendation";

interface Quotation {
  id: number;
  rfq_id: number;
  supplier: string;
  price: number;
  delivery_days: number;
  rating: number;
}

export default function QuotationsPage() {
  const [quotes, setQuotes] = useState<Quotation[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    const { data } = await supabase
      .from("quotations")
      .select("*")
      .order("rfq_id");

    if (data) setQuotes(data);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Supplier Quotations
          </h1>

          <p className="mt-2 text-gray-600">
            Compare supplier quotations.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          + Add Quotation
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">RFQ</th>
              <th className="px-6 py-4 text-left">Supplier</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Delivery</th>
              <th className="px-6 py-4 text-left">Rating</th>
            </tr>
          </thead>

          <tbody>

            {quotes.map((quote) => (

              <tr
                key={quote.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  RFQ #{quote.rfq_id}
                </td>

                <td className="px-6 py-4">
                  {quote.supplier}
                </td>

                <td className="px-6 py-4">
                  ${Number(quote.price).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {quote.delivery_days} days
                </td>

                <td className="px-6 py-4">
                  ⭐ {quote.rating}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <AISupplierRecommendation quotes={quotes} />

    </main>
  );
}