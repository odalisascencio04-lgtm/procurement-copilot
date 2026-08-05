"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";


export default function Hero() {

  return (

    <section
      className="
      relative
      overflow-hidden
      bg-white
      pt-36
      pb-24
      "
    >


      {/* Background */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-emerald-50
        via-white
        to-teal-50
        "
      />


      <div
        className="
        relative
        mx-auto
        max-w-7xl
        px-8
        "
      >


        <div
          className="
          grid
          items-center
          gap-16
          lg:grid-cols-2
          "
        >



          {/* LEFT CONTENT */}


          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:0.8
            }}

          >


            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-100
              px-4
              py-2
              text-sm
              font-medium
              text-emerald-700
              "
            >

              <Sparkles size={16}/>

              AI Procurement Platform

            </div>




            <h1
              className="
              mt-8
              text-5xl
              font-bold
              leading-tight
              text-slate-900
              lg:text-7xl
              "
            >

              Transform Procurement

              <br />

              With Intelligent AI

            </h1>




            <p
              className="
              mt-6
              max-w-xl
              text-lg
              leading-relaxed
              text-slate-500
              "
            >

              Automate supplier management,
              analyze contracts, and optimize
              spending with your AI procurement
              assistant.

            </p>




            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-4
              "
            >


              <Link

                href="/register"

                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-emerald-500
                px-7
                py-4
                font-semibold
                text-white
                shadow-lg
                shadow-emerald-200
                transition
                hover:bg-emerald-600
                "

              >

                Start Free

                <ArrowRight size={18}/>

              </Link>





              <Link

                href="#demo"

                className="
                rounded-xl
                border
                border-slate-300
                px-7
                py-4
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
                "

              >

                View Demo

              </Link>


            </div>





            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-8
              text-sm
              text-slate-500
              "
            >


              <div
                className="
                flex
                items-center
                gap-2
                "
              >

                <ShieldCheck
                  className="text-emerald-500"
                />

                Enterprise Ready

              </div>




              <div
                className="
                flex
                items-center
                gap-2
                "
              >

                <TrendingDown
                  className="text-emerald-500"
                />

                Reduce Costs

              </div>


            </div>


          </motion.div>







          {/* RIGHT DASHBOARD MOCKUP */}


          <motion.div

            initial={{
              opacity:0,
              scale:0.9
            }}

            animate={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:0.8,
              delay:0.2
            }}

            className="
            relative
            "

          >



            <div
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-2xl
              animate-[float_4s_ease-in-out_infinite]
              "
            >



              <div
                className="
                mb-6
                flex
                items-center
                justify-between
                "
              >


                <h3
                  className="
                  font-bold
                  text-slate-900
                  "
                >

                  Procurement AI

                </h3>


                <span
                  className="
                  rounded-full
                  bg-emerald-100
                  px-3
                  py-1
                  text-xs
                  text-emerald-700
                  "
                >

                  Online

                </span>


              </div>





              <div
                className="
                space-y-4
                "
              >



                <div
                  className="
                  rounded-2xl
                  bg-slate-50
                  p-5
                  "
                >

                  <p
                    className="
                    text-sm
                    text-slate-500
                    "
                  >

                    Total Spend

                  </p>


                  <h2
                    className="
                    mt-2
                    text-3xl
                    font-bold
                    "
                  >

                    $2.4M

                  </h2>


                </div>





                <div
                  className="
                  grid
                  grid-cols-2
                  gap-4
                  "
                >


                  <div
                    className="
                    rounded-2xl
                    bg-emerald-50
                    p-5
                    "
                  >

                    <p className="text-sm">

                      Suppliers

                    </p>


                    <h3
                      className="
                      text-2xl
                      font-bold
                      "
                    >

                      240

                    </h3>


                  </div>




                  <div
                    className="
                    rounded-2xl
                    bg-blue-50
                    p-5
                    "
                  >

                    <p className="text-sm">

                      Risk Alerts

                    </p>


                    <h3
                      className="
                      text-2xl
                      font-bold
                      "
                    >

                      12

                    </h3>


                  </div>



                </div>



              </div>


            </div>


          </motion.div>



        </div>


      </div>


    </section>

  );

}