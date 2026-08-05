"use client";

import { useState } from "react";


interface Contract {
  id?: string | number;
  title?: string;
  content?: string;
  [key: string]: any;
}


interface ContractAIReviewProps {
  contract: Contract;
}


export default function ContractAIReview({
  contract,
}: ContractAIReviewProps) {


  const [contractText, setContractText] = useState(
    contract.content || ""
  );


  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);



  async function review() {


    if (!contractText.trim()) {

      setResult(
        "Please enter contract text first."
      );

      return;

    }


    setLoading(true);


    try {


      const response = await fetch(
        "/api/contract-review",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({
            contract: contractText,
            contractId: contract.id,
          }),
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
        "Contract review error:",
        error
      );


      setResult(
        "Unable to review contract."
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
        AI Contract Review
      </h2>



      <p
        className="
        mt-2
        text-sm
        text-gray-500
        "
      >
        Contract ID: {contract.id ?? "Unknown"}
      </p>




      <textarea

        className="
        mt-4
        w-full
        rounded-xl
        border
        p-3
        "

        rows={8}

        placeholder="Paste contract text..."

        value={contractText}

        onChange={(e) =>
          setContractText(
            e.target.value
          )
        }

      />




      <button

        onClick={review}

        disabled={loading}

        className="
        mt-4
        rounded-xl
        bg-orange-600
        px-5
        py-3
        text-white
        disabled:opacity-50
        "

      >

        {
          loading
            ? "Reviewing..."
            : "📄 Review Contract"
        }

      </button>





      {
        result && (

          <div

            className="
            mt-5
            rounded-xl
            bg-orange-50
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