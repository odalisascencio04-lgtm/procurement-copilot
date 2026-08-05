"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Approval {
  id: number;
  po_id: number;
  approver: string;
  status: string;
  comments: string;
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);

  useEffect(() => {
    loadApprovals();
  }, []);

  async function loadApprovals() {
    const { data } = await supabase
      .from("approvals")
      .select("*")
      .order("id");

    if (data) setApprovals(data);
  }

  async function updateStatus(
    approvalId: number,
    poId: number,
    status: string
  ) {
    // Update approval record
    await supabase
      .from("approvals")
      .update({ status })
      .eq("id", approvalId);
  
    // Update purchase order status
    await supabase
      .from("purchase_orders")
      .update({
        status:
          status === "Approved"
            ? "Approved"
            : "Rejected",
      })
      .eq("id", poId);
  
    loadApprovals();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Purchase Order Approvals
      </h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">

<div className="rounded-2xl bg-white p-6 shadow">
  <p className="text-gray-500">Pending</p>
  <h2 className="mt-2 text-4xl font-bold text-yellow-600">
    {
      approvals.filter(a => a.status === "Pending").length
    }
  </h2>
</div>

<div className="rounded-2xl bg-white p-6 shadow">
  <p className="text-gray-500">Approved</p>
  <h2 className="mt-2 text-4xl font-bold text-green-600">
    {
      approvals.filter(a => a.status === "Approved").length
    }
  </h2>
</div>

<div className="rounded-2xl bg-white p-6 shadow">
  <p className="text-gray-500">Rejected</p>
  <h2 className="mt-2 text-4xl font-bold text-red-600">
    {
      approvals.filter(a => a.status === "Rejected").length
    }
  </h2>
</div>

</div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="px-6 py-4 text-left">PO</th>
              <th className="px-6 py-4 text-left">Approver</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Comments</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {approvals.map((approval) => (

              <tr
                key={approval.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  PO #{approval.po_id}
                </td>

                <td className="px-6 py-4">
                  {approval.approver}
                </td>

                <td className="px-6 py-4">
                 <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  approval.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : approval.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                   }`}
                 >
                 {approval.status}
                 </span>
                </td>

                <td className="px-6 py-4">
                  {approval.comments}
                </td>

                <td className="px-6 py-4 space-x-2">

                <button
                onClick={() =>
                updateStatus(
                approval.id,
                approval.po_id,
                "Approved"
                )
                }
                className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                >
                Approve
                </button>

                <button
                onClick={() =>
                updateStatus(
                approval.id,
                approval.po_id,
                "Rejected"
                )
                }
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                Reject
                </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}