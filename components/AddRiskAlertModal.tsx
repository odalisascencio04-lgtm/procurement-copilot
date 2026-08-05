"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";


interface Props{

open:boolean;
onClose:()=>void;
onSaved:()=>void;

}



export default function AddRiskAlertModal({

open,
onClose,
onSaved

}:Props){


const [supplierId,setSupplierId]=useState(0);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [category,setCategory]=useState("Supplier");
const [riskLevel,setRiskLevel]=useState("Medium");



if(!open)return null;



async function save(){


const {error}=await supabase

.from("risk_alerts")

.insert([{

supplier_id:supplierId,

title,

description,

category,

risk_level:riskLevel,

status:"Open"

}]);



if(error){

alert(error.message);
return;

}



setSupplierId(0);
setTitle("");
setDescription("");

onSaved();
onClose();


}



return(

<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/50
">


<div className="
w-full
max-w-lg
rounded-2xl
bg-white
p-8
">


<h2 className="
mb-6
text-2xl
font-bold
">

Create Risk Alert

</h2>




<div className="space-y-4">


<input

type="number"

placeholder="Supplier ID"

value={supplierId}

onChange={
e=>setSupplierId(
Number(e.target.value)
)
}

className="
w-full
rounded-xl
border
p-3
"

/>




<input

placeholder="Alert Title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

className="
w-full
rounded-xl
border
p-3
"

/>




<textarea

placeholder="Description"

value={description}

onChange={
e=>setDescription(e.target.value)
}

className="
h-28
w-full
rounded-xl
border
p-3
"

/>




<select

value={category}

onChange={
e=>setCategory(e.target.value)
}

className="
w-full
rounded-xl
border
p-3
"

>

<option>
Supplier
</option>

<option>
Contract
</option>

<option>
Delivery
</option>

<option>
Quality
</option>


</select>





<select

value={riskLevel}

onChange={
e=>setRiskLevel(e.target.value)
}

className="
w-full
rounded-xl
border
p-3
"

>

<option>
Low
</option>

<option>
Medium
</option>

<option>
High
</option>

<option>
Critical
</option>


</select>


</div>




<div className="
mt-8
flex
justify-end
gap-3
">


<button

onClick={onClose}

className="
rounded-xl
border
px-5
py-2
"

>

Cancel

</button>




<button

onClick={save}

className="
rounded-xl
bg-blue-600
px-5
py-2
text-white
"

>

Save

</button>


</div>



</div>


</div>


)

}