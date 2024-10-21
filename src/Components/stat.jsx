export default function Stats ({SecondaryStat,title,name, title2, name2}){
    if(SecondaryStat){
        return(
            <div className="secondaryStatContent" >
                <div className="secondaryStat  " >
                    <h4>{title}</h4>
                    <h2>{name}</h2>
                </div>
                <div className="secondaryStat  " >
                    <h4>{title2}</h4>
                    <h2>{name2}</h2>
                </div>
            </div>

        )
    }
    else{
        return(
            <div className="habilityContent statInfos " >
                <h4>{title}</h4>
                <h2>{name}</h2>
            </div>
        )
    }
} 