"use client";

import {useState} from "react";


export default function AISavingsReport(){

const [result,setResult]=useState("");

const [loading,setLoading]=useState(false);



async function analyze(){

setLoading(true);


const response =
await fetch(
"/api/savings-analysis",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

purchases:[

{
item:"Industrial Gloves",
supplier:"ABC",
price:8.20,
quantity:5000
},

{
item:"Packaging Material",
supplier:"XYZ",
price:4.50,
quantity:10000
}

],

suppliers:[
{
name:"ABC",
annualSpend:120000
},

{
name:"XYZ",
annualSpend:90000
}

]

})

});


const data =
await response.json();


setResult(
typeof data.result==="string"
?
data.result
:
JSON.stringify(data.result,null,2)
);


setLoading(false);

}



return (

<div className="
rounded-2xl
bg-white
p-6
shadow
">

<h2 className="
text-xl
font-bold
">

💰 AI Savings Report

</h2>


<button

onClick={analyze}

className="
mt-5
rounded-xl
bg-green-600
px-5
py-3
text-white
"

>

{
loading
?
"Finding Savings..."
:
"Find Cost Savings"
}

</button>



{
result &&

<div className="
mt-5
rounded-xl
bg-green-50
p-5
whitespace-pre-line
">

{result}

</div>

}


</div>

)

}