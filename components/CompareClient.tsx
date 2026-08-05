"use client";

import { useState } from "react";
import ExcelUploader from "./ExcelUploader";
import SupplierForm from "@/components/SupplierForm";
import SupplierTable from "@/components/SupplierTable";
import {
  compareSuppliers,
  type ComparisonResult,
  type SupplierQuote,
} from "@/lib/procurement/compareSuppliers";
import { setSuppliers } from "@/lib/store";

export default function CompareClient() {
  const [suppliers, setSuppliers] = useState<SupplierQuote[]>([]);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  function handleAddSupplier(supplier: SupplierQuote) {
    const updatedSuppliers = [...suppliers, supplier];
    setSuppliers(updatedSuppliers);
    
    if (updatedSuppliers.length >= 2) {
      setComparisonResult(compareSuppliers(updatedSuppliers));
    } else {
      setComparisonResult(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Supplier Comparison
      </h1>
      <ExcelUploader
        onDataLoaded={(loadedSuppliers) => {
            setSuppliers(loadedSuppliers);
            if (loadedSuppliers.length >= 2) {
                setComparisonResult(compareSuppliers(loadedSuppliers));
            } else {
                setComparisonResult(null);
            }   
  }}
/>
      <SupplierForm onAdd={handleAddSupplier} />

      {comparisonResult && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Recommended Supplier
          </h2>

          <p className="mb-1 text-2xl font-semibold text-blue-600">
            {comparisonResult.winner.supplier}
          </p>

          <div className="mt-4 space-y-1 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Price:</span> $
              {comparisonResult.winner.price.toLocaleString()}
            </p>
            <p>
              <span className="font-medium text-gray-900">Delivery Days:</span>{" "}
              {comparisonResult.winner.deliveryDays}
            </p>
            <p>
              <span className="font-medium text-gray-900">Warranty Years:</span>{" "}
              {comparisonResult.winner.warrantyYears}
            </p>
          </div>

          <h3 className="mb-2 mt-6 text-sm font-semibold text-gray-900">
            Reasons
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            {comparisonResult.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {suppliers.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            All Suppliers
          </h2>

          <SupplierTable suppliers={suppliers} />
        </div>
      )}
    </div>
  );
}
