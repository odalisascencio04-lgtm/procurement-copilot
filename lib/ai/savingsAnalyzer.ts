import { askAI } from "./index";


export async function analyzeSavings(
data:any
){

const prompt = `

You are a procurement cost optimization expert.

Analyze this purchasing data.

Data:

${JSON.stringify(
data,
null,
2
)}


Find savings opportunities.

Analyze:

- Price anomalies
- Expensive suppliers
- Duplicate suppliers
- Volume discount opportunities
- Contract optimization
- Purchasing patterns


Return ONLY valid JSON:


{
"totalPotentialSavings":"",
"savingsScore":0,

"opportunities":[
{
"type":"",
"description":"",
"estimatedSavings":"",
"action":""
}
],

"supplierOptimization":"",

"negotiationOpportunities":[
""
],

"priorityActions":[
""
],

"executiveSummary":""
}


Rules:

- Think like a procurement consultant.
- Focus on measurable savings.
- Give realistic recommendations.

`;


const result =
await askAI(
"analysis",
prompt
);


return result;

}