"use client";


import {
  useEffect,
  useState
} from "react";


import {
  useParams,
  useRouter
} from "next/navigation";


import {
  ArrowLeft,
  Download,
  BrainCircuit,
} from "lucide-react";


import { supabase } from "@/lib/supabase";





export default function DocumentViewer(){



const params = useParams();

const router = useRouter();


const id = params.id as string;




const [document,setDocument] =
useState<any>(null);



const [loading,setLoading] =
useState(true);



const [analysis,setAnalysis] =
useState<any>(null);



const [analyzing,setAnalyzing] =
useState(false);








async function loadDocument(){



const {

data,

error

}=

await supabase

.from("documents")

.select("*")

.eq(
"id",
id
)

.single();





if(error){

console.error(error);

setLoading(false);

return;

}





setDocument(data);

setLoading(false);



}








async function analyzeDocument(){



if(!document) return;



try{


setAnalyzing(true);




const response =

await fetch(
"/api/analyze-document",
{

method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

documentUrl:
document.url,

documentName:
document.name

})

}

);





const data =
await response.json();




if(data.analysis){

setAnalysis(
data.analysis
);

}



}

catch(error){


console.error(error);


alert(
"AI analysis failed"
);


}

finally{


setAnalyzing(false);


}



}








useEffect(()=>{


loadDocument();


},[]);









if(loading){


return (

<div

className="
flex
min-h-screen
items-center
justify-center
bg-slate-50
"

>

<div

className="
h-10
w-10
animate-spin
rounded-full
border-4
border-emerald-600
border-t-transparent
"

/>


</div>

)


}








if(!document){


return (

<div

className="
p-8
text-center
"

>

Document not found

</div>

)


}









return (


<div

className="
min-h-screen
bg-slate-50
p-8
"

>







{/* HEADER */}



<div

className="
mb-6
flex
items-center
justify-between
"

>






<div

className="
flex
items-center
gap-4
"

>


<button


onClick={()=>router.back()}


className="
rounded-xl
border
bg-white
p-3
hover:bg-slate-100
"

>

<ArrowLeft size={20}/>

</button>







<div>


<h1

className="
text-3xl
font-bold
text-slate-900
"

>

{document.name}

</h1>



<p

className="
text-slate-500
"

>

{document.size}

</p>



</div>



</div>









<div

className="
flex
gap-3
"

>





<a

href={document.url}

target="_blank"

className="
flex
items-center
gap-2
rounded-xl
border
bg-white
px-5
py-3
font-semibold
hover:bg-slate-100
"

>


<Download size={18}/>


Download


</a>









<button


onClick={analyzeDocument}


disabled={analyzing}


className="
flex
items-center
gap-2
rounded-xl
bg-emerald-600
px-5
py-3
font-semibold
text-white
hover:bg-emerald-700
disabled:opacity-50
"

>


<BrainCircuit size={18}/>



{

analyzing

?

"Analyzing..."

:

"Analyze with AI"

}



</button>






</div>





</div>













{/* PDF VIEWER */}





<div

className="
overflow-hidden
rounded-2xl
bg-white
shadow
"

>


<iframe

src={document.url}

className="
h-[800px]
w-full
"

title="PDF Viewer"

/>


</div>















{/* AI RESULT */}





{

analysis &&


<div

className="
mt-8
rounded-2xl
bg-white
p-8
shadow
"

>



<h2

className="
mb-6
text-2xl
font-bold
"

>

AI Procurement Analysis

</h2>







<div

className="
space-y-4
"

>


<p>

<strong>
Supplier:
</strong>

{" "}

{analysis.supplier}

</p>





<p>

<strong>
Contract Value:
</strong>

{" "}

{analysis.contractValue}

</p>





<p>

<strong>
Payment Terms:
</strong>

{" "}

{analysis.paymentTerms}

</p>







<p>

<strong>
Risk Score:
</strong>


{" "}


<span

className="
rounded-full
bg-yellow-100
px-3
py-1
text-yellow-700
"

>

{analysis.riskScore}

</span>


</p>




</div>









<h3

className="
mt-8
font-bold
text-lg
"

>

Risk Findings

</h3>





<ul

className="
mt-3
list-disc
space-y-2
pl-6
text-slate-600
"

>


{

analysis.risks?.map(

(risk:string)=>(


<li

key={risk}

>

{risk}

</li>


)

)

}



</ul>






</div>



}









</div>


)



}