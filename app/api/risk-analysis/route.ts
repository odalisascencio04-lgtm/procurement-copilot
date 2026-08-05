import {NextResponse} from "next/server";
import {analyzeRisk}
from "@/lib/ai/riskAnalyzer";


export async function POST(
req:Request
){

const supplier =
await req.json();


const result =
await analyzeRisk(
supplier
);


return NextResponse.json({
result
});

}