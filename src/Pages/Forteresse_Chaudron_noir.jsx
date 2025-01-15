import "../Style/adventure.css"
import Save from "../Components/SaveContent"
import Button from "../Components/utils/button"
import ModalContent from "../Components/utils/modal"
import { useState } from "react"

export default function Forteresse (){
    const [isOpen, setIsOpen] = useState(false)
    const openSuccess = ()=>{
        setIsOpen(true)
    }

    return(
        <div className="chooseSave" >
            <h1>Choisissez votre sauvegarde</h1>
            <div className="SavesContent">
                <Save save="Sauvegarde 1" slot="save1" />
                <Save save="Sauvegarde 2" slot="save2"/>
                <Save save="Sauvegarde 3" slot="save3" />
            </div>
            <div className="success">
                <Button text ="Voir les succès" handleClick={openSuccess} />
            </div>
            
            {isOpen? 
            <ModalContent NameModal="Liste des succès" setIsOpen={setIsOpen} />
            : 
            ""
            }
        </div>
    )
}