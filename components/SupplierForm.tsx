"use client";

import { useState } from "react";
import type { SupplierQuote } from "@/lib/procurement/compareSuppliers";

interface SupplierFormProps {
  onAdd: (supplier: SupplierQuote) => void;
}

export default function SupplierForm({ onAdd }: SupplierFormProps) {
  const [supplierName, setSupplierName] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [warrantyYears, setWarrantyYears] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const supplier: SupplierQuote = {
      supplier: supplierName,
      price: Number(price),
      deliveryDays: Number(deliveryDays),
      warrantyYears: Number(warrantyYears),
    };

    onAdd(supplier);

    setSupplierName("");
    setPrice("");
    setDeliveryDays("");
    setWarrantyYears("");
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Add Supplier Quote
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="supplierName"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Supplier Name
          </label>
          <input
            id="supplierName"
            type="text"
            required
            value={supplierName}
            onChange={(event) => setSupplierName(event.target.value)}
            placeholder="e.g. Dell"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="price"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              required
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="12500"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="deliveryDays"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Delivery Days
            </label>
            <input
              id="deliveryDays"
              type="number"
              required
              min="0"
              value={deliveryDays}
              onChange={(event) => setDeliveryDays(event.target.value)}
              placeholder="10"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="warrantyYears"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Warranty Years
            </label>
            <input
              id="warrantyYears"
              type="number"
              required
              min="0"
              value={warrantyYears}
              onChange={(event) => setWarrantyYears(event.target.value)}
              placeholder="2"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
}
