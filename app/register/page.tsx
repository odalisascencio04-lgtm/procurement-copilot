"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  BrainCircuit,
  ShieldCheck,
  FileText,
  TrendingUp,
  Check,
} from "lucide-react";

import AlertDialog from "@/components/ui/AlertDialog";


const features = [
  {
    title:"AI Procurement Insights",
    text:"Discover savings opportunities automatically.",
    icon:TrendingUp,
  },
  {
    title:"Supplier Intelligence",
    text:"Monitor vendors and detect risks early.",
    icon:BrainCircuit,
  },
  {
    title:"Contract Analysis",
    text:"Analyze agreements with AI.",
    icon:FileText,
  },
  {
    title:"Enterprise Security",
    text:"Your procurement data stays protected.",
    icon:ShieldCheck,
  },
];



export default function RegisterPage(){


const router = useRouter();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);


const [dialog,setDialog] = useState({

open:false,

title:"",

message:"",

});





async function register(){


setLoading(true);


const {error}=await supabase.auth.signUp({

email,

password,

});



if(error){

setDialog({

open:true,

title:"Registration Failed",

message:error.message,

});


setLoading(false);

return;

}



setLoading(false);


router.push("/dashboard");


}






return (

<main
className="
min-h-screen
bg-gradient-to-br
from-emerald-50
via-white
to-slate-100
"
>


{/* HEADER */}

<header
className="
flex
items-center
justify-between
px-8
py-6
"
>


<div
className="
flex
items-center
gap-3
"
>

<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-emerald-500
font-bold
text-white
"
>
P
</div>


<h1
className="
text-xl
font-bold
"
>

Procurement

<span className="text-emerald-500">
 Copilot AI
</span>

</h1>


</div>



<p className="text-slate-500">

Already have an account?

<Link
href="/login"
className="
ml-2
font-semibold
text-emerald-600
"
>

Login

</Link>

</p>


</header>






<section
className="
mx-auto
grid
max-w-7xl
gap-12
px-8
py-12
lg:grid-cols-2
"
>





{/* LEFT SIDE */}


<div
className="
flex
flex-col
justify-center
"
>


<h2
className="
text-5xl
font-bold
leading-tight
text-slate-900
"
>

Welcome to the future
of procurement

</h2>



<p
className="
mt-6
max-w-lg
text-lg
text-slate-500
"
>

Create your account and start managing
suppliers, contracts, and spending
with the power of AI.

</p>




<div
className="
mt-10
space-y-5
"
>


{
features.map((item)=>{

const Icon=item.icon;


return (

<div
key={item.title}
className="
flex
gap-4
"
>


<div
className="
rounded-xl
bg-white
p-3
shadow-sm
"
>

<Icon
className="text-emerald-500"
/>

</div>



<div>

<h3
className="
font-bold
text-slate-900
"
>

{item.title}

</h3>


<p
className="
text-sm
text-slate-500
"
>

{item.text}

</p>


</div>


</div>

)

})

}


</div>






{/* DASHBOARD PREVIEW */}


<div
className="
mt-12
rounded-3xl
bg-[#081722]
p-6
shadow-xl
"
>


<div
className="
grid
grid-cols-3
gap-3
"
>


{

[
["Spend","$2.4M"],
["Suppliers","240"],
["Contracts","128"],

].map(item=>(


<div
key={item[0]}
className="
rounded-xl
bg-white/10
p-4
text-white
"
>

<p
className="
text-xs
text-slate-300
"
>

{item[0]}

</p>


<p
className="
mt-2
text-xl
font-bold
"
>

{item[1]}

</p>


</div>


))


}


</div>


</div>


</div>



{/* RIGHT SIDE */}



<div
className="
rounded-3xl
bg-white
p-10
shadow-xl
"
>


<h2
className="
text-4xl
font-bold
"
>

Create Account

</h2>



<p
className="
mt-3
text-slate-500
"
>

Start your AI procurement journey.

</p>





<div
className="
mt-8
space-y-5
"
>



<input

type="email"

placeholder="Email address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-xl
border
px-5
py-4
outline-none
focus:border-emerald-500
"

/>





<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
rounded-xl
border
px-5
py-4
outline-none
focus:border-emerald-500
"

/>





<div
className="
space-y-2
text-sm
text-slate-500
"
>


<p>
<Check size={16} className="inline text-emerald-500"/>
 At least 8 characters
</p>


<p>
<Check size={16} className="inline text-emerald-500"/>
 Includes a number
</p>


<p>
<Check size={16} className="inline text-emerald-500"/>
 Includes uppercase letter
</p>


</div>






<button

onClick={register}

disabled={loading}

className="
mt-5
w-full
rounded-xl
bg-emerald-500
py-4
font-semibold
text-white
hover:bg-emerald-600
"

>

{

loading

?

"Creating Account..."

:

"Create Account"

}

</button>





<div
className="
my-6
flex
items-center
gap-4
"
>


<div className="h-px flex-1 bg-slate-200"/>

<span className="text-sm text-slate-400">
or
</span>

<div className="h-px flex-1 bg-slate-200"/>


</div>





<button

className="
w-full
rounded-xl
border
py-4
font-semibold
"

>

🌐 Continue with Google

</button>





<p
className="
mt-6
text-center
text-sm
text-slate-500
"
>

By creating an account you agree to our

<br/>


<span className="text-emerald-600">
Terms of Service
</span>


and


<span className="text-emerald-600">
 Privacy Policy
</span>


</p>



</div>  


</div> 


</section>





<AlertDialog

open={dialog.open}

title={dialog.title}

message={dialog.message}

onClose={()=>setDialog({

open:false,

title:"",

message:""

})}

/>



</main>

);


}