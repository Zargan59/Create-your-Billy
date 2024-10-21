import "../Style/game.css";
import CharacterTab from "../Components/tabCharacter";
import Starter from "../Components/Starter/starter";
import Button from "../Components/utils/button";
// import NewObject from "../Components/addObject"
import { useDispatch, useSelector } from "react-redux";
import { GetStat, UpdateSate } from "../Redux/action";


export default function Adventure() {
  const gameExist = useSelector((state)=>state.stat.PVmax)
  const dispatch = useDispatch()
  const savePicked = localStorage.getItem("currentSave");
  
  
const seeStat = () => {
  dispatch(GetStat(savePicked))
}
const addStamina = ()=>{
  dispatch(UpdateSate({stamina : 1}))
}

  //Créer un tableau pour ajouter un objet et renseigner ses stats
  return (
    <div className="gameContent">
      {gameExist > 0 ? 
      ""
    :
      <Starter
        savePicked = {savePicked}
      />
    }
      {/* <NewObject /> */}
      <Button text="Voir stat" handleClick={seeStat} />
      <Button text="+1 endurance" handleClick={addStamina} />


      <CharacterTab/>
    </div>
  );
}
