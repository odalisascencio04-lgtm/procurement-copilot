"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";


const insights = [

{
title:"Cost Reduction Opportunity",
description:
"AI identified 3 suppliers where renegotiation could reduce annual spending.",
icon:TrendingDown,
},


{
title:"Supplier Risk Detected",
description:
"AI found delivery delays and declining quality scores from key vendors.",
icon:AlertTriangle,
},


{
title:"Contract Optimization",
description:
"AI discovered unused savings opportunities in existing agreements.",
icon:CheckCircle,
},


];



export default function AIDemo(){


return (

<section
id="demo"
className="
bg-white
py-24
"
>


<div
className="
mx-auto
max-w-7xl
px-8
"
>



{/* Header */}


<div
className="
mx-auto
max-w-3xl
text-center
"
>


<div
className="
inline-flex
items-center
gap-2
rounded-full
bg-emerald-100
px-4
py-2
text-sm
font-medium
text-emerald-700
"
>

<Sparkles size={16}/>

AI Procurement Copilot

</div>



<h2
className="
mt-6
text-4xl
font-bold
text-slate-900
lg:text-5xl
"
>

Ask AI.
Understand your procurement.
Make better decisions.

</h2>



<p
className="
mt-5
text-lg
text-slate-500
"
>

Your AI assistant analyzes suppliers,
contracts, and spending data to provide
instant recommendations.

</p>


</div>








<div
className="
mt-16
grid
gap-10
lg:grid-cols-2
"
>





{/* CHAT WINDOW */}


<motion.div

initial={{
opacity:0,
x:-40
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-xl
"

>


<div
className="
flex
items-center
gap-3
border-b
border-slate-100
pb-5
"
>


<div
className="
rounded-xl
bg-emerald-500
p-3
text-white
"
>

<BrainCircuit size={24}/>

</div>



<div>

<h3
className="
font-bold
"
>

Procurement Copilot

</h3>


<p
className="
text-sm
text-emerald-600
"
>

Online

</p>


</div>


</div>






<div
className="
mt-6
space-y-5
"
>



{/* User */}

<div
className="
ml-auto
max-w-sm
rounded-2xl
bg-slate-100
p-4
text-slate-700
"
>

Which suppliers have the highest risk?

</div>





{/* AI */}

<div
className="
max-w-md
rounded-2xl
bg-emerald-500
p-5
text-white
"
>

AI Analysis:

<br/><br/>

• ABC Electronics delivery delays increased 18%

<br/>

• Global Steel contract expires soon

<br/>

• Nova Parts quality score decreased

</div>







<div
className="
ml-auto
max-w-sm
rounded-2xl
bg-slate-100
p-4
text-slate-700
"
>

How can we reduce procurement costs?

</div>





<div
className="
max-w-md
rounded-2xl
bg-[#081722]
p-5
text-white
"
>

Recommendation:

<br/><br/>

Consolidate suppliers and renegotiate
contracts.

Estimated annual savings:

<span
className="
font-bold
text-emerald-400
"
>

 $120,000

</span>

</div>



</div>


</motion.div>







{/* INSIGHTS */}



<div
className="
space-y-6
"
>


{
insights.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.title}


initial={{
opacity:0,
x:40
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{
once:true
}}

transition={{
delay:index*0.15
}}


whileHover={{
y:-5
}}


className="
rounded-3xl
border
border-slate-200
bg-slate-50
p-7
"

>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
rounded-xl
bg-white
p-3
shadow-sm
"
>

<Icon
className="text-emerald-500"
/>

</div>



<h3
className="
text-xl
font-bold
text-slate-900
"
>

{item.title}

</h3>


</div>




<p
className="
mt-4
text-slate-500
"
>

{item.description}

</p>



</motion.div>


)

})

}


</div>



</div>




</div>


</section>

);

}