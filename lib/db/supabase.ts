import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Supplier {
  id: number;
  name: string;
  category: string;
  on_time_delivery_rate: number;
  risk_score: number;
  contract_value: number;
}

export interface Purchase {
  id: number;
  supplier_id: number;
  amount: number;
  purchase_date: string;
}

export interface Contract {
  id: number;
  supplier_id: number;
  contract_value: number;
  expiry_date: string;
  status: string;
}

// Fetch all suppliers
export async function getSuppliers() {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*');
  
  if (error) throw error;
  return data as Supplier[];
}

// Fetch purchases with date range
export async function getPurchases(startDate?: string, endDate?: string) {
  let query = supabase.from('purchases').select('*');
  if (startDate) query = query.gte('purchase_date', startDate);
  if (endDate) query = query.lte('purchase_date', endDate);
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Purchase[];
}

// Fetch contracts
export async function getContracts() {
  const { data, error } = await supabase
    .from('contracts')
    .select('*');
  
  if (error) throw error;
  return data as Contract[];
}

// Get dashboard stats
export async function getDashboardStats() {
  const suppliers = await getSuppliers();
  const purchases = await getPurchases();
  const contracts = await getContracts();
  
  const totalSpend = purchases.reduce((sum, p) => sum + p.amount, 0);
  const expiringContracts = contracts.filter(c => {
    if (!c.expiry_date) return false;
    const days = (new Date(c.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 30;
  });
  
  return {
    totalSpend,
    suppliers: suppliers.length,
    contracts: contracts.length,
    riskAlerts: suppliers.filter(s => s.risk_score > 50).length,
    expiringContracts: expiringContracts.length,
    topSuppliers: suppliers.sort((a, b) => b.contract_value - a.contract_value).slice(0, 5),
    riskySuppliers: suppliers.filter(s => s.risk_score > 50),
    monthlySpend: purchases.reduce((acc, p) => {
      const month = new Date(p.purchase_date).getMonth();
      acc[month] = (acc[month] || 0) + p.amount;
      return acc;
    }, {} as Record<number, number>),
  };
}