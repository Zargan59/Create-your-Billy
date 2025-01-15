
import {
  DEFINE_BILLY,
  INITIAL_STAT,
  GET_SAVE,
  SAVE_STAT,
  UPDATE_STAT,
  REMOVE_STAT,
  ADD_EQUIPEMENT,
  UPDATE_MAXPV,
  UPDATE_CURRENTSAVE,
} from "./action";

const initialStat = {
  currentSave: localStorage.getItem("currentSave"),
  saveData: JSON.parse(localStorage.getItem(localStorage.getItem("currentSave"))) || {
    habilité: 2,
    endurance: 2,
    adresse: 1,
    chance: 3,
    armure: 0,
    critique: 0,
    dégats: 0,
    gloire: 0,
    or: 0,
    PV: 0,
    PVmax: 0,
    billyType: "",
    inventory: [],
    date: 0,
    chapitre: 1,
    currentSave: "",
  },
};

export default function statReducer(state = initialStat, action) {
  if (action.payload) {
    switch (action.type) {
      case UPDATE_CURRENTSAVE:
        return {
          ...state,
          currentSave: action.payload,
        };

      case UPDATE_STAT:
        const updatedStat =  {
          ...state.saveData,
          ...Object.keys(action.payload).reduce((updatedStats, key) => {
            updatedStats[key] = state.saveData[key] + action.payload[key];
            return updatedStats;
          }, {}),
        };
        return{
            ...state, 
            saveData : updatedStat
        }
        
      case REMOVE_STAT:
        const removeStat =  {
          ...state.saveData,
          ...Object.keys(action.payload).reduce((updatedStats, key) => {
            updatedStats[key] = state.saveData[key] - action.payload[key];
            return updatedStats;
          }, {}),
        };
        return{
            ...state,
            saveData : removeStat
        }

      case INITIAL_STAT:
        return {
          ...state,
        };
      case DEFINE_BILLY:
        // localStorage.setItem(action.save, action.payload)
        return {
          ...state,
          billyType: action.payload,
        };
      // case GET_SAVE :
      // console.log(state)
      // localStorage.getItem(currentSave)
      // return{
      //     ...state
      // }
      case SAVE_STAT:
        localStorage.setItem(action.payload, JSON.stringify(state));
        return {
          ...state,
        };
      case ADD_EQUIPEMENT:
        return {
          ...state,
          inventory: [...state.saveData.inventory, action.payload],
        };
      case UPDATE_MAXPV:
        return {
          ...state,
          PVmax: action.payload,
        };

      default:
        return state;
    }
  }
  return state;
}
