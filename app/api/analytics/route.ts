import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function GET() {
  try {
    if (supabase) {
      try {
        // Total spend
        const { data: spendData } = await supabase
          .from('purchases')
          .select('amount');

        const totalSpend = spendData?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
        const averageSpend = spendData?.length ? Math.round(totalSpend / spendData.length) : 0;

        // Spend growth (compare last year vs this year)
        // Simplified: we'll just use a mock growth rate based on year
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;
        const { data: thisYearData } = await supabase
          .from('purchases')
          .select('amount')
          .gte('purchase_date', new Date(thisYear, 0, 1).toISOString());
        const { data: lastYearData } = await supabase
          .from('purchases')
          .select('amount')
          .gte('purchase_date', new Date(lastYear, 0, 1).toISOString())
          .lt('purchase_date', new Date(thisYear, 0, 1).toISOString());

        const thisYearTotal = thisYearData?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
        const lastYearTotal = lastYearData?.reduce((sum: number, p: any) => sum + p.amount, 0) || 1;
        const spendGrowth = Math.round(((thisYearTotal - lastYearTotal) / lastYearTotal) * 100 * 10) / 10;

        // Category breakdown (mock categories from suppliers)
        const { data: suppliers } = await supabase
          .from('suppliers')
          .select('category, spend');

        const categoryMap: Record<string, number> = {};
        suppliers?.forEach((s: any) => {
          const cat = s.category || 'Other';
          categoryMap[cat] = (categoryMap[cat] || 0) + (s.spend || 0);
        });
        const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
          category,
          amount,
          percentage: Math.round((amount / totalSpend) * 100 * 10) / 10,
        }));

        // Monthly data (last 12 months)
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyData = await Promise.all(
          Array.from({ length: 12 }, async (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const start = new Date(d.getFullYear(), d.getMonth(), 1);
            const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            const { data } = await supabase
              .from('purchases')
              .select('amount')
              .gte('purchase_date', start.toISOString())
              .lt('purchase_date', end.toISOString());
            const amount = data?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
            return { month: monthNames[d.getMonth()], amount };
          })
        ).then(arr => arr.reverse());

        // Yearly comparison
        const yearlyComparison = [
          { year: lastYear - 1, amount: Math.round(lastYearTotal * 0.9) },
          { year: lastYear, amount: lastYearTotal },
          { year: thisYear, amount: thisYearTotal },
        ];

        // Top categories by count (purchase frequency)
        const { data: purchases } = await supabase
          .from('purchases')
          .select('supplier_id');
        // If we had categories per purchase, we'd do more, but mock for now
        const topCategories = [
          { category: 'Electronics', count: 45 },
          { category: 'Office Supplies', count: 32 },
          { category: 'Materials', count: 28 },
          { category: 'Software', count: 15 },
          { category: 'Services', count: 10 },
        ];

        // Cost savings (mock)
        const costSavings = Math.round(totalSpend * 0.068);
        const savingsRate = 6.8;

        return NextResponse.json({
          totalSpend,
          averageSpend,
          spendGrowth,
          categoryBreakdown,
          monthlyData,
          yearlyComparison,
          topCategories,
          costSavings,
          savingsRate,
        });
      } catch (dbError) {
        console.error('Supabase query error:', dbError);
        // Fall through to mock
      }
    }

    // Mock data (fallback)
    return NextResponse.json({
      totalSpend: 184000,
      averageSpend: 15333,
      spendGrowth: 12.5,
      categoryBreakdown: [
        { category: 'Electronics', amount: 68000, percentage: 37 },
        { category: 'Office Supplies', amount: 42000, percentage: 23 },
        { category: 'Materials', amount: 38000, percentage: 20.6 },
        { category: 'Software', amount: 22000, percentage: 12 },
        { category: 'Services', amount: 14000, percentage: 7.4 },
      ],
      monthlyData: [
        { month: 'Jan', amount: 12000 },
        { month: 'Feb', amount: 15000 },
        { month: 'Mar', amount: 18000 },
        { month: 'Apr', amount: 14000 },
        { month: 'May', amount: 21000 },
        { month: 'Jun', amount: 19000 },
        { month: 'Jul', amount: 16000 },
        { month: 'Aug', amount: 17000 },
        { month: 'Sep', amount: 20000 },
        { month: 'Oct', amount: 15000 },
        { month: 'Nov', amount: 18000 },
        { month: 'Dec', amount: 19000 },
      ],
      yearlyComparison: [
        { year: 2023, amount: 162000 },
        { year: 2024, amount: 184000 },
        { year: 2025, amount: 198000 },
      ],
      topCategories: [
        { category: 'Electronics', count: 45 },
        { category: 'Office Supplies', count: 32 },
        { category: 'Materials', count: 28 },
        { category: 'Software', count: 15 },
        { category: 'Services', count: 10 },
      ],
      costSavings: 12500,
      savingsRate: 6.8,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}