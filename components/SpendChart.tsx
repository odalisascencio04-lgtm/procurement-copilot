"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface Props {

data:{
name:string;
value:number;
}[];

}



export default function SpendChart({
data
}:Props){


return(

<div className="h-80">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart data={data}>


<XAxis
dataKey="name"
/>


<YAxis />


<Tooltip />


<Bar

dataKey="value"

/>


</BarChart>


</ResponsiveContainer>


</div>

)

}