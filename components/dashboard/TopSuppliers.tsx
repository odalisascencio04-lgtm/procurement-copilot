"use client";

interface Supplier {
  id: number;
  name: string;
  rating: number;
}

interface Props {
  suppliers: Supplier[];
}

export default function TopSuppliers({
  suppliers,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Top Suppliers
      </h2>

      <div className="space-y-4">

        {suppliers.length === 0 ? (

          <p className="text-gray-500">
            No suppliers found.
          </p>

        ) : (

          suppliers.map((supplier) => (

            <div
              key={supplier.id}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {supplier.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Supplier
                </p>

              </div>

              <div className="font-semibold text-yellow-500">
                {"⭐".repeat(supplier.rating)}
              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}