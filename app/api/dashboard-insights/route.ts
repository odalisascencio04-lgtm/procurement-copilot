import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});



export async function POST(
  req: Request
) {


  try {


    const { message } = await req.json();



    const prompt = `

You are an enterprise procurement intelligence AI.

Generate an executive procurement dashboard summary.

Include:

1. Cost saving opportunities

2. Supplier performance observations

3. Contract risks

4. Spend optimization recommendations

5. Strategic procurement actions


Request:

${message}


Provide a professional executive-level analysis.

`;



    const response =
      await model.generateContent(prompt);



    const text =
      response.response.text();



    return NextResponse.json({

      result: text

    });


  } catch(error) {


    console.error(error);



    return NextResponse.json(

      {
        error:"AI insight failed"
      },

      {
        status:500
      }

    );


  }

}