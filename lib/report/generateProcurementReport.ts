import jsPDF from "jspdf";


export function generateProcurementReport(
data:any
){

const doc =
new jsPDF();


let y = 20;


function addLine(
text:string
){

doc.text(
text,
20,
y
);

y += 10;

}



addLine(
"AI Procurement Assessment Report"
);


addLine(
""
);


addLine(
`Overall Health Score: ${data.overallHealthScore}/100`
);


addLine(
""
);


addLine(
"Executive Summary:"
);


addLine(
data.executiveSummary || ""
);


addLine(
""
);


addLine(
`Savings Opportunity: ${data.savingsOpportunity || "N/A"}`
);


addLine(
""
);


addLine(
"Top Risks:"
);


if(data.topRisks){

data.topRisks.forEach(
(risk:string)=>{

addLine(
"- " + risk
);

});

}


addLine(
""
);


addLine(
"Recommended Actions:"
);


if(data.priorityActions){

data.priorityActions.forEach(
(action:string)=>{

addLine(
"- " + action
);

});

}



doc.save(
"AI-Procurement-Report.pdf"
);


}