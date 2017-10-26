import { UPDATE_USERS } from '../actions/types.js';

export default function (state=[], action){

  switch(action.type){
    case UPDATE_USERS:
      return action.payload
    default:
      return state;
  }
}