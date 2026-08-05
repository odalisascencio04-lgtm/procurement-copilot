"use server";


import { askOllama } from "./ollama";

import { analyzeSavings } from "@/lib/ai/savingsAnalyzer";



export async function analyzeProcurement(
  message: string
): Promise<string> {


  try {


    const aiResponse =
      await askOllama(message);



    let savingsAnalysis =
      "Savings analysis unavailable.";


    try {

      const savings =
        await analyzeSavings(message);


      savingsAnalysis =
        typeof savings === "string"
          ? savings
          : JSON.stringify(
              savings,
              null,
              2
            );


    } catch(error){

      console.error(
        "Savings error:",
        error
      );

    }




    return `

AI Procurement Assistant

${aiResponse}



Savings Analysis

${savingsAnalysis}

`;



  } catch(error){


    console.error(
      "Procurement chat error:",
      error
    );


    return (
      "Unable to process request."
    );


  }

}




// Used by lib/ai/procurementAI.ts
export async function getChatResponse(
  message: string
): Promise<string> {


  return analyzeProcurement(
    message
  );

}