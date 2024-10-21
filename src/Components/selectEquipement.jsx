import { useEffect } from "react"

export default function SelectEquipement({data,handleSelect, value, id}){
    

    return(
        <select id={id} > {data.map((equipement, index)=>(
            <option onClick={handleSelect} key={index}> {equipement.name}  </option>
        ))}  </select>
    )
}