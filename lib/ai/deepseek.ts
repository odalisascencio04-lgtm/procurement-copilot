// lib/ai/deepseek.ts

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}


export async function callDeepSeek(
  prompt: string,
  systemPrompt?: string
): Promise<string> {

  const apiKey = process.env.DEEPSEEK_API_KEY;


  if (!apiKey) {
    throw new Error(
      "DEEPSEEK_API_KEY is missing from environment variables"
    );
  }


  const messages: DeepSeekMessage[] = [];


  if (systemPrompt) {
    messages.push({
      role: "system",
      content: systemPrompt,
    });
  }


  messages.push({
    role: "user",
    content: prompt,
  });


  try {

    const response = await fetch(
      DEEPSEEK_API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model: "deepseek-chat",

          messages,

          temperature: 0.7,

          max_tokens: 2000,
        }),
      }
    );


    const data: DeepSeekResponse =
      await response.json();


    // Debug API response
    console.log(
      "DeepSeek Response:",
      JSON.stringify(data, null, 2)
    );


    // Handle API errors
    if (!response.ok) {

      throw new Error(
        data.error?.message ||
        `DeepSeek API failed: ${response.status}`
      );

    }


    // Validate response structure
    const content =
      data.choices?.[0]?.message?.content;


    if (!content) {

      throw new Error(
        "DeepSeek returned empty response"
      );

    }


    return content.trim();


  } catch (error) {

    console.error(
      "DeepSeek call failed:",
      error
    );


    if (error instanceof Error) {
      throw error;
    }


    throw new Error(
      "Unknown DeepSeek error"
    );
  }
}