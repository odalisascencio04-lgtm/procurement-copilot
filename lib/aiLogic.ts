import { supabase } from "@/lib/supabase";


export async function askProcurementAI(
  question:string
){


const q = question.toLowerCase();



//
// SUMMARY
//

if(
q.includes("summary") ||
q.includes("overview")
){


const suppliers =
await supabase
.from("suppliers")
.select("*");


const orders =
await supabase
.from("purchase_orders")
.select("*");


const invoices =
await supabase
.from("invoices")
.select("*");


const contracts =
await supabase
.from("contracts")
.select("*");



const spend =
orders.data?.reduce(
(sum,po)=>
sum + Number(po.amount || 0),
0
)||0;



return `

Procurement Summary


Suppliers:
${suppliers.data?.length || 0}


Purchase Orders:
${orders.data?.length || 0}


Invoices:
${invoices.data?.length || 0}


Contracts:
${contracts.data?.length || 0}


Total Spend:
$${spend.toLocaleString()}

`;

}





//
// TOP SUPPLIERS
//

if(
q.includes("top supplier") ||
q.includes("highest supplier") ||
q.includes("supplier ranking")
){


const {data}=
await supabase
.from("purchase_orders")
.select("*");



const supplierSpend:any={};



data?.forEach(po=>{


const name =
po.supplier || "Unknown";


supplierSpend[name]=
(supplierSpend[name] || 0)
+
Number(po.amount || 0);


});



const ranking =
Object.entries(supplierSpend)
.sort(
(a:any,b:any)=>
b[1]-a[1]
)
.slice(0,5);



return `

Top Suppliers:


${
ranking.map(
(item:any,index)=>
`${index+1}. ${item[0]}
$${item[1].toLocaleString()}`
)
.join("\n\n")
}

`;

}





//
// SPEND
//

if(
q.includes("spend") ||
q.includes("cost") ||
q.includes("expense")
){


const {data}=
await supabase
.from("purchase_orders")
.select("*");



const total =
data?.reduce(
(sum,po)=>
sum+Number(po.amount||0),
0
)||0;



return `

Spend Analysis:


Total Procurement Spend:

$${total.toLocaleString()}


Purchase Orders:

${data?.length || 0}

`;

}





//
// RISK
//

if(
q.includes("risk") ||
q.includes("problem") ||
q.includes("attention")
){


const invoices =
await supabase
.from("invoices")
.select("*");


const contracts =
await supabase
.from("contracts")
.select("*");



const unpaid =
invoices.data?.filter(
(i)=>i.status!=="Paid"
).length || 0;



return `

Procurement Risks:


Unpaid invoices:
${unpaid}


Contracts monitored:
${contracts.data?.length || 0}


Recommendation:

Review unpaid invoices and upcoming contract renewals.

`;

}





return `

I can help with:


• Procurement summary

• Top suppliers

• Spending analysis

• Procurement risks


Try asking:

"Give me a procurement summary"

`;

}