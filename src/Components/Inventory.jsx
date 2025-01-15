import { useSelector } from "react-redux"
import Object from "./Object"
import Button from "./utils/button"
import { allStat } from "../Data/stat"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AddEquipement, UpdateSate } from "../Redux/action"

export default function Inventory({}){
    const dispatch = useDispatch()
    const currentSave = useSelector((state)=>console.log(state.stat.inventory))
    // const [inventory, setInventory] = useState(JSON.parse(localStorage.getItem(save))) 
    const inventory = useSelector((state)=>state.stat)
    const [options, setOptions] = useState([1])
    const [modalAddEquipement, setModalAddEquipement] = useState(true)

    const addEquipement = ()=>{
        setModalAddEquipement(true)
    }
    const cancelButton = ()=>{
        setModalAddEquipement(false)
    }
    const validButton = ()=>{
        const newObjectName = document.querySelector('#nameObject').value
        const newObjectStats = document.querySelectorAll("#objectStats")
        const stats = {}
        newObjectStats.forEach(stat =>{
            if(stat.childNodes[1].value ){
                const statName = stat.childNodes[0].value
                const statValue = Number(stat.childNodes[1].value)
                stats[statName] = statValue
            // dispatch(UpdateSate());
        }
    })
    
        dispatch(AddEquipement({name:newObjectName, stats }))
        setModalAddEquipement(false)
        setOptions([1])
    }


    const deleteEquipement = (e)=>{
        //Je récupère le nom de l'objet présent dans l'inventaire
        console.log(e.target.previousElementSibling.childNodes[0].textContent)
        // console.log("Delete")
    }

    const newOption = (e)=>{
        if(e.target===e.target.parentElement.parentElement.lastChild.lastElementChild){
            setOptions([...options,options.length+1])
        }
        
    }

 

    return(
        <div className="inventoryContent">
            <h2>L'inventaire</h2>
            <div className="blackBorder inventory ">
               {inventory ?  
               inventory.inventory.map((inventory, index) =>{
                return(
                <div key={index} className="inventoryRow">
                    <Object objectName = {inventory.name} object={inventory} stat={inventory.stats} test={index} />
                    <button onClick={deleteEquipement} >Delete</button>
                </div>
                )
                   
               })
               : "Inventaire vide"
            }
               {modalAddEquipement? 
               <div>

               <div id="valueItem">
               <input type="text" id="nameObject" placeholder="Nom" />

                {
                options.map((index)=>{
                    return( 
                    <div key={index} id="objectStats">
                        <select name="" id="">
                            {
                                allStat.map((stat, index) =>(
                                    <option  key={index}> {stat}  </option>
                                ))
                            }
                        </select>
                        <input type="number"  onFocus={newOption} />
                    </div>
                        
                    )
                })}
               </div>
               <div className="addEquipementButton">
               <Button text="Confirmer" handleClick={validButton} />
               <Button text="Annuler" handleClick={cancelButton}  />
                </div>
           </div>

               : 
                <div className="addEquipementButton">
                    <Button text="+" handleClick={addEquipement} />
                </div>
           }

               
                <div>
                </div>
            </div>
        </div>
    )
}