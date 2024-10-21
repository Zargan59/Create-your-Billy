import "../Style/adventure.css"
import Save from "../Components/SaveContent"

export default function Forteresse (){


    return(
        <div className="chooseSave" >
            <h1>Choisissez votre sauvegarde</h1>
            <div className="SavesContent">
                <Save save="Sauvegarde 1" slot="save1" />
                <Save save="Sauvegarde 2" slot="save2"/>
                <Save save="Sauvegarde 3" slot="save3" />
            </div>
        </div>
    )
}