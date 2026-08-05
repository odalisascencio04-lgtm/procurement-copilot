"use client";

import {
  Building2,
  DollarSign,
  FileText,
  ShieldAlert,
} from "lucide-react";

import StatCard from "@/components/ui/StatCard";

interface Props {

  title: string;

  value: number;

  icon: React.ReactNode;

}

export default function DashboardCards({
  title,
  value,
  icon,
}: Props) {
  return (

    <div className="rounded-2xl bg-white p-5 shadow">
    
    <div className="flex justify-between">
    
    <div>
    
    <p className="text-gray-500">
    {title}
    </p>
    
    
    <h2 className="text-3xl font-bold">
    {value}
    </h2>
    
    </div>
    
    
    <div>
    {icon}
    </div>
    
    
    </div>
    
    </div>
    
    )
    
}