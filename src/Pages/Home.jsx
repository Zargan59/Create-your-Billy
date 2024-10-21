import Adventure from "../Components/Adventure"
import { NavLink } from "react-router-dom"

import "../Style/homePage.css"

export default function  HomePage(){
    return(
        <div className="homePageContent">
            <h1>Choisissez votre aventure </h1>
            <div className="adventuresContent" >
                <NavLink to="/la_forteresse_du_donjon_noir/Save">
                    <Adventure Title="La forteresse du Chaudron Noir" image="tome1" /> 
                </NavLink>
                {/* <Adventure Title="La Corne des Sables d'Ivoire" image="tome2" /> */}

            </div>
        </div>
    )
}