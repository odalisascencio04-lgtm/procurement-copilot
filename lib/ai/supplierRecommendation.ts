import { askAI } from "./index";


export async function recommendSupplier(
suppliers:any[]
){

const prompt = `

You are an expert procurement decision analyst.

Compare these suppliers and select the best business decision.

Supplier data:

${JSON.stringify(
suppliers,
null,
2
)}


Analyze:

- Purchase price
- Total cost impact
- Quality
- Delivery reliability
- Supplier risk
- Long-term value


Do NOT choose only the cheapest supplier.

Consider:

Cost + Quality + Delivery + Risk.


Return ONLY valid JSON:

{
"recommendedSupplier":"",
"overallScore":0,

"ranking":[
{
"supplier":"",
"score":0,
"reason":""
}
],

"comparisonSummary":"",

"advantages":[
""
],

"risks":[
""
],

"negotiationPlan":"",

"savingsOpportunity":"",

"finalRecommendation":""
}


Make the recommendation like a professional procurement manager.

`;



const result =
await askAI(
"analysis",
prompt
);


return result;

}