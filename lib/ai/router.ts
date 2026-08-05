// lib/ai/router.ts

import { callOllama } from "../../app/actions/ollama";


export async function askAI(
  task: string,
  prompt: string
) {

  switch (task) {

    case "contract":

      return await callOllama(prompt);


    case "analysis":

      return await callOllama(prompt);


    case "chat":
    default:

      return await callOllama(prompt);

  }

}