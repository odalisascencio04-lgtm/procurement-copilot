import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);



export async function POST(req: Request) {


  const { supplier } = await req.json();



  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });



  const prompt = `
Analyze this supplier:

${JSON.stringify(supplier)}

Provide:

1. Supplier risk
2. Performance summary
3. Recommendation
4. Improvement suggestions

Return JSON.
`;



  const result = await model.generateContent(prompt);



  const text = result.response.text();



  return Response.json({

    analysis:text

  });


}