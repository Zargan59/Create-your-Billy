import { useSelector } from "react-redux";
import Stats from "./stat";
import { useEffect, useState } from "react";

export default function CharacterTab() {
 const stats =  useSelector((state)=> state.stat)
 const {hability, agility, stamina, luck, damage, armor, critical, PVmax, gold, glory } = stats

 const PlayerInfo = JSON.parse(localStorage.getItem("save1"))
 
 const Checkstamina = useSelector((state)=>state.stat.stamina)
 
 const [pvMax, setPvMax] = useState(0)

 useEffect(()=>{
  setPvMax(Checkstamina*3)
 },[Checkstamina])

  return (
    <div className="fichePersoContent">
      {PlayerInfo?
      <h2 className="billy" >{`Billy ${PlayerInfo.billyType}`} </h2>
     : 
     <h2 className="billy" >{`Billy : ???`} </h2>
      }
      <div className="personality">
        <Stats name={PVmax} title="Point de vie" />
      </div>
      <div className="stats">
        <div className="primaryStats">
          <Stats name={hability} title="Habilité" />
          <Stats name={stamina} title="Endurance" />
          <Stats name={agility} title="Adresse" />
          <Stats name={luck} title="Chance" />
        </div>
        <div className="secondaryStats">
          <Stats name={damage} title="Dégats" />
          <Stats name={armor} title="Armure" />
          <Stats name={critical} title="Critique" />
          <Stats SecondaryStat name={gold} title="Richesse" name2={glory} title2="Gloire" />
        </div>
      </div>
    </div>
  );
}
