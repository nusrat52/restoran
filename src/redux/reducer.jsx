import * as ActionTypes from "./actionTypes"

export const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ORDERS:
      return [... action.payload];
      case ActionTypes.ADD_ORDERS:
      return [...state, action.payload];
    case ActionTypes.PUT__ORDER:
      state = state.map(stat => {
        if(stat.id == action.payload.id){
          return action.payload
        }else{
          return stat
        }
      })
        return [...state];
    default:
      return state;
  }
};
