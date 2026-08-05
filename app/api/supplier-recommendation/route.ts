import {NextResponse} from "next/server";
import {recommendSupplier}
from "@/lib/ai/supplierRecommendation";


export async function POST(
req:Request
){

const suppliers =
await req.json();


const result =
await recommendSupplier(
suppliers
);


return NextResponse.json({
result
});

}