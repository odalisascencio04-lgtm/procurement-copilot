"use server";


export async function askOllama(
  prompt: string
): Promise<string> {

  try {

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "deepseek-r1",
          prompt,
          stream: false,
        }),
      }
    );


    if (!response.ok) {

      throw new Error(
        "Ollama request failed"
      );

    }


    const data =
      await response.json();


    return (
      data.response ??
      "No AI response."
    );


  } catch (error) {

    console.error(
      "Ollama error:",
      error
    );


    return (
      "AI service unavailable."
    );

  }

}



// Backward compatibility
export async function askDeepSeek(
  prompt: string
): Promise<string> {

  return askOllama(prompt);

}



// Used by lib/ai/router.ts
export async function callOllama(
  prompt: string
): Promise<string> {

  return askOllama(prompt);

}