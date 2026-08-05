"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";


interface Props{

open:boolean;
supplierId:number;
onClose:()=>void;
onSaved:()=>void;

}



export default function AddScoreModal({
open,
supplierId,
onClose,
onSaved
}:Props){


const [quality,setQuality]=useState(5);
const [delivery,setDelivery]=useState(5);
const [cost,setCost]=useState(5);
const [risk,setRisk]=useState(5);
const [comments,setComments]=useState("");



if(!open)return null;



async function save(){


const {error}=await supabase

.from("supplier_scores")

.insert([{

supplier_id:supplierId,

quality_score:quality,

delivery_score:delivery,

cost_score:cost,

risk_score:risk,

comments

}]);



if(error){

alert(error.message);
return;

}


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

Supplier Evaluation

</h2>



<div className="space-y-4">


<select

value={quality}

onChange={e=>setQuality(Number(e.target.value))}

className="
w-full
rounded-xl
border
p-3
"

>

<option value="5">
Quality ⭐⭐⭐⭐⭐
</option>

<option value="4">
Quality ⭐⭐⭐⭐
</option>

<option value="3">
Quality ⭐⭐⭐
</option>

<option value="2">
Quality ⭐⭐
</option>

<option value="1">
Quality ⭐
</option>


</select>





<select

value={delivery}

onChange={e=>setDelivery(Number(e.target.value))}

className="
w-full
rounded-xl
border
p-3
"

>

<option value="5">
Delivery ⭐⭐⭐⭐⭐
</option>

<option value="4">
Delivery ⭐⭐⭐⭐
</option>

<option value="3">
Delivery ⭐⭐⭐
</option>

<option value="2">
Delivery ⭐⭐
</option>

<option value="1">
Delivery ⭐
</option>

</select>





<select

value={cost}

onChange={e=>setCost(Number(e.target.value))}

className="
w-full
rounded-xl
border
p-3
"

>

<option value="5">
Cost ⭐⭐⭐⭐⭐
</option>

<option value="4">
Cost ⭐⭐⭐⭐
</option>

<option value="3">
Cost ⭐⭐⭐
</option>

<option value="2">
Cost ⭐⭐
</option>

<option value="1">
Cost ⭐
</option>

</select>





<select

value={risk}

onChange={e=>setRisk(Number(e.target.value))}

className="
w-full
rounded-xl
border
p-3
"

>

<option value="5">
Low Risk ⭐⭐⭐⭐⭐
</option>

<option value="4">
Low Risk ⭐⭐⭐⭐
</option>

<option value="3">
Medium Risk ⭐⭐⭐
</option>

<option value="2">
High Risk ⭐⭐
</option>

<option value="1">
Critical Risk ⭐
</option>

</select>





<textarea

placeholder="Comments"

value={comments}

onChange={e=>setComments(e.target.value)}

className="
h-28
w-full
rounded-xl
border
p-3
"

/>



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