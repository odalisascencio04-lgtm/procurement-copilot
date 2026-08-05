import type { SupplierQuote } from "@/lib/procurement/compareSuppliers";

interface SupplierTableProps {
  suppliers: SupplierQuote[];
}

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`;
}

export default function SupplierTable({ suppliers }: SupplierTableProps) {
  if (suppliers.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Delivery Days</th>
              <th className="px-4 py-3 font-medium">Warranty Years</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr
                key={`${supplier.supplier}-${index}`}
                className="border-t border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {supplier.supplier}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {formatPrice(supplier.price)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {supplier.deliveryDays}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {supplier.warrantyYears}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
