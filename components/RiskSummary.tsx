interface Props {

    critical:number;
    high:number;
    medium:number;
    
    }
    
    
    
    export default function RiskSummary({
    
    critical,
    high,
    medium
    
    }:Props){
    
    
    return(
    
    <div className="
    rounded-2xl
    bg-white
    p-6
    shadow
    ">
    
    
    <h2 className="
    text-xl
    font-bold
    ">
    
    Risk Summary
    
    </h2>
    
    
    
    <div className="
    mt-5
    space-y-3
    ">
    
    
    <div>
    
    Critical:
    
    <span className="
    ml-2
    font-bold
    text-red-600
    ">
    
    {critical}
    
    </span>
    
    </div>
    
    
    
    <div>
    
    High:
    
    <span className="
    ml-2
    font-bold
    text-orange-600
    ">
    
    {high}
    
    </span>
    
    </div>
    
    
    
    
    <div>
    
    Medium:
    
    <span className="
    ml-2
    font-bold
    text-yellow-600
    ">
    
    {medium}
    
    </span>
    
    </div>
    
    
    
    </div>
    
    
    </div>
    
    )
    
    }