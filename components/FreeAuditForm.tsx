"use client";

import {useState} from "react";


export default function FreeAuditForm(){

const [form,setForm]=useState({

name:"",
company:"",
email:"",
monthly_spend:""

});


const [sent,setSent]=useState(false);



async function submit(){

await fetch(
"/api/leads",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});


setSent(true);

}



if(sent){

return (

<div className="
rounded-xl
bg-green-50
p-6
">

Thanks!
We will prepare your AI procurement audit.

</div>

)

}



return (

<div className="
rounded-2xl
bg-white
p-6
shadow
">

<h2 className="
text-xl
font-bold
">

Get Free AI Procurement Audit

</h2>


<input

className="
mt-4
border
rounded-xl
p-3
w-full
"

placeholder="Name"

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>


<input

className="
mt-3
border
rounded-xl
p-3
w-full
"

placeholder="Company"

onChange={
e=>setForm({
...form,
company:e.target.value
})
}

/>


<input

className="
mt-3
border
rounded-xl
p-3
w-full
"

placeholder="Email"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>


<input

className="
mt-3
border
rounded-xl
p-3
w-full
"

placeholder="Monthly Procurement Spend"

onChange={
e=>setForm({
...form,
monthly_spend:e.target.value
})
}

/>



<button

onClick={submit}

className="
mt-5
rounded-xl
bg-blue-700
px-5
py-3
text-white
"

>

Request Free Audit

</button>


</div>

)

}