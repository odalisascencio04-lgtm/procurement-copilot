"use client";


import PageHeader from "@/components/layout/PageHeader";


export default function SettingsPage(){


return (

<main className="space-y-8">


<PageHeader

title="Settings"

subtitle="Manage your procurement workspace."

/>



<div
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<h2 className="text-xl font-bold">

Company Settings

</h2>


<div className="mt-6 space-y-5">


<input

placeholder="Company Name"

className="
w-full
rounded-xl
border
px-5
py-4
"

/>



<input

placeholder="Industry"

className="
w-full
rounded-xl
border
px-5
py-4
"

/>



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

Save Settings

</button>



</div>


</div>


</main>

);


}