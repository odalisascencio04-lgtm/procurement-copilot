"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import type {
  User
} from "@supabase/supabase-js";



interface AuthContextType {

user:User|null;

loading:boolean;

logout:()=>Promise<void>;

}



const AuthContext =
createContext<AuthContextType | null>(null);




export function AuthProvider({

children

}:{

children:React.ReactNode;

}){


const [user,setUser]=useState<User|null>(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


async function getUser(){


const {
data
}
=
await supabase.auth.getUser();



setUser(data.user ?? null);


setLoading(false);


}



getUser();




const {
data:{
subscription
}

}
=
supabase.auth.onAuthStateChange(

(_event,session)=>{


setUser(
session?.user ?? null
);


}

);



return ()=>{

subscription.unsubscribe();

};



},[]);






async function logout(){


await supabase.auth.signOut();


setUser(null);


}





return (

<AuthContext.Provider

value={{

user,

loading,

logout,

}}

>


{children}


</AuthContext.Provider>


);


}




export function useAuth(){


const context =
useContext(AuthContext);



if(!context){

throw new Error(
"useAuth must be inside AuthProvider"
);

}


return context;


}