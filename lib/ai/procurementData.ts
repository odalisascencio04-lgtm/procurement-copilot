import { supabase } from "@/lib/supabase";


export async function getSupplierData(){

const {data,error}=await supabase
.from("suppliers")
.select("*");


if(error)
throw error;


return data;

}



export async function getPurchaseOrders(){

const {data,error}=await supabase
.from("purchase_orders")
.select("*");


if(error)
throw error;


return data;

}



export async function getContracts(){

const {data,error}=await supabase
.from("contracts")
.select("*");


if(error)
throw error;


return data;

}