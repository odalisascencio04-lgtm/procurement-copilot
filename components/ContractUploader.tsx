"use client";

import { useState } from "react";
import ContractSummary from "./ContractSummary";

export default function ContractUploader() {
  const [fileName, setFileName] = useState("");

  const [analysis, setAnalysis] = useState<{
    supplier: string;
    duration: string;
    payment: string;
    risk: string;
    recommendation: string;
  } | null>(null);

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    // Placeholder until AI integration
    setAnalysis({
      supplier: "Dell Technologies",
      duration: "12 Months",
      payment: "Net 30",
      risk: "Low",
      recommendation:
        "Pricing is competitive. Renew the contract after negotiating a 5% volume discount.",
    });
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <input
        type="file"
        accept=".pdf"
        onChange={uploadFile}
      />

      {fileName && (
        <p className="mt-4">
          Uploaded:
          <strong> {fileName}</strong>
        </p>
      )}

      {analysis && (
        <ContractSummary
          supplier={analysis.supplier}
          duration={analysis.duration}
          payment={analysis.payment}
          risk={analysis.risk}
          recommendation={analysis.recommendation}
        />
      )}
    </div>
  );
}