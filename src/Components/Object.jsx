

export default function InventoryObject({objectName, stat}){
    
    const nomination = (name)=>{
        let nameStat = null
        switch(name){
            case "habilité":
            case "Habilité":
                nameStat = "Hab"
                break;

            case "endurance":
            case "Endurance":
                nameStat = "End"
                break
            case "adresse":
            case "Adresse":
                nameStat = "Agi"
                break
            case "chance":
            case "Chance":
                nameStat = "Cha"
                break
            case "armure":
            case "Armure" : 
                nameStat = "Arm"
                break
            case "dégats":
            case "Dégats":
                nameStat = "Dmg"
                break
            case "Critique" : 
            case "critique":
                nameStat = "Crt"
                break
            default :
                return
        }
        return nameStat
    }

   return(
    <div className="objectInfos" >
        <p className="objectName">{ objectName} </p>
        {Object.entries(stat).map(([stat, value], index) => {
           const name =  nomination(stat)
            return(
            <div className="objectStat"  key={index} >
                <p >{ name} : {value}</p>
            </div>
            )
        })}
    </div>
   )
}