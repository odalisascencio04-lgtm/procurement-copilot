export interface PurchaseOrder {
  id: number;

  supplier: string;

  item: string;

  quantity: number;

  total: number;

  status: string;

  created_at?: string;
}