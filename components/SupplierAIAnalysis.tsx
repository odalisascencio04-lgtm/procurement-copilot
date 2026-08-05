"use client";


import {
analyzeSupplierRisk
}
from "@/lib/aiSupplierRisk";



export default function SupplierAIAnalysis({

supplier

}:{

supplier:any;

}){


const analysis =
analyzeSupplierRisk(supplier);




return (

<div

className="
rounded-3xl
bg-[#081722]
p-8
text-white
"

>


<h2

className="
text-2xl
font-bold
"

>

🤖 AI Supplier Risk Analysis

</h2>





<div

className="
mt-6
"

>


<p className="text-slate-300">

Risk Score

</p>


<p

className="
text-5xl
font-bold
text-emerald-400
"

>

{analysis.riskScore}

<span className="text-xl">
/100
</span>

</p>


</div>





<div className="mt-6">


<h3 className="font-semibold">

AI Findings

</h3>


<ul className="mt-3 space-y-2">


{

analysis.reasons.map(
(reason)=>(
<li
key={reason}
className="text-slate-300"
>

✓ {reason}

</li>
)
)

}


</ul>


</div>





<div

className="
mt-6
rounded-2xl
bg-white/10
p-4
"

>


<p className="font-semibold">

Recommendation

</p>


<p className="mt-2 text-slate-300">

{analysis.recommendation}

</p>


</div>




</div>

)

}