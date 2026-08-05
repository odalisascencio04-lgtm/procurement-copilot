"use client";

import {useState} from "react";


export default function AIRiskAnalyzer(){


const [result,setResult]=useState("");
const [loading,setLoading]=useState(false);



async function analyze(){

setLoading(true);


const response =
await fetch(
"/api/risk-analysis",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:"ABC Manufacturing",

deliveryDelay:12,

qualityIssues:5,

priceIncrease:8,

contractExpiry:"2026-10-01"

})

});


const data =
await response.json();


setResult(
typeof data.result==="string"
?
data.result
:
JSON.stringify(data.result,null,2)
);


setLoading(false);

}



return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="text-xl font-bold">
AI Supplier Risk Analyzer
</h2>


<button

onClick={analyze}

className="
mt-5
rounded-xl
bg-red-600
px-5
py-3
text-white
"

>

{
loading
?
"Analyzing Risk..."
:
"⚠️ Analyze Supplier Risk"
}

</button>


{
result &&

<div className="
mt-5
rounded-xl
bg-red-50
p-5
whitespace-pre-line
">

{result}

</div>

}


</div>

)

}