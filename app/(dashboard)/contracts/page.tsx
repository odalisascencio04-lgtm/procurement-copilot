"use client";

import { useState } from "react";
import { Upload, FileText, Plus, AlertCircle } from "lucide-react";

interface Contract {
  id: string;
  supplier: string;
  value: number;
  expiry: string;
  status: "Active" | "Pending" | "Expired";
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      supplier: "Microsoft",
      value: 250000,
      expiry: "2026-12-31",
      status: "Active",
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newContract, setNewContract] = useState({
    supplier: "",
    value: "",
    expiry: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/api/ai/analyze-contract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      
      // Auto-populate the form with AI-extracted data
      setNewContract({
        supplier: data.supplier_name || "",
        value: data.contract_value?.toString() || "",
        expiry: data.expiry_date || "",
      });

      alert(`✅ AI extracted: ${data.supplier_name} | $${data.contract_value} | Expires: ${data.expiry_date}`);
      setShowForm(true);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to analyze contract. Please check the PDF.");
    } finally {
      setUploading(false);
    }
  };

  const addContract = () => {
    if (!newContract.supplier || !newContract.value || !newContract.expiry) {
      alert("Please fill in all fields");
      return;
    }

    setContracts([
      ...contracts,
      {
        id: Date.now().toString(),
        supplier: newContract.supplier,
        value: parseFloat(newContract.value),
        expiry: newContract.expiry,
        status: "Active",
      },
    ]);

    setNewContract({ supplier: "", value: "", expiry: "" });
    setShowForm(false);
  };

  return (
    <main className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Contract Management</h1>
          <p className="mt-2 text-slate-500">
            Track agreements, renewals, and supplier risks.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Upload PDF Button */}
          <label className="cursor-pointer bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
            <Upload size={20} />
            {uploading ? "Analyzing..." : "Upload PDF"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-slate-200 text-slate-800 px-5 py-3 rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            New Contract
          </button>
        </div>
      </div>

      {/* Add Contract Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
          <h3 className="font-semibold text-lg">Add New Contract</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Supplier Name"
              value={newContract.supplier}
              onChange={(e) => setNewContract({ ...newContract, supplier: e.target.value })}
              className="rounded-xl border px-4 py-2 outline-none focus:border-emerald-500"
            />
            <input
              placeholder="Contract Value ($)"
              type="number"
              value={newContract.value}
              onChange={(e) => setNewContract({ ...newContract, value: e.target.value })}
              className="rounded-xl border px-4 py-2 outline-none focus:border-emerald-500"
            />
            <input
              placeholder="Expiry Date (YYYY-MM-DD)"
              type="date"
              value={newContract.expiry}
              onChange={(e) => setNewContract({ ...newContract, expiry: e.target.value })}
              className="rounded-xl border px-4 py-2 outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addContract}
              className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600"
            >
              Save Contract
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-slate-200 px-6 py-2 rounded-xl hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-sm text-slate-600">Supplier</th>
                <th className="text-left px-6 py-4 font-semibold text-sm text-slate-600">Value</th>
                <th className="text-left px-6 py-4 font-semibold text-sm text-slate-600">Expiry</th>
                <th className="text-left px-6 py-4 font-semibold text-sm text-slate-600">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-sm text-slate-600">AI Review</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => {
                const daysUntilExpiry = Math.ceil(
                  (new Date(contract.expiry).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;

                return (
                  <tr key={contract.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{contract.supplier}</td>
                    <td className="px-6 py-4">${contract.value.toLocaleString()}</td>
                    <td className="px-6 py-4">{contract.expiry}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          contract.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isExpiringSoon ? (
                        <span className="flex items-center gap-1 text-amber-600 text-sm">
                          <AlertCircle size={16} />
                          Expires in {daysUntilExpiry} days
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">✓ On track</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}