"use client";


import {
  Search,
  Building2,
  ChevronRight
} from "lucide-react";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";



const suppliers = [

{
id:"1",
name:"Dell Technologies",
category:"Hardware",
spend:"$420,000",
risk:"Low",
performance:94,
status:"Active"
},


{
id:"2",
name:"Microsoft",
category:"Software",
spend:"$1,200,000",
risk:"Medium",
performance:87,
status:"Active"
},


{
id:"3",
name:"Cisco Systems",
category:"Networking",
spend:"$650,000",
risk:"Low",
performance:91,
status:"Active"
},


{
id:"4",
name:"Oracle",
category:"Database",
spend:"$300,000",
risk:"High",
performance:72,
status:"Review Needed"
},


{
id:"5",
name:"Lenovo",
category:"Hardware",
spend:"$280,000",
risk:"Medium",
performance:84,
status:"Active"
}

];







export default function SuppliersPage(){



const router = useRouter();


const [search,setSearch]=useState("");




const filtered = suppliers.filter(

supplier =>

supplier.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);





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

Suppliers

</h1>


<p

className="
mt-2
text-slate-500
"

>

Manage suppliers and monitor vendor performance.

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

+ Add Supplier

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

className="
text-slate-400
"

/>


<input


placeholder="
Search suppliers...
"


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
ml-3
w-full
outline-none
"

/>


</div>









{/* SUPPLIER CARDS */}



<div

className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-3
"

>


{

filtered.map((supplier)=>(


<div


key={supplier.id}


className="
rounded-2xl
bg-white
p-6
shadow
transition
hover:shadow-lg
"

>





<div

className="
flex
items-center
justify-between
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
rounded-xl
bg-emerald-100
p-3
"

>


<Building2

className="
text-emerald-600
"

/>


</div>



<div>


<h2

className="
font-bold
text-lg
"

>

{supplier.name}

</h2>


<p

className="
text-sm
text-slate-500
"

>

{supplier.category}

</p>


</div>


</div>



</div>









<div

className="
mt-6
space-y-3
"

>


<div

className="
flex
justify-between
"

>

<span className="text-slate-500">

Annual Spend

</span>


<span className="font-semibold">

{supplier.spend}

</span>


</div>




<div

className="
flex
justify-between
"

>

<span className="text-slate-500">

Risk

</span>


<span

className={`

rounded-full
px-3
py-1
text-sm


${
supplier.risk==="Low"

?

"bg-green-100 text-green-700"

:

supplier.risk==="Medium"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}

>

{supplier.risk}

</span>


</div>







<div>

<p className="mb-1 text-slate-500">

Performance

</p>


<div

className="
h-2
rounded-full
bg-slate-200
"

>


<div

className="
h-full
rounded-full
bg-emerald-500
"

style={{

width:
`${supplier.performance}%`

}}


/>


</div>


<p

className="
mt-1
text-right
text-sm
font-semibold
"

>

{supplier.performance}%

</p>


</div>



</div>










<button


onClick={()=>


router.push(

`/suppliers/${supplier.id}`

)


}


className="
mt-6
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-slate-100
py-3
font-semibold
hover:bg-emerald-100
"

>


View Supplier


<ChevronRight size={18}/>


</button>






</div>



))

}


</div>








</div>


)


}