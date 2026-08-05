"use client";

import { useState } from "react";


interface AISupplierRecommendationProps {
  quotes: any[];
}


export default function AISupplierRecommendation({
  quotes,
}: AISupplierRecommendationProps) {


  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);



  async function recommend() {


    setLoading(true);


    try {


      const response =
        await fetch(
          "/api/supplier-recommendation",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },


            body: JSON.stringify(
              quotes
            ),

          }
        );



      const data =
        await response.json();



      setResult(

        typeof data.result === "string"

          ? data.result

          : JSON.stringify(
              data.result,
              null,
              2
            )

      );



    } catch (error) {


      console.error(
        "Supplier recommendation error:",
        error
      );


      setResult(
        "Unable to generate supplier recommendation."
      );


    } finally {


      setLoading(false);


    }


  }




  return (

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
        AI Supplier Recommendation
      </h2>



      <p
        className="
        mt-2
        text-sm
        text-gray-500
        "
      >
        Analyze {quotes.length} supplier quotations using AI.
      </p>




      <button

        onClick={recommend}

        disabled={loading}

        className="
        mt-5
        rounded-xl
        bg-purple-600
        px-5
        py-3
        text-white
        disabled:opacity-50
        "

      >

        {
          loading
            ? "AI Comparing..."
            : "🤖 Find Best Supplier"
        }


      </button>





      {
        result && (

          <div

            className="
            mt-5
            rounded-xl
            bg-purple-50
            p-5
            whitespace-pre-line
            "

          >

            {result}

          </div>

        )
      }




    </div>

  );

}