import { SET_SOCKET }  from '../actions/types';
export default function(state = {}, action){
  switch(action.type){
    case SET_SOCKET:
      return { ...state, socket: action.payload }
    default:
      return state
  }
}