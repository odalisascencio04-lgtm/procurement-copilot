"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AddRiskAlertModal from "@/components/AddRiskAlertModal";


interface RiskAlert {

id:number;
supplier_id:number;
title:string;
description:string;
risk_level:string;
category:string;
status:string;

}



export default function RiskAlertsPage(){


const [alerts,setAlerts]=useState<RiskAlert[]>([]);

const [open,setOpen]=useState(false);



useEffect(()=>{

loadAlerts();

},[]);




async function loadAlerts(){


const {data,error}=await supabase

.from("risk_alerts")

.select("*")

.order(
"id",
{
ascending:false
}
);



if(!error && data){

setAlerts(data);

}


}





async function resolveAlert(id:number){


const {error}=await supabase

.from("risk_alerts")

.update({

status:"Resolved"

})

.eq(
"id",
id
);



if(error){

alert(error.message);
return;

}


loadAlerts();


}





async function deleteAlert(id:number){


const {error}=await supabase

.from("risk_alerts")

.delete()

.eq(
"id",
id
);



if(error){

alert(error.message);
return;

}


loadAlerts();


}




function levelStyle(level:string){


if(level==="Critical")

return "bg-red-100 text-red-700";


if(level==="High")

return "bg-orange-100 text-orange-700";


if(level==="Medium")

return "bg-yellow-100 text-yellow-700";


return "bg-green-100 text-green-700";


}





return(

<main className="
min-h-screen
bg-gray-50
p-8
">


<div className="
mx-auto
max-w-7xl
">



<div className="
mb-8
flex
items-center
justify-between
">


<h1 className="
text-4xl
font-bold
">

Risk Alerts

</h1>



<button

onClick={()=>setOpen(true)}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
hover:bg-blue-700
"

>

+ Add Risk Alert

</button>


</div>





<div className="
overflow-hidden
rounded-2xl
bg-white
shadow
">


<table className="
min-w-full
">


<thead className="
bg-blue-600
text-white
">


<tr>


<th className="
px-6
py-4
text-left
">

Title

</th>


<th className="
px-6
py-4
text-left
">

Category

</th>


<th className="
px-6
py-4
text-left
">

Risk

</th>


<th className="
px-6
py-4
text-left
">

Status

</th>


<th className="
px-6
py-4
text-left
">

Actions

</th>


</tr>


</thead>





<tbody>


{

alerts.map(alert=>(


<tr

key={alert.id}

className="
border-t
hover:bg-gray-50
"

>


<td className="
px-6
py-4
">


<div className="
font-semibold
">

{alert.title}

</div>


<p className="
text-sm
text-gray-500
">

{alert.description}

</p>


</td>




<td className="
px-6
py-4
">

{alert.category}

</td>





<td className="
px-6
py-4
">


<span

className={`
rounded-full
px-3
py-1
text-sm
font-semibold
${levelStyle(alert.risk_level)}
`}

>

{alert.risk_level}

</span>


</td>





<td className="
px-6
py-4
">

{alert.status}

</td>





<td className="
px-6
py-4
space-x-2
">


<button

onClick={()=>
resolveAlert(alert.id)
}

className="
rounded-lg
bg-green-600
px-3
py-1
text-white
"

>

Resolve

</button>





<button

onClick={()=>
deleteAlert(alert.id)
}

className="
rounded-lg
bg-red-600
px-3
py-1
text-white
"

>

Delete

</button>


</td>



</tr>


))


}



</tbody>


</table>


</div>




</div>





<AddRiskAlertModal

open={open}

onClose={()=>setOpen(false)}

onSaved={loadAlerts}

/>



</main>

)

}