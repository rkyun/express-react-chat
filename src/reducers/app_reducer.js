import { SET_SOCKET, APPEND_MESSAGE }  from '../actions/types';
export default function(state = {socket: null, messages: {}}, action){
  switch(action.type){
    case SET_SOCKET:
      return { ...state, socket: action.payload }
    case APPEND_MESSAGE:
      return { ...state, messages:{...state.messages, [action.payload.createdAt]:action.payload}};
    default:
      return state
  }
}