import Link from "next/link";


export default function Footer(){

return (

<footer className="
bg-[#081722]
text-white
">


<div className="
mx-auto
max-w-7xl
px-8
py-16
">


<div className="
grid
gap-12
md:grid-cols-4
">


{/* Brand */}

<div>

<div className="
flex
items-center
gap-3
">


<div className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-gradient-to-br
from-emerald-500
to-teal-500
font-bold
">

P

</div>


<h2 className="
text-xl
font-bold
">

Procurement Copilot

</h2>


</div>



<p className="
mt-5
leading-relaxed
text-slate-400
">

AI-powered procurement software
helping businesses reduce costs,
manage suppliers, and make smarter
decisions.

</p>


</div>





{/* Product */}

<div>


<h3 className="
font-semibold
">

Product

</h3>


<ul className="
mt-5
space-y-3
text-slate-400
">


<li>
Features
</li>


<li>
AI Assistant
</li>


<li>
Analytics
</li>


<li>
Integrations
</li>


</ul>


</div>





{/* Company */}

<div>


<h3 className="
font-semibold
">

Company

</h3>


<ul className="
mt-5
space-y-3
text-slate-400
">


<li>
About
</li>


<li>
Contact
</li>


<li>
Careers
</li>


<li>
Blog
</li>


</ul>


</div>





{/* Resources */}

<div>


<h3 className="
font-semibold
">

Resources

</h3>


<ul className="
mt-5
space-y-3
text-slate-400
">


<li>
Documentation
</li>


<li>
Security
</li>


<li>
Privacy
</li>


<li>
Terms
</li>


</ul>


</div>



</div>





<div className="
mt-12
border-t
border-white/10
pt-8
text-sm
text-slate-500
flex
flex-col
gap-3
md:flex-row
md:justify-between
">


<p>

© 2026 Procurement Copilot. All rights reserved.

</p>


<p>

Built with AI for modern procurement teams.

</p>


</div>



</div>


</footer>

);

}