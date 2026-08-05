import {NextResponse}
from "next/server";

import {createLead}
from "@/lib/leads/createLead";


export async function POST(
req:Request
){

const lead =
await req.json();


const result =
await createLead(
lead
);


return NextResponse.json({
success:true,
result
});

}