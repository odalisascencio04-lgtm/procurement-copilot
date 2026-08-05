"use client";

import {useState} from "react";


export default function AIAssistant(){

const [message,setMessage]=useState("");

const [answer,setAnswer]=useState("");



async function ask(){

const res =
await fetch(
"/api/assistant",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message
})
});


const data =
await res.json();


setAnswer(data.result);

}



return (

<div className="
rounded-2xl
bg-white
p-6
shadow
">


<h2 className="text-xl font-bold">
🤖 Procurement AI Assistant
</h2>


<input

className="
mt-4
w-full
border
rounded-xl
p-3
"

value={message}

onChange={
e=>setMessage(e.target.value)
}

placeholder="
Ask procurement question...
"

/>


<button

onClick={ask}

className="
mt-4
rounded-xl
bg-blue-700
px-5
py-3
text-white
"

>

Ask AI

</button>


{
answer &&

<div className="
mt-5
bg-blue-50
rounded-xl
p-5
">

{answer}

</div>

}


</div>

)

}