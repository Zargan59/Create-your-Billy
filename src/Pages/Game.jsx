import "../Style/game.css";
import CharacterTab from "../Components/tabCharacter";
import Starter from "../Components/Starter/starter";
import Button from "../Components/utils/button";
import Inventory from "../Components/Inventory";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeCurrentSave } from "../Redux/action";

export default function Adventure() {
  const dispatch = useDispatch()
  const savePicked = localStorage.getItem("currentSave");
  dispatch(changeCurrentSave(savePicked))

  const test = useSelector((state)=>console.log(state.stat.saveData))
  const tess = useSelector((state)=>console.log(state.stat.currentSave))
  const gameExist = useSelector((state)=>state.stat.saveData.billyType)
  // const gameExist = JSON.parse(localStorage.getItem(savePicked))
  // const inventory = useSelector((state) => {console.log(state.stat.inventory)})
  
 

  //Créer un tableau pour ajouter un objet et renseigner ses stats
  return (
    <div className="gameContent">
      {gameExist ? 
      ""
    :
      <Starter
        savePicked = {savePicked}
      />
    }

      <div className="flex">
          {/* {gameExist? <Inventory save={savePicked} /> : "" } */}
          <CharacterTab save={savePicked} />
      </div>
    </div>
  );
}
