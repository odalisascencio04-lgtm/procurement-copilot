"use client";


import {
  TrendingUp,
  Users,
  FileText,
  AlertTriangle,
  Sparkles,
  DollarSign,
  Clock,
  ChevronRight,
  ShieldAlert,
  Bot
} from "lucide-react";

import {
useEffect,
useState
} from "react";



interface DashboardStats {


totalSpend:number;

suppliers:number;

contracts:number;

riskAlerts:number;



monthlySpend:
{
month:string;
amount:number;
}[];



topSuppliers:
{
name:string;
spend:number;
}[];



expiringContracts:
{
name:string;
daysLeft:number;
}[];



aiInsight:string;


potentialSavings:number;



moneyAlerts:
{
title:string;
description:string;
impact:string;
severity:"high"|"medium"|"low";
}[];



supplierRisk:
{
name:string;
issue:string;
recommendation:string;
};



}





const demoData:DashboardStats={



totalSpend:184000,


suppliers:23,


contracts:45,


riskAlerts:3,



monthlySpend:[

{
month:"Jan",
amount:12000
},

{
month:"Feb",
amount:15000
},

{
month:"Mar",
amount:18000
},

{
month:"Apr",
amount:14000
},

{
month:"May",
amount:21000
},

{
month:"Jun",
amount:19000
}

],




topSuppliers:[

{
name:"Global Steel",
spend:45000
},

{
name:"ABC Electronics",
spend:32000
},

{
name:"Nova Parts",
spend:28000
}

],





expiringContracts:[

{
name:"Microsoft",
daysLeft:45
},

{
name:"AWS",
daysLeft:30
},

{
name:"Adobe",
daysLeft:20
}

],




aiInsight:

"AI detected supplier consolidation opportunities. Review ABC Electronics pricing before your next purchase cycle.",



potentialSavings:32000,




moneyAlerts:[


{
title:"ABC Electronics pricing increased",

description:
"Supplier prices increased 18% compared with previous purchases.",

impact:
"Estimated loss: $8,100/year",

severity:"high"

},



{
title:"Too many similar vendors",

description:
"Multiple suppliers provide overlapping products.",

impact:
"Possible savings: $4,200/year",

severity:"medium"

},



{
title:"Contract optimization opportunity",

description:
"AWS usage does not match commitment level.",

impact:
"Review before renewal",

severity:"low"

}

],




supplierRisk:{


name:"ABC Electronics",

issue:
"Delivery performance dropped while prices increased.",


recommendation:
"Request backup supplier quotes before next order."

}



};








