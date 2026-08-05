"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


interface Props {
  open:boolean;
  onClose:()=>void;
  onSaved:()=>void;
}


export default function AddRFQModal({
  open,
  onClose,
  onSaved
}:Props){


const [title,setTitle]=useState("");
const [category,setCategory]=useState("");
const [budget,setBudget]=useState("");
const [deadline,setDeadline]=useState("");
const [status,setStatus]=useState("Open");



if(!open) return null;



async function saveRFQ(){


const {error}=await supabase
.from("rfqs")
.insert({

title,

category,

budget:Number(budget),

deadline,

status,

});


if(error){

alert(error.message);
return;

}


onSaved();

onClose();


}



return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


<div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">


<h2 className="mb-6 text-2xl font-bold">
Create RFQ
</h2>



<div className="space-y-4">


<input

placeholder="RFQ Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="w-full rounded-xl border p-3"

/>



<input

placeholder="Category"

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="w-full rounded-xl border p-3"

/>



<input

placeholder="Budget"

type="number"

value={budget}

onChange={(e)=>setBudget(e.target.value)}

className="w-full rounded-xl border p-3"

/>



<input

type="date"

value={deadline}

onChange={(e)=>setDeadline(e.target.value)}

className="w-full rounded-xl border p-3"

/>



<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="w-full rounded-xl border p-3"

>


<option>
Open
</option>

<option>
Pending
</option>

<option>
Approved
</option>

<option>
Closed
</option>


</select>


</div>



<div className="mt-8 flex justify-end gap-3">


<button

onClick={onClose}

className="rounded-xl px-5 py-3 text-gray-600 hover:bg-gray-100"

>

Cancel

</button>



<button

onClick={saveRFQ}

className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600"

>

Create RFQ

</button>


</div>


</div>


</div>

);

}