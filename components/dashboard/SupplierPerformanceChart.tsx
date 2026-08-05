"use client";


import {

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

ResponsiveContainer

} from "recharts";




const data=[

{
name:"Apple",
score:95
},

{
name:"Microsoft",
score:88
},

{
name:"Tesla",
score:72
},

{
name:"Amazon",
score:91
}

];




export default function SupplierPerformanceChart(){



return (

<div

className="
rounded-3xl
bg-white
p-8
shadow-sm
"

>


<h2 className="text-2xl font-bold">

Supplier Performance

</h2>



<div className="mt-6 h-80">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart
data={data}
>


<XAxis
dataKey="name"
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="score"

fill="#14b8a6"

/>


</BarChart>


</ResponsiveContainer>


</div>



</div>


)

}