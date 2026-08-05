import {NextResponse} from "next/server";
import {analyzeSavings}
from "@/lib/ai/savingsAnalyzer";


export async function POST(
req:Request
){

const data =
await req.json();


const result =
await analyzeSavings(
data
);


return NextResponse.json({
result
});

}