"use server";

import { getChatResponse } from "@/app/actions/chat";


export async function procurementAI(
  question: string
): Promise<string> {

  try {

    const answer =
      await getChatResponse(question);

    return answer;


  } catch (error) {

    console.error(
      "Procurement AI Error:",
      error
    );

    return "AI assistant failed. Please try again.";

  }

}