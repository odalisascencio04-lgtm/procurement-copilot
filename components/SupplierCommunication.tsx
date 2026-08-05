"use client";

import { useState } from "react";


export default function SupplierCommunication(){


const [type,setType]=useState("negotiation");
const [supplier,setSupplier]=useState("");
const [message,setMessage]=useState("");



function generate(){


if(type==="negotiation"){

setMessage(`

Subject: Pricing Discussion Request


Dear ${supplier},


Thank you for your continued partnership.


As our purchasing volume continues to grow,
we would like to discuss opportunities for
improved pricing and commercial terms.


We look forward to working together.


Regards,

Procurement Team

`);

}



if(type==="renewal"){

setMessage(`

Subject: Contract Renewal Discussion


Dear ${supplier},


We would like to begin discussions regarding
the renewal of our current agreement.


Please share your updated terms and proposals.


Regards,

Procurement Team

`);

}



if(type==="rfq"){

setMessage(`

Subject: Request For Quotation


Dear ${supplier},


We would like to request a quotation for
our upcoming procurement requirements.


Please provide pricing, delivery timeline,
and commercial terms.


Regards,

Procurement Team

`);

}


}



return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="mb-6 text-xl font-bold">
📧 Supplier Communication Assistant
</h2>


<input

className="mb-4 w-full rounded-xl border p-3"

placeholder="Supplier name"

value={supplier}

onChange={
(e)=>setSupplier(e.target.value)
}

/>


<select

className="mb-4 w-full rounded-xl border p-3"

value={type}

onChange={
(e)=>setType(e.target.value)
}

>

<option value="negotiation">
Price Negotiation
</option>


<option value="renewal">
Contract Renewal
</option>


<option value="rfq">
RFQ Invitation
</option>


</select>



<button

onClick={generate}

className="rounded-xl bg-blue-600 px-5 py-3 text-white"

>

Generate Email

</button>



{
message && (

<div className="mt-6 whitespace-pre-line rounded-xl bg-gray-50 p-5">

{message}

</div>

)

}


</div>

);


}