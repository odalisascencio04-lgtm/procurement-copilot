import { supabase } from "@/lib/supabase";


export async function getDashboardStats(){


const [

suppliers,

contracts,

rfqs,

orders

]=await Promise.all([


supabase
.from("suppliers")
.select("id"),


supabase
.from("contracts")
.select("id,value"),


supabase
.from("rfqs")
.select("id"),


supabase
.from("purchase_orders")
.select("amount")



]);




const totalSpend =

orders.data?.reduce(

(sum,item)=>

sum + Number(item.amount || 0),

0

) || 0;





const contractValue =

contracts.data?.reduce(

(sum,item)=>

sum + Number(item.value || 0),

0

) || 0;





return {


supplierCount:
suppliers.data?.length || 0,


contractCount:
contracts.data?.length || 0,


rfqCount:
rfqs.data?.length || 0,


totalSpend,


contractValue


};


}