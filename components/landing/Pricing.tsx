"use client";

import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
} from "lucide-react";


const plans = [

{
name:"Starter",
price:"$49",
description:
"For small procurement teams getting started.",
features:[
"Supplier management",
"Basic analytics",
"AI procurement assistant",
"Document storage",
],
},

{
name:"Professional",
price:"$199",
description:
"For growing businesses that need intelligence.",
popular:true,
features:[
"Everything in Starter",
"AI recommendations",
"Contract analysis",
"Spend optimization",
"Advanced reporting",
],
},

{
name:"Enterprise",
price:"Custom",
description:
"For organizations with complex procurement.",
features:[
"Unlimited users",
"Advanced security",
"Custom workflows",
"Dedicated support",
],
},

];



export default function Pricing(){

return (

<section
id="pricing"
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

Simple Pricing

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

Choose the right plan
for your procurement team

</h2>



<p
className="
mt-5
text-lg
text-slate-500
"
>

Start small and scale as your
procurement operations grow.

</p>


</div>





<div
className="
mt-16
grid
gap-8
lg:grid-cols-3
"
>


{
plans.map((plan,index)=>(


<motion.div

key={plan.name}

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
delay:index*0.15
}}

className={`
relative
rounded-3xl
border
p-8
bg-white
shadow-sm
${
plan.popular
?
"border-emerald-500 shadow-xl"
:
"border-slate-200"
}
`}

>


{
plan.popular && (

<div
className="
absolute
-right-5
-top-5
rounded-full
bg-emerald-500
px-4
py-2
text-sm
font-semibold
text-white
"
>

Most Popular

</div>

)

}




<h3
className="
text-2xl
font-bold
text-slate-900
"
>

{plan.name}

</h3>



<p
className="
mt-3
text-slate-500
"
>

{plan.description}

</p>




<div
className="
mt-8
"
>

<span
className="
text-5xl
font-bold
text-slate-900
"
>

{plan.price}

</span>


{
plan.price !== "Custom" && (

<span className="text-slate-500">
/month
</span>

)

}

</div>





<ul
className="
mt-8
space-y-4
"
>


{
plan.features.map((feature)=>(


<li
key={feature}
className="
flex
items-center
gap-3
text-slate-600
"
>

<Check
size={18}
className="
text-emerald-500
"
/>

{feature}

</li>


))

}


</ul>





<button

className={`
mt-10
w-full
rounded-xl
px-5
py-3
font-semibold
transition
${
plan.popular
?
"bg-emerald-500 text-white hover:bg-emerald-600"
:
"border border-slate-300 hover:bg-slate-50"
}
`}

>

Get Started

</button>



</motion.div>


))

}


</div>


</div>


</section>

);

}