import { useSelector } from "react-redux";
import Stats from "./stat";

export default function CharacterTab({save}) {
 const stats =  useSelector((state)=> state.stat.saveData)
 const {habilité, adresse, endurance, chance, dégats, armure, critique, PVmax, or, gloire } = stats
 const PlayerInfo = JSON.parse(localStorage.getItem(save))
 


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
          <Stats name={habilité} title="Habilité" />
          <Stats name={endurance} title="Endurance" />
          <Stats name={adresse} title="Adresse" />
          <Stats name={chance} title="Chance" />
        </div>
        <div className="secondaryStats">
          <Stats name={dégats} title="Dégats" />
          <Stats name={armure} title="Armure" />
          <Stats name={critique} title="Critique" />
          <Stats SecondaryStat name={or} title="Richesse" name2={gloire} title2="Gloire" />
        </div>
      </div>
    </div>
  );
}
