interface Props {

    title:string;
    value:string | number;
    description?:string;
    
    }
    
    
    
    export default function MetricCard({
    
    title,
    value,
    description
    
    }:Props){
    
    
    return(
    
    <div className="
    rounded-2xl
    bg-white
    p-6
    shadow
    ">
    
    
    <p className="
    text-gray-500
    ">
    
    {title}
    
    </p>
    
    
    
    <h2 className="
    mt-3
    text-4xl
    font-bold
    ">
    
    {value}
    
    </h2>
    
    
    
    {
    description &&
    
    <p className="
    mt-2
    text-sm
    text-gray-600
    ">
    
    {description}
    
    </p>
    
    }
    
    
    </div>
    
    )
    
    }