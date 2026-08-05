"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";


const benefits = [

{
title:"AI Recommendations",
description:
"Receive intelligent procurement suggestions based on your data.",
icon:BrainCircuit,
},

{
title:"Supplier Intelligence",
description:
"Monitor vendor performance and discover hidden risks.",
icon:Users,
},

{
title:"Risk Detection",
description:
"Identify contract and supplier problems before they happen.",
icon:ShieldCheck,
},

{
title:"Spend Optimization",
description:
"Find savings opportunities with AI-powered analysis.",
icon:TrendingUp,
},

];



export default function DashboardPreview(){

return (

<section
className="
bg-slate-50
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

Product Preview

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

Your complete procurement
command center

</h2>



<p
className="
mt-5
text-lg
text-slate-500
"
>

Manage suppliers, contracts,
spending, and AI insights
from one intelligent platform.

</p>


</div>







{/* Dashboard Image */}


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.8
}}

className="
relative
mt-16
"

>


{/* Floating AI badge */}


<div
className="
absolute
-right-6
-top-6
z-10
flex
items-center
gap-2
rounded-2xl
bg-[#081722]
px-5
py-3
text-white
shadow-xl
"
>

<BrainCircuit
size={20}
className="text-emerald-400"
/>


AI Powered


</div>




<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-4
shadow-2xl
"
>


<Image

src="/dashboard-preview.png"

alt="Procurement dashboard"

width={1400}

height={900}

className="
rounded-2xl
"

/>


</div>


</motion.div>







{/* Metrics */}



<div
className="
mt-12
grid
gap-6
md:grid-cols-4
"
>


{
benefits.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.title}


initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*0.1
}}


whileHover={{
y:-5
}}


className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<Icon
size={28}
className="text-emerald-500"
/>



<h3
className="
mt-4
font-bold
text-slate-900
"
>

{item.title}

</h3>



<p
className="
mt-2
text-sm
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


</section>


);

}