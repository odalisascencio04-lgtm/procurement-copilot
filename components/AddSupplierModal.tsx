"use client";


import {
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



interface Props {

open:boolean;

onClose:()=>void;

onSaved:()=>void;

}




export default function AddSupplierModal({

open,

onClose,

onSaved,

}:Props){



const [name,setName]=useState("");

const [category,setCategory]=useState("");

const [country,setCountry]=useState("");

const [spend,setSpend]=useState("");

const [score,setScore]=useState("");

const [risk,setRisk]=useState("Low");


const [loading,setLoading]=useState(false);





if(!open)
return null;





async function save(){


setLoading(true);



const {error}=await supabase

.from("suppliers")

.insert({

name,

category,

country,

annual_spend:Number(spend),

performance_score:Number(score),

risk_level:risk,

});




if(!error){


onSaved();

onClose();


setName("");

setCategory("");

setCountry("");

setSpend("");

setScore("");

setRisk("Low");


}



setLoading(false);


}





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
"

>


<div

className="
w-full
max-w-lg
rounded-3xl
bg-white
p-8
shadow-xl
"

>


<h2 className="
text-2xl
font-bold
">

Add Supplier

</h2>


<p className="
mt-2
text-slate-500
">

Create supplier profile.

</p>





<div className="
mt-6
space-y-4
">


<input

placeholder="Company Name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

placeholder="Category"

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

placeholder="Country"

value={country}

onChange={(e)=>setCountry(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

placeholder="Annual Spend"

type="number"

value={spend}

onChange={(e)=>setSpend(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

placeholder="Performance Score (0-100)"

type="number"

value={score}

onChange={(e)=>setScore(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<select

value={risk}

onChange={(e)=>setRisk(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
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
px-5
py-3
hover:bg-slate-100
"

>

Cancel

</button>





<button

onClick={save}

disabled={loading}

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

{
loading
?
"Saving..."
:
"Save Supplier"
}


</button>



</div>



</div>


</div>

)

}