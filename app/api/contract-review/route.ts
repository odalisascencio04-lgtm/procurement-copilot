import {NextResponse} from "next/server";
import {reviewContract}
from "@/lib/ai/contractReview";


export async function POST(
req:Request
){

const {contract}
=
await req.json();


const result =
await reviewContract(contract);


return NextResponse.json({
result
});

}