"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddQuoteModal from "@/components/AddQuoteModal";


interface RFQ {

id:number;
title:string;
description:string;
status:string;

}



interface Quote {

id:number;
supplier:string;
price:number;
delivery_days:number;
warranty:string;

}



export default function RFQDetailPage(){


const params = useParams();

const id = Number(params.id);


const [rfq,setRfq]=useState<RFQ | null>(null);

const [quotes,setQuotes]=useState<Quote[]>([]);

const [open,setOpen]=useState(false);



useEffect(()=>{

loadRFQ();
loadQuotes();

},[]);




async function loadRFQ(){


const {data,error}=await supabase

.from("rfqs")

.select("*")

.eq("id",id)

.single();



if(!error && data){

setRfq(data);

}


}




async function loadQuotes(){


const {data,error}=await supabase

.from("quotes")

.select("*")

.eq("rfq_id",id)

.order("price");


if(!error && data){

setQuotes(data);

}


}



function getRecommendation(){


if(quotes.length===0)
return null;


return quotes.reduce((best,current)=>

current.price < best.price
?
current
:
best

);


}




const recommended=getRecommendation();




if(!rfq){

return (

<div className="p-8">

Loading...

</div>

)

}



return(


<main className="p-8">


<div className="mb-8">


<h1 className="
text-4xl
font-bold
">

{rfq.title}

</h1>


<p className="
mt-2
text-gray-600
">

{rfq.description}

</p>


</div>




<div className="
mb-6
flex
justify-between
">


<h2 className="
text-2xl
font-bold
">

Supplier Quotes

</h2>


<button

onClick={()=>setOpen(true)}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
"

>

+ Add Quote

</button>


</div>





<div className="
overflow-hidden
rounded-2xl
bg-white
shadow
">


<table className="min-w-full">


<thead className="
bg-blue-600
text-white
">


<tr>


<th className="px-6 py-4 text-left">
Supplier
</th>


<th className="px-6 py-4 text-left">
Price
</th>


<th className="px-6 py-4 text-left">
Delivery
</th>


<th className="px-6 py-4 text-left">
Warranty
</th>


</tr>


</thead>



<tbody>


{quotes.map((quote)=>(


<tr
key={quote.id}
className="border-t"
>


<td className="px-6 py-4">

{quote.supplier}

</td>



<td className="px-6 py-4">

${quote.price}

</td>



<td className="px-6 py-4">

{quote.delivery_days} days

</td>



<td className="px-6 py-4">

{quote.warranty}

</td>



</tr>


))}



</tbody>


</table>


</div>





{recommended && (


<div className="
mt-8
rounded-2xl
bg-green-50
p-6
">


<h2 className="
text-xl
font-bold
text-green-700
">

AI Recommendation

</h2>



<p className="mt-3">

Recommended Supplier:

<strong>
{" "}
{recommended.supplier}
</strong>


</p>


<p>

Lowest Quote:

<strong>
{" "}
${recommended.price}
</strong>

</p>


<p>

Delivery:

<strong>
{" "}
{recommended.delivery_days} days
</strong>


</p>


</div>


)}





<AddQuoteModal

open={open}

onClose={()=>setOpen(false)}

onSaved={loadQuotes}

rfqId={id}

/>



</main>


)

}