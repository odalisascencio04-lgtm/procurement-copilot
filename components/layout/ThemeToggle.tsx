"use client";


import {
Moon,
Sun
} from "lucide-react";


import {
useTheme
}
from "next-themes";


import {
useEffect,
useState
}
from "react";




export default function ThemeToggle(){


const {
theme,
setTheme
}=useTheme();


const [mounted,setMounted]=useState(false);



useEffect(()=>{

setMounted(true);

},[]);



if(!mounted)
return null;



return (

<button

onClick={()=>


setTheme(
theme==="dark"
?
"light"
:
"dark"
)


}

className="
rounded-xl
border
border-slate-200
p-3
hover:bg-slate-100
dark:border-slate-700
dark:hover:bg-slate-800
"

>


{

theme==="dark"

?

<Sun size={20}/>

:

<Moon size={20}/>

}


</button>

)

}