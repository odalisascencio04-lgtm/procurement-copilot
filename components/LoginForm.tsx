"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function LoginForm(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [mode,setMode] = useState<"login"|"signup">("login");


async function submit(){

console.log("LOGIN START");


const result =
mode === "login"
?
await signIn(email,password)
:
await signUp(email,password);



console.log("LOGIN RESULT", result);



if(result.error){

    alert(result.error.message);
    
    return;
    
    }
    
    
    if(!result.data.session){
    
    alert("No active session created");
    
    return;
    
    }
    
    
    router.push("/dashboard");

}



return(

<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow">


<h1 className="mb-6 text-3xl font-bold">

{
mode==="login"
?
"Login"
:
"Create Account"
}

</h1>



<input

type="email"

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="mb-4 w-full rounded-xl border p-3"

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

className="mb-6 w-full rounded-xl border p-3"

/>



<button

onClick={submit}

className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"

>

{
mode==="login"
?
"Login"
:
"Sign Up"
}

</button>




<button

onClick={()=>
setMode(
mode==="login"
?
"signup"
:
"login"
)
}

className="mt-4 w-full text-sm text-blue-600"

>

{
mode==="login"
?
"Create new account"
:
"Already have account?"
}

</button>



</div>

)

}