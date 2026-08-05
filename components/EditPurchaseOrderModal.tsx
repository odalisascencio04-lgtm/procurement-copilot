"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { PurchaseOrder }
from "@/types/purchaseOrders";


interface Props {
  order: PurchaseOrder | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}


export default function EditPurchaseOrderModal({
  order,
  open,
  setOpen,
}: Props) {


  const [supplier, setSupplier] = useState(
    order?.supplier || ""
  );

  const [amount, setAmount] = useState(
    order?.amount || 0
  );

  const [status, setStatus] = useState(
    order?.status || "Pending"
  );



  async function updateOrder() {

    if (!order) {
      alert("No purchase order selected");
      return;
    }


    const { error: updateError } = await supabase
      .from("purchase_orders")
      .update({
        supplier,
        amount,
        status,
      })
      .eq(
        "id",
        order.id
      );



    if (updateError) {

      console.error(
        "Update error:",
        updateError
      );

      alert(
        updateError.message
      );

      return;
    }



    alert(
      "Purchase order updated!"
    );


    setOpen(false);

  }





  if (!open) {
    return null;
  }



  return (

    <div
      className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      bg-black/40
      "
    >


      <div
        className="
        w-full
        max-w-md
        rounded-2xl
        bg-white
        p-6
        shadow-xl
        "
      >


        <h2
          className="
          text-xl
          font-bold
          "
        >
          Edit Purchase Order
        </h2>



        <input

          value={supplier}

          onChange={
            e =>
              setSupplier(e.target.value)
          }

          placeholder="Supplier"

          className="
          mt-4
          w-full
          rounded-xl
          border
          p-3
          "

        />



        <input

          type="number"

          value={amount}

          onChange={
            e =>
              setAmount(
                Number(e.target.value)
              )
          }

          placeholder="Amount"

          className="
          mt-4
          w-full
          rounded-xl
          border
          p-3
          "

        />



        <select

          value={status}

          onChange={
            e =>
              setStatus(e.target.value)
          }

          className="
          mt-4
          w-full
          rounded-xl
          border
          p-3
          "

        >

          <option>
            Pending
          </option>

          <option>
            Approved
          </option>

          <option>
            Completed
          </option>

          <option>
            Cancelled
          </option>


        </select>



        <div
          className="
          mt-6
          flex
          gap-3
          "
        >

          <button

            onClick={updateOrder}

            className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-white
            "

          >
            Save
          </button>



          <button

            onClick={
              () => setOpen(false)
            }

            className="
            rounded-xl
            bg-gray-200
            px-5
            py-3
            "

          >

            Cancel

          </button>


        </div>


      </div>


    </div>

  );

}