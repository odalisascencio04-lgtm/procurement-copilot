import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function proxy(
request: NextRequest
) {


let response = NextResponse.next({
request,
});



const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies: {

getAll() {

return request.cookies.getAll();

},


setAll(
cookiesToSet: {
name:string;
value:string;
options?:any;
}[]
) {


cookiesToSet.forEach(
({name,value}) => {

request.cookies.set(
name,
value
);

}

);



response = NextResponse.next({
request,
});



cookiesToSet.forEach(
({name,value,options})=>{

response.cookies.set(
name,
value,
options
);

}

);


}

}

}

);



const {
data:{
session
}

}=await supabase.auth.getSession();



const protectedRoutes=[

"/dashboard",

"/suppliers",

"/contracts",

"/purchase-orders",

"/spend",

"/scorecards",

"/risk-alerts",

];



const pathname=request.nextUrl.pathname;



const needsAuth =
protectedRoutes.some(
route=>pathname.startsWith(route)
);



if(
needsAuth &&
!session
){

return NextResponse.redirect(

new URL(
"/login",
request.url
)

);

}



return response;


}



export const config={

matcher:[

"/dashboard/:path*",

"/suppliers/:path*",

"/contracts/:path*",

"/purchase-orders/:path*",

"/spend/:path*",

"/scorecards/:path*",

"/risk-alerts/:path*",

]

};