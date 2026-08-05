"use client";

import { useState } from "react";


export default function AIInsights(){


const [insight,setInsight]=useState("");

const [loading,setLoading]=useState(false);



async function generateInsight(){


setLoading(true);



const response =
await fetch(
"/api/dashboard-insights",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

message:
"Generate procurement executive dashboard insights based on suppliers, spend, contracts, risks and savings."

})

}

);



const data =
await response.json();



setInsight(
data.result
);



setLoading(false);


}




return(

<div className="
rounded-2xl
bg-white
p-6
shadow
">


<h2 className="
text-xl
font-bold
">

🤖 AI Procurement Insights

</h2>



<button

onClick={generateInsight}

className="
mt-5
rounded-xl
bg-blue-600
px-5
py-3
text-white
"

>

{

loading
?
"Analyzing..."
:
"Generate Insights"

}

</button>




{

insight &&

<div className="
mt-5
whitespace-pre-line
rounded-xl
bg-blue-50
p-5
">

{insight}

</div>


}



</div>

)

}