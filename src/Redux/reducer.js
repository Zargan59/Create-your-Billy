import { DEFINE_BILLY,INITIAL_STAT, GET_STAT, SAVE_STAT, UPDATE_STAT,REMOVE_STAT,ADD_EQUIPEMENT } from "./action"
const currentSave = localStorage.getItem("currentSave")
const initialStat = JSON.parse(localStorage.getItem(currentSave)) || {
    hability: 2,
    stamina:2,
    agility:1,
    luck: 3,
    armor: 0,
    critical : 0,
    damage : 0,
    glory : 0,
    gold: 0,
    PV : 0,
    PVmax : 0,
    billyType : "",
    inventory : []
} 
// pv= stamina*3

export default function statReducer(state = initialStat, action){
    if(action.payload){
        switch (action.type){
            case UPDATE_STAT:
                return{
                    ...state,
                    ...Object.keys(action.payload).reduce((updatedStats, key) => {
                        updatedStats[key] = state[key] + action.payload[key];
                        return updatedStats;
                      }, {}),
                }
                case REMOVE_STAT: 
                return{
                    ...state,
                    ...Object.keys(action.payload).reduce((updatedStats, key) => {
                        updatedStats[key] = state[key] - action.payload[key];
                        return updatedStats;
                      }, {})
                }
                case INITIAL_STAT : 
                return{
                    ...state
                }
                case DEFINE_BILLY : 
                // localStorage.setItem(action.save, action.payload)
                return{
                    ...state,
                    billyType : action.payload
                }
                case GET_STAT : 
                console.log(state)
                return{
                    ...state
                }
                case SAVE_STAT : 

                localStorage.setItem(action.payload,JSON.stringify(state))
                return{
                    ...state

                }
                case ADD_EQUIPEMENT : 
                return{
                    ...state,
                    inventory : [...state.inventory, action.payload ]
                }

                default: 
                    return state
    }
}
return state
}

