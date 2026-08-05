"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BrainCircuit,
  Building2,
  FileText,
  BarChart3,
  FolderOpen,
  ClipboardList,
  ShoppingCart,
  Settings,
} from "lucide-react";


const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "RFQs",
    icon: ClipboardList,
    href: "/rfq",
  },
  {
    title: "Purchase Orders",
    icon: ShoppingCart,
    href: "/purchase-orders",
  },
  {
    title: "Suppliers",
    icon: Building2,
    href: "/suppliers",
  },
  {
    title: "Contracts",
    icon: FileText,
    href: "/contracts",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Documents",
    icon: FolderOpen,
    href: "/documents",
  },
  {
    title: "AI Copilot",
    icon: BrainCircuit,
    href: "/chat",
  },
];


export default function Sidebar() {

  const pathname = usePathname();


  return (

    <aside
      className="
      min-h-screen
      w-72
      border-r
      bg-[#064E3B]
      flex
      flex-col
      sticky
      top-0
      "
    >


      {/* BRAND LOGO */}

      <div className="px-6 py-7">

        <div className="flex items-center gap-3">


          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-400
            to-teal-600
            shadow-lg
            "
          >

            <BrainCircuit
              size={27}
              strokeWidth={2.2}
              className="text-white"
            />

          </div>



          <div>

            <h1
              className="
              text-xl
              font-extrabold
              tracking-tight
              text-white
              "
            >
              Procure
              <span className="text-emerald-300">
                AI
              </span>
            </h1>


            <p
              className="
              text-xs
              font-medium
              tracking-wide
              text-emerald-200
              "
            >
              AI Procurement Platform
            </p>


          </div>


        </div>

      </div>





      {/* NAVIGATION */}

      <nav
        className="
        flex-1
        space-y-2
        px-4
        "
      >

        {menu.map((item)=>{

          const Icon = item.icon;


          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");


          return (

            <Link
              key={item.href}
              href={item.href}

              className={`
                flex
                items-center
                gap-4
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                tracking-wide
                transition-all

                ${
                  active
                    ? "bg-white text-emerald-700 shadow-lg"
                    : "text-emerald-50 hover:bg-white/10 hover:text-white"
                }
              `}
            >

              <Icon size={20}/>

              <span>
                {item.title}
              </span>


            </Link>

          );

        })}


      </nav>







      {/* SETTINGS */}

      <div
        className="
        border-t
        border-emerald-800
        p-5
        "
      >

        <Link
          href="/settings"

          className="
          flex
          items-center
          gap-3
          rounded-xl
          p-3
          text-sm
          font-semibold
          text-emerald-100
          transition
          hover:bg-white/10
          hover:text-white
          "
        >

          <Settings size={20}/>

          Settings


        </Link>


      </div>



    </aside>

  );

}