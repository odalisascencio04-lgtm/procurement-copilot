interface SupplierRiskInput {

    performance_score:number;
    
    risk_level:string;
    
    annual_spend:number;
    
    }
    
    
    export function analyzeSupplierRisk(
    supplier:SupplierRiskInput
    ){
    
    
    let score = 0;
    
    
    let reasons:string[]=[];
    
    
    
    // Performance
    
    if(
    supplier.performance_score >= 90
    ){
    
    score += 10;
    
    reasons.push(
    "Excellent supplier performance"
    );
    
    }
    
    else if(
    supplier.performance_score >=70
    ){
    
    score +=30;
    
    reasons.push(
    "Acceptable performance"
    );
    
    }
    
    else{
    
    score +=60;
    
    reasons.push(
    "Low performance requires attention"
    );
    
    }
    
    
    
    
    
    // Risk level
    
    if(
    supplier.risk_level==="High"
    ){
    
    score +=30;
    
    reasons.push(
    "High supplier risk detected"
    );
    
    }
    
    
    else if(
    supplier.risk_level==="Medium"
    ){
    
    score +=15;
    
    reasons.push(
    "Medium risk supplier"
    );
    
    }
    
    
    else{
    
    score +=5;
    
    reasons.push(
    "Low risk supplier"
    );
    
    }
    
    
    
    
    
    // Spend
    
    if(
    supplier.annual_spend > 1000000
    ){
    
    score -=10;
    
    reasons.push(
    "Strategic supplier due to high spend"
    );
    
    }
    
    
    
    
    
    // Limit
    
    if(score <0)
    score=0;
    
    
    if(score>100)
    score=100;
    
    
    
    
    
    let recommendation="";
    
    
    
    if(score <30){
    
    recommendation =
    "Supplier is healthy. Consider increasing partnership.";
    
    }
    
    else if(score <60){
    
    recommendation =
    "Monitor supplier performance regularly.";
    
    }
    
    else{
    
    recommendation =
    "Review supplier before additional commitments.";
    
    }
    
    
    
    
    return {
    
    riskScore:score,
    
    reasons,
    
    recommendation
    
    };
    
    
    }