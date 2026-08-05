"use client";

import { useAuth } from "@/components/auth/AuthProvider";

import PageHeader from "@/components/layout/PageHeader";


export default function ProfilePage(){


const {user}=useAuth();



return (

<main className="space-y-8">


<PageHeader

title="Profile"

subtitle="Manage your account information."

/>



<div
className="
max-w-3xl
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div
className="
flex
items-center
gap-6
"
>


<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-emerald-500
text-3xl
font-bold
text-white
"
>

{
user?.email
?.charAt(0)
.toUpperCase()
}

</div>



<div>

<h2 className="text-2xl font-bold">

User Account

</h2>


<p className="text-slate-500">

{user?.email}

</p>


</div>



</div>





<div
className="
mt-8
space-y-5
"
>


<div>

<label className="text-sm text-slate-500">

Email

</label>


<input

value={user?.email || ""}

readOnly

className="
mt-2
w-full
rounded-xl
border
px-4
py-3
bg-slate-50
"

/>


</div>



<button

className="
rounded-xl
bg-emerald-500
px-6
py-3
font-semibold
text-white
"

>

Save Changes

</button>



</div>



</div>


</main>

);


}