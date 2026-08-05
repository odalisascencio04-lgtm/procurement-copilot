"use client";


interface Contract {
  contract_name: string;
  supplier: string;
  end_date: string;
  daysLeft: number;
}


interface Props {
  data: Contract[];
}



export default function ContractAlerts({
  data
}: Props) {


return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="mb-6 text-xl font-bold">
Contracts Expiring Soon
</h2>


<div className="space-y-4">


{
data.length === 0 ? (

<p className="text-gray-500">
No upcoming expirations.
</p>

) : (


data.map((contract)=>{


let color =
"bg-green-100 text-green-700";


if(contract.daysLeft <= 30){
  color =
  "bg-red-100 text-red-700";
}
else if(contract.daysLeft <= 60){
  color =
  "bg-yellow-100 text-yellow-700";
}



return (

<div
key={contract.contract_name}
className="flex items-center justify-between rounded-xl border p-4"
>


<div>

<p className="font-bold">
{contract.contract_name}
</p>


<p className="text-sm text-gray-500">
{contract.supplier}
</p>


</div>



<span
className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
>

{contract.daysLeft} days

</span>



</div>

)


})


)


}


</div>


</div>

);

}