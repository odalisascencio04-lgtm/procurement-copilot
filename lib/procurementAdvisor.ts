import { getSuppliers } from "./store";

export function procurementAdvisor(): string {
  const suppliers = getSuppliers();

  if (suppliers.length === 0) {
    return "No suppliers are available.";
  }

  const best = suppliers.reduce((best, current) => {
    const bestScore =
      best.price * 0.5 +
      best.deliveryDays * 200 -
      best.warrantyYears * 1000;

    const currentScore =
      current.price * 0.5 +
      current.deliveryDays * 200 -
      current.warrantyYears * 1000;

    return currentScore < bestScore ? current : best;
  });

  return `
Recommended Supplier: ${best.supplier}

Price: $${best.price.toLocaleString()}
Delivery: ${best.deliveryDays} days
Warranty: ${best.warrantyYears} years

Reason:
This supplier provides the best balance of price, delivery speed, and warranty.
`;
}