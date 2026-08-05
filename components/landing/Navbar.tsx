"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar(){

const [open,setOpen]=useState(false);


return (

<nav className="
fixed
top-0
z-50
w-full
border-b
border-white/10
bg-white/80
backdrop-blur-xl
">


<div className="
mx-auto
flex
max-w-7xl
items-center
justify-between
px-8
py-5
">


{/* Logo */}

<Link
href="/"
className="flex items-center gap-3"
>

<div className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-gradient-to-br
from-emerald-500
to-teal-500
font-bold
text-white
">

P

</div>


<div>

<h1 className="
font-bold
text-slate-900
">

Procurement

</h1>

<p className="
text-xs
text-slate-500
">

Copilot AI

</p>

</div>

</Link>



{/* Desktop */}

<div className="
hidden
items-center
gap-8
md:flex
">


<Link
href="#features"
className="text-slate-600 hover:text-slate-900"
>
Product
</Link>


<Link
href="#solutions"
className="text-slate-600 hover:text-slate-900"
>
Solutions
</Link>


<Link
href="#pricing"
className="text-slate-600 hover:text-slate-900"
>
Pricing
</Link>



<Link
href="/login"
className="
text-slate-600
hover:text-slate-900
"
>
Login
</Link>



<Link
href="/register"
className="
rounded-xl
bg-emerald-500
px-5
py-3
font-semibold
text-white
hover:bg-emerald-600
"
>

Start Free

</Link>


</div>




{/* Mobile */}

<button

className="md:hidden"

onClick={()=>setOpen(!open)}

>

{
open ?

<X />

:

<Menu />

}

</button>



</div>




{
open && (

<div className="
border-t
bg-white
p-6
md:hidden
space-y-4
">

<Link href="#features">
Product
</Link>


<Link href="#solutions">
Solutions
</Link>


<Link href="#pricing">
Pricing
</Link>


<Link href="/login">
Login
</Link>


<Link
href="/register"
className="
block
rounded-xl
bg-emerald-500
px-4
py-3
text-center
text-white
"
>
Start Free
</Link>


</div>

)

}


</nav>

)

}