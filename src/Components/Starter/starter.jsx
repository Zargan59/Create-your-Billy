import SelectEquipement from "../selectEquipement";
import { equipement } from "../../Data/equipement";
import Button from "../utils/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { AddEquipement, SaveStat, UpdatePvMax, UpdateSate } from "../../Redux/action";
import { RemoveStat } from "../../Redux/action";
import { DefineBilly } from "../../Redux/action";

export default function Starter({savePicked}) {
  const [starters, setStarters] = useState({
    startEquipement1: [],
    startEquipement2: [],
    startEquipement3: [],
  });
  const Stamina = useSelector((state)=>state.stat.stamina)
  const [starterChanged, setStarterChanged] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (starters && starterChanged) {
      const selectedEquipement = starters[starterChanged];

      if (selectedEquipement && selectedEquipement.length > 0) {
        const newEquipement = selectedEquipement[selectedEquipement.length - 1] || "nothing" ;
        const oldEquipement = selectedEquipement[selectedEquipement.length - 2] || "nothing";
        findSelectEquipement(newEquipement, oldEquipement);
      }
    }
  }, [starterChanged, starters]);

  //Si je reviens sur le selector qui vaut "" alors tu remets les stats de base

  const findSelectEquipement = (newEquipement, oldEquipement) => {
    equipement.forEach((object) => {
      if (object.name.includes(newEquipement) && object.stats) {
        dispatch(UpdateSate(object.stats));
      }
      if (object.name.includes(oldEquipement) && object.stats) {
        dispatch(RemoveStat(object.stats));
      }
    });
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

    //Je vérifie que chaque objet soit unique
        //Une fois la vérification faites, je recherche les cas particuliers du jeux
        //Je recherches les tags de chaque objet
    const starter1 = starters.startEquipement1[starters.startEquipement1.length-1];
    const starter2 = starters.startEquipement2[starters.startEquipement2.length-1];
    const starter3 = starters.startEquipement3[starters.startEquipement3.length-1];

    if (
      starter1 &&
      starter2 &&
      starter3 &&
      starter1 !== starter2 &&
      starter1 !== starter3 &&
      starter2 !== starter3
    ) {
      //Si tu as l'arc, tu ne peux pas avoir une autre arme
      // Si tu prends la dague et que tu as 2 armes ou l'arc alors tu perds -1 hab
      //Faire une modale de validation

        //A la validation de mon équipements, je veux  : 
          //Vérifier que toutes les règles soient respectés
        if((starter1 === "L'arc" || starter2 === "L'arc" ||starter3 === "L'arc") && (starter1 === "La dague" || starter2 === "La dague" ||starter3 === "La dague")  ){
          dispatch(UpdateSate({hability : -1}))
        }
          //Définir mon billy
        defineBilly()
          //Définir les PV
          dispatch(UpdatePvMax(Stamina*3))
          
          //J'ajoutes mon équipement à mon inventaire
        dispatch(AddEquipement(starter1))
        dispatch(AddEquipement(starter2))
        dispatch(AddEquipement(starter3))
          //J'enlève le choix de l'équipement

          //J'ajoute du contenu ?
          //Je save mes stats
        dispatch(SaveStat(savePicked))

    } else {
      // J'affiche la modale avec l'erreur qui pose problème
      console.log("2 fois le même objet");
    }
  };

  const eraseLocalStorage = () =>{
    localStorage.removeItem(savePicked)
  }

  
 

  const defineBilly = () => {

    const startEquipements = [starters.startEquipement1, starters.startEquipement2 , starters.startEquipement3]
    let weapons=0, tools=0, equipements =0;
    let billyType = ""

    startEquipements.forEach(element => {
      equipement.forEach((object) => {
        if (object.name.includes(element[0]) && object.stats) {
          switch (object.tag){
            case "Arme": 
            weapons= weapons +1
            break;
    
            case "tools": 
            tools++;
            break;
            
            default : 
            equipements++
          }
        }
    })
    });
    if(weapons > 1 ){
      billyType = "guerrier"
      dispatch(UpdateSate({hability : 2, luck: -1}))
      
    }
    else if( equipements > 1 ){
      billyType = "prudent"
      dispatch(UpdateSate({hability : -1, luck: 2}))

    }
    else if( tools > 1 ){
      billyType = "paysan"
      dispatch(UpdateSate({stamina : 2, agility: -1}))

    }
    else{
      billyType = "débrouillard"
      dispatch(UpdateSate({stamina : -1, agility: 2}))
    }
    dispatch(DefineBilly(billyType,savePicked))
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
