"use client";

import { XCircle, CheckCircle } from "lucide-react";


interface Props {

open:boolean;

type?: "error" | "success";

title:string;

message:string;

onClose:()=>void;

}



export default function AlertDialog({

open,

type="error",

title,

message,

onClose,

}:Props){


if(!open) return null;



return (

<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
backdrop-blur-sm
"
>


<div
className="
w-full
max-w-md
rounded-3xl
bg-white
p-8
shadow-2xl
animate-in
fade-in
zoom-in
"
>


<button

onClick={onClose}

className="
absolute
right-6
top-6
text-slate-400
hover:text-slate-700
"

>

<XCircle size={22}/>

</button>




<div
className={`
flex
h-14
w-14
items-center
justify-center
rounded-2xl
${
type==="error"
?
"bg-red-100"
:
"bg-emerald-100"
}
`}
>


{
type==="error"
?

<XCircle
className="text-red-600"
size={30}
/>

:

<CheckCircle
className="text-emerald-600"
size={30}
/>

}


</div>





<h2
className="
mt-6
text-2xl
font-bold
text-slate-900
"
>

{title}

</h2>



<p
className="
mt-3
text-slate-500
leading-relaxed
"
>

{message}

</p>





<button

onClick={onClose}

className="
mt-8
w-full
rounded-xl
bg-emerald-500
py-3
font-semibold
text-white
hover:bg-emerald-600
"

>

Continue

</button>


</div>


</div>


);

}