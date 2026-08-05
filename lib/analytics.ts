import { supabase } from "./supabase";

export async function getCategorySpend() {
  const { data, error } = await supabase
    .from("purchase_orders")
    .select("category,total");

  if (error) throw error;

  const totals: Record<string, number> = {};

  data.forEach((order) => {
    totals[order.category] =
      (totals[order.category] || 0) +
      Number(order.total);
  });

  return Object.entries(totals).map(
    ([category, total]) => ({
      category,
      total,
    })
  );
}