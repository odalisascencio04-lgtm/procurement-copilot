"use client";

import { useState, useRef } from "react";
import { Sparkles, Send, Loader2, FileText, Users, Calendar, DollarSign, CheckCircle, Plus, X, Rocket } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  deliveryRate: number;
  riskScore: number;
  selected: boolean;
}

interface RFQData {
  title: string;
  description: string;
  category: string;
  quantity: number;
  estimatedBudget: number;
  currency: string;
  deadline: string;
  deliveryLocation: string;
  paymentTerms: string;
  suggestedSuppliers: Supplier[];
}

export default function RFQPage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [rfqData, setRfqData] = useState<RFQData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [savedRFQs, setSavedRFQs] = useState<any[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Generate RFQ from natural language
  const generateRFQ = async () => {
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
    setRfqData(null);

    try {
      const response = await fetch("/api/ai/generate-rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: input.trim() }),
      });

      if (!response.ok) throw new Error("Failed to generate RFQ");

      const data = await response.json();
      
      // Format the data for display
      const formattedData: RFQData = {
        title: data.rfq_title || `RFQ: ${input.trim().slice(0, 30)}...`,
        description: data.description || input.trim(),
        category: data.category || "General",
        quantity: data.quantity || 1,
        estimatedBudget: data.estimated_budget || 0,
        currency: data.currency || "USD",
        deadline: data.delivery_deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveryLocation: data.delivery_location || "TBD",
        paymentTerms: data.payment_terms || "Net 30",
        suggestedSuppliers: data.suggested_suppliers?.map((s: any, i: number) => ({
          id: `supplier-${i}`,
          name: s.name || `Supplier ${i + 1}`,
          category: s.category || "General",
          deliveryRate: s.delivery_rate || 85,
          riskScore: s.risk_score || 30,
          selected: i === 0,
        })) || [],
      };

      setRfqData(formattedData);
      setShowForm(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (error) {
      console.error("RFQ generation error:", error);
      alert("Oops! Something went wrong. Try again? 🤔");
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle supplier selection
  const toggleSupplier = (id: string) => {
    if (!rfqData) return;
    setRfqData({
      ...rfqData,
      suggestedSuppliers: rfqData.suggestedSuppliers.map((s) =>
        s.id === id ? { ...s, selected: !s.selected } : s
      ),
    });
  };

  // Save RFQ
  const saveRFQ = () => {
    if (!rfqData) return;
    const newRFQ = {
      id: Date.now().toString(),
      ...rfqData,
      createdAt: new Date().toISOString(),
      status: "Draft",
    };
    setSavedRFQs([newRFQ, ...savedRFQs]);
    alert("✅ RFQ saved successfully!");
    setShowForm(false);
    setRfqData(null);
    setInput("");
  };

  return (
    <main className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Rocket className="text-emerald-500" size={32} />
            Request for Quotations
          </h1>
          <p className="mt-1 text-slate-500">
            Just describe what you need, and AI generates a complete RFQ instantly.
          </p>
        </div>
        <div className="text-sm bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          AI Powered
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-700">
            Describe what you need to purchase:
          </label>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I need 50 MacBook Pro 16-inch with M3 Max, 32GB RAM, 1TB storage. Budget is around $3,000 each. Need delivery to NYC within 2 weeks."
            className="w-full rounded-xl border border-slate-200 px-5 py-4 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all min-h-[120px] resize-y text-slate-800"
            disabled={isGenerating}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">
              {input.length} characters
            </span>
            <button
              onClick={generateRFQ}
              disabled={isGenerating || !input.trim()}
              className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-all disabled:bg-emerald-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate RFQ
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-500"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">AI is analyzing your request...</h3>
              <p className="text-sm text-slate-500">Searching for the best suppliers and generating terms</p>
            </div>
          </div>
        </div>
      )}

      {/* RFQ Result */}
      {rfqData && showForm && !isGenerating && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{rfqData.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">{rfqData.description}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">AI Generated</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FileText className="text-emerald-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="text-sm font-medium">{rfqData.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="text-sm font-medium">${rfqData.estimatedBudget.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="text-sm font-medium">{rfqData.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Users className="text-yellow-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Suppliers</p>
                  <p className="text-sm font-medium">{rfqData.suggestedSuppliers.filter(s => s.selected).length} selected</p>
                </div>
              </div>
            </div>

            {/* Suppliers */}
            <div className="p-6 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Users size={18} className="text-emerald-500" />
                Suggested Suppliers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rfqData.suggestedSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    onClick={() => toggleSupplier(supplier.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      supplier.selected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{supplier.name}</p>
                          <p className="text-xs text-slate-500">Delivery: {supplier.deliveryRate}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {supplier.selected && (
                          <CheckCircle className="text-emerald-500" size={18} />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          supplier.riskScore > 70 ? "bg-red-100 text-red-700" :
                          supplier.riskScore > 40 ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {supplier.riskScore > 70 ? "High Risk" :
                           supplier.riskScore > 40 ? "Med Risk" :
                           "Low Risk"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="p-6 border-b border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Payment Terms</p>
                  <p className="text-sm font-medium">{rfqData.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Delivery Location</p>
                  <p className="text-sm font-medium">{rfqData.deliveryLocation}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-slate-50 flex flex-wrap gap-3">
              <button
                onClick={saveRFQ}
                className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Save RFQ
              </button>
              <button
                onClick={() => {
                  alert("📧 RFQ sent to selected suppliers!");
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                Send to Suppliers
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setRfqData(null);
                  setInput("");
                }}
                className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved RFQs */}
      {savedRFQs.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FileText size={18} className="text-emerald-500" />
            Saved RFQs
          </h3>
          <div className="space-y-2">
            {savedRFQs.slice(0, 5).map((rfq: any) => (
              <div key={rfq.id} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{rfq.title}</p>
                  <p className="text-xs text-slate-500">${rfq.estimatedBudget.toLocaleString()} · {rfq.deadline}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {rfq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}