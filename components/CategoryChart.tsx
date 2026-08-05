"use client";

import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts";


interface Props{

data:{
name:string;
value:number;
}[];

}



export default function CategoryChart({
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


<PieChart>


<Pie

data={data}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={100}

>


{
data.map(
(item,index)=>(

<Cell

key={index}

/>

)

)

}


</Pie>


<Tooltip />


</PieChart>


</ResponsiveContainer>


</div>

)

}