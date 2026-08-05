"use client";


import {
  use
} from "react";


import {
  useRouter
} from "next/navigation";


import {
  Building2,
  ShieldAlert,
  TrendingUp,
  FileText,
  DollarSign,
  Sparkles,
  ArrowLeft
} from "lucide-react";





const supplierData = {


"1":{

name:"Dell Technologies",

category:"Hardware",

spend:"$420,000",

risk:82,

performance:94,

contracts:5,

status:"Active",

issues:[

"Hardware prices increased 8%",

"Delivery delays increased recently"

],

recommendations:[

"Negotiate volume discount",

"Review delivery SLA",

"Compare alternative suppliers"

]

},





"2":{

name:"Microsoft",

category:"Software",

spend:"$1,200,000",

risk:65,

performance:87,

contracts:8,

status:"Active",

issues:[

"License costs increasing",

"Unused subscriptions detected"

],

recommendations:[

"Optimize license usage",

"Renegotiate enterprise agreement"

]

},





"3":{

name:"Cisco Systems",

category:"Networking",

spend:"$650,000",

risk:40,

performance:91,

contracts:4,

status:"Active",

issues:[

"No major issues detected"

],

recommendations:[

"Maintain supplier relationship"

]

},





"4":{

name:"Oracle",

category:"Database",

spend:"$300,000",

risk:78,

performance:72,

contracts:6,

status:"Review Needed",

issues:[

"Contract cost increasing",

"Renewal terms need review"

],

recommendations:[

"Review contract clauses",

"Request competitive quotes"

]

},




"5":{

name:"Lenovo",

category:"Hardware",

spend:"$280,000",

risk:55,

performance:84,

contracts:3,

status:"Active",

issues:[

"Moderate delivery delays"

],

recommendations:[

"Monitor delivery performance",

"Review supplier alternatives"

]

}


};









export default function SupplierDetail({

params

}:{

params:Promise<{

id:string

}>

}){



const router = useRouter();



// Next.js 15 fix

const {
id
}=use(params);




const supplier =
supplierData[
id as keyof typeof supplierData
];






if(!supplier){


return (

<div
className="
p-8
text-xl
font-semibold
"
>

Supplier not found

</div>

);


}









return (


<div

className="
min-h-screen
bg-slate-50
p-8
"

>




<button

onClick={()=>router.back()}

className="
mb-6
flex
items-center
gap-2
text-slate-600
hover:text-emerald-600
"

>

<ArrowLeft size={18}/>

Back to Suppliers

</button>









{/* HEADER */}



<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<div

className="
flex
items-center
gap-5
"

>


<div

className="
rounded-2xl
bg-emerald-100
p-5
"

>


<Building2

size={40}

className="
text-emerald-600
"

/>


</div>





<div>


<h1

className="
text-4xl
font-bold
text-slate-900
"

>

{supplier.name}

</h1>


<p

className="
mt-2
text-slate-500
"

>

{supplier.category}

</p>


<div

className="
mt-3
inline-flex
rounded-full
bg-green-100
px-4
py-1
text-sm
font-semibold
text-green-700
"

>

{supplier.status}

</div>


</div>


</div>


</div>









{/* KPI CARDS */}



<div

className="
mt-6
grid
gap-6
md:grid-cols-4
"

>



<InfoCard

title="Annual Spend"

value={supplier.spend}

icon={<DollarSign/>}

/>



<InfoCard

title="Contracts"

value={supplier.contracts}

icon={<FileText/>}

/>



<InfoCard

title="Risk Score"

value={`${supplier.risk}/100`}

icon={<ShieldAlert/>}

/>



<InfoCard

title="Performance"

value={`${supplier.performance}%`}

icon={<TrendingUp/>}

/>



</div>









{/* MAIN */}



<div

className="
mt-8
grid
gap-6
md:grid-cols-2
"

>






{/* RISK */}



<div

className="
rounded-2xl
bg-white
p-6
shadow-sm
"

>


<h2

className="
flex
items-center
gap-2
text-xl
font-bold
"

>


<ShieldAlert

className="
text-red-500
"

/>


Supplier Risk Analysis


</h2>







<div

className="
mt-6
h-4
rounded-full
bg-slate-200
"

>


<div

className="
h-full
rounded-full
bg-orange-500
"

style={{

width:`${supplier.risk}%`

}}

/>


</div>





<p

className="
mt-3
font-semibold
"

>

Risk Level:

{
supplier.risk >= 75

?

"High"

:

supplier.risk >=50

?

"Medium"

:

"Low"

}

</p>






<div

className="
mt-5
space-y-3
"

>


{

supplier.issues.map((item,index)=>(


<div

key={index}

className="
rounded-xl
bg-red-50
p-3
text-sm
"

>

⚠ {item}

</div>


))


}


</div>




</div>











{/* AI */}



<div

className="
rounded-2xl
bg-gradient-to-br
from-emerald-50
to-blue-50
p-6
"

>


<h2

className="
flex
items-center
gap-2
text-xl
font-bold
"

>


<Sparkles

className="
text-emerald-600
"

/>


AI Recommendations


</h2>





<div

className="
mt-5
space-y-3
"

>


{

supplier.recommendations.map((item,index)=>(


<div

key={index}

className="
rounded-xl
bg-white
p-4
shadow-sm
"

>

✓ {item}

</div>


))


}



</div>



</div>







</div>









{/* PURCHASE HISTORY */}



<div

className="
mt-8
rounded-2xl
bg-white
p-6
shadow-sm
"

>


<h2

className="
text-xl
font-bold
"

>

Purchase History

</h2>



<div

className="
mt-4
grid
gap-4
md:grid-cols-3
"

>


<div className="rounded-xl bg-slate-50 p-4">

<p className="text-slate-500">

Total Orders

</p>

<p className="text-2xl font-bold">

24

</p>

</div>



<div className="rounded-xl bg-slate-50 p-4">

<p className="text-slate-500">

Average Order

</p>

<p className="text-2xl font-bold">

$17,500

</p>

</div>



<div className="rounded-xl bg-slate-50 p-4">

<p className="text-slate-500">

Savings Opportunity

</p>

<p className="text-2xl font-bold text-green-600">

$12,000

</p>

</div>



</div>


</div>








</div>


)


}









function InfoCard({

title,

value,

icon

}:{

title:string;

value:string|number;

icon:React.ReactNode;

}){


return (

<div

className="
rounded-2xl
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
justify-between
"

>


<span

className="
text-slate-500
"

>

{title}

</span>


<div

className="
text-emerald-600
"

>

{icon}

</div>


</div>



<p

className="
mt-4
text-3xl
font-bold
"

>

{value}

</p>



</div>


)

}