"use client";

import { useState } from "react";

interface Props {
  supplier: string;
  score: number;
  quality: number;
  delivery: number;
  cost: number;
  risk: number;
}


export default function AISupplierEvaluation({
  supplier,
  score,
  quality,
  delivery,
  cost,
  risk
}: Props) {


  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);


  async function analyzeSupplier() {

    setLoading(true);
    setAnalysis("");


    const response = await fetch(
      "/api/supplier-evaluation",
      {
        method: "POST",

        headers:{
          "Content-Type":"application/json"
        },

        body: JSON.stringify({

          supplier,
          score,
          quality,
          delivery,
          cost,
          risk

        })
      }
    );


    const data = await response.json();


    setAnalysis(
      typeof data.result === "string"
      ? data.result
      : JSON.stringify(data.result,null,2)
    );


    setLoading(false);

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
        AI Supplier Evaluation
      </h2>



      <div
        className="
        mt-4
        space-y-2
        text-gray-700
        "
      >

        <p>
          Supplier:
          {" "}
          <strong>
            {supplier}
          </strong>
        </p>


        <p>
          Current Score:
          {" "}
          <strong>
            {score}%
          </strong>
        </p>


        <p>
          Quality:
          {" "}
          <strong>
            {quality}%
          </strong>
        </p>


        <p>
          Delivery:
          {" "}
          <strong>
            {delivery}%
          </strong>
        </p>


        <p>
          Cost Score:
          {" "}
          <strong>
            {cost}%
          </strong>
        </p>


        <p>
          Risk:
          {" "}
          <strong>
            {risk}%
          </strong>
        </p>


      </div>




      <button

        onClick={analyzeSupplier}

        disabled={loading}

        className="
        mt-6
        rounded-xl
        bg-blue-600
        px-5
        py-3
        text-white
        disabled:bg-gray-400
        "

      >

        {
          loading
          ?
          "🤖 AI Analyzing..."
          :
          "🤖 Generate AI Evaluation"
        }


      </button>




      {
        analysis &&

        <div

          className="
          mt-6
          rounded-xl
          bg-green-50
          p-5
          whitespace-pre-line
          text-gray-800
          "

        >

          <h3
            className="
            mb-3
            font-bold
            "
          >
            AI Report
          </h3>


          {analysis}


        </div>

      }


    </div>

  );

}