"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


interface Props {
  open:boolean;
  onClose:()=>void;
  onSaved:()=>void;
  rfqId:number;
}


export default function AddQuoteModal({
  open,
  onClose,
  onSaved,
  rfqId
}:Props){


const [supplier,setSupplier]=useState("");
const [price,setPrice]=useState(0);
const [deliveryDays,setDeliveryDays]=useState(1);
const [warranty,setWarranty]=useState("");



if(!open) return null;



async function saveQuote(){


const {error}=await supabase
.from("quotes")
.insert([
{
rfq_id:rfqId,
supplier,
price,
delivery_days:deliveryDays,
warranty
}
]);



if(error){

alert(error.message);
return;

}


setSupplier("");
setPrice(0);
setDeliveryDays(1);
setWarranty("");

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
shadow-xl
">


<h2 className="
mb-6
text-2xl
font-bold
">
Add Supplier Quote
</h2>



<div className="space-y-4">


<input

placeholder="Supplier Name"

value={supplier}

onChange={
e=>setSupplier(e.target.value)
}

className="
w-full
rounded-xl
border
p-3
"

/>



<input

type="number"

placeholder="Price"

value={price}

onChange={
e=>setPrice(Number(e.target.value))
}

className="
w-full
rounded-xl
border
p-3
"

/>



<input

type="number"

placeholder="Delivery Days"

value={deliveryDays}

onChange={
e=>setDeliveryDays(Number(e.target.value))
}

className="
w-full
rounded-xl
border
p-3
"

/>



<input

placeholder="Warranty"

value={warranty}

onChange={
e=>setWarranty(e.target.value)
}

className="
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

onClick={saveQuote}

className="
rounded-xl
bg-blue-600
px-5
py-2
text-white
"

>
Save Quote
</button>


</div>


</div>


</div>


)

}