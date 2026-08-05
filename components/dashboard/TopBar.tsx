"use client";


import {
Search,
Bell,
User,
ChevronDown,
} from "lucide-react";


import GlobalSearch from "@/components/layout/GlobalSearch";
import ThemeToggle from "@/components/layout/ThemeToggle";



export default function TopBar(){


return (

<header

className="
sticky
top-0
z-30
flex
h-20
items-center
justify-between
border-b
border-emerald-100
bg-white/90
backdrop-blur
px-8
"

>



{/* SEARCH */}

<GlobalSearch />







{/* RIGHT */}

<div

className="
flex
items-center
gap-4
"

>


{/* THEME */}

<ThemeToggle />





{/* NOTIFICATION */}

<button

className="
relative
rounded-xl
border
border-slate-200
bg-white
p-3
hover:border-emerald-300
hover:bg-emerald-50
transition
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
bg-emerald-500
text-xs
font-bold
text-white
"

>

3

</span>


</button>







{/* PROFILE */}

<button

className="
flex
items-center
gap-3
rounded-xl
border
border-slate-200
bg-white
px-4
py-2
hover:border-emerald-300
hover:bg-emerald-50
transition
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


<p className="font-semibold text-slate-900">

David

</p>


<p className="text-xs text-slate-500">

Procurement Manager

</p>


</div>




<ChevronDown

size={18}

className="text-slate-400"

/>


</button>





</div>




</header>


)

}