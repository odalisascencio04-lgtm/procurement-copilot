"use client";


import {
useState
} from "react";


import {
Bell
} from "lucide-react";



const notifications=[

{
title:"Contract Expiring",
message:"Microsoft contract expires in 14 days.",
type:"warning"
},


{
title:"Supplier Risk Alert",
message:"Supplier score dropped below threshold.",
type:"warning"
},


{
title:"Purchase Order Approved",
message:"PO #1024 was approved.",
type:"success"
}

];



export default function NotificationMenu(){


const [open,setOpen]=useState(false);



return (

<div className="relative">



<button

onClick={()=>setOpen(!open)}

className="
relative
rounded-xl
border
border-slate-200
p-3
hover:bg-slate-100
"

>

<Bell size={20}/>


<span

className="
absolute
-right-1
-top-1
flex
h-5
w-5
items-center
justify-center
rounded-full
bg-red-500
text-[10px]
font-bold
text-white
"

>

3

</span>


</button>






{
open &&


<div

className="
absolute
right-0
mt-3
w-96
rounded-2xl
border
bg-white
p-4
shadow-xl
z-50
"

>


<h3

className="
mb-4
font-bold
text-lg
"

>

Notifications

</h3>



<div className="space-y-3">


{
notifications.map((item,index)=>(


<div

key={index}

className="
rounded-xl
bg-slate-50
p-4
hover:bg-slate-100
"

>


<p className="font-semibold">

{
item.type==="warning"
?
"⚠ "
:
"✓ "
}

{item.title}

</p>



<p className="mt-1 text-sm text-slate-500">

{item.message}

</p>



</div>


))

}



</div>



</div>


}


</div>

)

}