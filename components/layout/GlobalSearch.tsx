"use client";


import {
useState
} from "react";


import {
Search
} from "lucide-react";


import {
supabase
} from "@/lib/supabase";


import Link from "next/link";




export default function GlobalSearch(){



const [query,setQuery]=useState("");

const [results,setResults]=
useState<any[]>([]);





async function search(value:string){


setQuery(value);



if(!value){

setResults([]);

return;

}





const [

suppliers,

contracts,

orders,

rfqs

]=await Promise.all([



supabase

.from("suppliers")

.select("id,name")

.ilike(
"name",
`%${value}%`
),




supabase

.from("contracts")

.select("id,title")

.ilike(
"title",
`%${value}%`
),




supabase

.from("purchase_orders")

.select("id,po_number")

.ilike(
"po_number",
`%${value}%`
),




supabase

.from("rfqs")

.select("id,title")

.ilike(
"title",
`%${value}%`
)


]);







setResults([


...(suppliers.data || []).map(item=>({

type:"Supplier",

name:item.name,

href:`/suppliers/${item.id}`

})),



...(contracts.data || []).map(item=>({

type:"Contract",

name:item.title,

href:`/contracts/${item.id}`

})),



...(orders.data || []).map(item=>({

type:"Purchase Order",

name:item.po_number,

href:`/purchase-orders/${item.id}`

})),



...(rfqs.data || []).map(item=>({

type:"RFQ",

name:item.title,

href:`/rfq/${item.id}`

}))


]);


}







return (

<div className="relative w-[420px]">



<Search

size={18}

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"

/>



<input


value={query}


onChange={(e)=>
search(e.target.value)
}


placeholder="Search suppliers, contracts..."


className="
w-full
rounded-xl
border
border-slate-200
bg-slate-50
py-3
pl-11
pr-4
outline-none
focus:border-emerald-500
focus:bg-white
"

/>






{
results.length>0 &&


<div

className="
absolute
top-14
w-full
rounded-2xl
border
bg-white
shadow-xl
z-50
p-3
"

>


{
results.map((item,index)=>(


<Link

key={index}

href={item.href}

onClick={()=>{

setQuery("");

setResults([]);

}}


className="
block
rounded-xl
p-3
hover:bg-slate-100
"

>


<p className="font-semibold">

{item.name}

</p>


<p className="text-sm text-slate-500">

{item.type}

</p>


</Link>


))

}


</div>


}




</div>

)

}