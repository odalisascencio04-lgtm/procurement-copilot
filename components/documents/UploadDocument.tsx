"use client";

import { useState } from "react";

import {
  Upload,
  X,
  FileText,
  Loader2
} from "lucide-react";

import { supabase } from "@/lib/supabase";


interface UploadDocumentProps {

  onUpload:()=>void;

}



export default function UploadDocument({
  onUpload
}:UploadDocumentProps){


const [open,setOpen] =
useState(false);


const [file,setFile] =
useState<File | null>(null);


const [loading,setLoading] =
useState(false);





async function handleUpload(){


if(!file) return;



try{


setLoading(true);



// 1. Upload PDF to Storage


const fileName =
`${Date.now()}-${file.name}`;



const {
error:uploadError
}=

await supabase.storage
.from("documents")
.upload(
fileName,
file
);



if(uploadError){

throw uploadError;

}




// 2. Get public URL


const {

data:urlData

}=

supabase.storage
.from("documents")
.getPublicUrl(
fileName
);



const publicUrl =
urlData.publicUrl;






// 3. Save database record


const {
error:dbError
}=

await supabase
.from("documents")
.insert({

name:file.name,

type:"PDF",

size:
`${(
file.size /
1024 /
1024
).toFixed(2)} MB`,

url:publicUrl

});




if(dbError){

throw dbError;

}




// finish


onUpload();


setFile(null);

setOpen(false);



}

catch(error){

console.error(error);

alert(
"Upload failed"
);

}


finally{

setLoading(false);

}



}







return (

<>


<button

onClick={()=>setOpen(true)}

className="
flex
items-center
gap-2
rounded-xl
bg-emerald-600
px-5
py-3
font-semibold
text-white
hover:bg-emerald-700
"

>

<Upload size={18}/>

Upload Document

</button>







{
open &&

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
rounded-2xl
bg-white
p-8
shadow-xl
"

>


<div

className="
mb-6
flex
items-center
justify-between
"

>


<h2

className="
text-2xl
font-bold
"

>

Upload Document

</h2>



<button

onClick={()=>{
setOpen(false)
}}

>

<X/>

</button>


</div>








<div

className="
rounded-xl
border-2
border-dashed
p-8
text-center
"

>


<FileText

size={40}

className="
mx-auto
mb-4
text-emerald-600
"

/>



<input

type="file"

accept=".pdf"

onChange={(e)=>

setFile(
e.target.files?.[0] || null
)

}

className="
w-full
"

/>




{
file &&

<p

className="
mt-4
font-semibold
text-emerald-700
"

>

{file.name}

</p>

}




</div>









<button

onClick={handleUpload}

disabled={
!file || loading
}

className="
mt-6
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-emerald-600
py-3
font-semibold
text-white
disabled:opacity-40
"

>


{

loading

?

<>

<Loader2
className="animate-spin"
/>

Uploading...

</>


:

"Upload"

}



</button>






</div>


</div>


}



</>

)

}