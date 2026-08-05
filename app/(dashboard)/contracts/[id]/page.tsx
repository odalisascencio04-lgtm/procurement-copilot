"use client";


import {
useEffect,
useState
} from "react";


import {
useParams
} from "next/navigation";


import PageHeader from "@/components/layout/PageHeader";


import {
supabase
} from "@/lib/supabase";


import ContractAIReview
from "@/components/ContractAIReview";

import ContractAnalyzer
from "@/components/contracts/ContractAnalyzer";



interface Contract {


id:number;

title:string;

supplier:string;

value:number | null;

start_date:string | null;

end_date:string | null;

status:string;

risk_level:string;


}







export default function ContractProfile(){



const params = useParams();


const id=params.id;



const [contract,setContract]=
useState<Contract|null>(null);



const [loading,setLoading]=
useState(true);






useEffect(()=>{


loadContract();


},[]);








async function loadContract(){


const {

data,

error

}=await supabase


.from("contracts")

.select("*")

.eq(
"id",
id
)

.single();





if(!error){

setContract(data);

}


setLoading(false);


}









if(loading){

return (

<div className="p-10">

Loading contract...

</div>

)

}






if(!contract){

return (

<div className="p-10">

Contract not found.

</div>

)

}








return (

<main className="space-y-8">






<PageHeader

title={contract.title}

subtitle="Contract intelligence profile"

/>








<div

className="
grid
gap-6
lg:grid-cols-3
"

>





<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<p className="text-slate-500">

Contract Value

</p>


<h2

className="
mt-3
text-4xl
font-bold
"

>

${Number(
contract.value || 0
)
.toLocaleString()}

</h2>


</div>








<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<p className="text-slate-500">

Status

</p>



<span

className="
mt-4
inline-block
rounded-full
bg-emerald-100
px-4
py-2
text-emerald-700
font-semibold
"

>

{contract.status}

</span>



</div>








<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<p className="text-slate-500">

Risk Level

</p>



<span

className="
mt-4
inline-block
rounded-full
bg-blue-100
px-4
py-2
text-blue-700
font-semibold
"

>

{contract.risk_level}

</span>


</div>





</div>









<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<h2

className="
text-2xl
font-bold
"

>

Contract Information

</h2>





<div

className="
mt-6
grid
gap-5
md:grid-cols-2
"

>


<div>

<p className="text-slate-500">

Supplier

</p>


<p className="font-semibold">

{contract.supplier}

</p>


</div>





<div>

<p className="text-slate-500">

Start Date

</p>


<p className="font-semibold">

{
contract.start_date
?
new Date(contract.start_date).toLocaleDateString()
:
"Not available"
}

</p>


</div>






<div>

<p className="text-slate-500">

Expiration Date

</p>


<p className="font-semibold">

{
  contract.end_date
    ? new Date(contract.end_date).toLocaleDateString()
    : "N/A"
}
</p>


</div>






</div>


</div>









<ContractAIReview

contract={contract}

/>

<ContractAnalyzer

contractId={contract.id}

/>





</main>

)

}