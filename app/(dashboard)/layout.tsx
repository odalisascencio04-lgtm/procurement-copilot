"use client";


import {
  useEffect
} from "react";

import {
  useRouter
} from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";

import {
  useAuth
} from "@/components/auth/AuthProvider";
import TopBar from "@/components/dashboard/TopBar";
import ThemeProvider 
from "@/components/providers/ThemeProvider";

export default function DashboardLayout({

children

}:{

children:React.ReactNode;

}){


const {
user,
loading
}
=
useAuth();


const router=useRouter();




useEffect(()=>{


if(!loading && !user){

router.push("/login");

}


},[
user,
loading
]);





if(loading){

return (

<div
className="
flex
h-screen
items-center
justify-center
"
>

Loading...

</div>

);

}





if(!user){

return null;

}



return (

  <div className="flex min-h-screen">
  
  
  <Sidebar/>
  
  
  <div className="flex-1">
  
  
  <TopBar/>
  
  
  <main
  className="
  bg-slate-50
  p-8
  min-h-screen
  "
  >
  
  <ThemeProvider>

{children}

</ThemeProvider>

  
  </main>
  
  
  </div>
  
  
  </div>
  
  )

}