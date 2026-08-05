import {NextResponse} from "next/server";

import {
analyzeProcurementDocument
}
from "@/lib/ai/procurementAnalyzer";



export async function POST(req:Request){


const {
documentName
}=await req.json();



const analysis =
analyzeProcurementDocument(
documentName
);



return NextResponse.json({

analysis

});


}