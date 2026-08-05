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



export default function AddPurchaseOrderModal({

open,

onClose,

onSaved,

}:Props){



const [poNumber,setPoNumber]=useState("");

const [supplier,setSupplier]=useState("");

const [amount,setAmount]=useState("");

const [status,setStatus]=useState("Draft");


const [loading,setLoading]=useState(false);





if(!open)
return null;





async function save(){


setLoading(true);



const {error}=await supabase

.from("purchase_orders")

.insert({

po_number:poNumber,

supplier,

amount:Number(amount),

status,

});



if(!error){

onSaved();

onClose();


setPoNumber("");

setSupplier("");

setAmount("");

setStatus("Draft");


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


<h2

className="
text-2xl
font-bold
"

>

Create Purchase Order

</h2>


<p

className="
mt-2
text-slate-500
"

>

Add a new procurement order.

</p>





<div

className="
mt-6
space-y-4
"

>



<input

placeholder="PO Number"

value={poNumber}

onChange={(e)=>setPoNumber(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>




<input

placeholder="Supplier name"

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

placeholder="Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

/>





<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

>


<option>
Draft
</option>


<option>
Pending Approval
</option>


<option>
Approved
</option>


<option>
Completed
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
text-slate-500
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
"Create PO"
}


</button>


</div>




</div>


</div>


)

}