"use client";

import { useState } from "react";


export default function UserMenu(){


const [open,setOpen]=useState(false);



return(

<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
rounded-xl
bg-gray-100
px-4
py-2
"

>

Admin ▾

</button>




{

open &&

<div className="
absolute
right-0
mt-2
w-48
rounded-xl
bg-white
p-3
shadow
">


<a

href="/profile"

className="
block
rounded-lg
p-2
hover:bg-gray-100
"

>

Profile

</a>




<a

href="/settings"

className="
block
rounded-lg
p-2
hover:bg-gray-100
"

>

Settings

</a>


</div>

}


</div>

)

}