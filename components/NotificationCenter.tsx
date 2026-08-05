"use client";


interface Notification {

type:string;
title:string;
message:string;

}



interface Props {

notifications:Notification[];

}



export default function NotificationCenter({
notifications
}:Props){



return (

<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="mb-6 text-xl font-bold">
🔔 Procurement Notifications
</h2>



<div className="space-y-4">


{
notifications.length === 0 ? (

<p className="text-gray-500">
No notifications.
</p>

)

:

(

notifications.map((item,index)=>(


<div

key={index}

className="rounded-xl border p-4"

>


<div className="flex justify-between">


<h3 className="font-bold">
{item.title}
</h3>


<span className="text-sm text-gray-500">
{item.type}
</span>


</div>


<p className="mt-2 text-gray-600">
{item.message}
</p>


</div>


))

)

}


</div>


</div>

);

}