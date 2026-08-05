import { askAI } from "./index";


export async function reviewContract(
contract:string
){

const prompt = `

You are a procurement contract expert.

Review this contract:

${contract}


Return ONLY JSON:

{
"summary":"",
"paymentTerms":"",
"expiration":"",
"risks":[],
"recommendations":[]
}

Find:

- payment terms
- renewal dates
- penalties
- price increase clauses
- risks

`;

return await askAI(
"document",
prompt
);

}