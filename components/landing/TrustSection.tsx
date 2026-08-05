import {
    LockKeyhole,
    Zap,
    BrainCircuit,
    ShieldCheck,
  } from "lucide-react";
  
  
  const trustItems = [
  
  {
  title:"AI-Powered Decisions",
  description:
  "Advanced AI helps teams analyze suppliers, contracts, and spending.",
  icon:BrainCircuit,
  },
  
  
  {
  title:"Enterprise Security",
  description:
  "Your procurement data is protected with modern security practices.",
  icon:LockKeyhole,
  },
  
  
  {
  title:"Faster Workflows",
  description:
  "Automate repetitive procurement tasks and approvals.",
  icon:Zap,
  },
  
  
  {
  title:"Risk Management",
  description:
  "Detect supplier and contract risks before they impact business.",
  icon:ShieldCheck,
  },
  
  
  ];
  
  
  export default function TrustSection(){
  
  
  return (
  
  <section className="
  bg-white
  py-20
  ">
  
  
  <div className="
  mx-auto
  max-w-7xl
  px-8
  ">
  
  
  <div className="
  rounded-3xl
  bg-[#081722]
  px-8
  py-12
  lg:px-16
  ">
  
  
  <div className="
  grid
  gap-12
  lg:grid-cols-2
  items-center
  ">
  
  
  <div>
  
  
  <div className="
  inline-flex
  rounded-full
  bg-white/10
  px-4
  py-2
  text-sm
  text-emerald-400
  ">
  
  Built for modern businesses
  
  </div>
  
  
  
  <h2 className="
  mt-6
  text-4xl
  font-bold
  text-white
  ">
  
  Procurement intelligence
  you can trust
  
  </h2>
  
  
  
  <p className="
  mt-5
  text-lg
  text-slate-400
  ">
  
  Combine AI automation,
  supplier intelligence,
  and real-time visibility
  to make confident purchasing decisions.
  
  </p>
  
  
  
  </div>
  
  
  
  
  
  <div className="
  grid
  gap-5
  sm:grid-cols-2
  ">
  
  
  {
  trustItems.map((item)=>{
  
  
  const Icon=item.icon;
  
  
  return (
  
  <div
  
  key={item.title}
  
  className="
  rounded-2xl
  bg-white/5
  p-5
  border
  border-white/10
  "
  
  >
  
  
  <Icon
  className="text-emerald-400"
  size={28}
  />
  
  
  
  <h3 className="
  mt-4
  font-semibold
  text-white
  ">
  
  {item.title}
  
  </h3>
  
  
  
  <p className="
  mt-2
  text-sm
  text-slate-400
  ">
  
  {item.description}
  
  </p>
  
  
  </div>
  
  
  )
  
  
  })
  
  }
  
  
  </div>
  
  
  </div>
  
  
  </div>
  
  
  </div>
  
  
  </section>
  
  );
  
  }