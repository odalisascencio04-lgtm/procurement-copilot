// lib/ai/formatRiskReport.ts

export function formatRiskReport(report: any) {

    const riskEmoji =
      report.riskLevel === "high"
        ? "🔴"
        : report.riskLevel === "medium"
        ? "🟡"
        : "🟢";
  
  
    return `
  # 🛡️ Procurement Risk Assessment
  
  
  ## ${riskEmoji} Overall Risk
  
  **Risk Level:** ${report.riskLevel?.toUpperCase()}
  
  **Risk Score:** ${report.riskScore}/100
  
  
  ---
  
  ## 📝 Executive Summary
  
  ${report.summary}
  
  
  ---
  
  ## ⚠️ Risk Analysis
  
  
  ${
  report.riskFactors
  ?.map(
  (r:any)=>`
  
  ### ${getFactorIcon(r.factor)} ${r.factor}
  
  **Impact:** ${r.impact.toUpperCase()}
  
  ${r.explanation}
  
  `
  )
  .join("\n")
  }
  
  
  ---
  
  ## 🚨 Warnings
  
  
  ${
  report.warnings
  ?.map(
  (w:string)=>`⚠️ ${w}`
  )
  .join("\n")
  }
  
  
  ---
  
  ## 🚀 Recommended Actions
  
  
  ${
  report.recommendedActions
  ?.map(
  (a:string,index:number)=>
  `${index+1}️⃣ ${a}`
  )
  .join("\n\n")
  }
  
  
  ---
  
  ## 💼 Business Impact
  
  ${
    report.businessImpact ||
    "Potential operational disruption, increased procurement costs, and supply continuity exposure."
   }
  
  
  ---
  
  ## 🔄 Supplier Strategy
  
  ${
  report.backupSupplierRecommendation ||
  "Consider developing alternative supplier options to reduce dependency risk."
  }
  
  `;
  }
  
  
  
  function getFactorIcon(
  factor:string
  ){
  
  const text =
  factor.toLowerCase();
  
  
  if(text.includes("financial"))
  return "💰";
  
  
  if(text.includes("price"))
  return "📈";
  
  
  if(text.includes("contract"))
  return "📄";
  
  
  if(text.includes("business"))
  return "🏭";
  
  
  if(text.includes("delivery"))
  return "🚚";
  
  
  if(text.includes("quality"))
  return "⭐";
  
  
  return "⚠️";
  
  }