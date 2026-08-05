"use client";


interface InvoiceData {
  status: string;
  count: number;
  amount: number;
}


interface Props {
  data: InvoiceData[];
}



export default function InvoiceStatus({
  data
}: Props) {


return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="mb-6 text-xl font-bold">
Invoice Status
</h2>


<div className="space-y-4">


{
data.map((item)=>(

<div
key={item.status}
className="flex justify-between rounded-xl border p-4"
>


<div>

<p className="font-semibold">
{item.status}
</p>

<p className="text-sm text-gray-500">
${item.amount.toLocaleString()}
</p>

</div>


<p className="text-2xl font-bold">
{item.count}
</p>


</div>


))

}


</div>


</div>

);

}