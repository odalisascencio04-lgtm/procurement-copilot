"use client";

import {useState} from "react";
import {generateProcurementReport}
from "@/lib/report/generateProcurementReport";

export default function AIProcurementIntelligence(){

const [report,setReport]=useState("");

const [loading,setLoading]=useState(false);



async function runAI(){


setLoading(true);


const res =
await fetch(
"/api/procurement-intelligence",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

suppliers:[
{
name:"ABC Manufacturing",
score:90,
risk:20
}
],

contracts:[
{
supplier:"ABC",
expires:"2026-12-01"
}
],

spend:{
annual:500000
}

})

});


const data =
await res.json();


setReport(
typeof data.result==="string"
?
data.result
:
JSON.stringify(data.result,null,2)
);


setLoading(false);

}

function downloadReport(){

    const parsed =
    typeof report === "string"
    ?
    JSON.parse(report)
    :
    report;
    
    
    generateProcurementReport(
    parsed
    );
    
    }

return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="text-xl font-bold">
🚀 AI Procurement Intelligence
</h2>


<button

onClick={runAI}

className="
mt-5
rounded-xl
bg-black
px-5
py-3
text-white
"

>

{
loading
?
"Analyzing Business..."
:
"Run Procurement Intelligence"
}

</button>


{
report &&

<div className="
mt-5
rounded-xl
bg-gray-50
p-5
whitespace-pre-line
">

{report}

</div>

}

<button

onClick={downloadReport}

className="
mt-4
rounded-xl
bg-green-700
px-5
py-3
text-white
"

>

📄 Download Procurement Report

</button>
</div>

)

}