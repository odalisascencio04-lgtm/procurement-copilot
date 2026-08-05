"use client";


import {
useState
} from "react";


import {
Upload,
FileText
} from "lucide-react";


import {
supabase
} from "@/lib/supabase";




export default function ContractAnalyzer({

contractId

}:{

contractId:number

}){


const [file,setFile]=
useState<File|null>(null);



const [loading,setLoading]=
useState(false);



const [result,setResult]=
useState("");






async function analyze(){


if(!file)
return;



setLoading(true);





// upload file

const filePath =
`${contractId}/${file.name}`;




const {

error:uploadError

}=await supabase.storage

.from("contracts")

.upload(
filePath,
file
);




if(uploadError){

setResult(
"Upload failed"
);

setLoading(false);

return;

}







// temporary AI result
// later replace with real AI model


const riskScore=72;


const summary=`

Contract Risk Analysis


⚠ Auto renewal clause detected


⚠ Price increase possibility detected


✓ Payment terms acceptable


Overall Risk Score:

${riskScore}/100


Recommendation:

Review renewal and pricing sections.

`;







await supabase

.from("contract_reviews")

.insert({

contract_id:contractId,

file_name:file.name,

risk_score:riskScore,

summary

});






setResult(summary);



setLoading(false);



}








return (

<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>



<div className="flex gap-3 items-center">


<FileText
className="text-emerald-500"
/>


<h2 className="text-2xl font-bold">

AI Contract Analyzer

</h2>


</div>






<input

type="file"

accept=".pdf"

className="
mt-6
w-full
rounded-xl
border
p-3
"

onChange={(e)=>

setFile(
e.target.files?.[0] || null
)

}

/>







<button

onClick={analyze}

disabled={!file || loading}

className="
mt-5
rounded-xl
bg-emerald-500
px-6
py-3
font-semibold
text-white
disabled:opacity-50
"

>

{

loading

?

"Analyzing..."

:

"Analyze Contract"

}


</button>







{
result &&

<div

className="
mt-8
whitespace-pre-line
rounded-2xl
bg-slate-50
p-6
"

>

{result}

</div>

}



</div>

)

}