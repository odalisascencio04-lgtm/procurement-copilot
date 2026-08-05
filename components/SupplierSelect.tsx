"use client";


import {
useEffect,
useState
} from "react";


import {
supabase
} from "@/lib/supabase";



interface Supplier {

id:number;

name:string;

}



export default function SupplierSelect({

value,

onChange,

}:{

value:string;

onChange:(value:string)=>void;

}){



const [suppliers,setSuppliers]=
useState<Supplier[]>([]);




useEffect(()=>{

load();

},[]);




async function load(){


const {

data

}=await supabase

.from("suppliers")

.select("id,name");


setSuppliers(data || []);

}



return (

<select

value={value}

onChange={(e)=>onChange(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

>


<option value="">

Select Supplier

</option>



{

suppliers.map((supplier)=>(


<option

key={supplier.id}

value={supplier.id}

>

{supplier.name}

</option>


))

}


</select>

)


}