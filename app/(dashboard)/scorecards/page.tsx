"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AddScoreModal from "@/components/AddScoreModal";


interface Supplier {

id:number;
name:string;
category:string;

}


interface Score {

supplier_id:number;
quality_score:number;
delivery_score:number;
cost_score:number;
risk_score:number;

}



export default function ScorecardsPage(){


const [suppliers,setSuppliers]=useState<Supplier[]>([]);

const [scores,setScores]=useState<Score[]>([]);

const [selectedSupplier,setSelectedSupplier]=
useState<number | null>(null);



useEffect(()=>{

loadData();

},[]);



async function loadData(){


const suppliersResult =
await supabase
.from("suppliers")
.select("*");



const scoresResult =
await supabase
.from("supplier_scores")
.select("*");



if(suppliersResult.data)
setSuppliers(
suppliersResult.data
);



if(scoresResult.data)
setScores(
scoresResult.data
);


}





function getScore(id:number){


const supplierScores =
scores.filter(
s=>s.supplier_id===id
);



if(supplierScores.length===0)
return 0;



const latest =
supplierScores[
supplierScores.length-1
];



return Math.round(

(
latest.quality_score +
latest.delivery_score +
latest.cost_score +
latest.risk_score

) / 4 * 20

);


}





return(

<main className="
min-h-screen
bg-gray-50
p-8
">


<div className="
mx-auto
max-w-7xl
">


<h1 className="
text-4xl
font-bold
">

Supplier Scorecards

</h1>




<div className="
mt-8
overflow-hidden
rounded-2xl
bg-white
shadow
">


<table className="
min-w-full
">


<thead className="
bg-blue-600
text-white
">


<tr>


<th className="
px-6
py-4
text-left
">

Supplier

</th>


<th className="
px-6
py-4
text-left
">

Category

</th>


<th className="
px-6
py-4
text-left
">

Score

</th>


<th className="
px-6
py-4
text-left
">

Performance

</th>


<th className="
px-6
py-4
text-left
">

Action

</th>


</tr>


</thead>





<tbody>


{
suppliers.map(supplier=>(


<tr

key={supplier.id}

className="
border-t
hover:bg-gray-50
"

>


<td className="
px-6
py-4
font-semibold
">

{supplier.name}

</td>



<td className="
px-6
py-4
">

{supplier.category}

</td>




<td className="
px-6
py-4
">

{
getScore(
supplier.id
)
}%

</td>




<td className="
px-6
py-4
">


<div className="
h-3
w-48
rounded-full
bg-gray-200
">


<div

className="
h-3
rounded-full
bg-blue-600
"

style={{

width:
`${getScore(supplier.id)}%`

}}

/>


</div>


</td>





<td className="
px-6
py-4
">


<button

onClick={()=>
setSelectedSupplier(
supplier.id
)
}

className="
rounded-lg
bg-blue-600
px-4
py-2
text-white
"

>

Evaluate

</button>


</td>




</tr>


))

}



</tbody>


</table>


</div>




</div>





{
selectedSupplier &&

<AddScoreModal

open={true}

supplierId={
selectedSupplier
}

onClose={()=>
setSelectedSupplier(null)
}

onSaved={loadData}

/>

}



</main>

)

}