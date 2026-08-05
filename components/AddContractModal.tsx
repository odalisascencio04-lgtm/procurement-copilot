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





export default function AddContractModal({

open,

onClose,

onSaved,

}:Props){



const [title,setTitle]=useState("");

const [supplier,setSupplier]=useState("");

const [value,setValue]=useState("");

const [startDate,setStartDate]=useState("");

const [endDate,setEndDate]=useState("");

const [risk,setRisk]=useState("Low");


const [loading,setLoading]=useState(false);





if(!open)
return null;





async function save(){


setLoading(true);



const {

error

}=await supabase

.from("contracts")

.insert({

title,

supplier,

value:Number(value),

start_date:startDate,

end_date:endDate,

status:"Active",

risk_level:risk,

});





if(!error){


onSaved();

onClose();


setTitle("");

setSupplier("");

setValue("");

setStartDate("");

setEndDate("");

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
max-w-xl
rounded-3xl
bg-white
p-8
shadow-xl
"

>


<h2

className="
text-2xl
font-bold
"

>

Create Contract

</h2>


<p className="
mt-2
text-slate-500
">

Add a new supplier agreement.

</p>





<div className="
mt-6
space-y-4
">



<input

placeholder="Contract Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

placeholder="Supplier Name"

value={supplier}

onChange={(e)=>setSupplier(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<input

type="number"

placeholder="Contract Value"

value={value}

onChange={(e)=>setValue(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<div className="grid grid-cols-2 gap-4">


<input

type="date"

value={startDate}

onChange={(e)=>setStartDate(e.target.value)}

className="
rounded-xl
border
px-4
py-3
"

/>



<input

type="date"

value={endDate}

onChange={(e)=>setEndDate(e.target.value)}

className="
rounded-xl
border
px-4
py-3
"

/>



</div>






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







<div

className="
mt-8
flex
justify-end
gap-3
"

>


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
"Save Contract"

}


</button>





</div>



</div>


</div>

)

}