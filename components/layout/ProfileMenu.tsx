"use client";

import {
useState
} from "react";

import {
User,
Settings,
LogOut
} from "lucide-react";

import Link from "next/link";



export default function ProfileMenu(){


const [open,setOpen]=useState(false);



return (

<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
rounded-xl
border
border-slate-200
px-4
py-2
hover:bg-slate-100
"

>


<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-emerald-500
text-white
"

>

<User size={18}/>

</div>



<div className="text-left">

<p className="font-semibold">
David
</p>


<p className="text-sm text-slate-500">
Procurement Manager
</p>

</div>



</button>





{
open &&

<div

className="
absolute
right-0
mt-3
w-64
rounded-2xl
border
bg-white
p-3
shadow-xl
"

>


<Link

href="/profile"

className="
flex
items-center
gap-3
rounded-xl
p-3
hover:bg-slate-100
"

>

<User size={18}/>

Profile

</Link>




<Link

href="/settings"

className="
flex
items-center
gap-3
rounded-xl
p-3
hover:bg-slate-100
"

>

<Settings size={18}/>

Settings

</Link>





<button

className="
flex
w-full
items-center
gap-3
rounded-xl
p-3
text-red-500
hover:bg-red-50
"

>

<LogOut size={18}/>

Logout

</button>



</div>

}


</div>

)

}