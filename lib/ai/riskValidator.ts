// lib/ai/riskValidator.ts

export function validateRiskScore(
    report:any
  ){
  
    const factors =
      report.riskFactors || [];
  
  
    const highRisk =
      factors.some(
        (item:any)=>
          item.impact === "high"
      );
  
  
    const mediumRisk =
      factors.some(
        (item:any)=>
          item.impact === "medium"
      );
  
  
    // Fix inconsistent score
  
    if(
      report.riskScore >= 80
    ){
      report.riskLevel = "high";
    }
  
  
    else if(
      report.riskScore >= 45
    ){
      report.riskLevel = "medium";
    }
  
  
    else{
      report.riskLevel = "low";
    }
  
  
    // If high impact exists,
    // don't allow low risk
  
    if(
      highRisk &&
      report.riskLevel === "low"
    ){
  
      report.riskLevel = "medium";
  
    }
  
  
    return report;
  
  }