export default function DashboardPage(){



const [stats,setStats]
=
useState<DashboardStats|null>(null);



useEffect(()=>{


setStats(demoData);


},[]);





if(!stats)

return (

<div className="flex h-96 items-center justify-center">

<div
className="
h-12
w-12
animate-spin
rounded-full
border-b-2
border-emerald-500
"
/>

</div>

);






return (

<main
className="
space-y-8
max-w-7xl
mx-auto
"
>





<div>


<h1
className="
flex
items-center
gap-3
text-4xl
font-bold
text-slate-900
"
>

<Sparkles
className="text-emerald-500"
/>


Procurement Intelligence Dashboard


</h1>



<p
className="
mt-2
text-slate-500
"
>

AI-powered procurement insights and savings opportunities.

</p>


</div>







<div
className="
grid
gap-6
md:grid-cols-4
"
>


<Card

title="Total Spend"

value={`$${stats.totalSpend.toLocaleString()}`}

icon={<DollarSign/>}

/>



<Card

title="Suppliers"

value={stats.suppliers}

icon={<Users/>}

/>



<Card

title="Contracts"

value={stats.contracts}

icon={<FileText/>}

/>



<Card

title="Risk Alerts"

value={stats.riskAlerts}

icon={<AlertTriangle/>}

/>



</div>








<div
className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"
>


<h2
className="
mb-5
flex
items-center
gap-2
text-xl
font-bold
"
>


<ShieldAlert
className="text-red-500"
/>


Money Losing Alerts


</h2>





<div className="space-y-4">


{
stats.moneyAlerts.map((item,index)=>(


<div

key={index}

className="
rounded-xl
border
bg-red-50
p-4
"

>


<h3
className="font-semibold"
>

{item.title}

</h3>



<p
className="
mt-1
text-sm
text-slate-600
"
>

{item.description}

</p>



<p
className="
mt-2
font-medium
text-red-600
"
>

{item.impact}

</p>


</div>


))
}



</div>


</div>









<div
className="
grid
gap-6
md:grid-cols-2
"
>



<div
className="
rounded-2xl
bg-gradient-to-r
from-emerald-50
to-blue-50
p-6
"
>


<div
className="
flex
gap-3
"
>


<Sparkles
className="text-emerald-600"
/>


<div>


<h2 className="font-bold">

AI Recommendation

</h2>


<p
className="
mt-2
text-slate-600
"
>

{stats.aiInsight}

</p>


</div>


</div>


</div>








<div
className="
rounded-2xl
border
bg-white
p-6
"
>


<h2
className="
flex
items-center
gap-2
font-bold
"
>


<AlertTriangle
className="text-orange-500"
/>


Supplier Risk


</h2>



<h3
className="
mt-4
font-semibold
"
>

{stats.supplierRisk.name}

</h3>



<p
className="
mt-2
text-sm
text-slate-600
"
>

{stats.supplierRisk.issue}

</p>



<div
className="
mt-4
rounded-xl
bg-orange-50
p-3
"
>

<p className="text-sm font-medium">

Recommendation:

</p>


<p className="text-sm">

{stats.supplierRisk.recommendation}

</p>


</div>


</div>



</div>









<div
className="
rounded-2xl
border
bg-white
p-6
"
>


<h2
className="
flex
items-center
gap-2
font-bold
"
>


<TrendingUp
className="text-green-500"
/>


Potential Savings


</h2>



<p
className="
mt-3
text-4xl
font-bold
text-green-600
"
>

${stats.potentialSavings.toLocaleString()}

</p>


<p className="text-slate-500">

Annual opportunity

</p>



</div>









<div
className="
rounded-2xl
border
bg-white
p-6
"
>


<h2
className="
mb-4
flex
items-center
gap-2
font-bold
"
>

<Clock/>

Upcoming Contract Renewals

</h2>



<div
className="
grid
gap-4
md:grid-cols-3
"
>


{
stats.expiringContracts.map((c,i)=>(


<div
key={i}
className="
rounded-xl
border
p-4
"
>

<h3 className="font-semibold">

{c.name}

</h3>


<p
className="
text-orange-600
"
>

{c.daysLeft} days left

</p>


</div>


))
}


</div>


</div>









<div
className="
rounded-2xl
bg-slate-900
p-6
text-white
"
>


<div
className="
flex
items-center
gap-3
"
>

<Bot/>


<h2 className="text-xl font-bold">

Ask ProcureAI

</h2>


</div>



<p
className="
mt-3
text-slate-300
"
>

Ask AI about savings, suppliers, contracts, and procurement risks.

</p>



<button
className="
mt-4
flex
items-center
gap-2
rounded-xl
bg-emerald-500
px-5
py-3
font-semibold
"
>

Open AI Analysis

<ChevronRight size={18}/>

</button>



</div>







</main>

);


}







function Card(
{
title,
value,
icon
}:{
title:string;
value:any;
icon:any;
}

){


return (

<div
className="
rounded-2xl
border
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
className="text-slate-500"
>

{title}

</span>


<div className="text-emerald-600">

{icon}

</div>


</div>



<p
className="
mt-3
text-3xl
font-bold
"
>

{value}

</p>


</div>

)

}