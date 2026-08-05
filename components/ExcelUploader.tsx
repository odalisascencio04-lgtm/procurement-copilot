"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import type { SupplierQuote } from "@/lib/procurement/compareSuppliers";

interface ExcelUploaderProps {
  onDataLoaded: (suppliers: SupplierQuote[]) => void;
}

function getCellValue(row: Record<string, unknown>, keys: string[]) {
  for (const key of Object.keys(row)) {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, "");
    if (keys.includes(normalizedKey)) {
      return row[key];
    }
  }
  return undefined;
}

function parseRow(row: Record<string, unknown>): SupplierQuote | null {
  const supplier = getCellValue(row, ["supplier", "suppliername", "name"]);
  const price = getCellValue(row, ["price"]);
  const deliveryDays = getCellValue(row, ["deliverydays", "delivery"]);
  const warrantyYears = getCellValue(row, ["warrantyyears", "warranty"]);

  if (
    supplier === undefined ||
    price === undefined ||
    deliveryDays === undefined ||
    warrantyYears === undefined
  ) {
    return null;
  }

  return {
    supplier: String(supplier),
    price: Number(price),
    deliveryDays: Number(deliveryDays),
    warrantyYears: Number(warrantyYears),
  };
}

export default function ExcelUploader({ onDataLoaded }: ExcelUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      const data = loadEvent.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        defval: "",
      });

      console.log("First row:", rows[0]);
      
      const suppliers = rows
        .filter((row) => Object.values(row).some((value) => value !== ""))
        .map(parseRow)
        .filter((supplier): supplier is SupplierQuote => supplier !== null);
      
      console.log("Parsed suppliers:", suppliers);
      
      onDataLoaded(suppliers);
    };

    reader.readAsArrayBuffer(file);
  }

  function handleUploadClick() {
    inputRef.current?.click();
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Upload Supplier Quotes
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Upload an Excel file with columns: Supplier, Price, Delivery Days, and
        Warranty Years.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleUploadClick}
        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Upload Excel File
      </button>

      {fileName && (
        <p className="mt-4 text-sm text-gray-700">
          Selected file:{" "}
          <span className="font-medium text-gray-900">{fileName}</span>
        </p>
      )}
    </div>
  );
}
