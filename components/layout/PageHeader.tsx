"use client";


import {
ReactNode
} from "react";



interface PageHeaderProps {


title:string;

subtitle?:string;

action?:ReactNode;


}



export default function PageHeader({

title,

subtitle,

action


}:PageHeaderProps){



return (

<div

className="
flex
flex-col
gap-5
md:flex-row
md:items-center
md:justify-between
"

>



{/* TITLE */}


<div>


<h1

className="
text-3xl
font-bold
tracking-tight
text-slate-900
"

>

{title}

</h1>




{
subtitle && (

<p

className="
mt-2
text-slate-500
"

>

{subtitle}

</p>

)

}



</div>







{/* ACTION */}



{

action && (

<div>

{action}

</div>

)

}



</div>


)

}