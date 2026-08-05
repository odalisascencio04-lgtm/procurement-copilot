"use client";

import { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b bg-slate-50">

            <tr>

              {columns.map((column) => (

                <th
                  key={column.header}
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-600"
                  style={{
                    width: column.width,
                  }}
                >
                  {column.header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr
                key={index}
                className="border-b transition hover:bg-slate-50"
              >

                {columns.map((column) => (

                  <td
                    key={column.header}
                    className="px-6 py-5"
                  >
                    {column.render(row)}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}