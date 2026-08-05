"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { supabase } from "@/lib/supabase";



export default function PurchaseOrdersPage(){


const router = useRouter();



const [purchaseOrders,setPurchaseOrders] =
useState<any[]>([]);


const [loading,setLoading] =
useState(true);



const [page,setPage] =
useState(1);



const [search,setSearch] =
useState("");



const perPage = 10;




// LOAD DATA FROM SUPABASE

useEffect(()=>{


async function loadOrders(){


const {data,error} =

await supabase
.from("purchase_orders")
.select("*")
.order(
"created_at",
{
ascending:false
}
);



if(error){

console.error(error);

return;

}



setPurchaseOrders(data || []);

setLoading(false);


}



loadOrders();



},[]);







// SEARCH

const filteredOrders =

purchaseOrders.filter(order=>


order.po_number
?.toLowerCase()
.includes(
search.toLowerCase()
)


||

order.supplier
?.toLowerCase()
.includes(
search.toLowerCase()
)


);






// PAGINATION


const totalPages =

Math.ceil(
filteredOrders.length / perPage
);



const start =

(page-1)*perPage;



const currentOrders =

filteredOrders.slice(
start,
start+perPage
);






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
border-emerald-500
border-t-transparent
"
/>

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
mb-8
flex
items-center
justify-between
"
>


<div>


<h1
className="
text-3xl
font-bold
text-slate-900
"
>

Purchase Orders

</h1>



<p
className="
mt-2
text-slate-500
"
>

Manage supplier purchases and approvals.

</p>


</div>




<button

className="
rounded-xl
bg-emerald-600
px-5
py-3
font-semibold
text-white
hover:bg-emerald-700
"

>

+ Create PO

</button>



</div>








{/* SEARCH */}



<div
className="
mb-6
flex
items-center
rounded-xl
border
bg-white
px-4
py-3
"
>


<Search
size={20}
className="text-slate-400"
/>



<input

placeholder="Search purchase orders..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setPage(1);

}}

className="
ml-3
w-full
outline-none
"

/>



</div>









{/* TABLE */}



<div
className="
overflow-hidden
rounded-2xl
bg-white
shadow
"
>



<table
className="
w-full
"
>



<thead
className="
bg-emerald-700
text-white
"
>


<tr>


<th className="px-6 py-4 text-left">

PO Number

</th>



<th className="px-6 py-4 text-left">

Supplier

</th>



<th className="px-6 py-4 text-left">

Amount

</th>



<th className="px-6 py-4 text-left">

Status

</th>



<th className="px-6 py-4 text-left">

Date

</th>


</tr>


</thead>







<tbody>


{

currentOrders.map(order=>(


<tr

key={order.id}


onClick={()=>


router.push(

`/purchase-orders/${order.id}`

)


}


className="
cursor-pointer
border-t
hover:bg-emerald-50
transition
"

>



<td
className="
px-6
py-4
font-semibold
"
>

{order.po_number}

</td>






<td
className="
px-6
py-4
"
>

{order.supplier}

</td>







<td
className="
px-6
py-4
"
>

${Number(order.amount)
.toLocaleString()}

</td>







<td
className="
px-6
py-4
"
>


<span

className={`
rounded-full
px-3
py-1
text-sm

${
order.status==="Approved"

?

"bg-emerald-100 text-emerald-700"


:

order.status==="Delivered"


?


"bg-green-100 text-green-700"


:


"bg-yellow-100 text-yellow-700"

}

`}

>

{order.status}

</span>


</td>







<td
className="
px-6
py-4
"
>


{
new Date(
order.created_at
)
.toLocaleDateString()
}


</td>






</tr>


))


}



</tbody>


</table>








{/* PAGINATION */}



<div
className="
flex
items-center
justify-between
border-t
px-6
py-5
"
>



<p
className="
text-sm
text-slate-500
"
>
Showing{" "}

{start + 1}

-

{Math.min(
  start + perPage,
  filteredOrders.length
)}

{" "}of{" "}

{filteredOrders.length}

</p>







<div
className="
flex
items-center
gap-2
"
>





<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
rounded-lg
border
p-2
disabled:opacity-40
"

>

<ChevronLeft size={18}/>

</button>








{

Array.from(
{
length:totalPages
}
)

.map((_,i)=>(


<button


key={i}


onClick={()=>setPage(i+1)}


className={`

h-9
w-9
rounded-lg


${
page===i+1

?

"bg-emerald-600 text-white"

:

"hover:bg-slate-100"

}

`}


>

{i+1}


</button>


))


}








<button


disabled={
page===totalPages
}


onClick={()=>setPage(page+1)}


className="
rounded-lg
border
p-2
disabled:opacity-40
"

>


<ChevronRight size={18}/>


</button>





</div>





</div>







</div>





</div>


)



}