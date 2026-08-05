import {NextResponse} from "next/server";
import {evaluateSupplier} from "@/lib/ai/supplier";


export async function POST(req:Request){

const supplier =
await req.json();


const result =
await evaluateSupplier(
supplier
);


return NextResponse.json({
result
});

}