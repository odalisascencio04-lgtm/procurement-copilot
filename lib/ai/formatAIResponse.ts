// lib/ai/formatAIResponse.ts

export function formatAIResponse(
    text: string
  ) {
  
    let clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  
  
    try {
  
      const data = JSON.parse(clean);
  
  
      return `
  🛡️ **Procurement Risk Assessment**
  
  📊 **Risk Level:** ${data.riskLevel?.toUpperCase()}
  
  🎯 **Risk Score:** ${data.riskScore}/100
  
  📝 **Summary**
  
  ${data.summary}
  
  
  ⚠️ **Risk Factors**
  
  ${
  data.riskFactors
  ?.map(
  (r:any)=>
  `
  🔸 **${r.factor}**
  Impact: ${r.impact}
  
  ${r.explanation}
  `
  )
  .join("\n")
  }
  
  
  🚀 **Recommended Actions**
  
  ${
  data.recommendedActions
  ?.map(
  (a:string,index:number)=>
  `${index+1}️⃣ ${a}`
  )
  .join("\n")
  }
  
  
  💡 **Business Impact**
  
  ${data.businessImpact}
  
  
  🔎 **AI Recommendation**
  
  ${data.backupSupplierRecommendation}
  
  `;
  
  
  
    }
    catch {
  
      return `
  🤖 AI Procurement Assistant
  
  ${text}
  `;
  
    }
  
  }