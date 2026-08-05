"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, BarChart3, PieChart } from "lucide-react";

interface AnalyticsData {
  totalSpend: number;
  averageSpend: number;
  spendGrowth: number;
  categoryBreakdown: { category: string; amount: number; percentage: number }[];
  monthlyData: { month: string; amount: number }[];
  yearlyComparison: { year: number; amount: number }[];
  topCategories: { category: string; count: number }[];
  costSavings: number;
  savingsRate: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Analytics error:", error);
        // Fallback data
        setData({
          totalSpend: 184000,
          averageSpend: 15333,
          spendGrowth: 12.5,
          categoryBreakdown: [
            { category: "Electronics", amount: 68000, percentage: 37 },
            { category: "Office Supplies", amount: 42000, percentage: 23 },
            { category: "Materials", amount: 38000, percentage: 20.6 },
            { category: "Software", amount: 22000, percentage: 12 },
            { category: "Services", amount: 14000, percentage: 7.4 },
          ],
          monthlyData: [
            { month: "Jan", amount: 12000 },
            { month: "Feb", amount: 15000 },
            { month: "Mar", amount: 18000 },
            { month: "Apr", amount: 14000 },
            { month: "May", amount: 21000 },
            { month: "Jun", amount: 19000 },
            { month: "Jul", amount: 16000 },
            { month: "Aug", amount: 17000 },
            { month: "Sep", amount: 20000 },
            { month: "Oct", amount: 15000 },
            { month: "Nov", amount: 18000 },
            { month: "Dec", amount: 19000 },
          ],
          yearlyComparison: [
            { year: 2023, amount: 162000 },
            { year: 2024, amount: 184000 },
            { year: 2025, amount: 198000 },
          ],
          topCategories: [
            { category: "Electronics", count: 45 },
            { category: "Office Supplies", count: 32 },
            { category: "Materials", count: 28 },
            { category: "Software", count: 15 },
            { category: "Services", count: 10 },
          ],
          costSavings: 12500,
          savingsRate: 6.8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!data) return <div>Failed to load analytics</div>;

  const maxMonthly = Math.max(...data.monthlyData.map(m => m.amount));

  return (
    <main className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <BarChart3 className="text-emerald-500" size={32} />
          Spend Analytics
        </h1>
        <p className="mt-1 text-slate-500">
          Deep insights into your procurement spending patterns
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total Spend</span>
            <DollarSign className="text-emerald-500" size={20} />
          </div>
          <p className="text-3xl font-bold mt-2 text-slate-800">
            ${data.totalSpend.toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">Annual total</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Monthly Average</span>
            <Package className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold mt-2 text-slate-800">
            ${data.averageSpend.toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">Per month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Growth</span>
            {data.spendGrowth > 0 ? (
              <TrendingUp className="text-green-500" size={20} />
            ) : (
              <TrendingDown className="text-red-500" size={20} />
            )}
          </div>
          <p className={`text-3xl font-bold mt-2 ${data.spendGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.spendGrowth > 0 ? '+' : ''}{data.spendGrowth}%
          </p>
          <p className="text-sm text-slate-400">Year over year</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Savings</span>
            <TrendingUp className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold mt-2 text-emerald-600">
            ${data.costSavings.toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">{data.savingsRate}% of spend</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-emerald-500" />
            Category Breakdown
          </h3>
          <div className="space-y-4">
            {data.categoryBreakdown.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{cat.category}</span>
                  <span className="font-medium">
                    ${cat.amount.toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                <div className="mt-1 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000`}
                    style={{ 
                      width: `${cat.percentage}%`,
                      background: `hsl(${i * 60 + 120}, 70%, 50%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            Monthly Trend
          </h3>
          <div className="space-y-2">
            {data.monthlyData.map((month, i) => {
              const height = (month.amount / maxMonthly) * 100;
              const isHigh = month.amount > data.averageSpend;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-8">{month.month}</span>
                  <div className="flex-1 h-10 bg-slate-100 rounded-lg overflow-hidden relative">
                    <div 
                      className={`h-full rounded-lg transition-all duration-1000 flex items-center px-2 ${
                        isHigh ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                      style={{ width: `${height}%` }}
                    >
                      <span className="text-xs text-white font-medium">
                        ${(month.amount / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Yearly Comparison */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Yearly Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.yearlyComparison.map((year, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500">{year.year}</p>
              <p className="text-2xl font-bold text-slate-800">
                ${year.amount.toLocaleString()}
              </p>
              {i > 0 && (
                <p className={`text-sm ${year.amount > data.yearlyComparison[i-1].amount ? 'text-green-600' : 'text-red-600'}`}>
                  {year.amount > data.yearlyComparison[i-1].amount ? '+' : ''}
                  {((year.amount - data.yearlyComparison[i-1].amount) / data.yearlyComparison[i-1].amount * 100).toFixed(1)}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Package size={18} className="text-purple-500" />
          Top Purchased Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data.topCategories.map((cat, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-slate-800">{cat.count}</p>
              <p className="text-xs text-slate-500">{cat.category}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}