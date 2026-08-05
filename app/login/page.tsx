"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BrainCircuit,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import AlertDialog from "@/components/ui/AlertDialog";


export default function LoginPage() {


  const router = useRouter();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);


  const [dialog,setDialog] = useState({

    open:false,
    title:"",
    message:"",

  });



  async function login(){


    setLoading(true);


    const {error} =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });



    if(error){

      setDialog({

        open:true,

        title:"Login Failed",

        message:error.message,

      });


      setLoading(false);

      return;

    }



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

Don't have an account?

<Link
href="/register"
className="
ml-2
font-semibold
text-emerald-600
"
>

Create Account

</Link>

</p>


</header>





<section
className="
mx-auto
grid
max-w-6xl
gap-12
px-8
py-16
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

Welcome back to
your AI procurement workspace

</h2>


<p
className="
mt-6
text-lg
text-slate-500
"
>

Analyze spending, manage suppliers,
and make smarter procurement decisions
with AI.

</p>





<div
className="
mt-10
space-y-5
"
>



<Feature
icon={<BrainCircuit/>}
title="AI Procurement Assistant"
text="Instant recommendations from your data."
/>



<Feature
icon={<BarChart3/>}
title="Spend Intelligence"
text="Track costs and identify savings."
/>



<Feature
icon={<ShieldCheck/>}
title="Enterprise Security"
text="Your procurement data stays protected."
/>



</div>



</div>







{/* LOGIN CARD */}


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

Welcome Back

</h2>


<p
className="
mt-3
text-slate-500
"
>

Login to your procurement workspace.

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





<button

onClick={login}

disabled={loading}

className="
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
"Logging in..."
:
"Login"
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
  onClick={async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });

  }}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-xl
    border
    border-gray-300
    bg-white
    py-3
    font-semibold
    text-gray-800
    hover:bg-gray-50
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

Forgot password?

</p>



</div>   {/* closes form */}


</div>   {/* closes login card */}


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





function Feature({

icon,
title,
text,

}:{

icon:React.ReactNode;

title:string;

text:string;

}){


return (

<div
className="
flex
items-center
gap-4
"
>


<div
className="
rounded-xl
bg-white
p-3
shadow
text-emerald-500
"
>

{icon}

</div>



<div>

<h3
className="
font-bold
"
>

{title}

</h3>


<p
className="
text-sm
text-slate-500
"
>

{text}

</p>


</div>


</div>

);


}