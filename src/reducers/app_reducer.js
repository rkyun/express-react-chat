import { CONNECT,DISCONNECT, APPEND_MESSAGE, JOIN_ROOM }  from '../actions/types';
export default function(state = {socket: null, messages: {}, user: '', room: ''}, action){
  switch(action.type){
    case CONNECT:
      return { ...state, socket: action.payload }
    case DISCONNECT:
      return { ...state, socket: null, messages: {} }
    case APPEND_MESSAGE:
      return { ...state, messages:{...state.messages, [action.payload.createdAt]:action.payload}};
    case JOIN_ROOM:
      return { ...state, user: action.payload.name, room: action.payload.room }
    default:
      return state
  }
}