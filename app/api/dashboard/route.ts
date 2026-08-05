import { NextResponse } from "next/server";

import { recommendSupplier } from "@/lib/ai/supplierRecommendation";
import { analyzeRisk } from "@/lib/ai/riskAnalyzer";


export async function GET() {

  try {


    const suppliers = [

      {
        name: "Global Steel",
        price: 45000,
        quality: 95,
        delivery: 98,
        risk: 20
      },


      {
        name: "ABC Electronics",
        price: 32000,
        quality: 75,
        delivery: 82,
        risk: 80
      },


      {
        name: "Nova Parts",
        price: 28000,
        quality: 88,
        delivery: 90,
        risk: 45
      }


    ];



    const recommended =
      await recommendSupplier(
        suppliers
      );



    const riskySupplier =
      await analyzeRisk(
        suppliers[1]
      );



    let supplierAI:any = {};

    let riskAI:any = {};



    try {

      supplierAI =
        JSON.parse(recommended);

    } catch {

      supplierAI = {
        finalRecommendation:
          recommended
      };

    }



    try {

      riskAI =
      typeof riskySupplier === "string"
      ? JSON.parse(riskySupplier)
       : riskySupplier;

    } catch {

      riskAI = {
        summary:
          riskySupplier
      };

    }




    return NextResponse.json({

      
      totalSpend:184000,

      suppliers: suppliers.length,

      contracts:45,

      riskAlerts: riskAI.riskLevel === "high"
        ? 3
        : 1,



      monthlySpend:[

        {
          month:"Jan",
          amount:12000
        },

        {
          month:"Feb",
          amount:15000
        },

        {
          month:"Mar",
          amount:18000
        },

        {
          month:"Apr",
          amount:14000
        },

        {
          month:"May",
          amount:21000
        },

        {
          month:"Jun",
          amount:19000
        }

      ],



      topSuppliers:[

        {
          name:"Global Steel",
          spend:45000
        },

        {
          name:"ABC Electronics",
          spend:32000
        },

        {
          name:"Nova Parts",
          spend:28000
        }

      ],



      expiringContracts:[

        {
          name:"Microsoft",
          daysLeft:45
        },

        {
          name:"AWS",
          daysLeft:30
        },

        {
          name:"Adobe",
          daysLeft:20
        }

      ],




      aiInsight:

        supplierAI.finalRecommendation ||
        supplierAI.comparisonSummary ||
        "AI procurement analysis completed.",




      potentialSavings:32000,




      moneyAlerts:[


        {

          title:
          "Supplier risk detected: " +
          (riskAI.riskLevel || "unknown"),


          description:
          riskAI.summary ||
          "AI found supplier issues.",


          impact:
          riskAI.businessImpact ||
          "Review supplier immediately.",


          severity:
          riskAI.riskLevel === "high"
          ? "high"
          : "medium"

        },


        {

          title:
          "Recommended supplier optimization",


          description:
          supplierAI.comparisonSummary ||
          "AI compared supplier options.",


          impact:
          supplierAI.savingsOpportunity ||
          "Potential savings identified.",


          severity:
          "medium"

        }


      ],




      supplierRisk:{


        name:
        suppliers[1].name,


        issue:
        riskAI.summary ||
        "Risk analysis completed.",


        recommendation:
        riskAI.recommendedActions?.[0] ||
        riskAI.backupSupplierRecommendation ||
        "Monitor supplier."

      }




    });



  } catch(error){


    console.error(
      "Dashboard AI Error:",
      error
    );


    return NextResponse.json({

      error:
      "Dashboard generation failed"

    },

    {
      status:500
    });


  }


}