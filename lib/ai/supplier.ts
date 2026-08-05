import { askAI } from "./index";


export async function evaluateSupplier(
supplier:any
){

const prompt = `

You are a senior procurement manager.

Analyze this supplier and provide a professional procurement evaluation.

Supplier data:

${JSON.stringify(
supplier,
null,
2
)}


Evaluate:

1. Overall supplier score (0-100)
2. Risk level
3. Cost competitiveness
4. Quality performance
5. Delivery reliability
6. Negotiation opportunities
7. Final recommendation


Return ONLY valid JSON.

Format:

{
"score":0,
"risk":"low",
"summary":"",
"strengths":[
""
],
"weaknesses":[
""
],
"costAnalysis":"",
"qualityAnalysis":"",
"deliveryAnalysis":"",
"negotiationStrategy":"",
"recommendation":"",
"savingsOpportunity":""
}

Rules:

- Be realistic
- Consider business impact
- Find cost reduction opportunities
- Give actionable advice

`;



const result =
await askAI(
"analysis",
prompt
);


return result;

}