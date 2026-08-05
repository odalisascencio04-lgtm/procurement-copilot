"use client";


import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

} from "recharts";



interface Props {

data:{
month:string;
savings:number;
}[];

}



export default function SavingsChart({

data

}:Props){


return(

<div className="
h-80
">


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={data}

>


<XAxis

dataKey="month"

/>


<YAxis />


<Tooltip />


<Bar

dataKey="savings"

/>


</BarChart>


</ResponsiveContainer>


</div>

)

}