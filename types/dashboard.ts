export interface DashboardStats {
    suppliers: number;
    contracts: number;
    spend: number;
    risks: number;
  }
  
  export interface SpendData {
    month: string;
    spend: number;
  }
  
  export interface SupplierPerformance {
    name: string;
    rating: number;
  }
  
  export interface CategorySpend {
    category: string;
    total: number;
  }