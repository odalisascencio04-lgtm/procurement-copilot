
import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle,
  Download,
  Sparkles,
} from "lucide-react";


export default async function PurchaseOrderDetail({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const { id } = await params;



  return (

    <div
      className="
      min-h-screen
      bg-slate-50
      p-8
      "
    >



      {/* BACK BUTTON */}

      <Link

        href="/purchase-orders"

        className="
        flex
        items-center
        gap-2
        text-slate-500
        hover:text-emerald-600
        "

      >

        <ArrowLeft size={18} />

        Back to Purchase Orders

      </Link>





      {/* HEADER */}

      <div
        className="
        mt-6
        flex
        items-center
        justify-between
        "
      >


        <div>


          <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            "
          >

            {id}

          </h1>



          <span
            className="
            mt-3
            inline-block
            rounded-full
            bg-emerald-100
            px-4
            py-1
            text-emerald-700
            "
          >

            Approved

          </span>



        </div>





        <button

          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-emerald-600
          px-5
          py-3
          text-white
          hover:bg-emerald-700
          "

        >

          <Download size={18}/>

          Download PDF


        </button>



      </div>









      {/* TOP CARDS */}


      <div
        className="
        mt-8
        grid
        gap-6
        lg:grid-cols-3
        "
      >




        {/* SUPPLIER */}


        <div
          className="
          rounded-2xl
          bg-white
          p-6
          shadow
          "
        >


          <h2
            className="
            text-xl
            font-bold
            "
          >

            Supplier

          </h2>



          <div
            className="
            mt-5
            space-y-2
            text-slate-600
            "
          >

            <p className="font-semibold text-slate-900">
              Dell Technologies
            </p>


            <p>
              Contact: John Smith
            </p>


            <p>
              john@dell.com
            </p>



          </div>



          <div
            className="
            mt-5
            rounded-xl
            bg-emerald-50
            p-4
            text-emerald-700
            "
          >

            🟢 Low Risk Supplier


          </div>



        </div>









        {/* AI REVIEW */}


        <div
          className="
          rounded-2xl
          bg-white
          p-6
          shadow
          lg:col-span-2
          "
        >


          <h2
            className="
            flex
            items-center
            gap-2
            text-xl
            font-bold
            "
          >


            <Sparkles
              className="text-emerald-500"
            />


            AI Procurement Review


          </h2>




          <div
            className="
            mt-5
            space-y-3
            "
          >


            <p>
              ✅ Supplier history is positive
            </p>


            <p>
              ✅ Price is 8% below market average
            </p>


            <p>
              ⚠ Contract renewal needed soon
            </p>



            <div
              className="
              rounded-xl
              bg-slate-100
              p-4
              "
            >

              AI Confidence:

              <strong>
                94%
              </strong>


            </div>


          </div>



        </div>



      </div>









      {/* ITEMS TABLE */}


      <div
        className="
        mt-6
        overflow-hidden
        rounded-2xl
        bg-white
        shadow
        "
      >


        <h2
          className="
          p-6
          text-xl
          font-bold
          "
        >

          Purchase Items

        </h2>




        <table
          className="
          w-full
          "
        >


          <thead
            className="
            bg-slate-100
            "
          >


            <tr>

              <th className="px-6 py-4 text-left">
                Item
              </th>


              <th className="px-6 py-4 text-left">
                Quantity
              </th>


              <th className="px-6 py-4 text-left">
                Price
              </th>


              <th className="px-6 py-4 text-left">
                Total
              </th>


            </tr>


          </thead>





          <tbody>


            <tr className="border-t">


              <td className="px-6 py-4">
                Dell Laptop XPS
              </td>


              <td className="px-6 py-4">
                20
              </td>


              <td className="px-6 py-4">
                $1500
              </td>


              <td className="px-6 py-4">
                $30000
              </td>


            </tr>





            <tr className="border-t">


              <td className="px-6 py-4">
                Monitor
              </td>


              <td className="px-6 py-4">
                20
              </td>


              <td className="px-6 py-4">
                $300
              </td>


              <td className="px-6 py-4">
                $6000
              </td>


            </tr>


          </tbody>


        </table>


      </div>









      {/* APPROVAL TIMELINE */}


      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        p-6
        shadow
        "
      >


        <h2
          className="
          text-xl
          font-bold
          "
        >

          Approval Timeline

        </h2>



        <div
          className="
          mt-5
          space-y-5
          "
        >


          <div className="flex gap-3">


            <CheckCircle
              className="text-emerald-500"
            />


            <div>

              <p className="font-semibold">
                Request Created
              </p>

              <p className="text-sm text-slate-500">
                Aug 1, 2026
              </p>

            </div>


          </div>





          <div className="flex gap-3">


            <CheckCircle
              className="text-emerald-500"
            />


            <div>

              <p className="font-semibold">
                Manager Approved
              </p>


              <p className="text-sm text-slate-500">
                Aug 2, 2026
              </p>


            </div>


          </div>




        </div>


      </div>



    </div>

  );

}