"use client";

import { motion } from "framer-motion";

import {
  BrainCircuit,
  FileSearch,
  TrendingUp,
  Workflow,
} from "lucide-react";


const features = [

{
title:"AI Supplier Intelligence",
description:
"Analyze supplier performance, identify risks, and discover the best vendors automatically.",
icon:BrainCircuit,
},

{
title:"Contract Intelligence",
description:
"Review contracts with AI and detect expiration dates, risks, and hidden opportunities.",
icon:FileSearch,
},

{
title:"Spend Optimization",
description:
"Understand procurement spending patterns and uncover cost-saving opportunities.",
icon:TrendingUp,
},

{
title:"Workflow Automation",
description:
"Automate approvals, purchasing processes, and repetitive procurement tasks.",
icon:Workflow,
},

];



export default function Features(){

return (

<section
id="features"
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
rounded-full
bg-emerald-100
px-4
py-2
text-sm
font-medium
text-emerald-700
"
>

Powerful AI capabilities

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

Everything you need to
modernize procurement

</h2>



<p
className="
mt-5
text-lg
text-slate-500
"
>

One intelligent platform to manage
suppliers, contracts, spending,
and purchasing decisions.

</p>


</div>





{/* Cards */}


<div
className="
mt-16
grid
gap-8
md:grid-cols-2
"
>


{
features.map((feature,index)=>{


const Icon = feature.icon;


return (

<motion.div

key={feature.title}


initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.5,
delay:index*0.1
}}


whileHover={{
y:-8
}}


className="
group
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
transition
hover:shadow-xl
"

>


<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-emerald-100
"
>


<Icon

size={28}

className="
text-emerald-600
"

/>


</div>




<h3
className="
mt-6
text-2xl
font-bold
text-slate-900
"
>

{feature.title}

</h3>



<p
className="
mt-3
leading-relaxed
text-slate-500
"
>

{feature.description}

</p>




<div
className="
mt-6
text-sm
font-semibold
text-emerald-600
opacity-0
transition
group-hover:opacity-100
"
>

Learn more →

</div>



</motion.div>


)

})

}


</div>


</div>


</section>

);

}