import {NextResponse} from "next/server";
import {askAI} from "@/lib/ai";


export async function POST(
req:Request
){

const {message}
=
await req.json();


const prompt = `

You are an AI procurement assistant.

Answer this question:

${message}

Help with:

- suppliers
- purchasing
- contracts
- savings
- risks

`;


const result =
await askAI(
"chat",
prompt
);


return NextResponse.json({
result
});

}