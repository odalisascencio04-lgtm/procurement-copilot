"use client";


import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";



const data=[

{
month:"Jan",
spend:120000
},

{
month:"Feb",
spend:180000
},

{
month:"Mar",
spend:150000
},

{
month:"Apr",
spend:240000
},

{
month:"May",
spend:300000
},

];




export default function SpendChart(){


return (

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

Monthly Spend

</h2>




<div

className="
mt-6
h-80
"

>


<ResponsiveContainer
width="100%"
height="100%"
>

<LineChart
data={data}
>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="month"
/>


<YAxis
/>

<Tooltip
/>




<Line

type="monotone"

dataKey="spend"

stroke="#10b981"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



</div>


</div>

)

}