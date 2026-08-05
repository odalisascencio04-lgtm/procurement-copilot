import { NextResponse } from "next/server";


export async function POST(req:Request){

try{


const {
documentUrl,
documentName
}=await req.json();



/*
Later:
Download PDF
Extract text
Send to AI

For now we test the AI workflow
*/



const analysis = {

supplier:
"Detected supplier from document",

summary:
"This document appears to be a procurement agreement.",

contractValue:
"Not detected",

paymentTerms:
"Net 30",

risks:[

"Automatic renewal clause may exist",

"Termination conditions should be reviewed",

"Supplier performance metrics are missing"

],


riskScore:
"Medium"


};



return NextResponse.json({

analysis

});



}
catch(error){


console.error(error);


return NextResponse.json(

{
error:"Analysis failed"
},

{
status:500
}

);


}


}