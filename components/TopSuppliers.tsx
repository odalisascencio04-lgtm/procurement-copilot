"use client";


interface SupplierData {
  supplier: string;
  spend: number;
}


interface Props {
  data: SupplierData[];
}



export default function TopSuppliers({
  data
}: Props) {


return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="mb-6 text-xl font-bold">
Top Suppliers
</h2>



<div className="space-y-4">


{
data.length === 0 ? (

<p className="text-gray-500">
No supplier data available.
</p>

) : (


data.map((supplier,index)=>(

<div
key={supplier.supplier}
className="flex items-center justify-between rounded-xl border p-4"
>


<div>

<p className="font-bold">

{index + 1}. {supplier.supplier}

</p>


</div>


<p className="font-semibold text-blue-600">

${supplier.spend.toLocaleString()}

</p>


</div>


))


)

}


</div>


</div>

);

}