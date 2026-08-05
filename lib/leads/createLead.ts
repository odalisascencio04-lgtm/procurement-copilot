import {supabase} from "@/lib/supabase";


export async function createLead(
lead:any
){

const {data,error}=await supabase
.from("leads")
.insert([
lead
])
.select();


if(error){

throw error;

}


return data;

}