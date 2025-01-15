import SelectEquipement from "../selectEquipement";
import { equipement } from "../../Data/equipement";
import Button from "../utils/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
  AddEquipement,
  SaveStat,
  UpdatePvMax,
  UpdateState,
} from "../../Redux/action";
import { RemoveStat } from "../../Redux/action";
import { DefineBilly } from "../../Redux/action";

export default function Starter({ savePicked }) {
  const [starters, setStarters] = useState({
    startEquipement1: [],
    startEquipement2: [],
    startEquipement3: [],
  });
  const Endurance = useSelector((state) => state.stat.endurance);
  const [starterChanged, setStarterChanged] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (starters && starterChanged) {
      const selectedEquipement = starters[starterChanged];

      if (selectedEquipement && selectedEquipement.length > 0) {
        const newEquipement =
          selectedEquipement[selectedEquipement.length - 1] || "nothing";
        const oldEquipement =
          selectedEquipement[selectedEquipement.length - 2] || "nothing";
        findSelectEquipement(newEquipement, oldEquipement);
      }
    }
  }, [starterChanged, starters]);


  const findSelectEquipement = (newEquipement, oldEquipement) => {
    equipement.forEach((object) => {
      if (object.name.includes(newEquipement) && object.stats) {
        dispatch(UpdateState(object.stats));
      }
      if (object.name.includes(oldEquipement) && object.stats) {
        dispatch(RemoveStat(object.stats));
      }
    });
  };

  const findEquipement = (starter) => {
    let statObject = null;
    equipement.forEach((object) => {
      if (object.name.includes(starter)) {
        statObject = object;
      }
    });
    return statObject;
  };

  const handleSelectEquipement = (e) => {
    const slotChanged = e.target.parentElement.id;
    setStarterChanged(slotChanged);
    const newEquipement = e.target.value;
    setStarters((f) => ({
      ...f,
      [slotChanged]: [...f[slotChanged], newEquipement],
    }));
  };

  const saveEquipement = () => {
    const starter1 = findEquipement(
      starters.startEquipement1[starters.startEquipement1.length - 1]
    );
    const starter2 = findEquipement(
      starters.startEquipement2[starters.startEquipement2.length - 1]
    );
    const starter3 = findEquipement(
      starters.startEquipement3[starters.startEquipement3.length - 1]
    );

    if (
      starter1.name &&
      starter2.name &&
      starter3.name &&
      starter1.name !== starter2.name &&
      starter1.name !== starter3.name &&
      starter2.name !== starter3.name
    ) {
      if (
        (starter1.name === "L'arc" ||
          starter2.name === "L'arc" ||
          starter3.name === "L'arc") &&
        (starter1.name === "La dague" ||
          starter2.name === "La dague" ||
          starter3.name === "La dague")
      ) {
        dispatch(UpdateState({ habilité: -1 }));
      }
      defineBilly();
      dispatch(UpdatePvMax(Endurance * 3));

      dispatch(AddEquipement(starter1));
      dispatch(AddEquipement(starter2));
      dispatch(AddEquipement(starter3));
      dispatch(SaveStat(savePicked));
    } else {
      console.log("2 fois le même objet");
    }
  };

  const eraseLocalStorage = () => {
    localStorage.removeItem(savePicked);
  };

  const defineBilly = () => {
    const startEquipements = [
      starters.startEquipement1,
      starters.startEquipement2,
      starters.startEquipement3,
    ];
    let weapons = 0,
      tools = 0,
      equipements = 0;
    let billyType = "";

    startEquipements.forEach((element) => {
      equipement.forEach((object) => {
        if (object.name.includes(element[0]) && object.stats) {
          switch (object.tag) {
            case "Arme":
              weapons = weapons + 1;
              break;

            case "tools":
              tools++;
              break;

            default:
              equipements++;
          }
        }
      });
    });
    if (weapons > 1) {
      billyType = "guerrier";
      dispatch(UpdateState({ habilité: 2, chance: -1 }));
    } else if (equipements > 1) {
      billyType = "prudent";
      dispatch(UpdateState({ habilité: -1, chance: 2 }));
    } else if (tools > 1) {
      billyType = "paysan";
      dispatch(UpdateState({ endurance: 2, adresse: -1 }));
    } else {
      billyType = "débrouillard";
      dispatch(UpdateState({ endurance: -1, adresse: 2 }));
    }
    dispatch(DefineBilly(billyType, savePicked));
  };

  return (
    <div className="startAdventureContent">
      <h2>Choisir 3 équipements de bases</h2>
      <div className="adventureStarter">
        <SelectEquipement
          data={equipement}
          id="startEquipement1"
          handleSelect={handleSelectEquipement}
        />
        <SelectEquipement
          id="startEquipement2"
          data={equipement}
          handleSelect={handleSelectEquipement}
        />
        <SelectEquipement
          id="startEquipement3"
          data={equipement}
          handleSelect={handleSelectEquipement}
        />
      </div>
      <Button text="Commencer" handleClick={saveEquipement} />
      <Button text="RESET" handleClick={eraseLocalStorage} />
    </div>
  );
}
