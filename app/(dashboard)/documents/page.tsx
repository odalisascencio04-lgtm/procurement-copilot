"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  FileText,
  Search,
} from "lucide-react";

import UploadDocument from "@/components/documents/UploadDocument";

import { supabase } from "@/lib/supabase";



export default function DocumentsPage(){


const router = useRouter();


const [documents,setDocuments] =
useState<any[]>([]);


const [loading,setLoading] =
useState(true);


const [search,setSearch] =
useState("");






async function loadDocuments(){


const {
data,
error
}=

await supabase

.from("documents")

.select("*")

.order(
"created_at",
{
ascending:false
}
);




if(error){

console.error(error);

return;

}



setDocuments(data || []);

setLoading(false);


}






useEffect(()=>{

loadDocuments();

},[]);








const filteredDocuments =

documents.filter(doc=>

doc.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);








if(loading){


return (

<div

className="
flex
min-h-screen
items-center
justify-center
bg-slate-50
"

>


<div

className="
h-10
w-10
animate-spin
rounded-full
border-4
border-emerald-500
border-t-transparent
"

/>


</div>

)

}









return (


<div

className="
min-h-screen
bg-slate-50
p-8
"

>





{/* HEADER */}


<div

className="
mb-8
flex
items-center
justify-between
"

>



<div>


<h1

className="
text-3xl
font-bold
text-slate-900
"

>

Documents

</h1>



<p

className="
mt-2
text-slate-500
"

>

Manage procurement files and supplier documents.

</p>



</div>





<UploadDocument

onUpload={loadDocuments}

/>



</div>









{/* SEARCH */}


<div

className="
mb-6
flex
items-center
rounded-xl
border
bg-white
px-4
py-3
"

>


<Search

size={20}

className="
text-slate-400
"

/>



<input


placeholder="Search documents..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
ml-3
w-full
outline-none
"

/>


</div>









{/* TABLE */}



<div

className="
overflow-hidden
rounded-2xl
bg-white
shadow
"

>


<table

className="
w-full
"

>


<thead

className="
bg-emerald-700
text-white
"

>

<tr>


<th className="
px-6
py-4
text-left
">

Document

</th>


<th className="
px-6
py-4
text-left
">

Type

</th>


<th className="
px-6
py-4
text-left
">

Size

</th>


<th className="
px-6
py-4
text-left
">

Uploaded

</th>



</tr>


</thead>







<tbody>


{

filteredDocuments.length===0

?

<tr>

<td

colSpan={4}

className="
px-6
py-10
text-center
text-slate-500
"

>

No documents found.

</td>

</tr>


:


filteredDocuments.map(doc=>(



<tr


key={doc.id}



onClick={()=>


router.push(
`/documents/${doc.id}`
)

}



className="
cursor-pointer
border-t
hover:bg-emerald-50
transition
"

>



<td

className="
flex
items-center
gap-3
px-6
py-4
font-semibold
"

>


<FileText

size={22}

className="
text-emerald-600
"

/>


{doc.name}


</td>





<td

className="
px-6
py-4
"

>


<span

className="
rounded-full
bg-emerald-100
px-3
py-1
text-sm
text-emerald-700
"

>

{doc.type}

</span>


</td>





<td

className="
px-6
py-4
"

>

{doc.size}

</td>





<td

className="
px-6
py-4
"

>


{

new Date(
doc.created_at
)
.toLocaleDateString()

}


</td>





</tr>


))

}



</tbody>



</table>



</div>





</div>



)

}