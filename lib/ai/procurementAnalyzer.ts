export function analyzeProcurementDocument(
    filename:string
    ){
    
    const lower =
    filename.toLowerCase();
    
    
    let risks=[];
    
    
    if(
    lower.includes("contract")
    ){
    
    risks.push(
    "Review renewal and termination clauses"
    );
    
    }
    
    
    if(
    lower.includes("invoice")
    ){
    
    risks.push(
    "Verify payment terms and duplicate charges"
    );
    
    }
    
    
    if(
    risks.length===0
    ){
    
    risks.push(
    "General supplier document review recommended"
    );
    
    }
    
    
    
    return {
    
    
    supplier:
    "Supplier detected from document",
    
    
    documentType:
    filename.includes("invoice")
    ?
    "Invoice"
    :
    "Contract",
    
    
    
    riskScore:
    risks.length>1
    ?
    "Medium"
    :
    "Low",
    
    
    
    risks,
    
    
    recommendations:[
    
    "Review supplier compliance",
    
    "Verify contract conditions",
    
    "Monitor supplier performance"
    
    ]
    
    
    };
    
    
    }