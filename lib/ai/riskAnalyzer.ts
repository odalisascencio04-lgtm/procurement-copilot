// lib/ai/riskAnalyzer.ts

import { askAI } from "./index";
import { formatRiskReport } from "./formatRiskReport";
import { validateRiskScore }
from "./riskValidator";

export async function analyzeRisk(
  supplier: any
) {

  const prompt = `

You are a procurement risk management expert.

Analyze this supplier risk profile.

Supplier data:

${JSON.stringify(
  supplier,
  null,
  2
)}


Evaluate:

- Delivery risk
- Quality risk
- Financial risk
- Price volatility
- Contract risk
- Business continuity risk


Predict:

- Current risk level
- Future risk probability
- Main causes
- Recommended actions


IMPORTANT OUTPUT RULES:

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use code blocks.

Do NOT add explanations before or after JSON.


Return exactly this structure:


{
  "riskLevel": "low|medium|high",

  "riskScore": 0,

  "futureRiskProbability": "",

  "summary": "",

  "riskFactors": [
    {
      "factor": "",
      "impact": "low|medium|high",
      "explanation": ""
    }
  ],

  "warnings": [
    ""
  ],

  "recommendedActions": [
    ""
  ],

  "backupSupplierRecommendation": "",

  "businessImpact": ""
}


Analysis rules:

Think like a Chief Procurement Officer.

Write for executives.

Keep each explanation under 40 words.

Prioritize:
1. Business impact
2. Financial exposure
3. Recommended action

Avoid generic statements.

`;



  try {


    const result =
      await askAI(
        "analysis",
        prompt
      );



    // Remove DeepSeek/Ollama markdown wrapping

    const cleanJSON =
      result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();



    let report;


    try {

        report =
        validateRiskScore(
          JSON.parse(cleanJSON)
        );


    } catch(parseError) {


      console.error(
        "JSON parsing failed:",
        cleanJSON
      );


      return {

        success: false,

        message:
          "AI returned invalid JSON",

        raw:
          cleanJSON

      };

    }



    return {

      success: true,

      data:
        report,

      formatted:
        formatRiskReport(report)

    };



  } catch(error) {


    console.error(
      "Risk analysis failed:",
      error
    );


    return {

      success: false,

      message:
        "Unable to complete procurement risk analysis",

      error:
        error instanceof Error
          ? error.message
          : "Unknown error"

    };

  }

}