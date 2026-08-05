interface ContractRiskInput {

    end_date:string;
    
    value:number;
    
    status:string;
    
    risk_level:string;
    
    }
    
    
    
    export function analyzeContractRisk(
    contract:ContractRiskInput
    ){
    
    
    let score=0;
    
    let findings:string[]=[];
    
    
    
    const today=new Date();
    
    const expiry=new Date(contract.end_date);
    
    
    const daysLeft =
    Math.ceil(
    (expiry.getTime()-today.getTime())
    /
    (1000*60*60*24)
    );
    
    
    
    
    
    // expiration
    
    if(daysLeft < 30){
    
    score +=40;
    
    findings.push(
    "Contract expires within 30 days"
    );
    
    }
    
    else if(daysLeft < 90){
    
    score +=20;
    
    findings.push(
    "Contract renewal should be planned soon"
    );
    
    }
    
    else{
    
    findings.push(
    "Contract timeline is healthy"
    );
    
    }
    
    
    
    
    
    // risk level
    
    if(contract.risk_level==="High"){
    
    score +=40;
    
    findings.push(
    "High contract risk detected"
    );
    
    }
    
    
    else if(contract.risk_level==="Medium"){
    
    score +=20;
    
    findings.push(
    "Medium risk requires monitoring"
    );
    
    }
    
    else{
    
    findings.push(
    "Low contract risk"
    );
    
    }
    
    
    
    
    
    // value
    
    if(contract.value > 1000000){
    
    findings.push(
    "High-value contract requires approval monitoring"
    );
    
    }
    
    
    
    
    
    if(score>100)
    score=100;
    
    
    
    let recommendation="";
    
    
    if(score <30){
    
    recommendation=
    "Contract is healthy. Continue current agreement.";
    
    }
    
    else if(score <60){
    
    recommendation=
    "Review contract conditions before renewal.";
    
    }
    
    else{
    
    recommendation=
    "Immediate review recommended.";
    
    }
    
    
    
    
    return {
    
    riskScore:score,
    
    findings,
    
    recommendation,
    
    daysLeft
    
    };
    
    
    }