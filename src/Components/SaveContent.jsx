import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


export default function Save({save, link, slot}){
    //Récupère le clic
    const navigate = useNavigate()
    const getSave = JSON.parse(localStorage.getItem(slot))
    
    const handleChooseSave = (e) => {
        localStorage.setItem("currentSave", slot )
        //Tu regardes le slot et en fonction tu charges une save différente
        
        if(e.target.tagName === "BUTTON"){
            localStorage.removeItem(slot)
            console.log("Effacer")
        }
        else{
            navigate("/la_forteresse_du_donjon_noir")
        }
    }


    return(
            <div className="saveContent" onClick={handleChooseSave}  >
                <h2> {save} </h2>
        
                {getSave ?  
                    <div className="infoSaveContent">
                        {/* Chapitre actuelle */}
                        <p>25/05/2024</p>
                        <p className="billyType"> Billy {getSave.billyType} </p>
                        <p className=" pageInfo" > Chapitre : {getSave.chapitre} </p>
                        <button> Delete </button>
                        {/* Date de la dernière fois que la partie a était lancé  */}
                    </div>
                :
                    <div className="saveEmpty">
                        <p> Sauvegarde vide</p>
                    </div>
                }
            </div>
    )
}