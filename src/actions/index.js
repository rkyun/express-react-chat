import {SET_SOCKET} from './types';

export function setSocket(io){
  return {
    type: SET_SOCKET,
    payload: io
  }
}