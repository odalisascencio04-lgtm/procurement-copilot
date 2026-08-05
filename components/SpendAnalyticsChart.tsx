"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { supabase } from "@/lib/supabaseClient";


interface SpendData {
  month: string;
  spend: number;
}


export default function SpendAnalyticsChart() {


  const [chartData, setChartData] = useState<SpendData[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadSpend();

  }, []);




  async function loadSpend() {

    setLoading(true);


    const { data, error } = await supabase
      .from("spend")
      .select("*");


    if (error) {

      console.error(
        "Spend loading error:",
        error
      );

      setChartData([]);

    } else {

      setChartData(
        data ?? []
      );

    }


    setLoading(false);

  }




  if (loading) {

    return (

      <div className="rounded-2xl bg-white p-8 shadow">

        Loading spend analytics...

      </div>

    );

  }




  return (

    <div className="rounded-2xl bg-white p-8 shadow">


      <h2 className="mb-6 text-2xl font-bold">
        Monthly Spend
      </h2>



      <div className="h-80">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={chartData}>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="month"
            />


            <YAxis />


            <Tooltip />


            <Bar
              dataKey="spend"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />


          </BarChart>


        </ResponsiveContainer>


      </div>


    </div>

  );

}