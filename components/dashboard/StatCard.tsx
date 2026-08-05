import {
    LucideIcon
  } from "lucide-react";
  
  
  
  interface StatCardProps {
  
    title:string;
  
    value:string | number;
  
    description:string;
  
    icon:LucideIcon;
  
  }
  
  
  
  
  
  export default function StatCard({
  
    title,
    value,
    description,
    icon:Icon
  
  }:StatCardProps){
  
  
  
  return (
  
  <div
  
  className="
  rounded-3xl
  border
  border-slate-100
  bg-white
  p-6
  shadow-sm
  transition
  hover:shadow-md
  "
  
  >
  
  
  <div
  
  className="
  flex
  items-start
  justify-between
  "
  
  >
  
  
  <div>
  
  
  <p
  
  className="
  text-sm
  text-slate-500
  "
  
  >
  
  {title}
  
  </p>
  
  
  
  
  <h2
  
  className="
  mt-3
  text-3xl
  font-bold
  text-slate-900
  "
  
  >
  
  {value}
  
  </h2>
  
  
  
  
  <p
  
  className="
  mt-2
  text-sm
  text-slate-400
  "
  
  >
  
  {description}
  
  </p>
  
  
  
  </div>
  
  
  
  
  
  
  
  <div
  
  className="
  rounded-2xl
  bg-emerald-50
  p-4
  text-emerald-600
  "
  
  >
  
  <Icon size={26}/>
  
  </div>
  
  
  
  
  
  
  </div>
  
  
  
  
  
  </div>
  
  )
  
  }