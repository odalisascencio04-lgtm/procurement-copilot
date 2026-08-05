import {NextResponse} from "next/server";
import {runProcurementIntelligence}
from "@/lib/ai/procurementIntelligence";


export async function POST(
req:Request
){

const data =
await req.json();


const result =
await runProcurementIntelligence(
data
);


return NextResponse.json({
result
});

}