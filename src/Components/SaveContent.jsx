import { useNavigate } from "react-router-dom"

export default function Save({save, link, slot}){
    //Récupère le clic
    const navigate = useNavigate()

    const getSave = localStorage.getItem(slot)


    const handleChooseSave = () => {
        localStorage.setItem("currentSave", slot )
        //Tu regardes le slot et en fonction tu charges une save différente
        navigate("/la_forteresse_du_donjon_noir")
    }


    return(
            <div className="saveContent" onClick={handleChooseSave}  >
                <h2> {save} </h2>
        
                {getSave ?  
                    <div className="infoSaveContent">
                        {/* Chapitre actuelle */}
                        <p>25/05/2024</p>
                        <p className="billyType"> Billy aventurier</p>
                        <p className=" pageInfo" > 80 </p>
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