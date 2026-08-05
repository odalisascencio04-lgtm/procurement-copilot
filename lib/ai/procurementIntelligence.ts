import { askAI } from "./index";


export async function runProcurementIntelligence(
data:any
){

const prompt = `

You are a Chief Procurement Officer AI.

Analyze the complete procurement situation.

Data:

${JSON.stringify(
data,
null,
2
)}


Evaluate:

- Supplier performance
- Cost savings
- Contract risks
- Purchasing efficiency
- Business risks


Return ONLY JSON:

{
"overallHealthScore":0,

"executiveSummary":"",

"financialImpact":"",

"savingsOpportunity":"",

"topRisks":[
""
],

"topRecommendations":[
""
],

"priorityActions":[
""
],

"managementDecision":""
}


Think like a consultant presenting to company executives.

`;



return await askAI(
"analysis",
prompt
);

}