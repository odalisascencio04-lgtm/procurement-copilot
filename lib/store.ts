import type { SupplierQuote } from "./procurement/compareSuppliers";

let suppliers: SupplierQuote[] = [
  {
    supplier: "Dell",
    price: 12000,
    deliveryDays: 7,
    warrantyYears: 3,
  },
  {
    supplier: "HP",
    price: 9800,
    deliveryDays: 10,
    warrantyYears: 2,
  },
  {
    supplier: "Cisco",
    price: 14500,
    deliveryDays: 5,
    warrantyYears: 5,
  },
];

export function getSuppliers() {
  return suppliers;
}

export function setSuppliers(data: SupplierQuote[]) {
  suppliers = data;
}

export function addSupplier(supplier: SupplierQuote) {
  suppliers.push(supplier);
}