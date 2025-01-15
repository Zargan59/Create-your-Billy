
export const UPDATE_STAT = "UPDATE_STAT"
export const REMOVE_STAT = "REMOVE_STAT"
export const DEFINE_BILLY = "DEFINE_BILLY"
export const INITIAL_STAT = "INITIAL_STAT" 
export const SAVE_STAT = "SAVE_STAT"
export const GET_SAVE = "GET_SAVE"
export const ADD_EQUIPEMENT = "ADD_EQUIPEMENT"
export const UPDATE_MAXPV = 'UPDATE_MAXPV'
export const UPDATE_CURRENTSAVE = "UPDATE_CURRENTSAVE"

export const UpdateState = (stats) =>{
    //le stats doit avoir un format objet
    return{
        type: "UPDATE_STAT",
        payload: stats
    }
}

export const RemoveStat = (stats) =>{
    return{
        type:"REMOVE_STAT",
        payload: stats
    }
}

export const InitialStat = (stats) =>{
    return{
        type:"INITIAL_STAT",
        payload: stats
    }
}


export const DefineBilly = (stats, save) =>{
    return{
        type : "DEFINE_BILLY",
        payload : stats,
        save : save
    }
}

export const GetSave = (save)=>{
    console.log("J'ai pris la save", save)
    return{
        type: "GET_SAVE",
        payload : save
    }
}

export const SaveStat = (save) =>{
    return{
        type: "SAVE_STAT",
        payload : save
    }
}

export const AddEquipement = (equipement) =>{
    return{
        type : "ADD_EQUIPEMENT",
        payload : equipement
    }   
}

export const RemoveEquipement = ()=>{
    
} 

export const UpdatePvMax = (state) =>{
    return{
        type: "UPDATE_MAXPV",
        payload : state
    }
}

export const changeCurrentSave = (save)=>{
    return{
        type : "UPDATE_CURRENTSAVE",
        payload : save
    }
}