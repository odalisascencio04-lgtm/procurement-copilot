"use client";

import { useState } from "react";
import { askProcurementAI } from "@/lib/aiLogic";
import SupplierCommunication from "@/components/SupplierCommunication";

export default function AIAssistantPage(){


const [question,setQuestion]=useState("");

const [messages,setMessages]=useState<
{
role:string;
text:string;
}[]
>([]);



async function askAI(){


    if(!question) return;
    
    
    setMessages([
    ...messages,
    {
    role:"user",
    text:question
    }
    ]);
    
    
    const answer =
    await askProcurementAI(question);
    
    
    
    setMessages(prev=>[
    ...prev,
    {
    role:"ai",
    text:answer
    }
    ]);
    
    
    setQuestion("");
    
    }



return (

<main className="min-h-screen bg-gray-50 p-8">


<h1 className="mb-8 text-4xl font-bold">
🤖 AI Procurement Copilot
</h1>



<div className="rounded-2xl bg-white p-6 shadow">


<div className="mb-6 space-y-4">


{
messages.map((msg,index)=>(

<div
key={index}
className={
msg.role==="user"
?
"rounded-xl bg-blue-100 p-4"
:
"rounded-xl bg-gray-100 p-4"
}
>

<strong>
{msg.role==="user"
?
"You"
:
"AI"}
</strong>


<p>
{msg.text}
</p>


</div>

))
}


</div>



<div className="flex gap-4">


<input

value={question}

onChange={
(e)=>setQuestion(e.target.value)
}

placeholder="Ask about suppliers, spend, contracts..."

className="flex-1 rounded-xl border p-3"

/>



<button

onClick={askAI}

className="rounded-xl bg-blue-600 px-6 text-white"

>

Ask

</button>


</div>
</div>

<div className="mt-8">

<SupplierCommunication />

</div>

</main>

);


}