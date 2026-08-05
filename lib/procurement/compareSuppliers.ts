export interface SupplierQuote {
    supplier: string;
    price: number;
    deliveryDays: number;
    warrantyYears: number;
  }
  
  export interface ComparisonResult {
    winner: SupplierQuote;
    reasons: string[];
  }
  
  export function compareSuppliers(
    quotes: SupplierQuote[]
  ): ComparisonResult {
    if (quotes.length === 0) {
      throw new Error("No supplier quotes provided.");
    }
  
    const winner = [...quotes].sort((a, b) => {
      const scoreA =
        a.price * 0.5 +
        a.deliveryDays * 0.3 -
        a.warrantyYears * 1000;
  
      const scoreB =
        b.price * 0.5 +
        b.deliveryDays * 0.3 -
        b.warrantyYears * 1000;
  
      return scoreA - scoreB;
    })[0];
  
    const reasons: string[] = [];
  
    const lowestPrice = Math.min(...quotes.map(q => q.price));
    const fastestDelivery = Math.min(...quotes.map(q => q.deliveryDays));
    const longestWarranty = Math.max(...quotes.map(q => q.warrantyYears));
  
    if (winner.price === lowestPrice) {
      reasons.push("Lowest price");
    }
  
    if (winner.deliveryDays === fastestDelivery) {
      reasons.push("Fastest delivery");
    }
  
    if (winner.warrantyYears === longestWarranty) {
      reasons.push("Longest warranty");
    }
  
    return {
      winner,
      reasons,
    };
  }